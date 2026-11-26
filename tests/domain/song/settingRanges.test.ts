import { describe, expect, it } from '@jest/globals';

import { SETTING_RANGES } from '@/domain/song/settingRanges';

describe('SETTING_RANGES', () => {
  it.each(Object.entries(SETTING_RANGES))('has a valid range for %s', (_name, range) => {
    expect(range.min).toBeLessThan(range.max);
  });
});
