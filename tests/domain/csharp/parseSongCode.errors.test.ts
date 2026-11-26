import { describe, expect, it } from '@jest/globals';

import { parseSongCode } from '@/domain/csharp/parseSongCode';

const SONG = 'var song = new Song(bpm: 120, bars: 1);';
const CHANNELS = [
  'var song = new Song(bpm: 120);',
  'var kick = song.Drum(Drums.Kick808);',
  'var piano = song.Instrument(Instruments.GrandPiano);',
  'var intro = song.Pattern(bars: 1);',
].join('\n');

type ErrorCase = readonly [description: string, code: string, line: number, message: string];

const expectProblem = ([, code, line, message]: ErrorCase) => {
  expect(parseSongCode(code)).toEqual({ status: 'failed', problem: { line, message } });
};

describe('parseSongCode: problems with the song', () => {
  it.each<ErrorCase>([
    [
      'no song at all',
      '',
      1,
      'The song needs a first line like: var song = new Song(bpm: 120, bars: 1, swing: 0, key: "C major");',
    ],
    [
      'a statement before the song',
      'song.Play();',
      1,
      'Start with the song: var song = new Song(bpm: 120, bars: 1);',
    ],
    ['a second song', `${SONG}\n${SONG}`, 2, 'There is already a song. Make it once, at the top.'],
    ['a missing semicolon', 'var song = new Song()', 1, 'A statement ends with a semicolon ;'],
    ['a tempo too slow', 'var song = new Song(bpm: 30);', 1, 'bpm goes from 40 to 240.'],
    ['an unknown bar count', 'var song = new Song(bars: 5);', 1, 'bars can be 1, 2, 3, 4, 6, 8.'],
    ['too much swing', 'var song = new Song(swing: 80);', 1, 'swing goes from 0 to 75.'],
    [
      'an unknown key',
      'var song = new Song(key: "A lydian");',
      1,
      'I don\'t know the key "A lydian". Write it like "A minor", "F# major" or "D dorian".',
    ],
    [
      'an unknown argument',
      'var song = new Song(tempo: 120);',
      1,
      'Song takes bpm, bars, swing and key, not "tempo".',
    ],
    [
      'too many arguments',
      'var song = new Song(120, 2, 10, "A minor", 5);',
      1,
      'Song takes bpm, bars, swing and key, nothing more.',
    ],
    [
      'an argument it cannot read',
      'var song = new Song(bpm = 120);',
      1,
      'I can\'t read "bpm = 120". Write it like bpm: 120.',
    ],
  ])('%s', (...errorCase) => expectProblem(errorCase));
});

describe('parseSongCode: problems with channels', () => {
  it.each<ErrorCase>([
    [
      'an unknown drum',
      `${SONG}\nvar kick = song.Drum(Drums.Kick);`,
      2,
      'There is no Drums.Kick. Try Drums.Kick808, Drums.Kick909, Drums.LofiKick, Drums.Snare808, Drums.Snare909, Drums.Clap and more.',
    ],
    [
      'an instrument used as a drum',
      `${SONG}\nvar kick = song.Drum(Drums.GrandPiano);`,
      2,
      'There is no Drums.GrandPiano. Try Drums.Kick808, Drums.Kick909, Drums.LofiKick, Drums.Snare808, Drums.Snare909, Drums.Clap and more.',
    ],
    [
      'an unknown instrument',
      `${SONG}\nvar keys = song.Instrument(Instruments.Banjo);`,
      2,
      'There is no Instruments.Banjo. Try Instruments.GrandPiano, Instruments.ElectricPiano, Instruments.Organ, Instruments.Bell, Instruments.Pluck, Instruments.ChipLead and more.',
    ],
    [
      'a name used twice',
      `${CHANNELS}\nvar kick = song.Drum(Drums.Clap);`,
      5,
      '"kick" is already taken. Give each channel its own name.',
    ],
    [
      'a channel called song',
      `${SONG}\nvar song = song.Drum(Drums.Clap);`,
      2,
      '"song" is already taken. Give each channel its own name.',
    ],
    [
      'too many channels',
      `${SONG}\n${Array.from({ length: 25 }, (_, i) => `var d${i} = song.Drum(Drums.Clap);`).join('\n')}`,
      1,
      '24 channels at most.',
    ],
  ])('%s', (...errorCase) => expectProblem(errorCase));
});

