import { DEFAULT_MASTER } from '../song/defaults';
import type { Song } from '../song/types';
import { MASTER_SETTINGS, SONG_VARIABLE } from './vocabulary';
import { differsFrom, formatNumber } from './write/numbers';
import { writeShortForm } from './write/shortForm';
import { writeSongInParts } from './write/songInParts';

const MASTER_COMMENT = '// The master: volume, and how much reverb and delay come back';
const ENDING = ['', `${SONG_VARIABLE}.Play();`, ''];

/**
 * A song as C# code, written exactly as the web studio writes it. A single loop uses the short
 * form; a song with several patterns or an arrangement is written in parts.
 */
export const writeSongCode = (song: Song): string => {
  const isSongInParts = song.patterns.length > 1 || song.arrangement.length > 0;
  const body = isSongInParts ? writeSongInParts(song) : writeShortForm(song);
  return [...body, ...masterSection(song), ...ENDING].join('\n');
};

/** The master settings that differ from their defaults, if any. */
const masterSection = (song: Song): string[] => {
  const lines = MASTER_SETTINGS.filter((setting) =>
    differsFrom(song.master[setting.field], DEFAULT_MASTER[setting.field]),
  ).map(
    (setting) => `${SONG_VARIABLE}.${setting.name} = ${formatNumber(song.master[setting.field])};`,
  );
  return lines.length > 0 ? ['', MASTER_COMMENT, ...lines] : [];
};
