import { SONG_LIMITS } from '../song/limits';
import type { Song } from '../song/types';
import { CodeError } from './parse/codeError';
import { fail, type ReadContext, type StatementReader } from './parse/context';
import { createDraft, mainPatternOf, toSong, type SongDraft } from './parse/draft';
import { hintFor } from './parse/hints';
import type { LineInfo } from './parse/lineInfo';
import { DRUM_DECLARATION, INSTRUMENT_DECLARATION } from './parse/readChannelDeclaration';
import {
  ARRANGE,
  HITS,
  PATTERN_DECLARATION,
  PATTERN_PLAY,
  SHORT_PLAY,
} from './parse/readPatternStatements';
import { SETTING_ASSIGNMENT, SONG_PLAY } from './parse/readSetting';
import { SONG_DECLARATION } from './parse/readSongDeclaration';
import { splitStatements } from './statements';

export type { LineInfo } from './parse/lineInfo';

/** A mistake in the code, on a line counted from 1. */
export type CodeProblem = {
  readonly line: number;
  readonly message: string;
};

export type ParseResult =
  | {
      readonly status: 'parsed';
      readonly song: Song;
      /** For each line of the code, what it declares or plays, if anything. */
      readonly lines: readonly (LineInfo | undefined)[];
    }
  | { readonly status: 'failed'; readonly problem: CodeProblem };

/** Every statement the code understands after the song is declared, tried in this order. */
const STATEMENT_READERS: readonly StatementReader[] = [
  DRUM_DECLARATION,
  INSTRUMENT_DECLARATION,
  PATTERN_DECLARATION,
  HITS,
  PATTERN_PLAY,
  SHORT_PLAY,
  ARRANGE,
  SETTING_ASSIGNMENT,
  SONG_PLAY,
];

/** Reads a song from its C# code, or explains the first mistake in it. */
export const parseSongCode = (code: string): ParseResult => {
  try {
    return { status: 'parsed', ...readSong(code) };
  } catch (error) {
    if (!(error instanceof CodeError)) throw error;
    return { status: 'failed', problem: { line: error.line, message: error.message } };
  }
};

const readSong = (code: string): { song: Song; lines: (LineInfo | undefined)[] } => {
  const sourceLines = code.split('\n');
  const draft = createDraft();
  const lines = sourceLines.map((): LineInfo | undefined => undefined);

  for (const statement of splitStatements(sourceLines)) {
    const sourceLine = sourceLines[statement.line] ?? '';
    const info = readStatement({ draft, statement, sourceLine });
    if (info !== undefined) lines[statement.line] = info;
  }

  checkSongIsComplete(draft);
  // A song that never mentions a pattern still has the short form's one.
  if (draft.patterns.length === 0) mainPatternOf(draft);
  return { song: toSong(draft), lines };
};

const readStatement = (context: ReadContext): LineInfo | undefined => {
  const { statement, draft } = context;
  if (statement.isUnterminated) fail(context, 'A statement ends with a semicolon ;');

  const songDeclaration = SONG_DECLARATION.pattern.exec(statement.text);
  if (songDeclaration) return SONG_DECLARATION.read(songDeclaration, context);
  if (!draft.isDeclared) {
    fail(context, 'Start with the song: var song = new Song(bpm: 120, bars: 1);');
  }

  for (const reader of STATEMENT_READERS) {
    const match = reader.pattern.exec(statement.text);
    if (match) return reader.read(match, context);
  }
  fail(context, hintFor(statement.text));
};

/** Problems that only show once the whole code is read are reported on the first line. */
const FIRST_LINE = 1;

const checkSongIsComplete = (draft: SongDraft): void => {
  if (!draft.isDeclared) {
    throw new CodeError(
      FIRST_LINE,
      'The song needs a first line like: var song = new Song(bpm: 120, bars: 1, swing: 0, key: "C major");',
    );
  }
  if (draft.channels.size > SONG_LIMITS.maxChannels) {
    throw new CodeError(FIRST_LINE, `${SONG_LIMITS.maxChannels} channels at most.`);
  }
};
