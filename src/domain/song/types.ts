import type { MidiNote } from '../music/notes';
import type { DrumId, InstrumentId } from '../sounds/catalog';
import type { BarCount } from './limits';

/** One step of a drum pattern: 0 is a rest, 1 a hit and 2 a loud hit. */
export type DrumStep = 0 | 1 | 2;

export type Note = {
  /** The step the note starts on, counted from 0 at the start of its pattern. */
  readonly step: number;
  /** How many steps the note lasts. */
  readonly length: number;
  readonly midi: MidiNote;
  /** How hard the note is played, see VELOCITY_RANGE. */
  readonly velocity: number;
};

/** The mixing desk settings every channel has. */
export type Mixer = {
  readonly volume: number;
  /** From -1 (left) to 1 (right). */
  readonly pan: number;
  readonly reverb: number;
  readonly delay: number;
  /** The low-pass filter: 1 is fully open. */
  readonly cutoff: number;
  readonly resonance: number;
  /** How much the channel ducks when a kick plays. */
  readonly sidechain: number;
  readonly muted: boolean;
  readonly soloed: boolean;
};

type ChannelBase = {
  /** The channel's name in the code, such as "kick" or "piano". Unique within a song. */
  readonly id: string;
  readonly mixer: Mixer;
};

export type DrumChannel = ChannelBase & {
  readonly kind: 'drum';
  readonly sound: DrumId;
  /** Semitones up or down. */
  readonly pitch: number;
  /** How long the drum rings, as a factor of its natural length. */
  readonly decay: number;
};

export type InstrumentChannel = ChannelBase & {
  readonly kind: 'instrument';
  readonly sound: InstrumentId;
  readonly releaseSeconds: number;
};

export type Channel = DrumChannel | InstrumentChannel;

/**
 * A few bars of hits and notes, keyed by channel id. Every drum channel has an entry in hits, one
 * step per step of the pattern (stepCount(bars) long). Every instrument channel has one in notes.
 */
export type Pattern = {
  /** The pattern's name in the code, such as "intro". Unique within a song. */
  readonly name: string;
  readonly bars: BarCount;
  readonly hits: Readonly<Record<string, readonly DrumStep[]>>;
  readonly notes: Readonly<Record<string, readonly Note[]>>;
};

/** The master bus: overall volume, and how much of the shared reverb and delay comes back. */
export type Master = {
  readonly volume: number;
  readonly reverb: number;
  readonly delay: number;
};

export type Song = {
  readonly bpm: number;
  /** In percent, see SONG_LIMITS.swing. */
  readonly swing: number;
  /** The key as written in the code, such as "A minor". */
  readonly key: string;
  readonly master: Master;
  readonly channels: readonly Channel[];
  /** A song always has at least one pattern. */
  readonly patterns: readonly [Pattern, ...Pattern[]];
  /** Pattern names in the order they play. Empty when the song is a single loop. */
  readonly arrangement: readonly string[];
};
