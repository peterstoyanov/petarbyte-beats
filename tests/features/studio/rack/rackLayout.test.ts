import { describe, expect, it } from '@jest/globals';

import { stepWidth } from '@/features/studio/rack/rackLayout';

describe('stepWidth', () => {
  it('shares the room beside the names between the steps', () => {
    // 800 - 140 for the names - 32 of padding leaves 628 for 16 steps: 39 each.
    expect(stepWidth(800, 16)).toBe(39);
  });

  it('keeps a step wide enough for a finger, and no wider than a square', () => {
    expect(stepWidth(390, 128)).toBe(32);
    expect(stepWidth(2000, 16)).toBe(44);
  });
});
