import { describe, expect, it } from '@jest/globals';

import { addChannel } from '@/domain/editing/channelEdits';
import { requireChannelId } from '@/domain/song/ids';
import { SONG_LIMITS } from '@/domain/song/limits';
import { emptyHits } from '@/domain/song/patterns';
import type { Song } from '@/domain/song/types';

import { songFrom } from './songFrom';

const added = (song: Song, ...sounds: Parameters<typeof addChannel>[1][]) =>
  sounds.reduce((current, sound) => {
    const result = addChannel(current, sound);
    if (result.status !== 'added') throw new Error('The song is full.');
    return result.song;
  }, song);

const PARTS = songFrom(
  'var song = new Song();',
  'var kick = song.Drum(Drums.Kick808);',
  'var intro = song.Pattern(bars: 1);',
  'var drop = song.Pattern(bars: 2);',
);

describe('addChannel', () => {
  it('names the channel after its sound, numbered when the name is taken', () => {
    const song = added(PARTS, 'kick909', 'kickhard', 'supersaw');
    expect(song.channels.map((channel) => channel.id)).toEqual(['kick', 'kick2', 'kick3', 'lead']);
  });

  it('does not take a name a pattern has, since both are variables in the code', () => {
    const song = songFrom('var song = new Song();', 'var bass = song.Pattern(bars: 1);');
    expect(addChannel(song, 'bass808')).toMatchObject({ status: 'added', channelId: 'bass2' });
  });

  it('leaves the song it was given as it was', () => {
    const before = structuredClone(PARTS);
    addChannel(PARTS, 'clap');
    expect(PARTS).toEqual(before);
  });

  it('says which channel it added', () => {
    const result = addChannel(PARTS, 'clap');
    expect(result).toMatchObject({ status: 'added', channelId: 'clap' });
  });

  it('gives a drum an empty track of the right length in every pattern', () => {
    const song = added(PARTS, 'clap');
    expect(song.patterns.map((pattern) => pattern.hits[requireChannelId('clap')])).toEqual([
      emptyHits(1),
      emptyHits(2),
    ]);
  });

  it('gives an instrument no notes yet in every pattern', () => {
    const song = added(PARTS, 'pad');
    expect(song.patterns.map((pattern) => pattern.notes[requireChannelId('pad')])).toEqual([
      [],
      [],
    ]);
  });

  it('adds no channel past the limit', () => {
    const full = added(PARTS, ...Array<'clap'>(SONG_LIMITS.maxChannels - 1).fill('clap'));
    expect(full.channels).toHaveLength(SONG_LIMITS.maxChannels);
    expect(addChannel(full, 'clap')).toEqual({ status: 'full' });
  });
});
