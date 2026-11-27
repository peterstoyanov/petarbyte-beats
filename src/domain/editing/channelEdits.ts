import type { SoundId } from '../sounds/catalog';
import { createChannel } from '../song/channels';
import type { ChannelId } from '../song/ids';
import { SONG_LIMITS } from '../song/limits';
import { emptyHits } from '../song/patterns';
import type { Channel, Pattern, Song } from '../song/types';
import { newChannelId } from './channelNames';
import { mapPatterns } from './patternEdits';

export type AddChannelResult =
  | { readonly status: 'added'; readonly song: Song; readonly channelId: ChannelId }
  | { readonly status: 'full' };

/**
 * Adds a channel with a sound, named after it, with an empty track in every pattern. A song has
 * at most SONG_LIMITS.maxChannels channels.
 */
export const addChannel = (song: Song, sound: SoundId): AddChannelResult => {
  if (song.channels.length >= SONG_LIMITS.maxChannels) return { status: 'full' };

  const channel = createChannel(newChannelId(song, sound), sound);
  return {
    status: 'added',
    song: {
      ...song,
      channels: [...song.channels, channel],
      patterns: mapPatterns(song, (pattern) => withEmptyTrack(pattern, channel)),
    },
    channelId: channel.id,
  };
};

const withEmptyTrack = (pattern: Pattern, channel: Channel): Pattern =>
  channel.kind === 'drum'
    ? { ...pattern, hits: { ...pattern.hits, [channel.id]: emptyHits(pattern.bars) } }
    : { ...pattern, notes: { ...pattern.notes, [channel.id]: [] } };
