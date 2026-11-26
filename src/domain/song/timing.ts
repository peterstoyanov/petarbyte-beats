import { stepCount, STEPS_PER_BEAT } from './limits';
import type { Pattern, Song } from './types';

const SECONDS_PER_MINUTE = 60;
const PERCENT = 100;

/** The furthest a swung step can move: half a step, at a swing of 100%. */
const MAX_SWING_DELAY_IN_STEPS = 0.5;

/** How long one step (a sixteenth note) lasts at a tempo. */
export const stepSeconds = (bpm: number): number => SECONDS_PER_MINUTE / bpm / STEPS_PER_BEAT;

/**
 * How late a step is played because of swing. Only every second step is delayed, by
 * MAX_SWING_DELAY_IN_STEPS at 100%; SONG_LIMITS caps swing at 75%.
 */
export const swingOffsetSeconds = (song: Pick<Song, 'bpm' | 'swing'>, step: number): number => {
  const isOffbeat = step % 2 === 1;
  if (!isOffbeat) return 0;
  // Multiplied in this order to give exactly the web studio's timing.
  return (song.swing / PERCENT) * stepSeconds(song.bpm) * MAX_SWING_DELAY_IN_STEPS;
};

/**
 * The patterns in the order they play. A song without an arrangement loops the pattern being
 * edited, or the first pattern if that index does not exist. Names in the arrangement that match
 * no pattern are skipped.
 */
export const playOrder = (song: Song, editedPatternIndex = 0): readonly Pattern[] => {
  const arranged = song.arrangement.flatMap((name) => {
    const pattern = song.patterns.find((candidate) => candidate.name === name);
    return pattern ? [pattern] : [];
  });
  if (arranged.length > 0) return arranged;
  return [song.patterns[editedPatternIndex] ?? song.patterns[0]];
};

export const songSeconds = (song: Song, editedPatternIndex = 0): number =>
  playOrder(song, editedPatternIndex).reduce(
    (total, pattern) => total + stepCount(pattern.bars) * stepSeconds(song.bpm),
    0,
  );

/** A duration as minutes and seconds, such as "2:05". */
export const formatDuration = (seconds: number): string => {
  // Rounds before splitting, so 59.6 s reads "1:00" (the web studio shows "0:60").
  const wholeSeconds = Math.round(seconds);
  const minutes = Math.floor(wholeSeconds / SECONDS_PER_MINUTE);
  const rest = wholeSeconds % SECONDS_PER_MINUTE;
  return `${minutes}:${String(rest).padStart(2, '0')}`;
};
