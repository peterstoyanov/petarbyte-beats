import { describe, expect, it } from '@jest/globals';

import { differsFrom, formatNumber } from '@/domain/csharp/write/numbers';

describe('formatNumber', () => {
  it.each([
    [120, '120'],
    [-2, '-2'],
    [0.5, '0.5'],
    [0.35, '0.35'],
    [1 / 3, '0.33'],
    [0.005, '0.01'],
    [0.125, '0.13'],
    [-0.125, '-0.12'],
    [0.123, '0.12'],
  ])('writes %p as %s', (value, text) => {
    expect(formatNumber(value)).toBe(text);
  });
});

describe('differsFrom', () => {
  it('ignores the tiny errors of floating point', () => {
    expect(differsFrom(0.1 + 0.2, 0.3)).toBe(false);
  });

  it('notices a real difference', () => {
    expect(differsFrom(0.79, 0.8)).toBe(true);
  });
});
