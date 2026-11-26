import { STEPS_PER_BAR } from './limits';
import type { DrumStep } from './types';

const BAR_SEPARATOR = '|';

/** Bar lines and spaces only make the steps easier to read; they are not steps themselves. */
const IGNORED_CHARACTERS = /[|\s]/g;

const SYMBOLS_BY_STEP = { 0: '.', 1: 'x', 2: 'X' } as const satisfies Record<DrumStep, string>;

/** Any other symbol is a rest, as in the web studio. */
const STEPS_BY_SYMBOL: ReadonlyMap<string, DrumStep> = new Map([
  ['x', 1],
  ['X', 2],
]);

/**
 * Writes drum steps the way the code shows them: x for a hit, X for a loud hit, . for a rest,
 * and | between bars.
 */
export const formatDrumSteps = (steps: readonly DrumStep[]): string =>
  steps
    .map((step, index) => {
      const separator = index > 0 && index % STEPS_PER_BAR === 0 ? BAR_SEPARATOR : '';
      return separator + SYMBOLS_BY_STEP[step];
    })
    .join('');

/**
 * Reads drum steps written with x, X and . into exactly `count` steps, ignoring | and spaces.
 * A shorter pattern that fits evenly is repeated, so one bar fills a longer pattern. Any other
 * gap is filled with rests, and steps past `count` are dropped.
 */
export const fitDrumSteps = (text: string, count: number): DrumStep[] => {
  const symbols = text.replace(IGNORED_CHARACTERS, '');
  const shouldRepeat = symbols.length > 0 && symbols.length < count && count % symbols.length === 0;
  const filled = shouldRepeat ? symbols.repeat(count / symbols.length) : symbols;
  return Array.from({ length: count }, (_, index) => stepOf(filled[index]));
};

const stepOf = (symbol: string | undefined): DrumStep =>
  symbol === undefined ? 0 : (STEPS_BY_SYMBOL.get(symbol) ?? 0);
