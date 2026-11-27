import { describe, expect, it } from '@jest/globals';

import { setPatternBars } from '@/domain/editing/patternLengthEdits';
import { formatDrumSteps } from '@/domain/song/drumSteps';
import { requireChannelId, requirePatternName } from '@/domain/song/ids';

import { songFrom } from './songFrom';

const kick = requireChannelId('kick');
const keys = requireChannelId('keys');
const main = requirePatternName('main');
const SONG = songFrom(
  'var song = new Song(bars: 2);',
  'var kick = song.Drum(Drums.Kick808, "x...x...x...x...|x.x.............");',
  'var keys = song.Instrument(Instruments.GrandPiano);',
  'keys.Play(0, 4, "C4");',
  'keys.Play(12, 8, "E4");',
  'keys.Play(24, 4, "G4");',
);

describe('setPatternBars', () => {
  it('repeats the drums to fill a longer pattern', () => {
    const [pattern] = setPatternBars(SONG, main, 4).patterns;
    expect(pattern.bars).toBe(4);
    expect(formatDrumSteps(pattern.hits[kick] ?? [])).toBe(
      'x...x...x...x...|x.x.............|x...x...x...x...|x.x.............',
    );
  });

  it('keeps the first bars of the drums in a shorter pattern', () => {
    const [pattern] = setPatternBars(SONG, main, 1).patterns;
    expect(formatDrumSteps(pattern.hits[kick] ?? [])).toBe('x...x...x...x...');
  });

  it('drops notes past the end and shortens notes that reach past it', () => {
    const [pattern] = setPatternBars(SONG, main, 1).patterns;
    expect(pattern.notes[keys]?.map(({ step, length }) => [step, length])).toEqual([
      [0, 4],
      [12, 4],
    ]);
  });

  it('gives back the same song when the length stays, or the pattern does not exist', () => {
    expect(setPatternBars(SONG, main, 2)).toBe(SONG);
    expect(setPatternBars(SONG, requirePatternName('verse'), 4)).toBe(SONG);
  });

  it('leaves the song it was given as it was', () => {
    const before = structuredClone(SONG);
    setPatternBars(SONG, main, 1);
    expect(SONG).toEqual(before);
  });
});
