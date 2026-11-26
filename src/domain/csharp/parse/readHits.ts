import type { ChannelId } from '../../song/ids';
import { fitDrumSteps } from '../../song/drumSteps';
import { stepCount } from '../../song/limits';
import { fail, type ReadContext } from './context';
import type { DraftPattern } from './draft';
import type { LineInfo } from './lineInfo';

/** A dash is a rest too, as in the web studio. */
const STEP_CHARACTER = /[xX.-]/;
const NOT_A_STEP = /[^xX.|\s-]/;
const STEP_SEPARATORS = /[|\s]/g;

type HitsStatement = {
  readonly channel: ChannelId;
  readonly pattern: DraftPattern;
  readonly text: string;
};

/** Reads a drum's steps, such as "x...x...", into a pattern. They must fill it exactly. */
export const readHits = (
  context: ReadContext,
  { channel, pattern, text }: HitsStatement,
): LineInfo => {
  const unknownCharacter = NOT_A_STEP.exec(text);
  if (unknownCharacter) {
    fail(context, `"${unknownCharacter[0]}" is not a step. Use x for a hit and . for a rest.`);
  }

  const symbols = text.replace(STEP_SEPARATORS, '');
  const count = stepCount(pattern.bars);
  if (symbols.length !== count) {
    const bars = pattern.bars > 1 ? `${pattern.bars} bars` : '1 bar';
    fail(context, `This pattern has ${symbols.length} steps; ${bars} need ${count}.`);
  }

  pattern.hits.set(channel, fitDrumSteps(symbols, count));
  return {
    kind: 'hits',
    channel,
    pattern: pattern.name,
    stepColumns: stepColumnsOf(context, count),
  };
};

/**
 * The steps start after the opening quote that follows the first comma of the statement. Like the
 * web studio, this looks at the statement's first line only, which is where the steps are written.
 */
const stepColumnsOf = ({ statement, sourceLine }: ReadContext, count: number): number[] => {
  const fromStatement = sourceLine.slice(statement.column);
  const stepsStart = statement.column + fromStatement.indexOf('"', fromStatement.indexOf(',')) + 1;

  const columns: number[] = [];
  for (let column = stepsStart; column < sourceLine.length && columns.length < count; column += 1) {
    if (STEP_CHARACTER.test(sourceLine.charAt(column))) columns.push(column);
  }
  return columns;
};
