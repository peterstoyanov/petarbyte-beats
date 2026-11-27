import type { AudioBuffer, BaseAudioContext } from 'react-native-audio-api';

import { frequencyOf, type MidiNote } from '@/domain/music/notes';

import { chain, filterNode, gainNode, percussiveEnvelope, scheduledOscillator } from '../../nodes';
import { saturation } from '../shapers';
import type { InstrumentRecipe, NoteSpec } from './instrumentRecipe';

/** How a plucked string sounds. */
type StringTone = {
  /** How bright the pluck is, from 0 to 1: how much of the noise's highs the string starts with. */
  readonly brightness: number;
  /** How long a low string takes to fall by 60 dB; higher strings fall faster. */
  readonly ringSeconds: number;
  readonly level: number;
};

/** The pitch the ring time is measured at; other notes scale from it. */
const RING_REFERENCE_HZ = 110;
const RING_PITCH_POWER = 0.4;
/** A string's sound is worked out for at most this long. */
const LONGEST_RING_SECONDS = 5;
const RING_MARGIN_SECONDS = 0.3;
/** -60 dB, the level a string has fallen to after its ring time. */
const SIXTY_DB_DOWN = 0.001;
const SHORTEST_KEY_SECONDS = 0.05;
const SHORTEST_DAMPING = 0.01;
const STOP_MARGIN_SECONDS = 0.05;
const STOP_SAFETY_SECONDS = 0.01;

/** The string sounds, worked out once per note and tone and kept for each context. */
const stringsByContext = new WeakMap<BaseAudioContext, Map<string, AudioBuffer>>();

type StringSpec = NoteSpec & { readonly tone: StringTone };

/**
 * A plucked string, by Karplus-Strong: a burst of noise goes round a delay line one period long and
 * is softened on every trip, which is how a real string loses its bright overtones first.
 */
const pluckedString = ({
  context,
  output,
  midi,
  time,
  seconds,
  velocity,
  release,
  tone,
}: StringSpec): void => {
  const sound = stringSound(context, midi, tone);
  const source = context.createBufferSource();
  const level = gainNode(context, 0);
  const keyUp = time + Math.max(seconds, SHORTEST_KEY_SECONDS);
  source.buffer = sound;
  level.gain.setValueAtTime(velocity * tone.level, time);
  level.gain.setTargetAtTime(0, keyUp, Math.max(SHORTEST_DAMPING, release / 3));
  chain(source, level, output);
  source.start(time);
  source.stop(
    Math.min(time + sound.duration, keyUp + release * 2 + STOP_MARGIN_SECONDS) +
      STOP_SAFETY_SECONDS,
  );
};

const stringSound = (context: BaseAudioContext, midi: MidiNote, tone: StringTone): AudioBuffer => {
  const sounds = stringsByContext.get(context) ?? new Map<string, AudioBuffer>();
  if (!stringsByContext.has(context)) stringsByContext.set(context, sounds);

  const key = `${tone.brightness}:${tone.ringSeconds}:${midi}`;
  const cached = sounds.get(key);
  if (cached !== undefined) return cached;

  const sound = synthesizeString(context, frequencyOf(midi), tone);
  sounds.set(key, sound);
  return sound;
};

const synthesizeString = (
  context: BaseAudioContext,
  frequency: number,
  { brightness, ringSeconds }: StringTone,
): AudioBuffer => {
  const sampleRate = context.sampleRate;
  const period = Math.max(2, Math.round(sampleRate / frequency - 0.5));
  const ring = ringSeconds * (RING_REFERENCE_HZ / frequency) ** RING_PITCH_POWER;
  const length = Math.floor(
    sampleRate * Math.min(LONGEST_RING_SECONDS, ring + RING_MARGIN_SECONDS),
  );
  const sound = context.createBuffer(1, length, sampleRate);
  const samples = sound.getChannelData(0);

  const delayLine = pluckNoise(period, brightness);
  const loss = SIXTY_DB_DOWN ** (1 / (frequency * ring));
  let position = 0;
  let peak = 0;
  for (let index = 0; index < length; index++) {
    const next = position + 1 === period ? 0 : position + 1;
    const sample = delayLine[position] ?? 0;
    samples[index] = sample;
    // Averaging two neighbours is a gentle low-pass: each trip round the string dulls it a little.
    delayLine[position] = (sample + (delayLine[next] ?? 0)) * 0.5 * loss;
    position = next;
    peak = Math.max(peak, Math.abs(sample));
  }
  if (peak > 0)
    for (let index = 0; index < length; index++) samples[index] = (samples[index] ?? 0) / peak;
  return sound;
};

/** One period of noise, low-passed by the brightness and centred on zero so the string has no offset. */
const pluckNoise = (period: number, brightness: number): Float32Array => {
  const noise = new Float32Array(period);
  let smoothed = 0;
  let sum = 0;
  for (let index = 0; index < period; index++) {
    smoothed += (Math.random() * 2 - 1 - smoothed) * brightness;
    noise[index] = smoothed;
    sum += smoothed;
  }
  const mean = sum / period;
  for (let index = 0; index < period; index++) noise[index] = (noise[index] ?? 0) - mean;
  return noise;
};

export const guitar: InstrumentRecipe = (spec) =>
  pluckedString({ ...spec, tone: { brightness: 0.45, ringSeconds: 2.6, level: 0.55 } });

/** The same string, through an overdriven amp. */
export const eguitar: InstrumentRecipe = (spec) => {
  const { context, output } = spec;
  const amp = saturation(context, { points: 1024, drive: 3, level: 0.3, oversample: '2x' });
  const preamp = gainNode(context, 3.2);
  pluckedString({
    ...spec,
    output: preamp,
    tone: { brightness: 0.8, ringSeconds: 3.4, level: 0.5 },
  });
  chain(
    preamp,
    amp,
    filterNode(context, { type: 'lowpass', frequency: 3600, q: 0.9 }),
    filterNode(context, { type: 'peaking', frequency: 900, q: 1 }),
    output,
  );
};

/** Every harp note rings at least a second and a half. */
export const harp: InstrumentRecipe = (spec) =>
  pluckedString({
    ...spec,
    seconds: Math.max(spec.seconds, 1.5),
    tone: { brightness: 0.3, ringSeconds: 3.6, level: 0.5 },
  });

/** A plucked double bass: a dark string and a thump. */
export const upright: InstrumentRecipe = (spec) => {
  const { context, output, midi, time, velocity } = spec;
  pluckedString({
    ...spec,
    velocity: velocity * 1.1,
    tone: { brightness: 0.18, ringSeconds: 1.6, level: 0.7 },
  });
  const thump = scheduledOscillator(context, {
    type: 'sine',
    frequency: frequencyOf(midi),
    start: time,
    stop: time + 0.3,
  });
  const thumpLevel = gainNode(context, 0);
  percussiveEnvelope(thumpLevel.gain, { start: time, peak: velocity * 0.25, seconds: 0.18 });
  chain(thump, thumpLevel, output);
};
