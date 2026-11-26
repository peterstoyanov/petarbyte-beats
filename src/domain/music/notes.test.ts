import { describe, expect, it } from '@jest/globals';

import { isAccidental, noteName, parseNote, pitchClassOf, semitonesFromC } from './notes';

describe('noteName', () => {
  it.each([
    [60, 'C4'],
    [61, 'C#4'],
    [54, 'F#3'],
    [69, 'A4'],
    [0, 'C-1'],
    [127, 'G9'],
  ])('names MIDI note %i as %s', (midi, name) => {
    expect(noteName(midi)).toBe(name);
  });

  it('rejects a number that is not a whole note', () => {
    expect(() => noteName(60.5)).toThrow(RangeError);
  });
});

describe('parseNote', () => {
  it.each([
    ['C4', 60],
    ['c4', 60],
    ['F#3', 54],
    ['Bb2', 46],
    ['C-1', 0],
    ['Cb4', 59],
    ['B#4', 72],
  ])('reads %s as MIDI note %i', (text, midi) => {
    expect(parseNote(text)).toBe(midi);
  });

  it.each(['', 'H4', 'C', 'C10', 'C#', 'C 4', 'Cx4', ' C4'])('rejects %p', (text) => {
    expect(parseNote(text)).toBeUndefined();
  });

  it('reads back every note it names', () => {
    for (let midi = 0; midi <= 127; midi += 1) {
      expect(parseNote(noteName(midi))).toBe(midi);
    }
  });
});

describe('semitonesFromC', () => {
  it.each([
    ['C', undefined, 0],
    ['a', '#', 10],
    ['C', 'b', -1],
    ['B', '#', 12],
  ] as const)(
    'counts %s%s as %i semitones from C, without wrapping',
    (letter, accidental, semitones) => {
      expect(semitonesFromC(letter, accidental)).toBe(semitones);
    },
  );

  it('rejects letters outside A to G', () => {
    expect(semitonesFromC('H')).toBeUndefined();
  });
});

describe('isAccidental', () => {
  it('accepts a sharp and a flat only', () => {
    expect(isAccidental('#')).toBe(true);
    expect(isAccidental('b')).toBe(true);
    expect(isAccidental('x')).toBe(false);
    expect(isAccidental('')).toBe(false);
  });
});

describe('pitchClassOf', () => {
  it('wraps any note into one octave, below zero too', () => {
    expect(pitchClassOf(60)).toBe(0);
    expect(pitchClassOf(71)).toBe(11);
    expect(pitchClassOf(-1)).toBe(11);
  });
});
