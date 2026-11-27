import { describe, expect, it } from '@jest/globals';

import { toggleMute, toggleSolo } from '@/domain/editing/muteEdits';
import { requireChannelId } from '@/domain/song/ids';
import type { Song } from '@/domain/song/types';

import { songFrom } from './songFrom';

const SONG = songFrom(
  'var song = new Song();',
  'var kick = song.Drum(Drums.Kick808, "x---x---x---x---");',
  'var hat = song.Drum(Drums.Hat808, "-x-x-x-x-x-x-x-x");',
);
const KICK = requireChannelId('kick');
const HAT = requireChannelId('hat');

const mixerOf = (song: Song, id: string) =>
  song.channels.find((channel) => channel.id === id)?.mixer;

describe('toggleMute', () => {
  it('mutes a channel, and unmutes it the second time', () => {
    const muted = toggleMute(SONG, KICK);
    expect(mixerOf(muted, 'kick')?.isMuted).toBe(true);
    expect(mixerOf(toggleMute(muted, KICK), 'kick')?.isMuted).toBe(false);
  });

  it('leaves the other channels and the song it was given as they were', () => {
    const before = structuredClone(SONG);
    const muted = toggleMute(SONG, KICK);
    expect(muted.channels[1]).toBe(SONG.channels[1]);
    expect(SONG).toEqual(before);
  });

  it('gives back the same song for a channel it does not have', () => {
    expect(toggleMute(SONG, requireChannelId('bass'))).toBe(SONG);
  });
});

describe('toggleSolo', () => {
  it('solos channels one by one, so more than one can be soloed', () => {
    const both = toggleSolo(toggleSolo(SONG, KICK), HAT);
    expect(mixerOf(both, 'kick')?.isSoloed).toBe(true);
    expect(mixerOf(both, 'hat')?.isSoloed).toBe(true);
    expect(mixerOf(toggleSolo(both, HAT), 'hat')?.isSoloed).toBe(false);
  });
});
