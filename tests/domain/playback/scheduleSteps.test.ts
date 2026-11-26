import { describe, expect, it } from '@jest/globals';

import { parseSongCode } from '@/domain/csharp/parseSongCode';
import {
  scheduleSteps,
  startPlayhead,
  type Playhead,
  type ScheduleSpec,
} from '@/domain/playback/scheduleSteps';
import type { Song } from '@/domain/song/types';

const songFrom = (...lines: string[]): Song => {
  const result = parseSongCode(lines.join('\n'));
  if (result.status !== 'parsed') throw new Error(result.problem.message);
  return result.song;
};

/** 120 BPM, so a step lasts 0.125 s; intro is one bar, verse two. */
const SONG = songFrom(
  'var song = new Song(bpm: 120);',
  'var kick = song.Drum(Drums.Kick808);',
  'var intro = song.Pattern(bars: 1);',
  'var verse = song.Pattern(bars: 2);',
  'intro.Hits(kick, "x...............");',
  'song.Arrange(intro, verse);',
);
const STEP = 0.125;

const schedule = (overrides: Partial<ScheduleSpec>) =>
  scheduleSteps({
    song: SONG,
    mode: 'song',
    editedPatternIndex: 0,
    isMetronomeOn: false,
    playhead: startPlayhead(0),
    until: STEP * 4 - 0.001,
    ...overrides,
  });

/** "slot:step" for each step scheduled. */
const positions = (overrides: Partial<ScheduleSpec>) =>
  schedule(overrides).steps.map(({ slot, step }) => `${slot}:${step}`);

describe('scheduleSteps', () => {
  it('schedules every step due before the horizon, one step apart', () => {
    const { steps, playhead } = schedule({});
    expect(steps.map((step) => step.time)).toEqual([0, STEP, 2 * STEP, 3 * STEP]);
    expect(playhead).toEqual({ slot: 0, step: 4, time: 4 * STEP });
  });

  it('carries on from the playhead it returned without a gap', () => {
    const first = schedule({ until: 2 * STEP - 0.001 });
    const second = schedule({ playhead: first.playhead });
    expect([...first.steps, ...second.steps].map((step) => step.step)).toEqual([0, 1, 2, 3]);
  });

  it('plays every second step late by the swing', () => {
    const swung = { ...SONG, swing: 50 };
    const times = schedule({ song: swung }).steps.map((step) => step.time);
    // 50% of half a step.
    expect(times).toEqual([0, STEP + STEP * 0.25, 2 * STEP, 3 * STEP + STEP * 0.25]);
  });

  it('follows the arrangement and starts over after it', () => {
    const lastStepOfVerse: Playhead = { slot: 1, step: 31, time: 0 };
    expect(
      positions({ playhead: { slot: 0, step: 15, time: 0 }, until: 2 * STEP - 0.001 }),
    ).toEqual(['0:15', '1:0']);
    expect(positions({ playhead: lastStepOfVerse, until: 2 * STEP - 0.001 })).toEqual([
      '1:31',
      '0:0',
    ]);
  });

  it('loops the pattern on screen in pattern mode', () => {
    const playhead: Playhead = { slot: 0, step: 31, time: 0 };
    expect(
      positions({ mode: 'pattern', editedPatternIndex: 1, playhead, until: 2 * STEP - 0.001 }),
    ).toEqual(['0:31', '0:0']);
  });

  it('moves on when an edit made the pattern shorter than the playhead', () => {
    const playhead: Playhead = { slot: 0, step: 20, time: 0 };
    expect(positions({ playhead, until: STEP - 0.001 })).toEqual(['1:0']);
  });

  it('starts over when an edit made the arrangement shorter than the playhead', () => {
    const playhead: Playhead = { slot: 5, step: 3, time: 0 };
    expect(positions({ playhead, until: STEP - 0.001 })).toEqual(['0:3']);
  });

  it('plays what the step holds', () => {
    const [first] = schedule({}).steps;
    expect(first?.pattern.name).toBe('intro');
    expect(first?.events).toMatchObject([{ kind: 'hit', velocity: 0.75 }]);
  });

  it('clicks on every beat with the metronome on, louder on the bar', () => {
    const until = 9 * STEP - 0.001;
    const clicks = schedule({ isMetronomeOn: true, until }).steps.flatMap((step) =>
      step.events.flatMap((event) =>
        event.kind === 'click' ? [`${step.step}${event.isBarStart ? ' bar' : ''}`] : [],
      ),
    );
    expect(clicks).toEqual(['0 bar', '4', '8']);
  });

  it('refuses a tempo that would never move forward', () => {
    expect(() => schedule({ song: { ...SONG, bpm: -120 } })).toThrow(RangeError);
    expect(() => schedule({ song: { ...SONG, bpm: 0 } })).toThrow(RangeError);
  });
});
