import { frequencyOf } from '@/domain/music/notes';

import { chain, filterNode, gainNode, percussiveEnvelope, scheduledOscillator } from '../../nodes';
import { noiseBurst } from '../noise';
import type { InstrumentRecipe, NoteSpec } from './instrumentRecipe';

/** [ratio to the note, loudness, how long it rings in seconds] */
type MalletPartial = readonly [ratio: number, loudness: number, ringSeconds: number];

/** Partials above this are out of hearing, so they are not made at all. */
const HIGHEST_PARTIAL_HZ = 18000;
const SHORTEST_KEY_SECONDS = 0.05;
const SHORTEST_DAMPING = 0.02;
/** Partials ring this many times their ring time before they stop. */
const RINGS_TO_STOP = 3;
const STOP_MARGIN_SECONDS = 0.1;
/** Low notes ring longer and high notes shorter, in proportion to this power of the pitch. */
const RING_PITCH_POWER = 0.25;
const RING_REFERENCE_HZ = 440;
const MALLET_CLICK_SECONDS = 0.02;
const MALLET_CLICK_LEVEL = 0.12;
const MALLET_CLICK_HIGHEST_HZ = 9000;

type MalletSpec = NoteSpec & {
  readonly partials: readonly MalletPartial[];
  /** How long the mallet's tap of noise lasts; 0 for none. */
  readonly click: number;
};

/** A struck bar or tine: sine partials that each die away, and a little noise for the mallet. */
const mallet = ({
  context,
  output,
  midi,
  time,
  seconds,
  velocity,
  release,
  partials,
  click,
}: MalletSpec): void => {
  const frequency = frequencyOf(midi);
  const hold = gainNode(context, 1);
  const keyUp = time + Math.max(seconds, SHORTEST_KEY_SECONDS);
  hold.gain.setValueAtTime(1, time);
  hold.gain.setTargetAtTime(0, keyUp, Math.max(SHORTEST_DAMPING, release / 3));

  const longestRing = Math.max(...partials.map(([, , ringSeconds]) => ringSeconds));
  const stop = Math.min(
    time + longestRing * RINGS_TO_STOP + STOP_MARGIN_SECONDS,
    keyUp + release * 2 + STOP_MARGIN_SECONDS,
  );
  for (const [ratio, loudness, ringSeconds] of partials) {
    if (frequency * ratio > HIGHEST_PARTIAL_HZ) continue;
    const partial = scheduledOscillator(context, {
      type: 'sine',
      frequency: frequency * ratio,
      start: time,
      stop,
    });
    const partialLevel = gainNode(context, 0);
    percussiveEnvelope(partialLevel.gain, {
      start: time,
      peak: velocity * loudness,
      seconds: ringSeconds * (RING_REFERENCE_HZ / frequency) ** RING_PITCH_POWER,
      attack: 0.002,
    });
    chain(partial, partialLevel, hold);
  }

  if (click > 0) {
    const tap = noiseBurst(context, { start: time, seconds: MALLET_CLICK_SECONDS });
    const tapLevel = gainNode(context, 0);
    percussiveEnvelope(tapLevel.gain, {
      start: time,
      peak: velocity * MALLET_CLICK_LEVEL,
      seconds: click,
    });
    chain(
      tap,
      filterNode(context, {
        type: 'bandpass',
        frequency: Math.min(MALLET_CLICK_HIGHEST_HZ, frequency * 4),
        q: 1.5,
      }),
      tapLevel,
      hold,
    );
  }
  hold.connect(output);
};

/** A wooden bar: a round tone, a partial four times higher that dies fast, and the mallet. */
export const marimba: InstrumentRecipe = (spec) =>
  mallet({
    ...spec,
    partials: [
      [1, 0.5, 0.7],
      [3.93, 0.14, 0.12],
      [9.2, 0.04, 0.05],
    ],
    click: 0.012,
  });

/** Metal bars with a motor that makes the tone shimmer. */
export const vibes: InstrumentRecipe = (spec) => {
  const { context, output, time } = spec;
  const shimmer = gainNode(context, 1);
  const motor = scheduledOscillator(context, {
    type: 'sine',
    frequency: 5.2,
    start: time,
    stop: time + 6,
  });
  const depth = gainNode(context, 0.28);
  motor.connect(depth);
  depth.connect(shimmer.gain);
  mallet({
    ...spec,
    output: shimmer,
    partials: [
      [1, 0.36, 2.6],
      [4, 0.1, 0.5],
      [10, 0.03, 0.12],
    ],
    click: 0.006,
  });
  shimmer.connect(output);
};

/** Tiny metal tines, plucked by a turning drum: every note rings at least a second. */
export const musicbox: InstrumentRecipe = (spec) =>
  mallet({
    ...spec,
    seconds: Math.max(spec.seconds, 1),
    partials: [
      [1, 0.3, 1.4],
      [3, 0.1, 0.5],
      [5.98, 0.06, 0.2],
      [8.9, 0.03, 0.08],
    ],
    click: 0.002,
  });

/** A steel pan: bright, nearly harmonic partials that ring together. */
export const steel: InstrumentRecipe = (spec) =>
  mallet({
    ...spec,
    partials: [
      [1, 0.34, 0.9],
      [2, 0.2, 0.6],
      [3.01, 0.08, 0.35],
      [4.97, 0.03, 0.2],
    ],
    click: 0.004,
  });

/** A thumb piano: metal tines over a wooden box. */
export const kalimba: InstrumentRecipe = (spec) =>
  mallet({
    ...spec,
    seconds: Math.max(spec.seconds, 0.8),
    partials: [
      [1, 0.36, 0.8],
      [5.4, 0.07, 0.06],
      [8.7, 0.03, 0.03],
    ],
    click: 0.001,
  });
