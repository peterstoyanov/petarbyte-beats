import { frequencyOf } from '@/domain/music/notes';

import { chain, filterNode, gainNode, scheduledOscillator } from '../../nodes';
import { heldEnvelope } from '../envelopes';
import { saturation } from '../shapers';
import type { InstrumentRecipe } from './instrumentRecipe';

const SECONDS_PER_MINUTE = 60;
/** The wobble moves on every eighth note: two to a beat. */
const WOBBLES_PER_BEAT = 2;

/** A sine that drops into the note, driven warm, with a triangle an octave up for bite. */
export const bass808: InstrumentRecipe = ({
  context,
  output,
  midi,
  time,
  seconds,
  velocity,
  release,
}) => {
  const frequency = frequencyOf(midi);
  const level = gainNode(context, 0);
  const end = heldEnvelope(level.gain, {
    start: time,
    seconds,
    peak: velocity * 0.7,
    attack: 0.005,
    decay: 0.4,
    sustain: 0.6,
    release,
  });
  const body = scheduledOscillator(context, {
    type: 'sine',
    frequency: frequency * 1.6,
    start: time,
    stop: end,
  });
  const bite = scheduledOscillator(context, {
    type: 'triangle',
    frequency: frequency * 2,
    start: time,
    stop: end,
  });
  const biteLevel = gainNode(context, 0.22);
  body.frequency.exponentialRampToValueAtTime(frequency, time + 0.035);
  const drive = saturation(context, { points: 512, drive: 2.4 });
  chain(bite, biteLevel, level);
  chain(body, level, drive, output);
};

/** A pure sine with a touch of its octave: felt more than heard. */
export const sub: InstrumentRecipe = ({
  context,
  output,
  midi,
  time,
  seconds,
  velocity,
  release,
}) => {
  const frequency = frequencyOf(midi);
  const level = gainNode(context, 0);
  const end = heldEnvelope(level.gain, {
    start: time,
    seconds,
    peak: velocity * 0.6,
    attack: 0.006,
    decay: 0.2,
    sustain: 1,
    release,
  });
  const octaveLevel = gainNode(context, 0.12);
  scheduledOscillator(context, { type: 'sine', frequency, start: time, stop: end }).connect(level);
  chain(
    scheduledOscillator(context, {
      type: 'sine',
      frequency: frequency * 2,
      start: time,
      stop: end,
    }),
    octaveLevel,
    level,
  );
  level.connect(output);
};

/** A square and a saw through a resonant filter that closes fast. */
export const synthbass: InstrumentRecipe = ({
  context,
  output,
  midi,
  time,
  seconds,
  velocity,
  release,
}) => {
  const frequency = frequencyOf(midi);
  const level = gainNode(context, 0);
  const end = heldEnvelope(level.gain, {
    start: time,
    seconds,
    peak: velocity * 0.35,
    attack: 0.003,
    decay: 0.3,
    sustain: 0.55,
    release,
  });
  const tone = filterNode(context, { type: 'lowpass', frequency: frequency * 9, q: 3 });
  const mix = gainNode(context, 0.5);
  tone.frequency.setValueAtTime(Math.min(12000, frequency * 10), time);
  tone.frequency.setTargetAtTime(frequency * 2.2, time, 0.05);
  scheduledOscillator(context, { type: 'square', frequency, start: time, stop: end }).connect(mix);
  scheduledOscillator(context, {
    type: 'sawtooth',
    frequency,
    start: time,
    stop: end,
    detune: -6,
  }).connect(mix);
  chain(mix, tone, level, output);
};

/**
 * The squelch: a saw through a resonant filter that snaps shut, harder on loud notes. The
 * channel's resonance setting turns the squelch up.
 */
export const acid: InstrumentRecipe = ({
  context,
  output,
  midi,
  time,
  seconds,
  velocity,
  release,
  resonance,
}) => {
  const frequency = frequencyOf(midi);
  const level = gainNode(context, 0);
  const end = heldEnvelope(level.gain, {
    start: time,
    seconds,
    peak: velocity * 0.32,
    attack: 0.003,
    decay: 0.2,
    sustain: 0.85,
    release,
  });
  const squelch = filterNode(context, { type: 'lowpass', frequency: 300, q: 9 + resonance * 12 });
  squelch.frequency.setValueAtTime(300 + 4200 * velocity * velocity, time);
  squelch.frequency.setTargetAtTime(220, time, 0.06 + velocity * 0.08);
  chain(
    scheduledOscillator(context, { type: 'sawtooth', frequency, start: time, stop: end }),
    squelch,
    level,
    output,
  );
};

/** Two saws detuned against each other so they beat and growl, over a clean sine. */
export const reese: InstrumentRecipe = ({
  context,
  output,
  midi,
  time,
  seconds,
  velocity,
  release,
}) => {
  const frequency = frequencyOf(midi);
  const level = gainNode(context, 0);
  const end = heldEnvelope(level.gain, {
    start: time,
    seconds,
    peak: velocity * 0.3,
    attack: 0.01,
    decay: 0.3,
    sustain: 1,
    release,
  });
  const saws = gainNode(context, 0.45);
  const subLevel = gainNode(context, 0.5);
  for (const detune of [-17, 17]) {
    scheduledOscillator(context, {
      type: 'sawtooth',
      frequency,
      start: time,
      stop: end,
      detune,
    }).connect(saws);
  }
  chain(
    scheduledOscillator(context, { type: 'sine', frequency, start: time, stop: end }),
    subLevel,
    level,
  );
  chain(saws, filterNode(context, { type: 'lowpass', frequency: 750, q: 1.2 }), level, output);
};

/** Dubstep: a filter that opens and shuts on every eighth note, locked to the tempo. */
export const wobble: InstrumentRecipe = ({
  context,
  output,
  midi,
  time,
  seconds,
  velocity,
  release,
  bpm,
}) => {
  const frequency = frequencyOf(midi);
  const level = gainNode(context, 0);
  const end = heldEnvelope(level.gain, {
    start: time,
    seconds,
    peak: velocity * 0.34,
    attack: 0.005,
    decay: 0.1,
    sustain: 0.95,
    release,
  });
  const tone = filterNode(context, { type: 'lowpass', frequency: 600, q: 7 });
  const mix = gainNode(context, 0.5);
  const wobbleHz = (bpm / SECONDS_PER_MINUTE) * WOBBLES_PER_BEAT;
  const wobbler = scheduledOscillator(context, {
    type: 'sine',
    frequency: wobbleHz,
    start: time,
    stop: end,
  });
  const wobbleDepth = gainNode(context, 1100);
  wobbler.connect(wobbleDepth);
  wobbleDepth.connect(tone.frequency);
  tone.frequency.setValueAtTime(1300, time);
  for (const detune of [-12, 12]) {
    scheduledOscillator(context, {
      type: 'sawtooth',
      frequency,
      start: time,
      stop: end,
      detune,
    }).connect(mix);
  }
  chain(mix, tone, level, output);

  const subLevel = gainNode(context, 0.5);
  chain(
    scheduledOscillator(context, { type: 'sine', frequency, start: time, stop: end }),
    subLevel,
    level,
  );
};
