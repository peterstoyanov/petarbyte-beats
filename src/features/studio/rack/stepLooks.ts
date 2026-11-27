import type { Steps } from '@/domain/song/limits';
import { STEPS_PER_BEAT } from '@/domain/song/limits';
import type { DrumStep, Note } from '@/domain/song/types';

/** What a step of the rack shows: a rest, a hit, a loud hit, or a note held from before. */
export type StepLook = 'rest' | 'hit' | 'loud' | 'held';

const DRUM_LOOKS = { 0: 'rest', 1: 'hit', 2: 'loud' } as const satisfies Record<DrumStep, StepLook>;

export const drumStepLooks = (hits: readonly DrumStep[]): StepLook[] =>
  hits.map((hit) => DRUM_LOOKS[hit]);

/** An instrument's steps: where each note starts, and the steps it is still held over. */
export const noteStepLooks = (notes: readonly Note[], steps: Steps): StepLook[] => {
  const looks = Array.from({ length: steps }, (): StepLook => 'rest');
  for (const note of notes) {
    for (let step = note.step + 1; step < Math.min(steps, note.step + note.length); step++) {
      if (looks[step] === 'rest') looks[step] = 'held';
    }
  }
  for (const note of notes) {
    if (note.step >= 0 && note.step < steps) looks[note.step] = 'hit';
  }
  return looks;
};

/** Every second beat is shaded, as in the web studio, so the beats can be counted. */
export const isShadedBeat = (step: Steps): boolean => Math.floor(step / STEPS_PER_BEAT) % 2 === 1;
