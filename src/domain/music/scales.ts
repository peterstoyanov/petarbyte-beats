import { parseAccidental, pitchClassOf, semitonesFromC, type PitchClass } from './notes';

/** Each scale as the semitones of its notes above the root. */
export const SCALES = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  'harmonic minor': [0, 2, 3, 5, 7, 8, 11],
  'pentatonic major': [0, 2, 4, 7, 9],
  'pentatonic minor': [0, 3, 5, 7, 10],
  blues: [0, 3, 5, 6, 7, 10],
  chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
} as const satisfies Record<string, readonly number[]>;

export type ScaleName = keyof typeof SCALES;

export const isScaleName = (name: string): name is ScaleName => Object.hasOwn(SCALES, name);

/** A musical key: the pitch class of its root and its scale. */
export type Key = {
  readonly root: PitchClass;
  readonly scale: ScaleName;
};

const KEY_PATTERN = /^\s*([A-Ga-g])(#|b)?\s+(.+?)\s*$/;

/** Reads a key such as "A minor", "F# major" or "D dorian". Returns undefined for anything else. */
export const parseKey = (text: string): Key | undefined => {
  const match = KEY_PATTERN.exec(text);
  if (!match) return undefined;

  const [, letter = '', accidental = '', scaleText = ''] = match;
  const semitones = semitonesFromC(letter, parseAccidental(accidental));
  const scale = scaleText.toLowerCase();
  if (semitones === undefined || !isScaleName(scale)) return undefined;

  return { root: pitchClassOf(semitones), scale };
};
