import { describe, expect, it } from '@jest/globals';

import { BAR_COUNTS, isBarCount, isWithin, stepCount, STEPS_PER_BAR } from './limits';

describe('the step grid', () => {
  it('has 16 steps per bar', () => {
    expect(STEPS_PER_BAR).toBe(16);
    expect(stepCount(1)).toBe(16);
    expect(stepCount(8)).toBe(128);
  });
});

describe('isBarCount', () => {
  it.each(BAR_COUNTS)('accepts %i bars', (bars) => {
    expect(isBarCount(bars)).toBe(true);
  });

  it.each([0, 5, 7, 16, 1.5, -1])('rejects %p bars', (bars) => {
    expect(isBarCount(bars)).toBe(false);
  });
});

describe('isWithin', () => {
  const pan = { min: -1, max: 1 };

  it('includes both ends of the range', () => {
    expect(isWithin(-1, pan)).toBe(true);
    expect(isWithin(1, pan)).toBe(true);
  });

  it('excludes values outside the range', () => {
    expect(isWithin(1.01, pan)).toBe(false);
    expect(isWithin(-1.01, pan)).toBe(false);
  });
});
