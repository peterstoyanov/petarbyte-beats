import type { ReadContext } from '@/domain/csharp/parse/context';
import { createDraft, type SongDraft } from '@/domain/csharp/parse/draft';

/** A context for reading one statement that starts at the beginning of the given source line. */
export const readTestContext = (
  sourceLine: string,
  draft: SongDraft = createDraft(),
): ReadContext => ({
  draft,
  statement: { text: sourceLine.trim(), line: 0, column: 0, isUnterminated: false },
  sourceLine,
});