describe('parseSongCode: problems with hits and notes', () => {
  it.each<ErrorCase>([
    [
      'steps that do not fill the bar',
      `${SONG}\nvar kick = song.Drum(Drums.Kick808, "x...x...");`,
      2,
      'This pattern has 8 steps; 1 bar need 16.',
    ],
    [
      'a character that is not a step',
      `${SONG}\nvar kick = song.Drum(Drums.Kick808, "x...x...x...x..o");`,
      2,
      '"o" is not a step. Use x for a hit and . for a rest.',
    ],
    [
      'a note on an unknown channel',
      `${SONG}\norgan.Play(0, 4, "C4");`,
      2,
      'There is no channel called "organ" yet. Make it first: var organ = song.Instrument(Instruments.GrandPiano);',
    ],
    [
      'notes for a drum',
      `${SONG}\nvar kick = song.Drum(Drums.Kick808);\nkick.Play(0, 4, "C4");`,
      3,
      'kick is a drum: write its hits in its pattern string.',
    ],
    [
      'a note past the end',
      `${CHANNELS}\nintro.Play(piano, 16, 4, "C4");`,
      5,
      'Step 16 is past the end: the steps go from 0 to 15.',
    ],
    [
      'a note out of range',
      `${CHANNELS}\nintro.Play(piano, 0, 4, "C1");`,
      5,
      'Grand Piano plays from C2 to C7.',
    ],
  ])('%s', (...errorCase) => expectProblem(errorCase));
});

describe('parseSongCode: problems with patterns', () => {
  it.each<ErrorCase>([
    [
      'an unknown pattern length',
      `${CHANNELS}\nvar verse = song.Pattern(bars: 5);`,
      5,
      'A pattern is 1, 2, 3, 4, 6, 8 bars long.',
    ],
    [
      'a pattern name used twice',
      `${CHANNELS}\nvar intro = song.Pattern(bars: 2);`,
      5,
      '"intro" is already taken. Give each pattern its own name.',
    ],
    [
      'too many patterns',
      `${CHANNELS}\n${Array.from({ length: 16 }, (_, i) => `var p${i} = song.Pattern(bars: 1);`).join('\n')}`,
      20,
      '16 patterns at most.',
    ],
    [
      'hits in an unknown pattern',
      `${CHANNELS}\nverse.Hits(kick, "x...x...x...x...");`,
      5,
      'There is no pattern called "verse". Make it first: var verse = song.Pattern(bars: 1);',
    ],
    [
      'hits for an instrument',
      `${CHANNELS}\nintro.Hits(piano, "x...x...x...x...");`,
      5,
      'piano is an instrument: give it notes with intro.Play(piano, step, length, "C4").',
    ],
    [
      'notes in an unknown pattern',
      `${CHANNELS}\nverse.Play(piano, 0, 4, "C4");`,
      5,
      'There is no pattern called "verse".',
    ],
    [
      'notes for a drum in a pattern',
      `${CHANNELS}\nintro.Play(kick, 0, 4, "C4");`,
      5,
      'kick is a drum: write its hits with intro.Hits(kick, "x...").',
    ],
    [
      'an unknown channel in a pattern',
      `${CHANNELS}\nintro.Play(organ, 0, 4, "C4");`,
      5,
      'There is no channel called "organ".',
    ],
    [
      'arranging an unknown pattern',
      `${CHANNELS}\nsong.Arrange(intro, verse);`,
      5,
      'There is no pattern called "verse" to arrange.',
    ],
    [
      'an arrangement too long',
      `${CHANNELS}\nsong.Arrange(${Array(129).fill('intro').join(', ')});`,
      5,
      '128 patterns in the arrangement at most.',
    ],
  ])('%s', (...errorCase) => expectProblem(errorCase));
});

