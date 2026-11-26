import { describe, expect, it } from '@jest/globals';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

import { findPreset, PRESET_GROUPS, PRESETS, presetsIn } from '@/presets/catalog';

const SONGS_FOLDER = join(__dirname, '..', '..', 'src', 'presets', 'songs');

describe('PRESETS', () => {
  it('lists every song file once, and no song without a file', () => {
    const files = readdirSync(SONGS_FOLDER).filter((file) => file.endsWith('.cs'));
    const listed = PRESETS.map((preset) => `${preset.id}.cs`);

    expect([...listed].sort()).toEqual([...files].sort());
    expect(new Set(listed).size).toBe(listed.length);
  });

  it('holds the code of each song as text', () => {
    for (const preset of PRESETS) {
      expect(preset.code.startsWith('// PetarByte Beats')).toBe(true);
    }
  });
});

describe('presetsIn', () => {
  it('keeps the order of the web studio menu', () => {
    expect(presetsIn('songs').map((preset) => preset.title)).toEqual([
      'Neon Rooftop',
      'Golden Hour',
      'Late Night Study',
      'Gray Streets',
      'Afro Sun',
      'Highway 86',
      'Warehouse',
      'Acid Rain',
      'Pixel Quest',
      'Old School',
      'Slow Motion',
    ]);
  });

  it('has 11 songs, 10 classical pieces and 6 loops', () => {
    const counts = PRESET_GROUPS.map((group) => presetsIn(group.id).length);
    expect(counts).toEqual([11, 10, 6]);
  });
});

describe('findPreset', () => {
  it('finds a preset by its id', () => {
    expect(findPreset('fur-elise')?.title).toBe('Für Elise');
  });

  it('gives undefined for an id that is not built in', () => {
    expect(findPreset('no-such-song')).toBeUndefined();
  });
});
