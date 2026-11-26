import type { MidiNote } from '../music/notes';
import { isKick } from '../sounds/catalog';
import type { Steps } from '../song/limits';
import { stepSeconds } from '../song/timing';
import type {
  Channel,
  DrumChannel,
  DrumStep,
  InstrumentChannel,
  Pattern,
  Song,
} from '../song/types';

const VELOCITY_BY_HIT = { 1: 0.75, 2: 1 } as const satisfies Record<Exclude<DrumStep, 0>, number>;

/** How long a kick holds the sidechained channels down. */
const DUCK_LENGTH_IN_STEPS = 3.2;

export type DrumHit = {
  readonly kind: 'hit';
  readonly channel: DrumChannel;
  readonly velocity: number;
};

export type NoteStart = {
  readonly kind: 'note';
  readonly channel: InstrumentChannel;
  readonly midi: MidiNote;
  readonly velocity: number;
  readonly seconds: number;
};

/** A sidechained channel turned down for a moment, so the kick comes through. */
export type Duck = {
  readonly kind: 'duck';
  readonly channel: Channel;
  readonly depth: number;
  readonly seconds: number;
};

export type StepEvent = DrumHit | NoteStart | Duck;

type StepSpec = {
  readonly song: Pick<Song, 'bpm' | 'channels'>;
  readonly pattern: Pattern;
  readonly step: Steps;
};

/**
 * Everything that starts on one step of a pattern, in the order the web studio plays it: the hits
 * and notes of each channel that can be heard, then the ducking a kick causes.
 */
export const stepEvents = ({ song, pattern, step }: StepSpec): StepEvent[] => {
  const seconds = stepSeconds(song.bpm);
  const sounds = audibleChannels(song.channels).flatMap((channel): (DrumHit | NoteStart)[] =>
    channel.kind === 'drum'
      ? drumHits({ channel, pattern, step })
      : noteStarts({ channel, pattern, step, stepLength: seconds }),
  );
  const hasKick = sounds.some((event) => event.kind === 'hit' && isKick(event.channel.sound));
  return hasKick ? [...sounds, ...ducks(song.channels, seconds)] : sounds;
};

/** Muted channels are silent, and once any channel is soloed only the soloed ones play. */
export const isAudible = (channel: Channel, isAnySoloed: boolean): boolean =>
  !channel.mixer.isMuted && (!isAnySoloed || channel.mixer.isSoloed);

const audibleChannels = (channels: readonly Channel[]): readonly Channel[] => {
  const isAnySoloed = channels.some((channel) => channel.mixer.isSoloed);
  return channels.filter((channel) => isAudible(channel, isAnySoloed));
};

type ChannelStep<Kind extends Channel> = {
  readonly channel: Kind;
  readonly pattern: Pattern;
  readonly step: Steps;
};

const drumHits = ({ channel, pattern, step }: ChannelStep<DrumChannel>): DrumHit[] => {
  const hit = pattern.hits[channel.id]?.[step] ?? 0;
  return hit === 0 ? [] : [{ kind: 'hit', channel, velocity: VELOCITY_BY_HIT[hit] }];
};

const noteStarts = ({
  channel,
  pattern,
  step,
  stepLength,
}: ChannelStep<InstrumentChannel> & { readonly stepLength: number }): NoteStart[] =>
  (pattern.notes[channel.id] ?? [])
    .filter((note) => note.step === step)
    .map((note) => ({
      kind: 'note',
      channel,
      midi: note.midi,
      velocity: note.velocity,
      seconds: note.length * stepLength,
    }));

/** Every channel with sidechain ducks, even a muted one, as in the web studio. */
const ducks = (channels: readonly Channel[], stepLength: number): Duck[] =>
  channels
    .filter((channel) => channel.mixer.sidechain > 0)
    .map((channel) => ({
      kind: 'duck',
      channel,
      depth: channel.mixer.sidechain,
      seconds: DUCK_LENGTH_IN_STEPS * stepLength,
    }));
