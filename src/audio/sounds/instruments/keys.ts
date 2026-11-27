import { frequencyOf } from '@/domain/music/notes';

import { chain, filterNode, gainNode, scheduledOscillator } from '../../nodes';
import { heldEnvelope } from '../envelopes';
import type { InstrumentRecipe } from './instrumentRecipe';

/** Two-operator FM, the Rhodes sound: a sine bent by another sine, and a bright tine on the attack. */
export const epiano: InstrumentRecipe = ({
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
    peak: velocity * 0.45,
    attack: 0.003,
    decay: 1.6,
    sustain: 0.35,
    release,
  });
  const carrier = scheduledOscillator(context, { type: 'sine', frequency, start: time, stop: end });
  const modulator = scheduledOscillator(context, {
    type: 'sine',
    frequency,
    start: time,
    stop: end,
  });
  const modulation = gainNode(context, 0);
  modulation.gain.setValueAtTime(frequency * 2.4 * velocity, time);
  modulation.gain.setTargetAtTime(frequency * 0.35, time, 0.35);
  chain(modulator, modulation);
  modulation.connect(carrier.frequency);

  const tine = scheduledOscillator(context, {
    type: 'sine',
    frequency: frequency * 14,
    start: time,
    stop: time + 0.2,
  });
  const tineDepth = gainNode(context, 0);
  tineDepth.gain.setValueAtTime(frequency * 1.2 * velocity, time);
  tineDepth.gain.exponentialRampToValueAtTime(1, time + 0.12);
  chain(tine, tineDepth);
  tineDepth.connect(carrier.frequency);

  chain(carrier, level, output);
};

/** Drawbars: six sine harmonics, all wobbling together with a gentle vibrato. */
export const organ: InstrumentRecipe = ({
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
    attack: 0.006,
    decay: 0.1,
    sustain: 1,
    release,
  });
  const vibrato = scheduledOscillator(context, {
    type: 'sine',
    frequency: 6.2,
    start: time,
    stop: end,
  });
  const vibratoDepth = gainNode(context, 7);
  vibrato.connect(vibratoDepth);
  for (const [harmonic, loudness] of [
    [1, 0.6],
    [2, 0.45],
    [3, 0.3],
    [4, 0.22],
    [6, 0.12],
    [8, 0.1],
  ] as const) {
    const drawbar = scheduledOscillator(context, {
      type: 'sine',
      frequency: frequency * harmonic,
      start: time,
      stop: end,
    });
    const drawbarLevel = gainNode(context, loudness);
    vibratoDepth.connect(drawbar.detune);
    chain(drawbar, drawbarLevel, level);
  }
  level.connect(output);
};

/**
 * FM at an odd ratio, which rings like struck metal and dies away slowly, however long the key is
 * held. It stops once it has died away: the web studio stops it after 2.6 s, which cuts off a bell
 * with a long release while it can still be heard.
 */
export const bell: InstrumentRecipe = ({ context, output, midi, time, velocity, release }) => {
  const frequency = frequencyOf(midi);
  const level = gainNode(context, 0);
  const ring = 0.5 + release * 0.4;
  // Five time constants down is under 1% of the peak.
  const end = time + 0.002 + ring * 5;
  const carrier = scheduledOscillator(context, { type: 'sine', frequency, start: time, stop: end });
  const modulator = scheduledOscillator(context, {
    type: 'sine',
    frequency: frequency * 3.5,
    start: time,
    stop: end,
  });
  const modulation = gainNode(context, 0);
  modulation.gain.setValueAtTime(frequency * 3 * velocity, time);
  modulation.gain.setTargetAtTime(frequency * 0.2, time, 0.5);
  chain(modulator, modulation);
  modulation.connect(carrier.frequency);

  level.gain.setValueAtTime(0, time);
  level.gain.linearRampToValueAtTime(velocity * 0.35, time + 0.002);
  level.gain.setTargetAtTime(0, time + 0.002, ring);
  chain(carrier, level, output);
};

/** A funky struck string: a thin pulse through a filter that snaps shut. */
export const clav: InstrumentRecipe = ({
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
    peak: velocity * 1.2,
    attack: 0.001,
    decay: 0.3,
    sustain: 0.25,
    release,
  });
  const band = filterNode(context, { type: 'bandpass', frequency: frequency * 6, q: 2.5 });
  const lowCut = filterNode(context, { type: 'highpass', frequency: 200 });
  const mix = gainNode(context, 0.5);
  band.frequency.setValueAtTime(Math.min(12000, frequency * 10), time);
  band.frequency.setTargetAtTime(frequency * 3, time, 0.08);

  // A saw minus the same saw a little later is a narrow pulse.
  const invert = gainNode(context, -1);
  const lag = context.createDelay(0.05);
  lag.delayTime.value = 0.2 / frequency;
  scheduledOscillator(context, { type: 'sawtooth', frequency, start: time, stop: end }).connect(
    mix,
  );
  chain(
    scheduledOscillator(context, { type: 'sawtooth', frequency, start: time, stop: end }),
    lag,
    invert,
    mix,
  );
  chain(mix, lowCut, band, level, output);
};
