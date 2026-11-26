/** A step is a sixteenth note: four steps make a beat. */
export const STEPS_PER_BEAT = 4;

const BEATS_PER_BAR = 4;

export const STEPS_PER_BAR = BEATS_PER_BAR * STEPS_PER_BEAT;

/** The pattern lengths the studio offers, in bars. */
export const BAR_COUNTS = [1, 2, 3, 4, 6, 8] as const;

export type BarCount = (typeof BAR_COUNTS)[number];

export const isBarCount = (bars: number): bars is BarCount =>
  BAR_COUNTS.some((count) => count === bars);

export const stepCount = (bars: BarCount): number => bars * STEPS_PER_BAR;

export type Range = {
  readonly min: number;
  readonly max: number;
};

export const isWithin = (value: number, range: Range): boolean =>
  value >= range.min && value <= range.max;

export const SONG_LIMITS = {
  bpm: { min: 40, max: 240 },
  /** Swing in percent: how late every second step is played. */
  swing: { min: 0, max: 75 },
  maxChannels: 24,
  maxPatterns: 16,
  maxArrangementLength: 128,
} as const;

/** How hard a note can be played. */
export const VELOCITY_RANGE = { min: 0.05, max: 1 } as const satisfies Range;
