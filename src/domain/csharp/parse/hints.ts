type Hint = {
  readonly pattern: RegExp;
  readonly text: string;
};

/** Advice for a statement that looks like one the code understands but is not quite written right. */
const HINTS: readonly Hint[] = [
  {
    pattern: /\.Play\s*\(/,
    text: 'Write it like piano.Play(0, 4, "C4"), or in a pattern intro.Play(piano, 0, 4, "C4"): the step, the length in steps, then the notes.',
  },
  { pattern: /\.Hits\s*\(/, text: 'Write it like intro.Hits(kick, "x...x...x...x...");' },
  {
    pattern: /song\.Drum\s*\(/,
    text: 'Write it like var kick = song.Drum(Drums.Kick808); or with its steps: song.Drum(Drums.Kick808, "x...x...");',
  },
  {
    pattern: /song\.Instrument\s*\(/,
    text: 'Write it like var piano = song.Instrument(Instruments.GrandPiano);',
  },
  { pattern: /song\.Pattern\s*\(/, text: 'Write it like var intro = song.Pattern(bars: 2);' },
];

const UNKNOWN_STATEMENT =
  'Here I understand song.Drum, song.Instrument, song.Pattern, Hits, Play, song.Arrange, settings like piano.Volume = 0.7 and song.Play().';

/** What to tell someone whose statement the code does not understand. */
export const hintFor = (statement: string): string =>
  HINTS.find((hint) => hint.pattern.test(statement))?.text ?? UNKNOWN_STATEMENT;
