import { describe, expect, it } from '@jest/globals';

import {
  DRUMS,
  INSTRUMENTS,
  isDrumId,
  isInstrumentId,
  SOUND_GROUPS,
  soundGroup,
  soundLabel,
} from '@/domain/sounds/catalog';

const drumIds = Object.keys(DRUMS);
const instrumentEntries = Object.entries(INSTRUMENTS);

describe('sound catalog', () => {
  it('never uses one id for both a drum and an instrument', () => {
    expect(drumIds.filter(isInstrumentId)).toEqual([]);
  });

  it('gives every sound its own label', () => {
    const labels = [...Object.values(DRUMS), ...Object.values(INSTRUMENTS)].map(
      (sound) => sound.label,
    );
    expect(new Set(labels).size).toBe(labels.length);
  });

  it.each(instrumentEntries)('keeps %s within a valid MIDI range', (_id, instrument) => {
    expect(instrument.lowest).toBeGreaterThanOrEqual(0);
    expect(instrument.highest).toBeLessThanOrEqual(127);
    expect(instrument.lowest).toBeLessThan(instrument.highest);
  });

  it.each(instrumentEntries)('gives %s a positive release time', (_id, instrument) => {
    expect(instrument.releaseSeconds).toBeGreaterThan(0);
  });

  it('has at least one instrument in every instrument group', () => {
    const used = new Set(instrumentEntries.map(([, instrument]) => instrument.group));
    expect(SOUND_GROUPS.filter((group) => group !== 'Drums' && !used.has(group))).toEqual([]);
  });
});

describe('isDrumId and isInstrumentId', () => {
  it('tell drums and instruments apart', () => {
    expect(isDrumId('kick808')).toBe(true);
    expect(isInstrumentId('kick808')).toBe(false);
    expect(isInstrumentId('piano')).toBe(true);
    expect(isDrumId('piano')).toBe(false);
  });

  it('reject unknown ids, including built-in object keys', () => {
    expect(isDrumId('toString')).toBe(false);
    expect(isInstrumentId('constructor')).toBe(false);
  });
});

describe('soundLabel and soundGroup', () => {
  it('describe a drum', () => {
    expect(soundLabel('kick808')).toBe('808 Kick');
    expect(soundGroup('kick808')).toBe('Drums');
  });

  it('describe an instrument', () => {
    expect(soundLabel('piano')).toBe('Grand Piano');
    expect(soundGroup('piano')).toBe('Keys');
  });
});
