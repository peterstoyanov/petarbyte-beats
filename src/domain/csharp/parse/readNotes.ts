import { noteName, parseNote, type MidiNote } from '../../music/notes';
import { INSTRUMENTS } from '../../sounds/catalog';
import { DEFAULT_VELOCITY } from '../../song/defaults';
import { stepCount, VELOCITY_RANGE } from '../../song/limits';
import type { InstrumentChannel } from '../../song/types';
import { fail, type ReadContext } from './context';
import type { DraftPattern } from './draft';
import type { LineInfo } from './lineInfo';

type PlayStatement = {
  readonly channel: InstrumentChannel;
  readonly pattern: DraftPattern;
  readonly stepText: string;
  readonly lengthText: string;
  readonly notesText: string;
  readonly velocityText: string | undefined;
};

/** Reads a Play call: notes that start on one step, last as long and are played as hard. */
export const readNotes = (context: ReadContext, statement: PlayStatement): LineInfo => {
  const { channel, pattern } = statement;
  const step = Number(statement.stepText);
  const length = Number(statement.lengthText);
  const count = stepCount(pattern.bars);

  if (step >= count) {
    fail(context, `Step ${step} is past the end: the steps go from 0 to ${count - 1}.`);
  }
  if (length < 1) fail(context, 'A note lasts at least 1 step.');

  const velocity = readVelocity(context, statement.velocityText);
  const notes = readNoteNames(context, channel, statement.notesText).map((midi) => ({
    step,
    length: Math.min(length, count - step),
    midi,
    velocity,
  }));

  const existing = pattern.notes.get(channel.id) ?? [];
  pattern.notes.set(channel.id, [...existing, ...notes]);
  // The line info keeps the length as written, so the editor shows what the code says.
  return { kind: 'note', channel: channel.id, pattern: pattern.name, step, length };
};

const readVelocity = (context: ReadContext, text: string | undefined): number => {
  const velocity = text === undefined ? DEFAULT_VELOCITY : Number(text);
  // Like the web studio, any velocity above 0 is accepted; the message names the editor's range.
  if (!(velocity > 0 && velocity <= VELOCITY_RANGE.max)) {
    fail(context, `velocity goes from ${VELOCITY_RANGE.min} to ${VELOCITY_RANGE.max}.`);
  }
  return velocity;
};

const readNoteNames = (
  context: ReadContext,
  channel: InstrumentChannel,
  text: string,
): MidiNote[] => {
  const names = text.trim().split(/\s+/).filter(Boolean);
  if (names.length === 0) {
    fail(context, 'Give at least one note, like "C4", or a chord like "C4 E4 G4".');
  }
  return names.map((name) => readNoteName(context, channel, name));
};

const readNoteName = (context: ReadContext, channel: InstrumentChannel, name: string): MidiNote => {
  const midi = parseNote(name);
  if (midi === undefined) {
    fail(
      context,
      `"${name}" is not a note. Write a letter, maybe # or b, and the octave: C4, F#3, Bb2.`,
    );
  }

  const { label, lowest, highest } = INSTRUMENTS[channel.sound];
  if (midi < lowest || midi > highest) {
    fail(context, `${label} plays from ${noteName(lowest)} to ${noteName(highest)}.`);
  }
  return midi;
};
