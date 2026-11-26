import { describe, expect, it } from '@jest/globals';

import { createDrumChannel, createInstrumentChannel } from '@/domain/song/channels';
import { requireChannelId, requirePatternName } from '@/domain/song/ids';
import { createPattern, emptyHits } from '@/domain/song/patterns';

describe('emptyHits', () => {
  it('is all rests, one per step', () => {
    expect(emptyHits(2)).toEqual(Array.from({ length: 32 }, () => 0));
  });
});

describe('createPattern', () => {
  it('has empty hits for every drum and no notes for every instrument', () => {
    const channels = [
      createDrumChannel(requireChannelId('kick'), 'kick808'),
      createInstrumentChannel(requireChannelId('bass'), 'sub'),
    ];

    expect(createPattern({ name: requirePatternName('intro'), bars: 1, channels })).toEqual({
      name: 'intro',
      bars: 1,
      hits: { kick: emptyHits(1) },
      notes: { bass: [] },
    });
  });
});
