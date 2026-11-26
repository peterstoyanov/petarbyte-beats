import { describe, expect, it } from '@jest/globals';

import { isScaleName, parseKey, SCALES } from '@/domain/music/scales';

describe('SCALES', () => {
  it.each(Object.entries(SCALES))(
    'lists %s as rising semitones within one octave',
    (_name, steps) => {
      expect(steps[0]).toBe(0);
      expect([...steps].sort((a, b) => a - b)).toEqual([...steps]);
      expect(new Set(steps).size).toBe(steps.length);
      expect(Math.max(...steps)).toBeLessThan(12);
    },
  );
});

describe('isScaleName', () => {
  it('accepts known scales only', () => {
    expect(isScaleName('harmonic minor')).toBe(true);
    expect(isScaleName('lydian')).toBe(false);
    expect(isScaleName('toString')).toBe(false);
  });
});

describe('parseKey', () => {
  it.each([
    ['A minor', { root: 9, scale: 'minor' }],
    ['F# major', { root: 6, scale: 'major' }],
    ['Bb blues', { root: 10, scale: 'blues' }],
    ['Cb major', { root: 11, scale: 'major' }],
    ['B# major', { root: 0, scale: 'major' }],
    ['D dorian', { root: 2, scale: 'dorian' }],
    ['c Pentatonic Minor', { root: 0, scale: 'pentatonic minor' }],
    ['  A   minor  ', { root: 9, scale: 'minor' }],
  ])('reads %p', (text, key) => {
    expect(parseKey(text)).toEqual(key);
  });

  it.each(['', 'C', 'A lydian', 'H major', 'A  minor  scale'])('rejects %p', (text) => {
    expect(parseKey(text)).toBeUndefined();
  });
});
