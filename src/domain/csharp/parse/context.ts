import type { Statement } from '../statements';
import { CodeError } from './codeError';
import type { SongDraft } from './draft';
import type { LineInfo } from './lineInfo';

/** What a reader of one statement needs: the song so far and where the statement sits. */
export type ReadContext = {
  readonly draft: SongDraft;
  readonly statement: Statement;
  /** The whole line the statement starts on, for finding columns in it. */
  readonly sourceLine: string;
};

/** Reads one kind of statement, recognized by its pattern. */
export type StatementReader = {
  readonly pattern: RegExp;
  readonly read: (match: RegExpExecArray, context: ReadContext) => LineInfo | undefined;
};

/**
 * Stops reading with a message about the statement being read. Typed explicitly so the compiler
 * knows nothing after a call to it runs.
 */
export const fail: (context: ReadContext, message: string) => never = (context, message) => {
  throw new CodeError(context.statement.line + 1, message);
};
