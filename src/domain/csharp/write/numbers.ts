/** Settings closer to their default than this count as the default and are not written. */
const TOLERANCE = 1e-6;

const HUNDREDTHS = 100;

/**
 * A number as the code writes it: whole numbers as they are, others rounded to two decimals, as
 * the web studio rounds them. Reading code back keeps every decimal, so 0.123 is written as 0.12.
 */
export const formatNumber = (value: number): string =>
  Number.isInteger(value) ? String(value) : String(Math.round(value * HUNDREDTHS) / HUNDREDTHS);

/**
 * Whether a setting is far enough from its default to be written. It compares the exact value, so
 * 0.801 against a default of 0.8 counts as the default.
 */
export const differsFrom = (value: number, reference: number): boolean =>
  Math.abs(value - reference) > TOLERANCE;
