import type { AudioNode, BaseAudioContext } from 'react-native-audio-api';

import type { Duck } from '@/domain/playback/stepEvents';
import type { ChannelId } from '@/domain/song/ids';
import type { Channel, Song } from '@/domain/song/types';

import {
  applyMixer,
  createChannelStrip,
  disconnectStrip,
  duckStrip,
  peakLevel,
  type ChannelStrip,
} from './channelStrip';
import { applyMasterSettings, createMasterBus, type MasterBus } from './masterBus';

/**
 * The mixing desk: a strip for each channel, and the master bus they all feed, which plays to the
 * context's speakers. Apply the song's channels whenever the song changes, before playing its
 * events, so the strips follow every mix edit and deleted channels are taken off the desk.
 */
export class MixingDesk {
  private readonly master: MasterBus;
  private readonly strips = new Map<ChannelId, ChannelStrip>();

  constructor(private readonly context: BaseAudioContext) {
    this.master = createMasterBus(context);
    this.master.output.connect(context.destination);
  }

  applySong(song: Pick<Song, 'bpm' | 'master'>): void {
    applyMasterSettings(this.master, song);
  }

  /** Sets each channel's strip to its mixer, and removes the strips of channels that are gone. */
  applyChannels(channels: readonly Channel[]): void {
    for (const channel of channels) applyMixer(this.stripFor(channel.id), channel.mixer);

    const current = new Set(channels.map((channel) => channel.id));
    for (const [channelId, strip] of this.strips) {
      if (current.has(channelId)) continue;
      disconnectStrip(strip);
      this.strips.delete(channelId);
    }
  }

  /** Where the channel's drums or notes play into. */
  inputFor(channelId: ChannelId): AudioNode {
    return this.stripFor(channelId).input;
  }

  duck({ channel, depth, seconds }: Duck, time: number): void {
    duckStrip(this.stripFor(channel.id), { time, depth, seconds });
  }

  /** How loud the channel is playing, from 0; 0 for a channel that has not played yet. */
  levelOf(channelId: ChannelId): number {
    const strip = this.strips.get(channelId);
    return strip === undefined ? 0 : peakLevel(strip);
  }

  /** Takes the whole desk off the speakers, for when the player is closed. */
  dispose(): void {
    for (const strip of this.strips.values()) disconnectStrip(strip);
    this.strips.clear();
    this.master.output.disconnect();
  }

  private stripFor(channelId: ChannelId): ChannelStrip {
    const existing = this.strips.get(channelId);
    if (existing !== undefined) return existing;

    const strip = createChannelStrip(this.context, this.master);
    this.strips.set(channelId, strip);
    return strip;
  }
}
