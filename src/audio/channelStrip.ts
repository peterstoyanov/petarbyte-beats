import type {
  AnalyserNode,
  BaseAudioContext,
  BiquadFilterNode,
  GainNode,
  StereoPannerNode,
} from 'react-native-audio-api';

import { DEFAULT_MIXER } from '@/domain/song/defaults';
import type { Mixer } from '@/domain/song/types';

import type { MasterBus } from './masterBus';
import { chain, DEFAULT_Q, filterNode, gainNode } from './nodes';

const OPEN_FILTER_HZ = 20000;
/** The cutoff runs from 0 to 1; from here on the filter counts as fully open. */
const FULLY_OPEN_CUTOFF = 0.999;
const CUTOFF_RANGE_HZ = { min: 120, max: 18000 } as const;
const RESONANCE_Q = 12;

const METER_FFT_SIZE = 256;

/** A sidechain duck never quite silences the channel. */
const DUCK_DEPTH_SCALE = 0.9;
const DUCK_ATTACK_SECONDS = 0.008;
const DUCK_RELEASE_DELAY_SECONDS = 0.02;
/** setTargetAtTime gets about 95% of the way back in three time constants. */
const TIME_CONSTANTS_TO_RECOVER = 3;

/** One channel's row on the mixing desk. */
export type ChannelStrip = {
  /** The channel's drums or notes play into this. */
  readonly input: GainNode;
  readonly filter: BiquadFilterNode;
  readonly panner: StereoPannerNode;
  readonly duck: GainNode;
  readonly volume: GainNode;
  readonly meter: AnalyserNode;
  readonly meterSamples: Float32Array;
  readonly reverbSend: GainNode;
  readonly delaySend: GainNode;
};

/** filter, pan, duck and volume in a row into the master, with sends to its reverb and delay. */
export const createChannelStrip = (context: BaseAudioContext, master: MasterBus): ChannelStrip => {
  const input = gainNode(context);
  const filter = filterNode(context, {
    type: 'lowpass',
    frequency: cutoffHz(DEFAULT_MIXER.cutoff),
  });
  const panner = context.createStereoPanner();
  const duck = gainNode(context);
  const volume = gainNode(context);
  const meter = context.createAnalyser();
  meter.fftSize = METER_FFT_SIZE;
  chain(input, filter, panner, duck, volume, master.input);
  volume.connect(meter);

  const reverbSend = gainNode(context, 0);
  const delaySend = gainNode(context, 0);
  chain(volume, reverbSend, master.reverbSend);
  chain(volume, delaySend, master.delaySend);

  const meterSamples = new Float32Array(METER_FFT_SIZE);
  return { input, filter, panner, duck, volume, meter, meterSamples, reverbSend, delaySend };
};

export const applyMixer = (strip: ChannelStrip, mixer: Mixer): void => {
  strip.volume.gain.value = mixer.isMuted ? 0 : mixer.volume;
  strip.panner.pan.value = mixer.pan;
  strip.filter.frequency.value = cutoffHz(mixer.cutoff);
  strip.filter.Q.value = DEFAULT_Q + mixer.resonance * RESONANCE_Q;
  strip.reverbSend.gain.value = mixer.reverb;
  strip.delaySend.gain.value = mixer.delay;
};

/** Turns the cutoff from 0 to 1 into hertz on a scale that sounds even to the ear. */
export const cutoffHz = (cutoff: number): number =>
  cutoff >= FULLY_OPEN_CUTOFF
    ? OPEN_FILTER_HZ
    : CUTOFF_RANGE_HZ.min * (CUTOFF_RANGE_HZ.max / CUTOFF_RANGE_HZ.min) ** cutoff;

type DuckSpec = {
  readonly time: number;
  readonly depth: number;
  readonly seconds: number;
};

/**
 * The sidechain: the channel dips when the kick hits and swells back over `seconds`. A kick that
 * lands while the last duck is still swelling back starts from where that one has got to, which
 * the web studio does not do: it reads the level at the moment of scheduling, not of the kick.
 */
export const duckStrip = (strip: ChannelStrip, { time, depth, seconds }: DuckSpec): void => {
  const gain = strip.duck.gain;
  gain.cancelAndHoldAtTime(time);
  gain.linearRampToValueAtTime(1 - depth * DUCK_DEPTH_SCALE, time + DUCK_ATTACK_SECONDS);
  gain.setTargetAtTime(1, time + DUCK_RELEASE_DELAY_SECONDS, seconds / TIME_CONSTANTS_TO_RECOVER);
};

/** The loudest sample the strip played in its last few milliseconds, for the level meter. */
export const peakLevel = (strip: ChannelStrip): number => {
  strip.meter.getFloatTimeDomainData(strip.meterSamples);
  return strip.meterSamples.reduce((peak, sample) => Math.max(peak, Math.abs(sample)), 0);
};

/** Takes the strip off the desk, so a deleted channel stops costing processing time. */
export const disconnectStrip = (strip: ChannelStrip): void => {
  const { input, filter, panner, duck, volume, meter, reverbSend, delaySend } = strip;
  for (const node of [input, filter, panner, duck, volume, meter, reverbSend, delaySend]) {
    node.disconnect();
  }
};
