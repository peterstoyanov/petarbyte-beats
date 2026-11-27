import { SONG_LIMITS, type Range } from '../song/limits';
import type { Song } from '../song/types';

/** The swing knob moves in steps of 5%, as in the web studio. */
const SWING_STEP = 5;

/** Sets the tempo, rounded to a whole BPM and kept within the song's limits. */
export const setTempo = (song: Song, bpm: number): Song => {
  // An empty or unreadable field gives NaN, which no clamp would catch.
  if (Number.isNaN(bpm)) return song;
  const tempo = clamp(Math.round(bpm), SONG_LIMITS.bpm);
  return tempo === song.bpm ? song : { ...song, bpm: tempo };
};

/** Sets the swing, rounded to the nearest 5% and kept within the song's limits. */
export const setSwing = (song: Song, swing: number): Song => {
  if (Number.isNaN(swing)) return song;
  const rounded = clamp(Math.round(swing / SWING_STEP) * SWING_STEP, SONG_LIMITS.swing);
  return rounded === song.swing ? song : { ...song, swing: rounded };
};

const clamp = (value: number, { min, max }: Range): number => Math.min(max, Math.max(min, value));
