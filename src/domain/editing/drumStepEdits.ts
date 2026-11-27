import type { ChannelId, PatternName } from '../song/ids';
import type { Steps } from '../song/limits';
import type { DrumStep, Song } from '../song/types';
import { withPattern } from './patternEdits';

/** What a tap on a step turns it into: a hit turns off, and a rest becomes a hit or a loud hit. */
export const nextDrumStep = (
  current: DrumStep,
  { isLoud }: { readonly isLoud: boolean },
): DrumStep => (current !== 0 ? 0 : isLoud ? 2 : 1);

type DrumStepEdit = {
  readonly pattern: PatternName;
  readonly channelId: ChannelId;
  readonly step: Steps;
  readonly value: DrumStep;
};

/** Sets one step of a drum channel in one pattern. A step outside the pattern changes nothing. */
export const setDrumStep = (song: Song, { pattern, channelId, step, value }: DrumStepEdit): Song =>
  withPattern(song, pattern, (current) => {
    const hits = current.hits[channelId];
    if (hits === undefined || !isStepOf(hits, step) || hits[step] === value) return current;
    return { ...current, hits: { ...current.hits, [channelId]: hits.with(step, value) } };
  });

/** A whole step inside the track. Without this, with(-1, …) would quietly change the last step. */
const isStepOf = (hits: readonly DrumStep[], step: Steps): boolean =>
  Number.isInteger(step) && step >= 0 && step < hits.length;
