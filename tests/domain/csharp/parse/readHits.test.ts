import { describe, expect, it } from '@jest/globals';

import { CodeError } from '@/domain/csharp/parse/codeError';
import { createDraftPattern } from '@/domain/csharp/parse/draft';
import { readHits } from '@/domain/csharp/parse/readHits';
import { requireChannelId, requirePatternName } from '@/domain/song/ids';

import { readTestContext } from './readTestContext';

const kick = requireChannelId('kick');
const SIXTEEN_STEPS = 'x.X-x...|x...x...';

const read = (text: string) => {
  const pattern = createDraftPattern(requirePatternName('intro'), 1);
  const context = readTestContext(`intro.Hits(kick, "${text}");`);
  return { info: readHits(context, { channel: kick, pattern, text }), pattern };
};

describe('readHits', () => {
  it('stores the steps, reading a dash as a rest', () => {
    const { pattern } = read(SIXTEEN_STEPS);
    expect(pattern.hits.get(kick)?.slice(0, 4)).toEqual([1, 0, 2, 0]);
  });

  it('records the column of every step in the line, skipping bar lines', () => {
    const { info } = read(SIXTEEN_STEPS);
    expect(info).toMatchObject({ kind: 'hits', channel: 'kick', pattern: 'intro' });
    if (info.kind !== 'hits') throw new Error('expected hits');
    expect(info.stepColumns).toHaveLength(16);
    expect(info.stepColumns.slice(0, 2)).toEqual([18, 19]);
    expect(info.stepColumns[8]).toBe(27);
  });

  it('rejects a character that is not a step', () => {
    expect(() => read('x...o...x...x...')).toThrow(
      new CodeError(1, '"o" is not a step. Use x for a hit and . for a rest.'),
    );
  });

  it('rejects steps that do not fill the pattern exactly', () => {
    expect(() => read('x...x...')).toThrow(
      new CodeError(1, 'This pattern has 8 steps; 1 bar need 16.'),
    );
  });
});
