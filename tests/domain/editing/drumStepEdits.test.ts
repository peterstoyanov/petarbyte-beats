import { describe, expect, it } from '@jest/globals';

import { nextDrumStep, setDrumStep } from '@/domain/editing/drumStepEdits';
import { requireChannelId, requirePatternName } from '@/domain/song/ids';

import { songFrom } from './songFrom';

const kick = requireChannelId('kick');
const main = requirePatternName('main');
const SONG = songFrom(
  'var song = new Song();',
  'var kick = song.Drum(Drums.Kick808, "x...............");',
);

describe('nextDrumStep', () => {
  it('turns a rest into a hit, or a loud hit when asked', () => {
    expect(nextDrumStep(0, { isLoud: false })).toBe(1);
    expect(nextDrumStep(0, { isLoud: true })).toBe(2);
  });

  it('turns any hit off', () => {
    expect(nextDrumStep(1, { isLoud: false })).toBe(0);
    expect(nextDrumStep(2, { isLoud: true })).toBe(0);
  });
});

describe('setDrumStep', () => {
  it('sets one step and leaves the others', () => {
    const song = setDrumStep(SONG, { pattern: main, channelId: kick, step: 2, value: 2 });
    expect(song.patterns[0].hits[kick]?.slice(0, 4)).toEqual([1, 0, 2, 0]);
  });

  it('leaves the song it was given as it was', () => {
    setDrumStep(SONG, { pattern: main, channelId: kick, step: 2, value: 2 });
    expect(SONG.patterns[0].hits[kick]?.[2]).toBe(0);
  });

  it('gives back the same song when nothing changes', () => {
    expect(setDrumStep(SONG, { pattern: main, channelId: kick, step: 0, value: 1 })).toBe(SONG);
    for (const step of [99, -1, 1.5, Number.NaN]) {
      expect(setDrumStep(SONG, { pattern: main, channelId: kick, step, value: 1 })).toBe(SONG);
    }
    const missing = requirePatternName('verse');
    expect(setDrumStep(SONG, { pattern: missing, channelId: kick, step: 2, value: 1 })).toBe(SONG);
    const other = requireChannelId('snare');
    expect(setDrumStep(SONG, { pattern: main, channelId: other, step: 0, value: 1 })).toBe(SONG);
  });
});

describe('setDrumStep in a song in parts', () => {
  it('changes only the pattern it names', () => {
    const song = songFrom(
      'var song = new Song();',
      'var kick = song.Drum(Drums.Kick808);',
      'var intro = song.Pattern(bars: 1);',
      'var drop = song.Pattern(bars: 1);',
    );
    const [intro, drop] = setDrumStep(song, {
      pattern: requirePatternName('drop'),
      channelId: kick,
      step: 0,
      value: 1,
    }).patterns;
    expect(intro).toBe(song.patterns[0]);
    expect(drop?.hits[kick]?.[0]).toBe(1);
  });
});
