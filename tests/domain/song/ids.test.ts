import { describe, expect, it } from '@jest/globals';

import {
  type ChannelId,
  isCodeName,
  parseChannelId,
  parsePatternName,
  requireChannelId,
  requirePatternName,
} from '@/domain/song/ids';

describe('isCodeName', () => {
  it.each(['kick', 'hat2', '_fx', 'Intro', 'bass_line'])('accepts %p', (text) => {
    expect(isCodeName(text)).toBe(true);
  });

  it.each(['', '2hat', 'open hat', 'kick-2', 'бас', 'kick!'])('rejects %p', (text) => {
    expect(isCodeName(text)).toBe(false);
  });
});

describe('parseChannelId and parsePatternName', () => {
  it('keep a valid name as it is', () => {
    expect(parseChannelId('kick')).toBe('kick');
    expect(parsePatternName('intro')).toBe('intro');
  });

  it('reject an invalid name', () => {
    expect(parseChannelId('open hat')).toBeUndefined();
    expect(parsePatternName('2nd')).toBeUndefined();
  });
});

describe('requireChannelId and requirePatternName', () => {
  it('return a valid name', () => {
    expect(requireChannelId('kick')).toBe('kick');
    expect(requirePatternName('intro')).toBe('intro');
  });

  it('throw on an invalid name', () => {
    expect(() => requireChannelId('open hat')).toThrow(RangeError);
    expect(() => requirePatternName('2nd')).toThrow(RangeError);
  });
});

describe('branded names', () => {
  it('keep channel ids and pattern names apart at compile time', () => {
    const intro = requirePatternName('intro');

    // @ts-expect-error a pattern name cannot be used as a channel id
    const asChannelId: ChannelId = intro;

    expect(asChannelId).toBe('intro');
  });
});
