import { stepCount, type BarCount } from './limits';
import type { Channel, DrumStep, Pattern } from './types';

export const emptyHits = (bars: BarCount): DrumStep[] =>
  Array.from({ length: stepCount(bars) }, (): DrumStep => 0);

/** A pattern with no hits and no notes yet, with an entry for every channel. */
export const createPattern = (
  name: string,
  bars: BarCount,
  channels: readonly Channel[],
): Pattern => ({
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
