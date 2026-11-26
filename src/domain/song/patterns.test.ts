import { describe, expect, it } from '@jest/globals';

import { createDrumChannel, createInstrumentChannel } from './channels';
import { createPattern, emptyHits } from './patterns';

describe('emptyHits', () => {
  it('is all rests, one per step', () => {
    expect(emptyHits(2)).toEqual(Array.from({ length: 32 }, () => 0));
  });
});

describe('createPattern', () => {
  it('has empty hits for every drum and no notes for every instrument', () => {
    const channels = [createDrumChannel('kick', 'kick808'), createInstrumentChannel('bass', 'sub')];

    expect(createPattern('intro', 1, channels)).toEqual({
      name: 'intro',
      bars: 1,
      hits: { kick: emptyHits(1) },
      notes: { bass: [] },
    });
  });
});
