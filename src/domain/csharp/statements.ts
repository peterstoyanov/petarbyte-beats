/** One statement of the code: everything up to its semicolon, maybe across several lines. */
export type Statement = {
  readonly text: string;
  /** The line the statement starts on, counted from 0. */
  readonly line: number;
  /** The column the statement starts at, counted from 0. */
  readonly column: number;
  /** True for a last statement that never reached its semicolon. */
  readonly isUnterminated: boolean;
};

type OpenStatement = {
  text: string;
  readonly line: number;
  readonly column: number;
};

const QUOTE = '"';
const TERMINATOR = ';';
const COMMENT_START = '//';
const WHITESPACE = /\s/;

/**
 * Splits code into statements. A semicolon or // inside a string does not end anything, and a
 * statement that runs over several lines is joined with spaces.
 */
export const splitStatements = (lines: readonly string[]): Statement[] => {
  const statements: Statement[] = [];
  let isInsideString = false;
  let open: OpenStatement | undefined;

  lines.forEach((line, lineIndex) => {
    for (let column = 0; column < line.length; column += 1) {
      const char = line.charAt(column);
      if (char === QUOTE) isInsideString = !isInsideString;
      if (!isInsideString && line.startsWith(COMMENT_START, column)) break;
      if (open === undefined && WHITESPACE.test(char)) continue;

      open ??= { text: '', line: lineIndex, column };
      open.text += char;

      if (!isInsideString && char === TERMINATOR) {
        statements.push(closeStatement(open, { isUnterminated: false }));
        open = undefined;
      }
    }
    if (open !== undefined) open.text += ' ';
  });

  if (open !== undefined && open.text.trim() !== '') {
    statements.push(closeStatement(open, { isUnterminated: true }));
  }
  return statements;
};

const closeStatement = (
  open: OpenStatement,
  { isUnterminated }: { readonly isUnterminated: boolean },
): Statement => ({
  text: open.text.trim(),
  line: open.line,
  column: open.column,
  isUnterminated,
});
