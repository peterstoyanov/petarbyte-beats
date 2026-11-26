import { describe, expect, it } from '@jest/globals';

import { fitDrumSteps, formatDrumSteps } from './drumSteps';
import type { DrumStep } from './types';

describe('formatDrumSteps', () => {
  it('writes hits, loud hits and rests', () => {
    expect(formatDrumSteps([1, 0, 2, 0])).toBe('x.X.');
  });

  it('puts a bar line between every 16 steps', () => {
    const twoBars: DrumStep[] = Array.from({ length: 32 }, (_, index) => (index % 4 === 0 ? 1 : 0));
    expect(formatDrumSteps(twoBars)).toBe('x...x...x...x...|x...x...x...x...');
  });

  it('writes an empty pattern as an empty string', () => {
    expect(formatDrumSteps([])).toBe('');
  });
});

describe('fitDrumSteps', () => {
  it('reads x, X and . into steps', () => {
    expect(fitDrumSteps('x.X.', 4)).toEqual([1, 0, 2, 0]);
  });

  it('ignores bar lines and spaces', () => {
    expect(fitDrumSteps(' x . | X . ', 4)).toEqual([1, 0, 2, 0]);
  });

  it('repeats a shorter pattern that fits evenly', () => {
    expect(fitDrumSteps('x.', 6)).toEqual([1, 0, 1, 0, 1, 0]);
  });

  it('fills an uneven gap with rests', () => {
    expect(fitDrumSteps('xxx', 5)).toEqual([1, 1, 1, 0, 0]);
  });

  it('drops steps past the count', () => {
    expect(fitDrumSteps('x.x.x.', 4)).toEqual([1, 0, 1, 0]);
  });

  it('treats any other character as a rest', () => {
    expect(fitDrumSteps('ab-X', 4)).toEqual([0, 0, 0, 2]);
  });

  it('reads back what it writes', () => {
    const steps: DrumStep[] = [2, 0, 1, 0, 0, 1, 0, 0, 2, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1];
    expect(fitDrumSteps(formatDrumSteps(steps), steps.length)).toEqual(steps);
  });
});
