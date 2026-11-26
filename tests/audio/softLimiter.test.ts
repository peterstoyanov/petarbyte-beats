import { describe, expect, it } from '@jest/globals';

import { softLimit } from '@/audio/softLimiter';

describe('softLimit', () => {
  it('passes quiet samples as they are', () => {
    expect(softLimit(0.5)).toBe(0.5);
    expect(softLimit(-0.75)).toBe(-0.75);
  });

  it('keeps loud peaks under full scale, on both sides', () => {
    for (const peak of [0.9, 1, 2, 4]) {
      expect(softLimit(peak)).toBeLessThan(1);
      expect(softLimit(-peak)).toBeGreaterThan(-1);
    }
  });

  it('bends peaks without flattening them, so louder stays louder', () => {
    expect(softLimit(1)).toBeGreaterThan(softLimit(0.9));
    expect(softLimit(2)).toBeGreaterThan(softLimit(1));
  });
});
