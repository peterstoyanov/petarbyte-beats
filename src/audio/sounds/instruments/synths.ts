import type { AudioNode, BaseAudioContext, OscillatorType } from 'react-native-audio-api';

import { frequencyOf } from '@/domain/music/notes';

import { chain, filterNode, gainNode, scheduledOscillator } from '../../nodes';
import { heldEnvelope } from '../envelopes';
import type { InstrumentRecipe } from './instrumentRecipe';

type VoicesSpec = {
  readonly context: BaseAudioContext;
  readonly output: AudioNode;
  readonly type: OscillatorType;
  readonly frequency: number;
  readonly start: number;
  readonly stop: number;
  /** One voice per detune, in cents. */
  readonly detunes: readonly number[];
};

/** Several oscillators on the same note, each a little out of tune, for a thick sound. */
const detunedVoices = ({
  context,
  output,
  type,
  frequency,
  start,
  stop,
  detunes,
}: VoicesSpec): void => {
  for (const detune of detunes) {
    scheduledOscillator(context, { type, frequency, start, stop, detune }).connect(output);
  }
};

/** A saw and a square through a filter that closes fast, like a plucked synth string. */
export const pluck: InstrumentRecipe = ({
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
    peak: velocity * 0.42,
    attack: 0.002,
    decay: 0.45,
    sustain: 0,
    release,
  });
  const tone = filterNode(context, { type: 'lowpass', frequency: frequency * 14, q: 2.5 });
  const mix = gainNode(context, 0.5);
  tone.frequency.setValueAtTime(Math.min(16000, frequency * 14), time);
  tone.frequency.setTargetAtTime(frequency * 1.4, time, 0.07);
  scheduledOscillator(context, { type: 'sawtooth', frequency, start: time, stop: end }).connect(
    mix,
  );
  scheduledOscillator(context, {
    type: 'square',
    frequency,
    start: time,
    stop: end,
    detune: 7,
  }).connect(mix);
  chain(mix, tone, level, output);
};

/** A game console square wave, with vibrato that comes in late. */
export const chip: InstrumentRecipe = ({
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
    peak: velocity * 0.22,
    attack: 0.002,
    decay: 0.05,
    sustain: 0.85,
    release,
  });
  const square = scheduledOscillator(context, {
    type: 'square',
    frequency,
    start: time,
    stop: end,
  });
  const vibrato = scheduledOscillator(context, {
    type: 'sine',
    frequency: 5.5,
    start: time,
    stop: end,
  });
  const vibratoDepth = gainNode(context, 0);
  vibratoDepth.gain.setValueAtTime(0, time);
  vibratoDepth.gain.setValueAtTime(0, time + 0.18);
  vibratoDepth.gain.linearRampToValueAtTime(18, time + 0.35);
  chain(vibrato, vibratoDepth);
  vibratoDepth.connect(square.detune);
  chain(square, level, output);
};

/** Seven detuned saws, the trance and EDM lead. */
export const supersaw: InstrumentRecipe = ({
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
    peak: velocity * 0.42,
    attack: 0.012,
    decay: 0.35,
    sustain: 0.7,
    release,
  });
  const voices = gainNode(context, 0.13);
  detunedVoices({
    context,
    output: voices,
    type: 'sawtooth',
    frequency,
    start: time,
    stop: end,
    detunes: [-26, -15, -6, 0, 6, 15, 26],
  });
  voices.connect(level);
  chain(level, filterNode(context, { type: 'lowpass', frequency: 9000, q: 0.5 }), output);
};

/** Four slow, detuned saws through a filter that breathes. */
export const pad: InstrumentRecipe = ({
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
    attack: 0.45,
    decay: 1,
    sustain: 0.9,
    release,
  });
  const voices = gainNode(context, 0.25);
  const tone = filterNode(context, { type: 'lowpass', frequency: 1500, q: 0.8 });
  const breath = scheduledOscillator(context, {
    type: 'sine',
    frequency: 0.3,
    start: time,
    stop: end,
  });
  const breathDepth = gainNode(context, 600);
  chain(breath, breathDepth);
  breathDepth.connect(tone.frequency);
  detunedVoices({
    context,
    output: voices,
    type: 'sawtooth',
    frequency,
    start: time,
    stop: end,
    detunes: [-11, -4, 4, 11],
  });
  chain(voices, tone, level, output);
};

/** A string section: three saws that swell in, with vibrato that grows. */
export const strings: InstrumentRecipe = ({
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
    peak: velocity * 0.32,
    attack: 0.22,
    decay: 0.5,
    sustain: 0.9,
    release,
  });
  const section = gainNode(context, 0.3);
  const vibrato = scheduledOscillator(context, {
    type: 'sine',
    frequency: 5,
    start: time,
    stop: end,
  });
  const vibratoDepth = gainNode(context, 0);
  vibratoDepth.gain.setValueAtTime(0, time);
  vibratoDepth.gain.linearRampToValueAtTime(9, time + 0.5);
  chain(vibrato, vibratoDepth);
  for (const detune of [-9, 0, 9]) {
    const player = scheduledOscillator(context, {
      type: 'sawtooth',
      frequency,
      start: time,
      stop: end,
      detune,
    });
    vibratoDepth.connect(player.detune);
    player.connect(section);
  }
  chain(section, filterNode(context, { type: 'lowpass', frequency: 3200, q: 0.6 }), level, output);
};

/** Two detuned saws and a square an octave down, with late vibrato: a classic synth lead. */
export const sawlead: InstrumentRecipe = ({
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
    peak: velocity * 0.28,
    attack: 0.004,
    decay: 0.25,
    sustain: 0.75,
    release,
  });
  const tone = filterNode(context, { type: 'lowpass', frequency: frequency * 8, q: 3 });
  const mix = gainNode(context, 0.4);
  tone.frequency.setValueAtTime(Math.min(15000, frequency * 12), time);
  tone.frequency.setTargetAtTime(frequency * 5, time, 0.12);

  const vibrato = scheduledOscillator(context, {
    type: 'sine',
    frequency: 5.6,
    start: time,
    stop: end,
  });
  const vibratoDepth = gainNode(context, 0);
  vibratoDepth.gain.setValueAtTime(0, time + 0.25);
  vibratoDepth.gain.linearRampToValueAtTime(16, time + 0.5);
  vibrato.connect(vibratoDepth);
  for (const detune of [-8, 8]) {
    const saw = scheduledOscillator(context, {
      type: 'sawtooth',
      frequency,
      start: time,
      stop: end,
      detune,
    });
    vibratoDepth.connect(saw.detune);
    saw.connect(mix);
  }
  const sub = scheduledOscillator(context, {
    type: 'square',
    frequency: frequency / 2,
    start: time,
    stop: end,
  });
  const subLevel = gainNode(context, 0.3);
  vibratoDepth.connect(sub.detune);
  chain(sub, subLevel, mix);
  chain(mix, tone, level, output);
};
