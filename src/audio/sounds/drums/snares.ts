import {
  chain,
  filterNode,
  gainNode,
  percussiveEnvelope,
  scheduledOscillator,
  SILENCE,
} from '../../nodes';
import { noiseBurst } from '../noise';
import type { DrumRecipe } from './drumRecipe';

/** Filtered noise for the wires, with two falling tones for the drum's body. */
export const snare808: DrumRecipe = ({ context, output, time, velocity, pitch, decay }) => {
  const wires = noiseBurst(context, { start: time, seconds: 0.25 * decay });
  const wiresLevel = gainNode(context, 0);
  percussiveEnvelope(wiresLevel.gain, { start: time, peak: velocity * 0.55, seconds: 0.2 * decay });
  chain(wires, filterNode(context, { type: 'highpass', frequency: 1800 }), wiresLevel, output);

  for (const [frequency, loudness] of [
    [180, 0.5],
    [330, 0.3],
  ] as const) {
    const tone = scheduledOscillator(context, {
      type: 'triangle',
      frequency: frequency * pitch,
      start: time,
      stop: time + 0.2,
    });
    const toneLevel = gainNode(context, 0);
    tone.frequency.exponentialRampToValueAtTime(frequency * pitch * 0.82, time + 0.1);
    percussiveEnvelope(toneLevel.gain, {
      start: time,
      peak: velocity * loudness,
      seconds: 0.12 * decay,
    });
    chain(tone, toneLevel, output);
  }
};

/** Brighter noise with a ringing peak, over one short tone. */
export const snare909: DrumRecipe = ({ context, output, time, velocity, pitch, decay }) => {
  const wires = noiseBurst(context, { start: time, seconds: 0.3 * decay });
  const wiresLevel = gainNode(context, 0);
  percussiveEnvelope(wiresLevel.gain, { start: time, peak: velocity * 0.8, seconds: 0.24 * decay });
  chain(
    wires,
    filterNode(context, { type: 'highpass', frequency: 1200 }),
    filterNode(context, { type: 'peaking', frequency: 6000, q: 1 }),
    wiresLevel,
    output,
  );

  const tone = scheduledOscillator(context, {
    type: 'triangle',
    frequency: 210 * pitch,
    start: time,
    stop: time + 0.15,
  });
  const toneLevel = gainNode(context, 0);
  tone.frequency.exponentialRampToValueAtTime(160 * pitch, time + 0.06);
  percussiveEnvelope(toneLevel.gain, { start: time, peak: velocity * 0.55, seconds: 0.08 * decay });
  chain(tone, toneLevel, output);
};

/** Three quick bursts of noise, as hands that never clap at exactly the same time, then a tail. */
export const clap: DrumRecipe = ({ context, output, time, velocity, pitch, decay }) => {
  const noise = noiseBurst(context, { start: time, seconds: 0.4 * decay });
  const level = gainNode(context, 0);
  chain(
    noise,
    filterNode(context, { type: 'bandpass', frequency: 1150 * pitch, q: 0.9 }),
    level,
    output,
  );

  level.gain.setValueAtTime(0, time);
  for (const offset of [0, 0.011, 0.022]) {
    level.gain.setValueAtTime(velocity * 1.1, time + offset);
    level.gain.exponentialRampToValueAtTime(0.05, time + offset + 0.009);
  }
  level.gain.setValueAtTime(velocity * 0.9, time + 0.033);
  level.gain.exponentialRampToValueAtTime(SILENCE, time + 0.033 + 0.22 * decay);
};

/** A tight burst of noise and a high blip. */
export const snap: DrumRecipe = ({ context, output, time, velocity, pitch, decay }) => {
  const noise = noiseBurst(context, { start: time, seconds: 0.08 });
  const noiseLevel = gainNode(context, 0);
  percussiveEnvelope(noiseLevel.gain, { start: time, peak: velocity * 1.2, seconds: 0.06 * decay });
  chain(
    noise,
    filterNode(context, { type: 'bandpass', frequency: 2600 * pitch, q: 3 }),
    noiseLevel,
    output,
  );

  const blip = scheduledOscillator(context, {
    type: 'sine',
    frequency: 1900 * pitch,
    start: time,
    stop: time + 0.05,
  });
  const blipLevel = gainNode(context, 0);
  percussiveEnvelope(blipLevel.gain, { start: time, peak: velocity * 0.2, seconds: 0.03 });
  chain(blip, blipLevel, output);
};

/** The stick hitting the rim: two short, bright tones through a narrow filter. */
export const rim: DrumRecipe = ({ context, output, time, velocity, pitch, decay }) => {
  const high = scheduledOscillator(context, {
    type: 'triangle',
    frequency: 1700 * pitch,
    start: time,
    stop: time + 0.06,
  });
  const low = scheduledOscillator(context, {
    type: 'square',
    frequency: 460 * pitch,
    start: time,
    stop: time + 0.06,
  });
  const level = gainNode(context, 0);
  percussiveEnvelope(level.gain, { start: time, peak: velocity * 0.5, seconds: 0.035 * decay });
  low.connect(level);
  chain(
    high,
    level,
    filterNode(context, { type: 'bandpass', frequency: 1700 * pitch, q: 2.5 }),
    output,
  );
};
