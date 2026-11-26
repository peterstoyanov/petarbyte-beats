import { describe, expect, it } from '@jest/globals';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { parseSongCode } from '@/domain/csharp/parseSongCode';
import { writeSongCode } from '@/domain/csharp/writeSongCode';

const SONGS_FOLDER = join(__dirname, '..', '..', '..', 'src', 'presets', 'songs');

const songFiles = readdirSync(SONGS_FOLDER).filter((file) => file.endsWith('.cs'));

describe('the web studio songs', () => {
  it('are all here', () => {
    expect(songFiles).toHaveLength(27);
  });

  it.each(songFiles)('%s is read and written back exactly', (file) => {
    const code = readFileSync(join(SONGS_FOLDER, file), 'utf8');

    const result = parseSongCode(code);
    if (result.status !== 'parsed') throw new Error(result.problem.message);

    expect(writeSongCode(result.song)).toBe(code);
  });
});
