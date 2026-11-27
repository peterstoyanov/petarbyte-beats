import { parseSongCode } from '@/domain/csharp/parseSongCode';
import type { Song } from '@/domain/song/types';

/** A song written as code, so a test can state it in a few readable lines. */
export const songFrom = (...lines: string[]): Song => {
  const result = parseSongCode(lines.join('\n'));
  if (result.status !== 'parsed') throw new Error(result.problem.message);
  return result.song;
};
