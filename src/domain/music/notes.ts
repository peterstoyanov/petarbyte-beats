/** A MIDI note number: 60 is middle C (C4), and each step up is one semitone. */
export type MidiNote = number;

/** Where a note sits within its octave: 0 for C up to 11 for B. */
export type PitchClass = number;

/** The note names of one octave, from C. Black keys are written as sharps. */
export const NOTE_NAMES = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
] as const;

export type NoteName = (typeof NOTE_NAMES)[number];

const ACCIDENTAL_SHIFTS = { '#': 1, b: -1 } as const;

/** A sharp (#) raises a note by a semitone, a flat (b) lowers it by one. */
export type Accidental = keyof typeof ACCIDENTAL_SHIFTS;

const SEMITONES_FROM_C = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 } as const;

type NoteLetter = keyof typeof SEMITONES_FROM_C;

const SEMITONES_PER_OCTAVE = 12;

/** MIDI note 0 is C-1, so octave numbers run one behind the MIDI octave count. */
const OCTAVE_NUMBER_OFFSET = 1;

const NOTE_PATTERN = /^([A-Ga-g])(#|b)?(-?\d)$/;

/** Reads a note such as "C4", "F#3" or "Bb2". Returns undefined for anything else. */
export const parseNote = (text: string): MidiNote | undefined => {
  const match = NOTE_PATTERN.exec(text);
  if (!match) return undefined;

  const [, letter = '', accidental = '', octave = ''] = match;
  const semitones = semitonesFromC(letter, isAccidental(accidental) ? accidental : undefined);
  if (semitones === undefined) return undefined;

  return semitones + (Number(octave) + OCTAVE_NUMBER_OFFSET) * SEMITONES_PER_OCTAVE;
};

/**
 * Semitones from C to a spelled note such as "F#" or "Bb", or undefined if the letter is not A–G.
 * Not wrapped into one octave: "Cb" is -1 and "B#" is 12.
 */
export const semitonesFromC = (letter: string, accidental?: Accidental): number | undefined => {
  const upperLetter = letter.toUpperCase();
  if (!isNoteLetter(upperLetter)) return undefined;

  const shift = accidental === undefined ? 0 : ACCIDENTAL_SHIFTS[accidental];
  return SEMITONES_FROM_C[upperLetter] + shift;
};

const isNoteLetter = (letter: string): letter is NoteLetter =>
  Object.hasOwn(SEMITONES_FROM_C, letter);

export const isAccidental = (text: string): text is Accidental =>
  Object.hasOwn(ACCIDENTAL_SHIFTS, text);

/** The scientific name of a MIDI note, such as "C4" for 60 or "F#3" for 54. */
export const noteName = (midi: MidiNote): string => {
  const name = NOTE_NAMES[pitchClassOf(midi)];
  if (name === undefined) throw new RangeError(`${midi} is not a MIDI note number.`);

  return `${name}${octaveOf(midi)}`;
};

/** The pitch class of a note: 0 for C up to 11 for B, in any octave. */
export const pitchClassOf = (midi: MidiNote): PitchClass =>
  ((midi % SEMITONES_PER_OCTAVE) + SEMITONES_PER_OCTAVE) % SEMITONES_PER_OCTAVE;

const octaveOf = (midi: MidiNote): number =>
  Math.floor(midi / SEMITONES_PER_OCTAVE) - OCTAVE_NUMBER_OFFSET;
