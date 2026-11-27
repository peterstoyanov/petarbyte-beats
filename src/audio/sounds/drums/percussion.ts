import {
  chain,
  filterNode,
  gainNode,
  percussiveEnvelope,
  scheduledOscillator,
  SILENCE,
} from '../../nodes';
import { noiseBurst } from '../noise';
import type { DrumHitSpec, DrumRecipe } from './drumRecipe';

/** Noise that swells in and dies away, like beads shaken in a tube. */
export const shaker: DrumRecipe = ({ context, output, time, velocity, pitch, decay }) => {
  const level = gainNode(context, 0);
  chain(
    noiseBurst(context, { start: time, seconds: 0.14 * decay }),
    filterNode(context, { type: 'bandpass', frequency: 6500 * pitch, q: 1.2 }),
    level,
    output,
  );
  level.gain.setValueAtTime(0, time);
  level.gain.linearRampToValueAtTime(velocity * 0.45, time + 0.025);
  level.gain.exponentialRampToValueAtTime(SILENCE, time + 0.025 + 0.08 * decay);
};

export const tomlo: DrumRecipe = (spec) => tom({ ...spec, frequency: 105 * spec.pitch });

export const tomhi: DrumRecipe = (spec) => tom({ ...spec, frequency: 175 * spec.pitch });

type TomSpec = Omit<DrumHitSpec, 'pitch' | 'hiHatChoke'> & {
  readonly frequency: number;
};

/** A drum skin: a sine that sags in pitch, and a soft thud of noise. */
const tom = ({ context, output, time, velocity, decay, frequency }: TomSpec): void => {
  const skin = scheduledOscillator(context, {
    type: 'sine',
    frequency,
    start: time,
    stop: time + 0.6,
  });
  const skinLevel = gainNode(context, 0);
  skin.frequency.exponentialRampToValueAtTime(frequency * 0.65, time + 0.3 * decay);
  percussiveEnvelope(skinLevel.gain, {
    start: time,
    peak: velocity * 0.9,
    seconds: 0.38 * decay,
    attack: 0.002,
  });
  chain(skin, skinLevel, output);

  const thud = noiseBurst(context, { start: time, seconds: 0.03 });
  const thudLevel = gainNode(context, 0);
  percussiveEnvelope(thudLevel.gain, { start: time, peak: velocity * 0.15, seconds: 0.03 });
  chain(thud, filterNode(context, { type: 'lowpass', frequency: 3000 }), thudLevel, output);
};

/** A hand drum: a short sine that drops a little as the skin settles. */
export const conga: DrumRecipe = ({ context, output, time, velocity, pitch, decay }) => {
  const skin = scheduledOscillator(context, {
    type: 'sine',
    frequency: 360 * pitch,
    start: time,
    stop: time + 0.3,
  });
  const level = gainNode(context, 0);
  skin.frequency.exponentialRampToValueAtTime(310 * pitch, time + 0.04);
  percussiveEnvelope(level.gain, { start: time, peak: velocity * 0.8, seconds: 0.18 * decay });
  chain(skin, level, output);
};

/** The 808's cowbell: two square waves through a band-pass, with a fast then slow fall. */
export const cowbell: DrumRecipe = ({ context, output, time, velocity, pitch, decay }) => {
  const sum = gainNode(context, 0.5);
  const level = gainNode(context, 0);
  for (const frequency of [540, 800]) {
    scheduledOscillator(context, {
      type: 'square',
      frequency: frequency * pitch,
      start: time,
      stop: time + 0.5,
    }).connect(sum);
  }
  chain(
    sum,
    filterNode(context, { type: 'bandpass', frequency: 800 * pitch, q: 2.2 }),
    level,
    output,
  );

  level.gain.setValueAtTime(0, time);
  level.gain.linearRampToValueAtTime(velocity * 0.6, time + 0.002);
  level.gain.exponentialRampToValueAtTime(velocity * 0.18, time + 0.03);
  level.gain.exponentialRampToValueAtTime(SILENCE, time + 0.35 * decay);
};

/** A sine that dives from high to low: the sci-fi laser. */
export const zap: DrumRecipe = ({ context, output, time, velocity, pitch, decay }) => {
  const beam = scheduledOscillator(context, {
    type: 'sine',
    frequency: 1400 * pitch,
    start: time,
    stop: time + 0.3,
  });
  const level = gainNode(context, 0);
  beam.frequency.exponentialRampToValueAtTime(70 * pitch, time + 0.14 * decay);
  percussiveEnvelope(level.gain, { start: time, peak: velocity * 0.45, seconds: 0.16 * decay });
  chain(beam, level, output);
};

/** Two hardwood sticks: one short, high sine. */
export const claves: DrumRecipe = ({ context, output, time, velocity, pitch, decay }) => {
  const click = scheduledOscillator(context, {
    type: 'sine',
    frequency: 2500 * pitch,
    start: time,
    stop: time + 0.1,
  });
  const level = gainNode(context, 0);
  percussiveEnvelope(level.gain, {
    start: time,
    peak: velocity * 0.55,
    seconds: 0.05 * decay,
    attack: 0.001,
  });
  chain(click, level, output);
};

/** A small, high hand drum with a slap of noise. */
export const bongo: DrumRecipe = ({ context, output, time, velocity, pitch, decay }) => {
  const skin = scheduledOscillator(context, {
    type: 'sine',
    frequency: 440 * pitch,
    start: time,
    stop: time + 0.25,
  });
  const skinLevel = gainNode(context, 0);
  skin.frequency.exponentialRampToValueAtTime(385 * pitch, time + 0.03);
  percussiveEnvelope(skinLevel.gain, {
    start: time,
    peak: velocity * 0.75,
    seconds: 0.12 * decay,
  });
  chain(skin, skinLevel, output);

  const slap = noiseBurst(context, { start: time, seconds: 0.02 });
  const slapLevel = gainNode(context, 0);
  percussiveEnvelope(slapLevel.gain, { start: time, peak: velocity * 0.2, seconds: 0.015 });
  chain(slap, filterNode(context, { type: 'bandpass', frequency: 2200, q: 2 }), slapLevel, output);
};

/** A hollow block of wood: a triangle wave through a narrow filter. */
export const block: DrumRecipe = ({ context, output, time, velocity, pitch, decay }) => {
  const knock = scheduledOscillator(context, {
    type: 'triangle',
    frequency: 950 * pitch,
    start: time,
    stop: time + 0.12,
  });
  const level = gainNode(context, 0);
  percussiveEnvelope(level.gain, {
    start: time,
    peak: velocity * 0.6,
    seconds: 0.06 * decay,
    attack: 0.001,
  });
  chain(
    knock,
    filterNode(context, { type: 'bandpass', frequency: 950 * pitch, q: 4 }),
    level,
    output,
  );
};

/** White noise that rises over two beats: the build-up before a drop. */
export const sweep: DrumRecipe = ({ context, output, time, velocity, pitch, decay }) => {
  const length = 1.6 * decay;
  const noise = noiseBurst(context, { start: time, seconds: length + 0.05 });
  const band = filterNode(context, { type: 'bandpass', frequency: 400, q: 2.5 });
  const level = gainNode(context, 0);
  band.frequency.setValueAtTime(350 * pitch, time);
  band.frequency.exponentialRampToValueAtTime(9000 * pitch, time + length);
  level.gain.setValueAtTime(0, time);
  level.gain.linearRampToValueAtTime(velocity * 0.45, time + length * 0.95);
  level.gain.linearRampToValueAtTime(0, time + length + 0.04);
  chain(noise, band, level, output);
};
