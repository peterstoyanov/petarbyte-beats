import { describe, expect, it } from '@jest/globals';

import { findPreset, type Preset } from '@/presets/catalog';
import { openPreset } from '@/presets/openPreset';

describe('openPreset', () => {
  it('reads a built-in song from its code', () => {
    const preset = findPreset('neon-rooftop');
    if (preset === undefined) throw new Error('Neon Rooftop is missing.');

    const song = openPreset(preset);

    expect(song.bpm).toBe(140);
    expect(song.key).toBe('C minor');
    expect(song.arrangement.length).toBeGreaterThan(0);
  });

  it('names the song and the line when built-in code has a mistake', () => {
    const broken: Preset = {
      id: 'broken',
      title: 'Broken',
      note: 'A song with a typo',
      group: 'loops',
      code: 'var song = new Song();\nsong.Tempo = 3;',
    };

    expect(() => openPreset(broken)).toThrow('The built-in song "broken" fails on line 2');
  });
});
