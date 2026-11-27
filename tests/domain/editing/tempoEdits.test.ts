import { describe, expect, it } from '@jest/globals';

import { setSwing, setTempo } from '@/domain/editing/tempoEdits';

import { songFrom } from './songFrom';

const SONG = songFrom('var song = new Song(bpm: 120, swing: 20);');

describe('setTempo', () => {
  it.each([
    [97.4, 97],
    [10, 40],
    [999, 240],
  ])('sets %p BPM as %p', (bpm, expected) => {
    expect(setTempo(SONG, bpm).bpm).toBe(expected);
  });

  it('gives back the same song when the tempo stays, or is not a number', () => {
    expect(setTempo(SONG, 120.2)).toBe(SONG);
    expect(setTempo(SONG, Number.NaN)).toBe(SONG);
  });

  it('leaves the song it was given as it was', () => {
    const before = structuredClone(SONG);
    setTempo(SONG, 90);
    expect(SONG).toEqual(before);
  });
});

describe('setSwing', () => {
  it.each([
    [33, 35],
    [-5, 0],
    [90, 75],
  ])('sets %p%% swing as %p%%', (swing, expected) => {
    expect(setSwing(SONG, swing).swing).toBe(expected);
  });

  it('gives back the same song when the swing stays, or is not a number', () => {
    expect(setSwing(SONG, 21)).toBe(SONG);
    expect(setSwing(SONG, Number.NaN)).toBe(SONG);
  });

  it('leaves the song it was given as it was', () => {
    const before = structuredClone(SONG);
    setSwing(SONG, 50);
    expect(SONG).toEqual(before);
  });
});
