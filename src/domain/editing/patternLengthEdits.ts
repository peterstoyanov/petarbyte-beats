import type { PatternName } from '../song/ids';
import { stepCount, type BarCount } from '../song/limits';
import type { DrumStep, Note, Pattern, Song } from '../song/types';
import { withPattern } from './patternEdits';

/**
 * Makes a pattern longer or shorter, as the web studio does. Drums that grow repeat what they had,
 * so a one-bar beat fills four bars; notes past the new end go, and notes that reach past it are
 * shortened to end there.
 */
export const setPatternBars = (song: Song, name: PatternName, bars: BarCount): Song =>
  withPattern(song, name, (pattern) => (pattern.bars === bars ? pattern : resized(pattern, bars)));

const resized = (pattern: Pattern, bars: BarCount): Pattern => {
  const length = stepCount(bars);
  return {
    ...pattern,
    bars,
    hits: mapValues(pattern.hits, (hits) => repeatedTo(hits, length)),
    notes: mapValues(pattern.notes, (notes) => cutTo(notes, length)),
  };
};

const repeatedTo = (hits: readonly DrumStep[], length: number): DrumStep[] =>
  Array.from({ length }, (_, step): DrumStep => hits[step % hits.length] ?? 0);

const cutTo = (notes: readonly Note[], length: number): Note[] =>
  notes
    .filter((note) => note.step < length)
    .map((note) =>
      note.step + note.length > length ? { ...note, length: length - note.step } : note,
    );

/**
 * The record with every value changed. Its keys come back as plain strings, which still fit the
 * branded channel ids they were, since an index signature accepts any string key.
 */
const mapValues = <Value, Result>(
  record: Readonly<Record<string, Value>>,
  map: (value: Value) => Result,
): Record<string, Result> =>
  Object.fromEntries(Object.entries(record).map(([key, value]) => [key, map(value)]));
