/** The spacing scale: an 8 pt grid with a 4 pt half step. Styles use these names, never numbers. */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

/** The smallest area a finger can hit reliably, in points (Apple's guideline). */
export const MIN_TOUCH_TARGET = 44;

/** Corner radii. */
export const radius = {
  card: 12,
  /** A step of the channel rack. */
  step: 6,
} as const;
