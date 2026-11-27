import { describe, expect, it } from '@jest/globals';
import { AudioContext } from 'react-native-audio-api';

import { saturation } from '@/audio/sounds/shapers';

describe('saturation', () => {
  it('runs a tanh curve from the bottom to the top of the input', () => {
    const curve = saturation(new AudioContext(), { points: 512, drive: 6, level: 0.8 }).curve;
    expect(curve).toHaveLength(512);
    expect(curve?.[0]).toBeCloseTo(-Math.tanh(6) * 0.8);
    expect(curve?.[511]).toBeCloseTo(Math.tanh(6) * 0.8);
  });

  it('is symmetric, so it adds no offset to the sound', () => {
    const curve = saturation(new AudioContext(), { points: 256, drive: 1.8 }).curve;
    expect((curve?.[0] ?? 0) + (curve?.[255] ?? 0)).toBeCloseTo(0);
  });
});
