import type { BaseAudioContext, GainNode } from 'react-native-audio-api';

import { gainNode, scheduledOscillator } from '../nodes';

/** The 808's cymbal ratios: six square waves out of tune with each other, so they ring metallic. */
const CYMBAL_RATIOS = [2, 3, 4.16, 5.43, 6.79, 8.21] as const;
const DEFAULT_BASE_HZ = 40;
const LEVEL = 0.18;

type MetalSpec = {
  readonly start: number;
  readonly stop: number;
  readonly baseHz?: number;
  readonly ratios?: readonly number[];
};

/** The metallic core of hats and cymbals: square waves at odd ratios of a base pitch, summed. */
export const metal = (
  context: BaseAudioContext,
  { start, stop, baseHz = DEFAULT_BASE_HZ, ratios = CYMBAL_RATIOS }: MetalSpec,
): GainNode => {
  const sum = gainNode(context, LEVEL);
  for (const ratio of ratios) {
    const frequency = baseHz * ratio;
    scheduledOscillator(context, { type: 'square', frequency, start, stop }).connect(sum);
  }
  return sum;
};
