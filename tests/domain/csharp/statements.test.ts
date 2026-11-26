import { describe, expect, it } from '@jest/globals';

import { splitStatements } from '@/domain/csharp/statements';

const texts = (code: string) =>
  splitStatements(code.split('\n')).map((statement) => statement.text);

describe('splitStatements', () => {
  it('ends a statement at its semicolon', () => {
    expect(texts('song.Play();')).toEqual(['song.Play();']);
  });

  it('finds several statements on one line', () => {
    expect(texts('kick.Volume = 0.5; kick.Pan = 0.2;')).toEqual([
      'kick.Volume = 0.5;',
      'kick.Pan = 0.2;',
    ]);
  });

  it('joins a statement that runs over several lines with spaces', () => {
    expect(texts('song.Arrange(intro,\n    verse);')).toEqual(['song.Arrange(intro,     verse);']);
  });

  it('ignores comments', () => {
    expect(texts('// the beat\nsong.Play(); // and play it')).toEqual(['song.Play();']);
  });

  it('keeps a semicolon or // inside a string', () => {
    expect(texts('piano.Play(0, 4, "C4;//");')).toEqual(['piano.Play(0, 4, "C4;//");']);
  });

  it('records where each statement starts', () => {
    const [first, second] = splitStatements(['', '  var song = x;', 'song.Play();']);
    expect(first).toMatchObject({ line: 1, column: 2, isUnterminated: false });
    expect(second).toMatchObject({ line: 2, column: 0 });
  });

  it('marks a last statement without a semicolon as unterminated', () => {
    const statements = splitStatements(['song.Play();', 'song.Play()']);
    expect(statements[1]).toMatchObject({ text: 'song.Play()', isUnterminated: true });
  });

  it('finds nothing in blank lines and comments', () => {
    expect(splitStatements(['', '   ', '// nothing here'])).toEqual([]);
  });
});
