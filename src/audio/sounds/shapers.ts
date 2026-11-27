import type { BaseAudioContext, WaveShaperNode } from 'react-native-audio-api';

type SaturationSpec = {
  /** How many points the curve has, at least 2. */
  readonly points: number;
  /** How hard the signal is pushed into the curve: higher is dirtier. */
  readonly drive: number;
  /** The loudest the curve lets out. */
  readonly level?: number;
};

/** A wave shaper that saturates like an overdriven amp, along a tanh curve. */
export const saturation = (
  context: BaseAudioContext,
  { points, drive, level = 1 }: SaturationSpec,
): WaveShaperNode => {
  const shaper = context.createWaveShaper();
  const middle = (points - 1) / 2;
  shaper.curve = Float32Array.from(
    { length: points },
    (_, index) => Math.tanh((index / middle - 1) * drive) * level,
  );
  return shaper;
};
