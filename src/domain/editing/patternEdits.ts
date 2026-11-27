import type { PatternName } from '../song/ids';
import type { Pattern, Song } from '../song/types';

/** Every pattern of the song changed in the same way, keeping the song's first pattern first. */
export const mapPatterns = (
  song: Song,
  change: (pattern: Pattern) => Pattern,
): Song['patterns'] => {
  const [first, ...rest] = song.patterns;
  return [change(first), ...rest.map(change)];
};

/**
 * The song with one pattern changed. The same song comes back when the change leaves the pattern
 * as it was, or when no pattern has that name, so callers can tell that nothing happened.
 */
export const withPattern = (
  song: Song,
  name: PatternName,
  change: (pattern: Pattern) => Pattern,
): Song => {
  const target = song.patterns.find((pattern) => pattern.name === name);
  if (target === undefined) return song;
  const changed = change(target);
  if (changed === target) return song;
  return {
    ...song,
    patterns: mapPatterns(song, (pattern) => (pattern === target ? changed : pattern)),
  };
};
