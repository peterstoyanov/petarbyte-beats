import type { ChannelId, PatternName } from '../../song/ids';
import type { Steps } from '../../song/limits';

/** What a line of the code declares or plays, so the editor can link the line to the grid. */
export type LineInfo =
  | { readonly kind: 'channel'; readonly channel: ChannelId }
  | {
      readonly kind: 'hits';
      readonly channel: ChannelId;
      readonly pattern: PatternName;
      /** The column of every step character, so a step on the grid can be found in the line. */
      readonly stepColumns: readonly number[];
    }
  | { readonly kind: 'pattern'; readonly pattern: PatternName }
  | {
      readonly kind: 'note';
      readonly channel: ChannelId;
      readonly pattern: PatternName;
      readonly step: Steps;
      readonly length: Steps;
    }
  | { readonly kind: 'arrangement' };
