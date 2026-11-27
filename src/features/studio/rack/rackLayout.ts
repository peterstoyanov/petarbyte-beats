import { MIN_TOUCH_TARGET, spacing } from '@/theme/spacing';
import type { Steps } from '@/domain/song/limits';

/** The column with each channel's light and name. */
export const LABEL_WIDTH = 140;
export const ROW_HEIGHT = MIN_TOUCH_TARGET;
/** A step stays wide enough to hit with a finger, and no wider than a comfortable square. */
const NARROWEST_STEP = 32;
const WIDEST_STEP = MIN_TOUCH_TARGET;

/**
 * How wide each step is: the steps share the room beside the labels, as in the web studio, so a
 * one-bar pattern fits the screen; longer ones scroll sideways.
 */
export const stepWidth = (windowWidth: number, steps: Steps): number => {
  const room = windowWidth - LABEL_WIDTH - spacing.lg * 2;
  const shared = Math.floor(room / Math.max(1, steps));
  return Math.min(WIDEST_STEP, Math.max(NARROWEST_STEP, shared));
};
