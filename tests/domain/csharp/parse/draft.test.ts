import { describe, expect, it } from '@jest/globals';

import {
  createDraft,
  createDraftPattern,
  isNameTaken,
  mainPatternOf,
  toSong,
} from '@/domain/csharp/parse/draft';
import { createDrumChannel, createInstrumentChannel } from '@/domain/song/channels';
import { requireChannelId, requirePatternName } from '@/domain/song/ids';
import { emptyHits } from '@/domain/song/patterns';

const kick = createDrumChannel(requireChannelId('kick'), 'kick808');
const piano = createInstrumentChannel(requireChannelId('piano'), 'piano');

describe('mainPatternOf', () => {
  it('makes the main pattern once, with the bars of the song', () => {
    const draft = createDraft();
    draft.bars = 2;

    const main = mainPatternOf(draft);

    expect(main).toMatchObject({ name: 'main', bars: 2 });
    expect(mainPatternOf(draft)).toBe(main);
  });

  it('puts the main pattern first, even after other patterns', () => {
    const draft = createDraft();
    draft.patterns.push(createDraftPattern(requirePatternName('intro'), 1));

    mainPatternOf(draft);

    expect(draft.patterns.map((pattern) => pattern.name)).toEqual(['main', 'intro']);
  });
});

describe('isNameTaken', () => {
  it('counts the song, channels and patterns as names in the code', () => {
    const draft = createDraft();
    draft.channels.set(kick.id, { ...kick });
    draft.patterns.push(createDraftPattern(requirePatternName('intro'), 1));

    expect(isNameTaken(draft, 'song')).toBe(true);
    expect(isNameTaken(draft, 'kick')).toBe(true);
    expect(isNameTaken(draft, 'intro')).toBe(true);
    expect(isNameTaken(draft, 'snare')).toBe(false);
  });
});

describe('toSong', () => {
  it('needs at least one pattern', () => {
    expect(() => toSong(createDraft())).toThrow('A song always has at least one pattern.');
  });

  it('fills every track a pattern does not mention', () => {
    const draft = createDraft();
    draft.channels.set(kick.id, { ...kick });
    draft.channels.set(piano.id, { ...piano });
    draft.patterns.push(createDraftPattern(requirePatternName('intro'), 2));

    const [intro] = toSong(draft).patterns;

    expect(intro.hits).toEqual({ kick: emptyHits(2) });
    expect(intro.notes).toEqual({ piano: [] });
  });
});
