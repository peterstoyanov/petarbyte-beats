import { takenNames } from '../csharp/names';
import type { SoundId } from '../sounds/catalog';
import { requireChannelId, type ChannelId } from '../song/ids';
import type { Song } from '../song/types';

/** The name a new channel gets in the code, for each sound: the same names as in the web studio. */
const CHANNEL_NAMES = {
  kick808: 'kick',
  kick909: 'kick',
  kicklofi: 'kick',
  snare808: 'snare',
  snare909: 'snare',
  clap: 'clap',
  snap: 'snap',
  rim: 'rim',
  hat808: 'hat',
  openhat808: 'openhat',
  hat909: 'hat',
  openhat909: 'openhat',
  shaker: 'shaker',
  tomlo: 'lowtom',
  tomhi: 'hightom',
  conga: 'conga',
  cowbell: 'cowbell',
  crash: 'crash',
  ride: 'ride',
  zap: 'zap',
  kickhard: 'kick',
  tamb: 'tamb',
  triangle: 'triangle',
  claves: 'claves',
  bongo: 'bongo',
  block: 'block',
  sweep: 'riser',
  piano: 'piano',
  epiano: 'keys',
  organ: 'organ',
  bell: 'bell',
  pluck: 'pluck',
  chip: 'chip',
  supersaw: 'lead',
  pad: 'pad',
  strings: 'strings',
  bass808: 'bass',
  sub: 'sub',
  synthbass: 'bass',
  acid: 'acid',
  reese: 'reese',
  upright: 'upright',
  wobble: 'wobble',
  marimba: 'marimba',
  vibes: 'vibes',
  musicbox: 'musicbox',
  steel: 'steel',
  clav: 'clav',
  guitar: 'guitar',
  eguitar: 'guitar',
  harp: 'harp',
  kalimba: 'kalimba',
  flute: 'flute',
  brass: 'brass',
  sax: 'sax',
  choir: 'choir',
  sawlead: 'lead',
} as const satisfies Record<SoundId, string>;

/** Numbering starts at 2, so the second kick is kick2. */
const FIRST_NUMBER = 2;

/**
 * The name a new channel with this sound gets: the sound's name, numbered if a channel or a
 * pattern already has it, since both are variables in the code.
 */
export const newChannelId = (
  song: Pick<Song, 'channels' | 'patterns'>,
  sound: SoundId,
): ChannelId => {
  const taken = takenNames({
    channelIds: song.channels.map((channel) => channel.id),
    patternNames: song.patterns.map((pattern) => pattern.name),
  });
  const base = CHANNEL_NAMES[sound];
  let name: string = base;
  for (let number = FIRST_NUMBER; taken.has(name); number++) name = `${base}${number}`;
  return requireChannelId(name);
};
