import { noteName, type MidiNote } from '../../music/notes';
import { DEFAULT_VELOCITY } from '../../song/defaults';
import { STEPS_PER_BAR, type BarCount, type Steps } from '../../song/limits';
import type { Note } from '../../song/types';
import { differsFrom, formatNumber } from './numbers';

/** Notes that start together, last as long and are played as hard: one Play call. */
export type Chord = {
  readonly step: Steps;
  readonly length: Steps;
  readonly velocity: number;
  readonly notes: readonly MidiNote[];
};

type ChordLinesSpec = {
  readonly notes: readonly Note[];
  readonly bars: BarCount;
  readonly playLine: (chord: Chord) => string;
  /** The comment that starts a new bar, with the bar counted from 1. */
  readonly barComment: (bar: number) => string;
};

/** Play calls for a channel's notes in time order, with a comment where each new bar starts. */
export const chordLines = ({ notes, bars, playLine, barComment }: ChordLinesSpec): string[] => {
  const lines: string[] = [];
  let currentBar = 0;
  for (const chord of groupIntoChords(notes)) {
    const bar = Math.floor(chord.step / STEPS_PER_BAR);
    if (bar > currentBar && bars > 1) {
      lines.push(barComment(bar + 1));
      currentBar = bar;
    }
    lines.push(playLine(chord));
  }
  return lines;
};

/** Notes grouped as the web studio groups them: chords ordered by step, then length, then pitch. */
export const groupIntoChords = (notes: readonly Note[]): Chord[] => {
  const ordered = [...notes].sort(
    (first, second) =>
      first.step - second.step || first.length - second.length || first.midi - second.midi,
  );

  const chordsByTiming = new Map<string, Chord & { readonly notes: MidiNote[] }>();
  for (const { step, length, velocity, midi } of ordered) {
    const timing = `${step}:${length}:${velocity}`;
    const chord = chordsByTiming.get(timing) ?? { step, length, velocity, notes: [] };
    chord.notes.push(midi);
    chordsByTiming.set(timing, chord);
  }
  return [...chordsByTiming.values()].sort((first, second) => first.step - second.step);
};

/** A chord's notes as the code writes them: "C4 E4 G4", lowest first. */
export const chordNotesText = (chord: Chord): string =>
  [...chord.notes]
    .sort((lower, higher) => lower - higher)
    .map(noteName)
    .join(' ');

/** ", velocity: 0.6" for a chord played softer or harder than the default, otherwise nothing. */
export const velocitySuffix = (chord: Chord): string =>
  differsFrom(chord.velocity, DEFAULT_VELOCITY)
    ? `, velocity: ${formatNumber(chord.velocity)}`
    : '';
