import { STEPS_PER_BAR } from './limits';
import type { DrumStep } from './types';

const BAR_SEPARATOR = '|';

const STEP_SYMBOLS = { 0: '.', 1: 'x', 2: 'X' } as const satisfies Record<DrumStep, string>;

const stepOf = (symbol: string | undefined): DrumStep => {
  if (symbol === 'X') return 2;
  if (symbol === 'x') return 1;
  return 0;
};

/** Writes drum steps the way the code shows them: x for a hit, X for a loud hit, . for a rest, | between bars. */
export const formatDrumSteps = (steps: readonly DrumStep[]): string =>
  steps
    .map((step, index) => {
      const separator = index > 0 && index % STEPS_PER_BAR === 0 ? BAR_SEPARATOR : '';
      return separator + STEP_SYMBOLS[step];
    })
    .join('');

/**
 * Reads drum steps written with x, X and . into exactly `count` steps, ignoring | and spaces.
 * A shorter pattern that fits evenly is repeated, so one bar fills a longer pattern. Any other
 * gap is filled with rests, and steps past `count` are dropped.
 */
export const fitDrumSteps = (text: string, count: number): DrumStep[] => {
  const symbols = text.replace(/[|\s]/g, '');
  const shouldRepeat = symbols.length > 0 && symbols.length < count && count % symbols.length === 0;
  const filled = shouldRepeat ? symbols.repeat(count / symbols.length) : symbols;
  return Array.from({ length: count }, (_, index) => stepOf(filled[index]));
};
