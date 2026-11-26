import type { PatternName } from './ids';
import { stepCount, type BarCount } from './limits';
import type { Channel, DrumStep, Pattern } from './types';

type PatternSpec = {
  readonly name: PatternName;
  readonly bars: BarCount;
  /** The channels of the song: each gets an empty track. */
  readonly channels: readonly Channel[];
};

/** A pattern with no hits and no notes yet, with an entry for every channel. */
export const createPattern = ({ name, bars, channels }: PatternSpec): Pattern => ({
  name,
  bars,
  hits: Object.fromEntries(
    channels
      .filter((channel) => channel.kind === 'drum')
      .map((channel) => [channel.id, emptyHits(bars)]),
  ),
  notes: Object.fromEntries(
    channels.filter((channel) => channel.kind === 'instrument').map((channel) => [channel.id, []]),
  ),
});

export const emptyHits = (bars: BarCount): DrumStep[] =>
  Array.from({ length: stepCount(bars) }, (): DrumStep => 0);