describe('parseSongCode: problems with settings', () => {
  it.each<ErrorCase>([
    [
      'an unknown master setting',
      `${CHANNELS}\nsong.Pan = 0.5;`,
      5,
      'song has Volume, Reverb and Delay, not Pan.',
    ],
    [
      'a master setting out of range',
      `${CHANNELS}\nsong.Volume = 2;`,
      5,
      'song.Volume goes from 0 to 1.',
    ],
    [
      'a setting of an unknown channel',
      `${CHANNELS}\nsnare.Volume = 0.5;`,
      5,
      'There is no channel called "snare".',
    ],
    [
      'a setting drums do not have',
      `${CHANNELS}\nkick.Release = 1;`,
      5,
      'A drum has Volume, Pan, Reverb, Delay, Cutoff, Resonance, Sidechain, Pitch, Decay, Mute, Solo.',
    ],
    [
      'a setting instruments do not have',
      `${CHANNELS}\npiano.Pitch = 2;`,
      5,
      'An instrument has Volume, Pan, Reverb, Delay, Cutoff, Resonance, Sidechain, Release, Mute, Solo.',
    ],
    ['a number out of range', `${CHANNELS}\nkick.Pitch = 30;`, 5, 'Pitch goes from -24 to 24.'],
    ['true for a number', `${CHANNELS}\nkick.Volume = true;`, 5, 'Volume is a number.'],
    ['a number for true or false', `${CHANNELS}\nkick.Solo = 1;`, 5, 'Solo is true or false.'],
  ])('%s', (...errorCase) => expectProblem(errorCase));
});

describe('parseSongCode: statements it does not understand', () => {
  it.each<ErrorCase>([
    [
      'a Play call written wrong',
      `${SONG}\npiano.Play(;`,
      2,
      'Write it like piano.Play(0, 4, "C4"), or in a pattern intro.Play(piano, 0, 4, "C4"): the step, the length in steps, then the notes.',
    ],
    [
      'a Hits call written wrong',
      `${SONG}\nintro.Hits(kick);`,
      2,
      'Write it like intro.Hits(kick, "x...x...x...x...");',
    ],
    [
      'a drum written wrong',
      `${SONG}\nvar k = song.Drum(Kick808);`,
      2,
      'Write it like var kick = song.Drum(Drums.Kick808); or with its steps: song.Drum(Drums.Kick808, "x...x...");',
    ],
    [
      'an instrument written wrong',
      `${SONG}\nvar p = song.Instrument(GrandPiano);`,
      2,
      'Write it like var piano = song.Instrument(Instruments.GrandPiano);',
    ],
    [
      'a pattern written wrong',
      `${SONG}\nvar p = song.Pattern(bars: two);`,
      2,
      'Write it like var intro = song.Pattern(bars: 2);',
    ],
    [
      'other C#',
      `${SONG}\nConsole.WriteLine("hi");`,
      2,
      'Here I understand song.Drum, song.Instrument, song.Pattern, Hits, Play, song.Arrange, settings like piano.Volume = 0.7 and song.Play().',
    ],
  ])('%s', (...errorCase) => expectProblem(errorCase));
});

describe('parseSongCode: long input', () => {
  const DIGITS = '1'.repeat(50_000);
  const HEADER = [
    'var song = new Song();',
    'var kick = song.Drum(Drums.Kick808);',
    'var piano = song.Instrument(Instruments.GrandPiano);',
  ].join('\n');

  // Number patterns that can read the same digits in several ways take seconds on such a line.
  it.each([
    ['a setting', `kick.Volume = ${DIGITS}x;`],
    ['a velocity', `piano.Play(0, 1, "C4", ${DIGITS}x);`],
  ])('reads %s with a very long number quickly', (_description, line) => {
    const start = performance.now();
    parseSongCode(`${HEADER}\n${line}`);
    expect(performance.now() - start).toBeLessThan(1000);
  });
});
