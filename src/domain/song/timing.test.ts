import { describe, expect, it } from '@jest/globals';

import { createDrumChannel } from './channels';
import { DEFAULT_MASTER } from './defaults';
import { requireChannelId, requirePatternName } from './ids';
import { createPattern } from './patterns';
import { formatDuration, playOrder, songSeconds, stepSeconds, swingOffsetSeconds } from './timing';
import { SONG_LIMITS } from './limits';
import type { Song } from './types';

const kick = createDrumChannel(requireChannelId('kick'), 'kick808');
const intro = createPattern({ name: requirePatternName('intro'), bars: 1, channels: [kick] });
const verse = createPattern({ name: requirePatternName('verse'), bars: 2, channels: [kick] });

const songWith = (patternNames: readonly string[]): Song => ({
  bpm: 120,
  swing: 0,
  key: 'C major',
  master: DEFAULT_MASTER,
  channels: [kick],
  patterns: [intro, verse],
  arrangement: patternNames.map(requirePatternName),
});

describe('stepSeconds', () => {
  it('is a sixteenth note', () => {
    expect(stepSeconds(120)).toBeCloseTo(0.125);
    expect(stepSeconds(60)).toBeCloseTo(0.25);
  });
});

describe('swingOffsetSeconds', () => {
  it('never delays the steps on the beat', () => {
    expect(swingOffsetSeconds({ bpm: 120, swing: 50 }, 0)).toBe(0);
    expect(swingOffsetSeconds({ bpm: 120, swing: 50 }, 2)).toBe(0);
  });

  it('delays every second step by a share of half a step', () => {
    expect(swingOffsetSeconds({ bpm: 120, swing: 50 }, 1)).toBeCloseTo(0.03125);
  });

  it('delays by three eighths of a step at the highest swing allowed', () => {
    const swing = SONG_LIMITS.swing.max;
    expect(swingOffsetSeconds({ bpm: 120, swing }, 3)).toBeCloseTo(0.046875);
  });

  it('does nothing without swing', () => {
    expect(swingOffsetSeconds({ bpm: 120, swing: 0 }, 1)).toBe(0);
  });
});

describe('playOrder', () => {
  it('follows the arrangement', () => {
    expect(playOrder(songWith(['intro', 'verse', 'intro']))).toEqual([intro, verse, intro]);
  });

  it('skips names that match no pattern', () => {
    expect(playOrder(songWith(['intro', 'missing']))).toEqual([intro]);
  });

  it('loops the edited pattern when there is no arrangement', () => {
    expect(playOrder(songWith([]))).toEqual([intro]);
    expect(playOrder(songWith([]), 1)).toEqual([verse]);
  });
});

describe('songSeconds', () => {
  it('adds up the patterns in play order', () => {
    expect(songSeconds(songWith(['intro', 'verse']))).toBeCloseTo(6);
  });
});

describe('formatDuration', () => {
  it.each([
    [0, '0:00'],
    [5, '0:05'],
    [61.5, '1:02'],
    [125, '2:05'],
  ])('formats %p seconds as %s', (seconds, text) => {
    expect(formatDuration(seconds)).toBe(text);
  });

  it('rounds into the next minute instead of showing 60 seconds', () => {
    expect(formatDuration(59.6)).toBe('1:00');
    expect(formatDuration(599.5)).toBe('10:00');
  });
});
