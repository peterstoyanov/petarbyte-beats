import type { BaseAudioContext, OverSampleType, WaveShaperNode } from 'react-native-audio-api';

type SaturationSpec = {
  /** How many points the curve has, at least 2. */
  readonly points: number;
  /** How hard the signal is pushed into the curve: higher is dirtier. */
  readonly drive: number;
  /** The loudest the curve lets out. */
  readonly level?: number;
  /** Oversampling keeps hard drive from adding harsh aliasing. */
  readonly oversample?: OverSampleType;
};

/** A wave shaper that saturates like an overdriven amp, along a tanh curve. */
export const saturation = (
  context: BaseAudioContext,
  { points, drive, level = 1, oversample }: SaturationSpec,
): WaveShaperNode => {
  const shaper = context.createWaveShaper();
  const middle = (points - 1) / 2;
  shaper.curve = Float32Array.from(
    { length: points },
    (_, index) => Math.tanh((index / middle - 1) * drive) * level,
  );
  if (oversample !== undefined) shaper.oversample = oversample;
  return shaper;
};
