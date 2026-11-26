import { describe, expect, it } from '@jest/globals';

import { parseSongCode } from '@/domain/csharp/parseSongCode';
import { writeSongCode } from '@/domain/csharp/writeSongCode';

/** Reads code into a song and writes it again, so a test can state the input in its own words. */
const rewrite = (...lines: string[]): string => {
  const result = parseSongCode(lines.join('\n'));
  if (result.status !== 'parsed') throw new Error(result.problem.message);
  return writeSongCode(result.song);
};

describe('writeSongCode: the short form', () => {
  const code = rewrite(
    'var song = new Song(bpm: 100, bars: 2);',
    'var kick = song.Drum(Drums.Kick808, "x...............|x...............");',
    'var hat = song.Drum(Drums.OpenHat808, "..x...x...x...x.|..x...x...x...x.");',
    'hat.Volume = 0.5;',
    'var piano = song.Instrument(Instruments.GrandPiano);',
    'piano.Play(0, 4, "G4 C4 E4");',
    'piano.Play(16, 4, "A4", velocity: 0.6);',
  );

  it('opens with the song and its settings', () => {
    expect(code).toContain('var song = new Song(bpm: 100, bars: 2, swing: 0, key: "C major");');
  });

  it('lines the drums up in columns', () => {
    expect(code).toContain(
      [
        'var kick = song.Drum(Drums.Kick808,    "x...............|x...............");',
        'var hat  = song.Drum(Drums.OpenHat808, "..x...x...x...x.|..x...x...x...x.");',
      ].join('\n'),
    );
  });

  it('writes only the settings that differ from their defaults', () => {
    expect(code).toContain('hat.Volume = 0.5;');
    expect(code).not.toContain('kick.Volume');
  });

  it('writes chords lowest note first, with a comment where a bar starts', () => {
    expect(code).toContain(
      ['piano.Play(0, 4, "C4 E4 G4");', '// bar 2', 'piano.Play(16, 4, "A4", velocity: 0.6);'].join(
        '\n',
      ),
    );
  });

  it('ends by playing the song', () => {
    expect(code.endsWith('\nsong.Play();\n')).toBe(true);
  });
});

describe('writeSongCode: a song in parts', () => {
  const code = rewrite(
    'var song = new Song(bpm: 120);',
    'var kick = song.Drum(Drums.Kick808);',
    'var snare = song.Drum(Drums.Snare808);',
    'var intro = song.Pattern(bars: 1);',
    'var drop = song.Pattern(bars: 1);',
    'intro.Hits(kick, "x...x...x...x...");',
    `song.Arrange(${Array.from({ length: 10 }, (_, index) => (index % 2 ? 'drop' : 'intro')).join(', ')});`,
  );

  it('declares every channel once, at the top', () => {
    expect(code).toContain(
      'var kick = song.Drum(Drums.Kick808);\nvar snare = song.Drum(Drums.Snare808);',
    );
  });

  it('writes hits only for the drums that play in a pattern', () => {
    expect(code).toContain('intro.Hits(kick, "x...x...x...x...");');
    expect(code).not.toContain('intro.Hits(snare');
    expect(code).not.toContain('drop.Hits(');
  });

  it("states the arrangement's length and writes eight patterns per line", () => {
    expect(code).toContain(
      [
        '// The arrangement: the patterns in the order they play (10 bars, 0:20)',
        'song.Arrange(intro, drop, intro, drop, intro, drop, intro, drop,',
        '    intro, drop);',
      ].join('\n'),
    );
  });
});

describe('writeSongCode: the master', () => {
  it('writes the master settings that differ from their defaults', () => {
    const code = rewrite('var song = new Song();', 'song.Reverb = 0.3;');
    expect(code).toContain(
      '// The master: volume, and how much reverb and delay come back\nsong.Reverb = 0.3;',
    );
    expect(code).not.toContain('song.Volume');
  });

  it('leaves the master out when nothing differs', () => {
    expect(rewrite('var song = new Song();')).not.toContain('// The master');
  });
});

describe('writeSongCode: channel settings', () => {
  const code = rewrite(
    'var song = new Song();',
    'var kick = song.Drum(Drums.Kick808);',
    'kick.Pan = -0.25;',
    'kick.Pitch = -2;',
    'kick.Decay = 0.4;',
    'kick.Mute = true;',
    'kick.Solo = false;',
    'var pad = song.Instrument(Instruments.WarmPad);',
    'pad.Release = 2.5;',
    'pad.Solo = true;',
  );

  it('writes drum settings, negative numbers included', () => {
    expect(code).toContain('kick.Pan = -0.25;\nkick.Pitch = -2;\nkick.Decay = 0.4;');
  });

  it('writes Mute and Solo only when they are on', () => {
    expect(code).toContain('kick.Mute = true;');
    expect(code).not.toContain('kick.Solo');
    expect(code).toContain('pad.Solo = true;');
  });

  it("writes a release only when it differs from the sound's own", () => {
    expect(code).toContain('pad.Release = 2.5;');
    expect(
      rewrite('var song = new Song();', 'var pad = song.Instrument(Instruments.WarmPad);'),
    ).not.toContain('pad.Release');
  });
});

describe('writeSongCode: song settings', () => {
  it('writes the swing and key the song was given', () => {
    expect(rewrite('var song = new Song(swing: 0.3, key: "A minor");')).toContain(
      'swing: 0.3, key: "A minor"',
    );
  });
});

describe('writeSongCode: notes in a song in parts', () => {
  const code = rewrite(
    'var song = new Song();',
    'var piano = song.Instrument(Instruments.GrandPiano);',
    'var intro = song.Pattern(bars: 2);',
    'var verse = song.Pattern(bars: 1);',
    'intro.Play(piano, 0, 4, "C4");',
    'intro.Play(piano, 16, 4, "D4");',
  );

  it("marks each bar with the pattern's name", () => {
    expect(code).toContain(
      'intro.Play(piano, 0, 4, "C4");\n// intro, bar 2\nintro.Play(piano, 16, 4, "D4");',
    );
  });

  it('is written in parts even with no arrangement', () => {
    expect(code).toContain('var verse = song.Pattern(bars: 1);');
    expect(code).not.toContain('song.Arrange(');
  });
});
