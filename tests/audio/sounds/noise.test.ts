import { describe, expect, it } from '@jest/globals';
import { AudioContext } from 'react-native-audio-api';

import { noiseBurst } from '@/audio/sounds/noise';

describe('noiseBurst', () => {
  it('shares one noise buffer between the bursts of a context', () => {
    const context = new AudioContext();
    const first = noiseBurst(context, { start: 0, seconds: 0.1 });
    const second = noiseBurst(context, { start: 1, seconds: 0.1 });
    expect(first.buffer).not.toBeNull();
    expect(second.buffer).toBe(first.buffer);
  });

  it('makes two seconds of noise', () => {
    const context = new AudioContext();
    expect(noiseBurst(context, { start: 0, seconds: 0.1 }).buffer?.duration).toBe(2);
  });
});
