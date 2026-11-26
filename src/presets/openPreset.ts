import { parseSongCode } from '@/domain/csharp/parseSongCode';
import type { Song } from '@/domain/song/types';

import type { Preset } from './catalog';

/**
 * The preset's song. Every built-in song is tested to read without a mistake, so a failure here is
 * a bug in the app, not something the person can fix in the code.
 */
export const openPreset = (preset: Preset): Song => {
  const result = parseSongCode(preset.code);
  if (result.status === 'failed') {
    const { line, message } = result.problem;
    throw new Error(`The built-in song "${preset.id}" fails on line ${line}: ${message}`);
  }
  return result.song;
};
