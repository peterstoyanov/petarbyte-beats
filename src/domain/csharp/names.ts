import { SONG_VARIABLE } from './vocabulary';

type NamedThings = {
  readonly channelIds: Iterable<string>;
  readonly patternNames: Iterable<string>;
};

/**
 * The names already used in a song's code. Channels, patterns and the song itself are all C#
 * variables, so they share one set of names: no two can be called the same.
 */
export const takenNames = ({ channelIds, patternNames }: NamedThings): ReadonlySet<string> =>
  new Set([SONG_VARIABLE, ...channelIds, ...patternNames]);
