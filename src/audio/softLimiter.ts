import type { BaseAudioContext, GainNode, WaveShaperNode } from 'react-native-audio-api';

import { gainNode } from './nodes';

/** The level where the web studio's limiter starts, -2.5 dBFS. */
const LIMIT_THRESHOLD = 0.75;
/**
 * A wave shaper only reads its input from -1 to 1, so the signal goes in at a quarter of its level
 * and the curve covers four times full scale (+12 dBFS).
 */
const HEADROOM = 4;
const CURVE_POINTS = 2048;

/**
 * React Native Audio API has no compressor yet, so where the web studio has a glue compressor
 * and a limiter, the app has this soft clipper: the nodes to put in a row before the speakers.
 * Everything below the threshold passes as it is, and louder peaks bend smoothly under full scale
 * instead of clipping. It shapes each sample; it does not turn the level down over time.
 */
export const softLimiter = (context: BaseAudioContext): readonly [GainNode, WaveShaperNode] => {
  const shaper = context.createWaveShaper();
  shaper.curve = Float32Array.from({ length: CURVE_POINTS }, (_, index) =>
    softLimit(((index / (CURVE_POINTS - 1)) * 2 - 1) * HEADROOM),
  );
  return [gainNode(context, 1 / HEADROOM), shaper];
};

/** One sample through the limiter. */
export const softLimit = (sample: number): number => {
  const level = Math.abs(sample);
  if (level <= LIMIT_THRESHOLD) return sample;
  const room = 1 - LIMIT_THRESHOLD;
  return Math.sign(sample) * (LIMIT_THRESHOLD + room * Math.tanh((level - LIMIT_THRESHOLD) / room));
};
