import { chain, filterNode, gainNode, percussiveEnvelope, scheduledOscillator } from '../../nodes';
import { noiseBurst } from '../noise';
import { saturation } from '../shapers';
import type { DrumRecipe } from './drumRecipe';

/** A long sine that drops in pitch, with a tick of noise on top for the beater. */
export const kick808: DrumRecipe = ({ context, output, time, velocity, pitch, decay }) => {
  const length = 0.7 * decay;
  const body = scheduledOscillator(context, {
    type: 'sine',
    frequency: 160 * pitch,
    start: time,
    stop: time + length + 0.1,
  });
  const level = gainNode(context, 0);
  body.frequency.exponentialRampToValueAtTime(52 * pitch, time + 0.07);
  body.frequency.exponentialRampToValueAtTime(44 * pitch, time + length);
  percussiveEnvelope(level.gain, {
    start: time,
    peak: velocity * 1.15,
    seconds: length,
    attack: 0.002,
  });
  chain(body, level, output);

  const click = noiseBurst(context, { start: time, seconds: 0.012 });
  const clickLevel = gainNode(context, 0);
  percussiveEnvelope(clickLevel.gain, { start: time, peak: velocity * 0.3, seconds: 0.012 });
  chain(click, filterNode(context, { type: 'highpass', frequency: 3000 }), clickLevel, output);
};

/** Shorter and punchier than the 808, slightly overdriven. */
export const kick909: DrumRecipe = ({ context, output, time, velocity, pitch, decay }) => {
  const length = 0.38 * decay;
  const body = scheduledOscillator(context, {
    type: 'sine',
    frequency: 240 * pitch,
    start: time,
    stop: time + length + 0.1,
  });
  const level = gainNode(context, 0);
  const drive = saturation(context, { points: 256, drive: 1.8 });
  body.frequency.exponentialRampToValueAtTime(58 * pitch, time + 0.045);
  body.frequency.exponentialRampToValueAtTime(50 * pitch, time + length);
  percussiveEnvelope(level.gain, { start: time, peak: velocity * 1.05, seconds: length });
  chain(body, drive, level, output);

  const click = noiseBurst(context, { start: time, seconds: 0.02 });
  const clickLevel = gainNode(context, 0);
  percussiveEnvelope(clickLevel.gain, { start: time, peak: velocity * 0.45, seconds: 0.02 });
  chain(
    click,
    filterNode(context, { type: 'bandpass', frequency: 3500, q: 0.8 }),
    clickLevel,
    output,
  );
};

/** A soft, dull thump, as if sampled from an old record. */
export const kicklofi: DrumRecipe = ({ context, output, time, velocity, pitch, decay }) => {
  const length = 0.3 * decay;
  const body = scheduledOscillator(context, {
    type: 'sine',
    frequency: 130 * pitch,
    start: time,
    stop: time + length + 0.1,
  });
  const level = gainNode(context, 0);
  body.frequency.exponentialRampToValueAtTime(50 * pitch, time + 0.08);
  percussiveEnvelope(level.gain, {
    start: time,
    peak: velocity * 1.2,
    seconds: length,
    attack: 0.004,
  });
  chain(body, level, filterNode(context, { type: 'lowpass', frequency: 700 }), output);
};

/** A kick driven into distortion: the hardstyle and techno thump. */
export const kickhard: DrumRecipe = ({ context, output, time, velocity, pitch, decay }) => {
  const length = 0.42 * decay;
  const body = scheduledOscillator(context, {
    type: 'sine',
    frequency: 220 * pitch,
    start: time,
    stop: time + length + 0.1,
  });
  const level = gainNode(context, 0);
  const drive = saturation(context, { points: 512, drive: 6, level: 0.8 });
  body.frequency.exponentialRampToValueAtTime(55 * pitch, time + 0.05);
  body.frequency.exponentialRampToValueAtTime(42 * pitch, time + length);
  percussiveEnvelope(level.gain, { start: time, peak: velocity * 1.1, seconds: length });
  chain(body, level, drive, filterNode(context, { type: 'lowpass', frequency: 5000 }), output);

  const click = noiseBurst(context, { start: time, seconds: 0.015 });
  const clickLevel = gainNode(context, 0);
  percussiveEnvelope(clickLevel.gain, { start: time, peak: velocity * 0.5, seconds: 0.015 });
  chain(click, filterNode(context, { type: 'highpass', frequency: 2500 }), clickLevel, output);
};
