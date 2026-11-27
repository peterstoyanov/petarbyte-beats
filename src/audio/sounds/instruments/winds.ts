import { frequencyOf } from '@/domain/music/notes';

import { chain, filterNode, gainNode, scheduledOscillator } from '../../nodes';
import { heldEnvelope } from '../envelopes';
import { noiseBurst } from '../noise';
import type { InstrumentRecipe } from './instrumentRecipe';

/** A soft tone, the breath around it, and vibrato that comes in late. */
export const flute: InstrumentRecipe = ({
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
    peak: velocity * 0.26,
    attack: 0.07,
    decay: 0.1,
    sustain: 0.85,
    release,
  });
  const tone = scheduledOscillator(context, { type: 'sine', frequency, start: time, stop: end });
  const overtone = scheduledOscillator(context, {
    type: 'sine',
    frequency: frequency * 2,
    start: time,
    stop: end,
  });
  const overtoneLevel = gainNode(context, 0.12);
  const vibrato = scheduledOscillator(context, {
    type: 'sine',
    frequency: 5,
    start: time,
    stop: end,
  });
  const vibratoDepth = gainNode(context, 0);
  vibratoDepth.gain.setValueAtTime(0, time + 0.2);
  vibratoDepth.gain.linearRampToValueAtTime(10, time + 0.6);
  vibrato.connect(vibratoDepth);
  vibratoDepth.connect(tone.detune);
  vibratoDepth.connect(overtone.detune);
  chain(tone, level);
  chain(overtone, overtoneLevel, level);

  const breath = noiseBurst(context, { start: time, seconds: end - time });
  const breathLevel = gainNode(context, 0);
  heldEnvelope(breathLevel.gain, {
    start: time,
    seconds,
    peak: velocity * 0.05,
    attack: 0.03,
    decay: 0.1,
    sustain: 0.5,
    release,
  });
  chain(
    breath,
    filterNode(context, { type: 'bandpass', frequency: frequency * 2, q: 1.2 }),
    breathLevel,
    output,
  );
  level.connect(output);
};

/** The lips buzz: the tone opens up as it starts, and slides up into the note. */
export const brass: InstrumentRecipe = ({
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
    attack: 0.04,
    decay: 0.2,
    sustain: 0.8,
    release,
  });
  const tone = filterNode(context, { type: 'lowpass', frequency: frequency * 1.5, q: 1.4 });
  const mix = gainNode(context, 0.5);
  tone.frequency.setValueAtTime(frequency * 1.5, time);
  tone.frequency.linearRampToValueAtTime(
    Math.min(14000, frequency * (4 + velocity * 4)),
    time + 0.07,
  );
  tone.frequency.setTargetAtTime(frequency * 3.5, time + 0.07, 0.25);
  for (const detune of [-5, 5]) {
    const horn = scheduledOscillator(context, {
      type: 'sawtooth',
      frequency: frequency * 0.97,
      start: time,
      stop: end,
      detune,
    });
    horn.frequency.exponentialRampToValueAtTime(frequency, time + 0.05);
    horn.connect(mix);
  }
  chain(mix, tone, level, output);
};

/** A reedy saw and square, with a nasal peak and late vibrato. */
export const sax: InstrumentRecipe = ({
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
    peak: velocity * 0.24,
    attack: 0.03,
    decay: 0.15,
    sustain: 0.85,
    release,
  });
  const tone = filterNode(context, { type: 'lowpass', frequency: frequency * 5, q: 2 });
  const nasal = filterNode(context, { type: 'peaking', frequency: 1600, q: 2 });
  const mix = gainNode(context, 0.5);
  nasal.gain.value = 6;
  const vibrato = scheduledOscillator(context, {
    type: 'sine',
    frequency: 5.3,
    start: time,
    stop: end,
  });
  const vibratoDepth = gainNode(context, 0);
  vibratoDepth.gain.setValueAtTime(0, time + 0.25);
  vibratoDepth.gain.linearRampToValueAtTime(14, time + 0.7);
  vibrato.connect(vibratoDepth);
  const reed = scheduledOscillator(context, {
    type: 'sawtooth',
    frequency,
    start: time,
    stop: end,
  });
  const body = scheduledOscillator(context, {
    type: 'square',
    frequency,
    start: time,
    stop: end,
    detune: 4,
  });
  vibratoDepth.connect(reed.detune);
  vibratoDepth.connect(body.detune);
  reed.connect(mix);
  body.connect(mix);
  chain(mix, tone, nasal, level, output);
};

/** Voices singing "ah": buzzing tones shaped by the three formants of that vowel. */
export const choir: InstrumentRecipe = ({
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
    peak: velocity * 2,
    attack: 0.3,
    decay: 0.3,
    sustain: 0.9,
    release,
  });
  const voices = gainNode(context, 0.3);
  const vibrato = scheduledOscillator(context, {
    type: 'sine',
    frequency: 4.8,
    start: time,
    stop: end,
  });
  const vibratoDepth = gainNode(context, 11);
  vibrato.connect(vibratoDepth);
  for (const detune of [-9, 0, 9]) {
    const voice = scheduledOscillator(context, {
      type: 'sawtooth',
      frequency,
      start: time,
      stop: end,
      detune,
    });
    vibratoDepth.connect(voice.detune);
    voice.connect(voices);
  }
  for (const [formantHz, q, loudness] of [
    [800, 7, 1],
    [1150, 9, 0.5],
    [2900, 12, 0.22],
  ] as const) {
    const formant = filterNode(context, { type: 'bandpass', frequency: formantHz, q });
    const formantLevel = gainNode(context, loudness);
    chain(voices, formant, formantLevel, level);
  }
  level.connect(output);
};
