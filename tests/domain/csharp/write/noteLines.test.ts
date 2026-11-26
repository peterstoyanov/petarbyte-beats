import { describe, expect, it } from '@jest/globals';

import {
  chordLines,
  chordNotesText,
  groupIntoChords,
  velocitySuffix,
} from '@/domain/csharp/write/noteLines';
import type { Note } from '@/domain/song/types';

const note = (step: number, length: number, midi: number, velocity = 0.8): Note => ({
  step,
  length,
  midi,
  velocity,
});

describe('groupIntoChords', () => {
  it('groups notes that start together, last as long and are played as hard', () => {
    expect(groupIntoChords([note(0, 4, 67), note(0, 4, 60), note(0, 4, 64)])).toEqual([
      { step: 0, length: 4, velocity: 0.8, notes: [60, 64, 67] },
    ]);
  });

  it('keeps notes of different lengths or velocities apart', () => {
    const chords = groupIntoChords([note(0, 4, 60), note(0, 2, 64), note(0, 4, 67, 0.5)]);
    expect(chords.map((chord) => [chord.length, chord.velocity])).toEqual([
      [2, 0.8],
      [4, 0.8],
      [4, 0.5],
    ]);
  });

  it('orders chords by step', () => {
    const chords = groupIntoChords([note(8, 1, 60), note(0, 1, 60), note(4, 1, 60)]);
    expect(chords.map((chord) => chord.step)).toEqual([0, 4, 8]);
  });
});

describe('chordNotesText and velocitySuffix', () => {
  const chord = { step: 0, length: 4, velocity: 0.6, notes: [67, 60, 64] };

  it('writes the notes lowest first', () => {
    expect(chordNotesText(chord)).toBe('C4 E4 G4');
  });

  it('writes the velocity only when it is not the default', () => {
    expect(velocitySuffix(chord)).toBe(', velocity: 0.6');
    expect(velocitySuffix({ ...chord, velocity: 0.8 })).toBe('');
  });
});

describe('chordLines', () => {
  const lines = (bars: 1 | 2) =>
    chordLines({
      notes: [note(0, 2, 60), note(20, 2, 62)],
      bars,
      playLine: (chord) => `play ${chord.step}`,
      barComment: (bar) => `// bar ${bar}`,
    });

  it('marks where a new bar starts', () => {
    expect(lines(2)).toEqual(['play 0', '// bar 2', 'play 20']);
  });

  it('writes no bar comments in a one-bar pattern', () => {
    expect(lines(1)).toEqual(['play 0', 'play 20']);
  });
});
