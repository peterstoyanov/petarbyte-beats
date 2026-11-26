import { describe, expect, it } from '@jest/globals';

import { CodeError } from '@/domain/csharp/parse/codeError';
import { createDraftPattern } from '@/domain/csharp/parse/draft';
import { readNotes } from '@/domain/csharp/parse/readNotes';
import { createInstrumentChannel } from '@/domain/song/channels';
import { requireChannelId, requirePatternName } from '@/domain/song/ids';

import { readTestContext } from './readTestContext';

const piano = createInstrumentChannel(requireChannelId('piano'), 'piano');

type PlayArguments = readonly [step: string, length: string, notes: string, velocity?: string];

const read = ([stepText, lengthText, notesText, velocityText]: PlayArguments) => {
  const pattern = createDraftPattern(requirePatternName('intro'), 1);
  const info = readNotes(readTestContext('intro.Play(piano, ...);'), {
    channel: piano,
    pattern,
    stepText,
    lengthText,
    notesText,
    velocityText,
  });
  return { info, notes: pattern.notes.get(piano.id) };
};

describe('readNotes', () => {
  it('reads a chord as notes that start and end together', () => {
    expect(read(['0', '4', 'C4 E4 G4', '0.6']).notes).toEqual([
      { step: 0, length: 4, midi: 60, velocity: 0.6 },
      { step: 0, length: 4, midi: 64, velocity: 0.6 },
      { step: 0, length: 4, midi: 67, velocity: 0.6 },
    ]);
  });

  it('plays notes at the default velocity when none is given', () => {
    expect(read(['0', '1', 'C4']).notes?.[0]?.velocity).toBe(0.8);
  });

  it('shortens a note that would run past the pattern, but reports its written length', () => {
    const { info, notes } = read(['14', '8', 'C4']);
    expect(notes?.[0]?.length).toBe(2);
    expect(info).toMatchObject({ kind: 'note', step: 14, length: 8 });
  });

  it.each<[PlayArguments, string]>([
    [['16', '4', 'C4'], 'Step 16 is past the end: the steps go from 0 to 15.'],
    [['0', '0', 'C4'], 'A note lasts at least 1 step.'],
    [['0', '4', 'C4', '1.5'], 'velocity goes from 0.05 to 1.'],
    [['0', '4', '  '], 'Give at least one note, like "C4", or a chord like "C4 E4 G4".'],
    [
      ['0', '4', 'H4'],
      '"H4" is not a note. Write a letter, maybe # or b, and the octave: C4, F#3, Bb2.',
    ],
    [['0', '4', 'C1'], 'Grand Piano plays from C2 to C7.'],
  ])('rejects %p', (playArguments, message) => {
    expect(() => read(playArguments)).toThrow(new CodeError(1, message));
  });
});
