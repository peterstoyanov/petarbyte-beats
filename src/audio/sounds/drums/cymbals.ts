import { chain, filterNode, gainNode, percussiveEnvelope, scheduledOscillator } from '../../nodes';
import { metal } from '../metal';
import { noiseBurst } from '../noise';
import type { DrumRecipe } from './drumRecipe';

/** The 808's six square waves, filtered high and cut short. A closed hat chokes an open one. */
export const hat808: DrumRecipe = ({
  context,
  output,
  time,
  velocity,
  pitch,
  decay,
  hiHatChoke,
}) => {
  const level = gainNode(context, 0);
  const length = 0.05 * decay;
  chain(
    metal(context, { start: time, stop: time + length + 0.05, baseHz: 40 * pitch }),
    filterNode(context, { type: 'bandpass', frequency: 10000, q: 1 }),
    filterNode(context, { type: 'highpass', frequency: 7000 }),
    level,
    output,
  );
  percussiveEnvelope(level.gain, { start: time, peak: velocity * 0.5, seconds: length });
  hiHatChoke.choke(time);
};

export const openhat808: DrumRecipe = ({
  context,
  output,
  time,
  velocity,
  pitch,
  decay,
  hiHatChoke,
}) => {
  const level = gainNode(context, 0);
  const length = 0.42 * decay;
  chain(
    metal(context, { start: time, stop: time + length + 0.05, baseHz: 40 * pitch }),
    filterNode(context, { type: 'bandpass', frequency: 10000, q: 1 }),
    filterNode(context, { type: 'highpass', frequency: 7000 }),
    level,
    output,
  );
  percussiveEnvelope(level.gain, { start: time, peak: velocity * 0.45, seconds: length });
  hiHatChoke.choke(time);
  hiHatChoke.ring(level);
};

/** The 909's hats are noise, not metal: a thin, crisp hiss. */
export const hat909: DrumRecipe = ({
  context,
  output,
  time,
  velocity,
  pitch,
  decay,
  hiHatChoke,
}) => {
  const level = gainNode(context, 0);
  const length = 0.055 * decay;
  chain(
    noiseBurst(context, { start: time, seconds: length }),
    filterNode(context, { type: 'highpass', frequency: 8000 * pitch }),
    filterNode(context, { type: 'peaking', frequency: 11000, q: 1.5 }),
    level,
    output,
  );
  percussiveEnvelope(level.gain, { start: time, peak: velocity * 0.55, seconds: length });
  hiHatChoke.choke(time);
};

export const openhat909: DrumRecipe = ({
  context,
  output,
  time,
  velocity,
  pitch,
  decay,
  hiHatChoke,
}) => {
  const level = gainNode(context, 0);
  const length = 0.45 * decay;
  chain(
    noiseBurst(context, { start: time, seconds: length }),
    filterNode(context, { type: 'highpass', frequency: 7000 * pitch }),
    filterNode(context, { type: 'peaking', frequency: 10000, q: 1.2 }),
    level,
    output,
  );
  percussiveEnvelope(level.gain, { start: time, peak: velocity * 0.45, seconds: length });
  hiHatChoke.choke(time);
  hiHatChoke.ring(level);
};

/** Metal at wider ratios mixed with noise, ringing long. */
export const crash: DrumRecipe = ({ context, output, time, velocity, pitch, decay }) => {
  const length = 1.7 * decay;
  const level = gainNode(context, 0);
  const mix = gainNode(context, 1);
  metal(context, {
    start: time,
    stop: time + length + 0.1,
    baseHz: 62 * pitch,
    ratios: [2, 3.1, 4.2, 5.6, 7.3, 9.1],
  }).connect(mix);
  const wash = noiseBurst(context, { start: time, seconds: length });
  const washLevel = gainNode(context, 0.5);
  chain(wash, washLevel, mix);
  chain(mix, filterNode(context, { type: 'highpass', frequency: 4500 }), level, output);
  percussiveEnvelope(level.gain, {
    start: time,
    peak: velocity * 0.5,
    seconds: length,
    attack: 0.003,
  });
};

/** Metal through a narrow filter for the ping of the stick, with a faint bell on top. */
export const ride: DrumRecipe = ({ context, output, time, velocity, pitch, decay }) => {
  const length = 1.1 * decay;
  const level = gainNode(context, 0);
  chain(
    metal(context, {
      start: time,
      stop: time + length + 0.1,
      baseHz: 75 * pitch,
      ratios: [2, 2.7, 4.2, 5.4, 6.9, 8.4],
    }),
    filterNode(context, { type: 'bandpass', frequency: 8500, q: 3 }),
    level,
    output,
  );
  percussiveEnvelope(level.gain, { start: time, peak: velocity * 0.55, seconds: length });

  const bell = scheduledOscillator(context, {
    type: 'sine',
    frequency: 3800 * pitch,
    start: time,
    stop: time + 0.4,
  });
  const bellLevel = gainNode(context, 0);
  percussiveEnvelope(bellLevel.gain, { start: time, peak: velocity * 0.08, seconds: 0.3 });
  chain(bell, bellLevel, output);
};

/** Small cymbals that jingle, and the noise of them shaking. */
export const tamb: DrumRecipe = ({ context, output, time, velocity, pitch, decay }) => {
  const level = gainNode(context, 0);
  const length = 0.22 * decay;
  chain(
    metal(context, {
      start: time,
      stop: time + length + 0.05,
      baseHz: 310 * pitch,
      ratios: [2, 2.9, 3.7, 4.8, 6.1, 7.3],
    }),
    filterNode(context, { type: 'highpass', frequency: 6500 }),
    level,
    output,
  );
  percussiveEnvelope(level.gain, {
    start: time,
    peak: velocity * 0.5,
    seconds: length,
    attack: 0.004,
  });

  const shake = noiseBurst(context, { start: time, seconds: 0.15 * decay });
  const shakeLevel = gainNode(context, 0);
  percussiveEnvelope(shakeLevel.gain, {
    start: time,
    peak: velocity * 0.3,
    seconds: 0.12 * decay,
    attack: 0.003,
  });
  chain(
    shake,
    filterNode(context, { type: 'bandpass', frequency: 9500 * pitch, q: 1.5 }),
    shakeLevel,
    output,
  );
};

/** Three sine partials that ring long, the higher ones dying sooner. */
export const triangle: DrumRecipe = ({ context, output, time, velocity, pitch, decay }) => {
  const length = 1.4 * decay;
  for (const [ratio, loudness] of [
    [1, 0.22],
    [2.76, 0.12],
    [5.4, 0.07],
  ] as const) {
    const partial = scheduledOscillator(context, {
      type: 'sine',
      frequency: 4100 * pitch * ratio,
      start: time,
      stop: time + length + 0.1,
    });
    const partialLevel = gainNode(context, 0);
    percussiveEnvelope(partialLevel.gain, {
      start: time,
      peak: velocity * loudness,
      seconds: length / ratio ** 0.3,
      attack: 0.002,
    });
    chain(partial, partialLevel, output);
  }
};
