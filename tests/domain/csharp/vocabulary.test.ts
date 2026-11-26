import { describe, expect, it } from '@jest/globals';

import {
  CHANNEL_SETTINGS,
  CSHARP_SOUND_NAMES,
  findChannelSetting,
  findMasterSetting,
  settingsOf,
  soundFromCSharpName,
} from '@/domain/csharp/vocabulary';

describe('CSHARP_SOUND_NAMES', () => {
  it('gives every sound its own C# name', () => {
    const names = Object.values(CSHARP_SOUND_NAMES);
    expect(new Set(names).size).toBe(names.length);
  });

  it.each(Object.values(CSHARP_SOUND_NAMES))('uses a valid C# identifier: %s', (name) => {
    expect(name).toMatch(/^[A-Z][A-Za-z0-9]*$/);
  });
});

describe('soundFromCSharpName', () => {
  it.each(Object.entries(CSHARP_SOUND_NAMES))('reads %s back from %s', (id, name) => {
    expect(soundFromCSharpName(name)).toBe(id);
  });

  it.each(['Kick', 'kick808', 'toString', ''])('knows no sound called %p', (name) => {
    expect(soundFromCSharpName(name)).toBeUndefined();
  });
});

describe('settingsOf', () => {
  const names = (kind: 'drum' | 'instrument') => settingsOf(kind).map((setting) => setting.name);

  it('gives drums Pitch and Decay but no Release', () => {
    expect(names('drum')).toEqual(expect.arrayContaining(['Pitch', 'Decay']));
    expect(names('drum')).not.toContain('Release');
  });

  it('gives instruments Release but no Pitch or Decay', () => {
    expect(names('instrument')).toContain('Release');
    expect(names('instrument')).not.toContain('Pitch');
    expect(names('instrument')).not.toContain('Decay');
  });

  it('keeps the order of CHANNEL_SETTINGS', () => {
    const order = CHANNEL_SETTINGS.map((setting) => setting.name);
    const drumNames = names('drum');
    expect([...drumNames].sort((a, b) => order.indexOf(a) - order.indexOf(b))).toEqual(drumNames);
  });
});

describe('findChannelSetting', () => {
  it('finds a setting a channel of that kind has', () => {
    expect(findChannelSetting('Pitch', 'drum')?.field).toBe('pitch');
    expect(findChannelSetting('Volume', 'instrument')?.field).toBe('volume');
  });

  it("does not find another kind's setting", () => {
    expect(findChannelSetting('Release', 'drum')).toBeUndefined();
    expect(findChannelSetting('Pitch', 'instrument')).toBeUndefined();
  });
});

describe('findMasterSetting', () => {
  it('finds Volume, Reverb and Delay only', () => {
    expect(findMasterSetting('Reverb')?.field).toBe('reverb');
    expect(findMasterSetting('Pan')).toBeUndefined();
  });
});
