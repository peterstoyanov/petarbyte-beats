import { stepCount, STEPS_PER_BEAT, type Steps } from './limits';
import type { Pattern, Song } from './types';

const SECONDS_PER_MINUTE = 60;
const PERCENT = 100;

/** Swing pairs the steps up: the first of each pair is on time, the second is played late. */
const STEPS_PER_SWING_PAIR = 2;

/** The furthest a swung step can move: half a step, at a swing of 100%. */
const MAX_SWING_DELAY_IN_STEPS = 0.5;

export const songSeconds = (song: Song, editedPatternIndex = 0): number =>
  playOrder(song, editedPatternIndex).reduce(
    (total, pattern) => total + stepCount(pattern.bars) * stepSeconds(song.bpm),
    0,
  );

/** The patterns in the order they play; there is always at least one. */
export type PlayOrder = readonly [Pattern, ...Pattern[]];

/**
 * The patterns in the order they play. A song without an arrangement loops the pattern being
 * edited, or the first pattern if that index does not exist. Names in the arrangement that match
 * no pattern are skipped.
 */
export const playOrder = (song: Song, editedPatternIndex = 0): PlayOrder => {
  const [first, ...rest] = song.arrangement.flatMap((name) => {
    const pattern = song.patterns.find((candidate) => candidate.name === name);
    return pattern ? [pattern] : [];
  });
  if (first !== undefined) return [first, ...rest];
  return [song.patterns[editedPatternIndex] ?? song.patterns[0]];
};

/**
 * How late a step is played because of swing. Only every second step is delayed, by
 * MAX_SWING_DELAY_IN_STEPS at 100%; SONG_LIMITS caps swing at 75%.
 */
export const swingOffsetSeconds = (song: Pick<Song, 'bpm' | 'swing'>, step: Steps): number => {
  const isOffbeat = step % STEPS_PER_SWING_PAIR === 1;
  if (!isOffbeat) return 0;
  // Multiplied in this order to give exactly the web studio's timing.
  return (song.swing / PERCENT) * stepSeconds(song.bpm) * MAX_SWING_DELAY_IN_STEPS;
};

/** How long one step (a sixteenth note) lasts at a tempo. */
export const stepSeconds = (bpm: number): number => SECONDS_PER_MINUTE / bpm / STEPS_PER_BEAT;

/** A duration as minutes and seconds, such as "2:05". */
export const formatDuration = (seconds: number): string => {
  // Rounds before splitting, so 59.6 s reads "1:00" (the web studio shows "0:60").
  const wholeSeconds = Math.round(seconds);
  const minutes = Math.floor(wholeSeconds / SECONDS_PER_MINUTE);
  const remainingSeconds = wholeSeconds % SECONDS_PER_MINUTE;
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
};
