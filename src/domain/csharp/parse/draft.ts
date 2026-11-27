import {
  parseChannelId,
  requirePatternName,
  type ChannelId,
  type PatternName,
} from '../../song/ids';
import { takenNames } from '../names';
import { DEFAULT_MASTER, DEFAULT_SONG_SETTINGS } from '../../song/defaults';
import { type BarCount } from '../../song/limits';
import { emptyHits } from '../../song/patterns';
import type { Channel, DrumStep, Master, Note, Pattern, Song } from '../../song/types';

type Mutable<T> = { -readonly [Key in keyof T]: T[Key] };

/** A channel while its code is being read: its settings can still change. */
export type DraftChannel = Mutable<Channel>;

export type DraftPattern = {
  readonly name: PatternName;
  readonly bars: BarCount;
  readonly hits: Map<ChannelId, readonly DrumStep[]>;
  readonly notes: Map<ChannelId, Note[]>;
};

/** A song while its code is being read, statement by statement. */
export type SongDraft = {
  isDeclared: boolean;
  bpm: number;
  bars: BarCount;
  swing: number;
  key: string;
  readonly master: Mutable<Master>;
  /** In the order they are declared. */
  readonly channels: Map<ChannelId, DraftChannel>;
  readonly patterns: DraftPattern[];
  /** The pattern of the short form, made the first time the code needs it. */
  mainPattern: DraftPattern | undefined;
  arrangement: PatternName[];
};

const MAIN_PATTERN_NAME = requirePatternName('main');

export const createDraft = (): SongDraft => ({
  isDeclared: false,
  ...DEFAULT_SONG_SETTINGS,
  master: { ...DEFAULT_MASTER },
  channels: new Map(),
  patterns: [],
  mainPattern: undefined,
  arrangement: [],
});

/** The short form's single pattern. It always comes first, even when other patterns exist. */
export const mainPatternOf = (draft: SongDraft): DraftPattern => {
  if (draft.mainPattern) return draft.mainPattern;

  const main = createDraftPattern(MAIN_PATTERN_NAME, draft.bars);
  draft.patterns.unshift(main);
  draft.mainPattern = main;
  return main;
};

export const createDraftPattern = (name: PatternName, bars: BarCount): DraftPattern => ({
  name,
  bars,
  hits: new Map(),
  notes: new Map(),
});

export const findChannel = (draft: SongDraft, name: string): DraftChannel | undefined => {
  const id = parseChannelId(name);
  return id === undefined ? undefined : draft.channels.get(id);
};

export const findPattern = (draft: SongDraft, name: string): DraftPattern | undefined =>
  draft.patterns.find((pattern) => pattern.name === name);

export const isNameTaken = (draft: SongDraft, name: string): boolean =>
  takenNames({
    channelIds: draft.channels.keys(),
    patternNames: draft.patterns.map((pattern) => pattern.name),
  }).has(name);

/**
 * The finished song, from a draft with at least one pattern. Every pattern gets an empty track for
 * each channel it does not mention.
 */
export const toSong = (draft: SongDraft): Song => {
  const channels = [...draft.channels.values()];
  const [first, ...rest] = draft.patterns.map((pattern) => toPattern(pattern, channels));
  if (first === undefined) throw new Error('A song always has at least one pattern.');

  return {
    bpm: draft.bpm,
    swing: draft.swing,
    key: draft.key,
    master: { ...draft.master },
    channels,
    patterns: [first, ...rest],
    arrangement: [...draft.arrangement],
  };
};

const toPattern = (pattern: DraftPattern, channels: readonly Channel[]): Pattern => ({
  name: pattern.name,
  bars: pattern.bars,
  hits: Object.fromEntries(
    channels
      .filter((channel) => channel.kind === 'drum')
      .map((channel) => [channel.id, pattern.hits.get(channel.id) ?? emptyHits(pattern.bars)]),
  ),
  notes: Object.fromEntries(
    channels
      .filter((channel) => channel.kind === 'instrument')
      .map((channel) => [channel.id, pattern.notes.get(channel.id) ?? []]),
  ),
});
