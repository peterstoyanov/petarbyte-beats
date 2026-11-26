import type {
  AudioBuffer,
  AudioNode,
  BaseAudioContext,
  DelayNode,
  GainNode,
} from 'react-native-audio-api';

import { DEFAULT_MASTER } from '@/domain/song/defaults';

import { stepSeconds } from '@/domain/song/timing';
import type { Song } from '@/domain/song/types';

import { chain, filterNode, gainNode } from './nodes';
import { softLimiter } from './softLimiter';

const REVERB_SECONDS = 2.6;
const STEREO = 2;
/** How fast the reverb's tail dies away: the noise is shaped by (1 - t)^this. */
const REVERB_TAIL_CURVE = 3.5;
/** The first samples of the reverb fade in, so it starts without a click. */
const REVERB_FADE_IN_SAMPLES = 400;
const REVERB_LOW_CUT_HZ = 250;

const MAX_DELAY_SECONDS = 2;
/** The echo is a dotted eighth: three steps. */
const DELAY_STEPS = 3;
const LONGEST_ECHO_SECONDS = 1.9;
const DELAY_FEEDBACK = 0.38;
const DELAY_TONE_HZ = 3800;

/** The end of the desk: everything is summed here, with a shared reverb and delay. */
export type MasterBus = {
  /** Channel strips and the effect returns play into this. */
  readonly input: GainNode;
  /** Connect this to the speakers. */
  readonly output: AudioNode;
  readonly volume: GainNode;
  readonly reverbSend: GainNode;
  readonly reverbReturn: GainNode;
  readonly delaySend: GainNode;
  readonly delayReturn: GainNode;
  readonly delay: DelayNode;
};

export const createMasterBus = (context: BaseAudioContext): MasterBus => {
  const input = gainNode(context);
  const volume = gainNode(context, DEFAULT_MASTER.volume);
  const output = chain(input, volume, ...softLimiter(context));
  return { input, output, volume, ...reverb(context, input), ...echo(context, input) };
};

/** Sets the master volume, the reverb and delay returns, and the delay time to the tempo. */
export const applyMasterSettings = (bus: MasterBus, song: Pick<Song, 'bpm' | 'master'>): void => {
  bus.volume.gain.value = song.master.volume;
  bus.reverbReturn.gain.value = song.master.reverb;
  bus.delayReturn.gain.value = song.master.delay;
  bus.delay.delayTime.value = Math.min(LONGEST_ECHO_SECONDS, stepSeconds(song.bpm) * DELAY_STEPS);
};

type Reverb = Pick<MasterBus, 'reverbSend' | 'reverbReturn'>;

const reverb = (context: BaseAudioContext, returnTo: AudioNode): Reverb => {
  const convolver = context.createConvolver();
  convolver.buffer = reverbImpulse(context);
  const reverbSend = gainNode(context);
  const reverbReturn = gainNode(context, DEFAULT_MASTER.reverb);
  chain(
    reverbSend,
    filterNode(context, { type: 'highpass', frequency: REVERB_LOW_CUT_HZ }),
    convolver,
    reverbReturn,
    returnTo,
  );
  return { reverbSend, reverbReturn };
};

/** A room made of noise that dies away, a little different in each ear. */
const reverbImpulse = (context: BaseAudioContext): AudioBuffer => {
  const length = Math.floor(context.sampleRate * REVERB_SECONDS);
  const impulse = context.createBuffer(STEREO, length, context.sampleRate);
  for (let channel = 0; channel < impulse.numberOfChannels; channel++) {
    const samples = impulse.getChannelData(channel);
    for (let index = 0; index < length; index++) {
      const tail = (1 - index / length) ** REVERB_TAIL_CURVE;
      const fadeIn = index < REVERB_FADE_IN_SAMPLES ? index / REVERB_FADE_IN_SAMPLES : 1;
      samples[index] = (Math.random() * 2 - 1) * tail * fadeIn;
    }
  }
  return impulse;
};

type Echo = Pick<MasterBus, 'delaySend' | 'delayReturn' | 'delay'>;

/** A delay that feeds back through a filter, so each echo is quieter and darker. */
const echo = (context: BaseAudioContext, returnTo: AudioNode): Echo => {
  const delay = context.createDelay(MAX_DELAY_SECONDS);
  const delaySend = gainNode(context);
  const delayReturn = gainNode(context, DEFAULT_MASTER.delay);
  const tone = filterNode(context, { type: 'lowpass', frequency: DELAY_TONE_HZ });
  chain(delaySend, delay, tone, gainNode(context, DELAY_FEEDBACK), delay);
  chain(tone, delayReturn, returnTo);
  return { delaySend, delayReturn, delay };
};
