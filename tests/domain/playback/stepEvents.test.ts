import { describe, expect, it } from '@jest/globals';

import { parseSongCode } from '@/domain/csharp/parseSongCode';
import { stepEvents, type StepEvent } from '@/domain/playback/stepEvents';
import type { Song } from '@/domain/song/types';

const songFrom = (...lines: string[]): Song => {
  const result = parseSongCode(lines.join('\n'));
  if (result.status !== 'parsed') throw new Error(result.problem.message);
  return result.song;
};

/** The events of a step, as short labels: "hit kick 0.75", "note piano 60", "duck bass". */
const eventsAt = (song: Song, step: number): string[] =>
  stepEvents({ song, pattern: song.patterns[0], step }).map(label);

const label = (event: StepEvent): string => {
  switch (event.kind) {
    case 'hit':
      return `hit ${event.channel.id} ${event.velocity}`;
    case 'note':
      return `note ${event.channel.id} ${event.midi}`;
    case 'duck':
      return `duck ${event.channel.id}`;
  }
};

describe('stepEvents', () => {
  const song = songFrom(
    'var song = new Song(bpm: 120);',
    'var kick = song.Drum(Drums.Kick808, "x...X...........");',
    'var hat = song.Drum(Drums.Hat808, "x.x.............");',
    'var bass = song.Instrument(Instruments.SubBass);',
    'bass.Sidechain = 0.6;',
    'bass.Play(0, 4, "C2 G2");',
  );

  it('plays hits, then notes, channel by channel', () => {
    expect(eventsAt(song, 0)).toEqual([
      'hit kick 0.75',
      'hit hat 0.75',
      'note bass 36',
      'note bass 43',
      'duck bass',
    ]);
  });

  it('plays a loud hit at full velocity', () => {
    expect(eventsAt(song, 4)).toEqual(['hit kick 1', 'duck bass']);
  });

  it('ducks nothing when no kick plays', () => {
    expect(eventsAt(song, 2)).toEqual(['hit hat 0.75']);
  });

  it('gives a note its length in seconds and ducks for 3.2 steps', () => {
    const [, , note, , duck] = stepEvents({ song, pattern: song.patterns[0], step: 0 });
    // At 120 BPM a step lasts 0.125 s.
    expect(note).toMatchObject({ kind: 'note', seconds: 0.5, velocity: 0.8 });
    expect(duck).toMatchObject({ kind: 'duck', depth: 0.6, seconds: 0.4 });
  });

  it('leaves out muted channels', () => {
    const muted = songFrom(
      'var song = new Song();',
      'var kick = song.Drum(Drums.Kick808, "x...............");',
      'var hat = song.Drum(Drums.Hat808, "x...............");',
      'hat.Mute = true;',
    );
    expect(eventsAt(muted, 0)).toEqual(['hit kick 0.75']);
  });

  it('plays only the soloed channels once any channel is soloed', () => {
    const soloed = songFrom(
      'var song = new Song();',
      'var kick = song.Drum(Drums.Kick808, "x...............");',
      'var hat = song.Drum(Drums.Hat808, "x...............");',
      'hat.Solo = true;',
    );
    expect(eventsAt(soloed, 0)).toEqual(['hit hat 0.75']);
  });

  it('still ducks a muted channel when a kick plays', () => {
    const ducked = songFrom(
      'var song = new Song();',
      'var kick = song.Drum(Drums.Kick808, "x...............");',
      'var pad = song.Instrument(Instruments.WarmPad);',
      'pad.Sidechain = 0.5;',
      'pad.Mute = true;',
    );
    expect(eventsAt(ducked, 0)).toEqual(['hit kick 0.75', 'duck pad']);
  });

  it('ducks for any kick, not only the 808', () => {
    const lofi = songFrom(
      'var song = new Song();',
      'var kick = song.Drum(Drums.LofiKick, "x...............");',
      'var pad = song.Instrument(Instruments.WarmPad);',
      'pad.Sidechain = 0.5;',
    );
    expect(eventsAt(lofi, 0)).toEqual(['hit kick 0.75', 'duck pad']);
  });

  it('does not duck for a kick that is muted', () => {
    const silent = songFrom(
      'var song = new Song();',
      'var kick = song.Drum(Drums.Kick808, "x...............");',
      'kick.Mute = true;',
      'var pad = song.Instrument(Instruments.WarmPad);',
      'pad.Sidechain = 0.5;',
    );
    expect(eventsAt(silent, 0)).toEqual([]);
  });
});
