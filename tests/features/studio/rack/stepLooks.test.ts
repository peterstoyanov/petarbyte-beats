import { describe, expect, it } from '@jest/globals';

import type { Note } from '@/domain/song/types';
import { drumStepLooks, isShadedBeat, noteStepLooks } from '@/features/studio/rack/stepLooks';

const note = (step: number, length: number): Note => ({
  step,
  length,
  midi: 60,
  velocity: 0.8,
});

describe('drumStepLooks', () => {
  it('shows rests, hits and loud hits', () => {
    expect(drumStepLooks([0, 1, 2])).toEqual(['rest', 'hit', 'loud']);
  });
});

describe('noteStepLooks', () => {
  it('marks where a note starts and the steps it is held over', () => {
    expect(noteStepLooks([note(1, 3)], 6)).toEqual(['rest', 'hit', 'held', 'held', 'rest', 'rest']);
  });

  it('shows a note starting inside a held one as a start', () => {
    expect(noteStepLooks([note(0, 4), note(2, 1)], 4)).toEqual(['hit', 'held', 'hit', 'held']);
  });

  it('stops a held note at the end of the pattern', () => {
    expect(noteStepLooks([note(2, 8)], 4)).toEqual(['rest', 'rest', 'hit', 'held']);
  });
});

describe('isShadedBeat', () => {
  it('shades every second beat', () => {
    expect([0, 3, 4, 7, 8, 12].map(isShadedBeat)).toEqual([false, false, true, true, false, true]);
  });
});
