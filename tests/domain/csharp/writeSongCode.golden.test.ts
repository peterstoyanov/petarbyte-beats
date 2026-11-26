import { describe, expect, it } from '@jest/globals';

import { parseSongCode } from '@/domain/csharp/parseSongCode';
import { writeSongCode } from '@/domain/csharp/writeSongCode';
import { PRESETS } from '@/presets/catalog';

describe('the web studio songs', () => {
  it.each(PRESETS.map((preset) => [preset.id, preset.code]))(
    '%s is read and written back exactly',
    (_id, code) => {
      const result = parseSongCode(code);
      if (result.status !== 'parsed') throw new Error(result.problem.message);

      expect(writeSongCode(result.song)).toBe(code);
    },
  );
});
