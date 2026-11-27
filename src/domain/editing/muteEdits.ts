import type { ChannelId } from '../song/ids';
import type { Mixer, Song } from '../song/types';

/** Mutes the channel, or unmutes it if it is muted. */
export const toggleMute = (song: Song, channelId: ChannelId): Song =>
  withMixer(song, channelId, (mixer) => ({ ...mixer, isMuted: !mixer.isMuted }));

/**
 * Solos the channel, or takes its solo off. While any channel is soloed only the soloed ones are
 * heard; more than one can be soloed at once, as in the web studio.
 */
export const toggleSolo = (song: Song, channelId: ChannelId): Song =>
  withMixer(song, channelId, (mixer) => ({ ...mixer, isSoloed: !mixer.isSoloed }));

/** The song with one channel's mixer changed; the same song when no channel has that id. */
const withMixer = (song: Song, channelId: ChannelId, change: (mixer: Mixer) => Mixer): Song => {
  const target = song.channels.find((channel) => channel.id === channelId);
  if (target === undefined) return song;
  const changed = { ...target, mixer: change(target.mixer) };
  return {
    ...song,
    channels: song.channels.map((channel) => (channel === target ? changed : channel)),
  };
};
