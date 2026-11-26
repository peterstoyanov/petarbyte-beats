import { describe, expect, it } from '@jest/globals';

import { parseSongCode } from '@/domain/csharp/parseSongCode';
import { requireChannelId } from '@/domain/song/ids';
import type { Song } from '@/domain/song/types';

const channel = requireChannelId;

const parse = (...lines: string[]) => parseSongCode(lines.join('\n'));

const songOf = (...lines: string[]): Song => {
  const result = parse(...lines);
  if (result.status !== 'parsed')
    throw new Error(`Expected the code to parse: ${result.problem.message}`);
  return result.song;
};

describe('parseSongCode: the song', () => {
  it('starts from the defaults', () => {
    expect(songOf('var song = new Song();')).toMatchObject({
      bpm: 120,
      swing: 0,
      key: 'C major',
      master: { volume: 0.8, reverb: 0.8, delay: 0.6 },
      arrangement: [],
    });
  });

  it('reads named arguments', () => {
    const song = songOf('var song = new Song(bpm: 90, bars: 2, swing: 30, key: "A minor");');
    expect(song).toMatchObject({ bpm: 90, swing: 30, key: 'A minor' });
    expect(song.patterns[0].bars).toBe(2);
  });

  it('reads arguments in order without names', () => {
    expect(songOf('var song = new Song(140, 4, 10, "F# major");')).toMatchObject({
      bpm: 140,
      swing: 10,
      key: 'F# major',
    });
  });

  it('gives a song without patterns one empty main pattern', () => {
    expect(songOf('var song = new Song();').patterns).toEqual([
      { name: 'main', bars: 1, hits: {}, notes: {} },
    ]);
  });
});

describe('parseSongCode: the short form', () => {
  const song = songOf(
    'var song = new Song(bpm: 120, bars: 1);',
    'var kick = song.Drum(Drums.Kick808, "x...x...x...X...");',
    'var piano = song.Instrument(Instruments.GrandPiano);',
    'piano.Play(0, 4, "C4 E4 G4");',
    'piano.Play(8, 2, "A4", velocity: 0.5);',
    'song.Play();',
  );
  const [main] = song.patterns;

  it('declares a channel for every drum and instrument', () => {
    expect(song.channels.map((channel) => [channel.id, channel.kind, channel.sound])).toEqual([
      ['kick', 'drum', 'kick808'],
      ['piano', 'instrument', 'piano'],
    ]);
  });

  it('puts the drum steps and the notes in the main pattern', () => {
    expect(main.name).toBe('main');
    expect(main.hits[channel('kick')]?.filter((step) => step > 0)).toEqual([1, 1, 1, 2]);
    expect(
      main.notes[channel('piano')]?.map((note) => [note.step, note.midi, note.velocity]),
    ).toEqual([
      [0, 60, 0.8],
      [0, 64, 0.8],
      [0, 67, 0.8],
      [8, 69, 0.5],
    ]);
  });
});

describe('parseSongCode: a song in parts', () => {
  const song = songOf(
    'var song = new Song(bpm: 100);',
    'var kick = song.Drum(Drums.Kick909);',
    'var bass = song.Instrument(Instruments.SubBass);',
    'var intro = song.Pattern(bars: 1);',
    'var drop = song.Pattern(bars: 2);',
    'intro.Hits(kick, "x...............");',
    'drop.Play(bass, 16, 4, "C2");',
    'song.Arrange(intro, drop,',
    '    drop);',
  );

  it('keeps the patterns in the order they are declared', () => {
    expect(song.patterns.map((pattern) => [pattern.name, pattern.bars])).toEqual([
      ['intro', 1],
      ['drop', 2],
    ]);
  });

  it('fills every track a pattern does not mention', () => {
    const [intro, drop] = song.patterns;
    expect(intro.notes[channel('bass')]).toEqual([]);
    expect(drop?.hits[channel('kick')]).toHaveLength(32);
  });

  it('reads an arrangement that runs over several lines', () => {
    expect(song.arrangement).toEqual(['intro', 'drop', 'drop']);
  });
});

describe('parseSongCode: settings', () => {
  const song = songOf(
    'var song = new Song();',
    'var kick = song.Drum(Drums.Kick808);',
    'var pad = song.Instrument(Instruments.WarmPad);',
    'kick.Volume = 0.7; kick.Pitch = -2; kick.Decay = 0.5; kick.Mute = true;',
    'pad.Pan = -0.5; pad.Sidechain = .4; pad.Release = 2;',
    'song.Reverb = 0.3;',
  );
  const [kick, pad] = song.channels;

  it('applies mixer settings and the settings of each kind of channel', () => {
    expect(kick).toMatchObject({ pitch: -2, decay: 0.5, mixer: { volume: 0.7, isMuted: true } });
    expect(pad).toMatchObject({ releaseSeconds: 2, mixer: { pan: -0.5, sidechain: 0.4 } });
  });

  it('applies master settings', () => {
    expect(song.master).toEqual({ volume: 0.8, reverb: 0.3, delay: 0.6 });
  });
});

describe('parseSongCode: line info', () => {
  const result = parse(
    'var song = new Song();',
    'var kick = song.Drum(Drums.Kick808, "x...x...x...x...");',
    'var piano = song.Instrument(Instruments.GrandPiano);',
    'var intro = song.Pattern(bars: 1);',
    'intro.Play(piano, 4, 2, "C4");',
    'song.Arrange(intro);',
    'kick.Volume = 0.5;',
  );
  const lines = result.status === 'parsed' ? result.lines : [];

  it('says what each line declares or plays, so the editor can link it to the grid', () => {
    expect(lines[0]).toBeUndefined();
    expect(lines[1]).toMatchObject({ kind: 'hits', channel: 'kick', pattern: 'main' });
    expect(lines[2]).toEqual({ kind: 'channel', channel: 'piano' });
    expect(lines[3]).toEqual({ kind: 'pattern', pattern: 'intro' });
    expect(lines[4]).toEqual({
      kind: 'note',
      channel: 'piano',
      pattern: 'intro',
      step: 4,
      length: 2,
    });
    expect(lines[5]).toEqual({ kind: 'arrangement' });
    expect(lines[6]).toBeUndefined();
  });

  it('records where every drum step sits in its line', () => {
    const hits = lines[1];
    expect(hits?.kind === 'hits' && hits.stepColumns[0]).toBe(37);
  });
});
