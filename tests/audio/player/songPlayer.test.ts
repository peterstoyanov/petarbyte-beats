import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { AudioContext } from 'react-native-audio-api';

import { SongPlayer, type PlaybackSettings } from '@/audio/player/songPlayer';
import { parseSongCode } from '@/domain/csharp/parseSongCode';
import type { Song } from '@/domain/song/types';

const songFrom = (...lines: string[]): Song => {
  const result = parseSongCode(lines.join('\n'));
  if (result.status !== 'parsed') throw new Error(result.problem.message);
  return result.song;
};

/** A kick on every step at 120 BPM: one hit every 0.125 s, each with one burst of noise. */
const KICKS = songFrom(
  'var song = new Song(bpm: 120);',
  'var kick = song.Drum(Drums.Kick808, "xxxxxxxxxxxxxxxx");',
);

const settingsFor = (song: Song): PlaybackSettings => ({
  song,
  mode: 'pattern',
  editedPatternIndex: 0,
  isMetronomeOn: false,
});

/** A player on a context whose clock the test moves, counting the drum hits it plays. */
const playerOnClock = () => {
  const context = new AudioContext();
  let now = 0;
  jest.spyOn(context, 'currentTime', 'get').mockImplementation(() => now);
  const noise = jest.spyOn(context, 'createBufferSource');
  const onError = jest.fn();
  const player = new SongPlayer({ context, onError });
  /** Moves the audio clock and lets the scheduler wake up once. */
  const advanceTo = (seconds: number) => {
    now = seconds;
    jest.advanceTimersByTime(25);
  };
  return { context, player, onError, advanceTo, hits: () => noise.mock.calls.length };
};

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('SongPlayer', () => {
  it('schedules what is due straight away when it starts', async () => {
    const { player, hits } = playerOnClock();
    await player.play(settingsFor(KICKS));
    // The first step plays at 0.06 s; the next, at 0.185 s, is past the 0.12 s lookahead.
    expect(player.isPlaying).toBe(true);
    expect(hits()).toBe(1);
  });

  it('keeps scheduling a little ahead as the clock moves', async () => {
    const { player, advanceTo, hits } = playerOnClock();
    await player.play(settingsFor(KICKS));
    advanceTo(0.2);
    // Steps up to 0.32 s are due: 0.185, a little late now, still plays rather than being skipped,
    // and then 0.31.
    expect(hits()).toBe(3);
  });

  it('stops scheduling when stopped', async () => {
    const { player, advanceTo, hits } = playerOnClock();
    await player.play(settingsFor(KICKS));
    player.stop();
    advanceTo(1);
    expect(player.isPlaying).toBe(false);
    expect(hits()).toBe(1);
  });

  it('plays edits made while the song plays from the next step', async () => {
    const { player, advanceTo, hits } = playerOnClock();
    await player.play(settingsFor(KICKS));
    player.update(settingsFor(songFrom('var song = new Song(bpm: 120);')));
    advanceTo(1);
    expect(hits()).toBe(1);
  });

  it('follows the step that is sounding now', async () => {
    const { player, advanceTo } = playerOnClock();
    await player.play(settingsFor(KICKS));
    expect(player.currentStep()).toBeUndefined();
    advanceTo(0.2);
    expect(player.currentStep()?.step).toBe(1);
  });

  it('moves up to the clock after the app was in the background', async () => {
    const { player, advanceTo, hits } = playerOnClock();
    await player.play(settingsFor(KICKS));
    // Ten seconds pass with no timers: 80 steps' worth. Only those due from now on are played.
    advanceTo(10);
    expect(hits()).toBe(2);
    expect(player.currentStep()).toBeUndefined();
  });

  it('stops and says why when a tick goes wrong, instead of failing every 25 ms', async () => {
    const { player, onError, advanceTo } = playerOnClock();
    await player.play(settingsFor(KICKS));
    player.update(settingsFor({ ...KICKS, bpm: 0 }));
    advanceTo(0.2);
    expect(player.isPlaying).toBe(false);
    expect(onError).toHaveBeenCalledWith(expect.any(RangeError));
  });

  it('switches from the pattern to the arrangement while it plays', async () => {
    const parts = songFrom(
      'var song = new Song(bpm: 120);',
      'var kick = song.Drum(Drums.Kick808);',
      'var intro = song.Pattern(bars: 1);',
      'var drop = song.Pattern(bars: 1);',
      'drop.Hits(kick, "xxxxxxxxxxxxxxxx");',
      'song.Arrange(drop);',
    );
    const { player, advanceTo, hits } = playerOnClock();
    await player.play(settingsFor(parts));
    expect(hits()).toBe(0);
    player.update({ ...settingsFor(parts), mode: 'song' });
    advanceTo(0.2);
    expect(hits()).toBeGreaterThan(0);
  });

  it('refuses to play once disposed of', async () => {
    const { player } = playerOnClock();
    player.dispose();
    await expect(player.play(settingsFor(KICKS))).rejects.toThrow('disposed');
  });

  it('wakes a suspended context before it plays', async () => {
    const { context, player } = playerOnClock();
    jest.spyOn(context, 'state', 'get').mockReturnValue('suspended');
    const resume = jest.spyOn(context, 'resume');
    await player.play(settingsFor(KICKS));
    expect(resume).toHaveBeenCalled();
  });
});

describe('SongPlayer and the piano', () => {
  const PIANO = songFrom(
    'var song = new Song();',
    'var keys = song.Instrument(Instruments.GrandPiano);',
    'keys.Play(0, 4, "C4");',
  );

  it('loads the piano recordings before a song with a piano plays', async () => {
    const { context, player } = playerOnClock();
    const decode = jest.spyOn(context, 'decodeAudioData');
    expect(await player.play(settingsFor(PIANO))).toBe('playing');
    expect(decode).toHaveBeenCalled();
  });

  it('plays without the piano when its recordings fail to load', async () => {
    const { context, player } = playerOnClock();
    jest.spyOn(context, 'decodeAudioData').mockRejectedValue(new Error('No such file'));
    expect(await player.play(settingsFor(PIANO))).toBe('playing-without-piano');
    expect(player.isPlaying).toBe(true);
  });

  it('does not load the piano for a song without one', async () => {
    const { context, player } = playerOnClock();
    const decode = jest.spyOn(context, 'decodeAudioData');
    await player.play(settingsFor(KICKS));
    expect(decode).not.toHaveBeenCalled();
  });
});

describe('SongPlayer while the piano loads', () => {
  const PIANO = songFrom(
    'var song = new Song();',
    'var keys = song.Instrument(Instruments.GrandPiano);',
    'keys.Play(0, 4, "C4");',
  );

  /** Holds the piano's recordings back until the test lets them through. */
  const slowPiano = (context: AudioContext) => {
    let release = () => {};
    const ready = new Promise<void>((resolve) => {
      release = resolve;
    });
    const decode = context.decodeAudioData.bind(context);
    jest.spyOn(context, 'decodeAudioData').mockImplementation(async (input) => {
      await ready;
      return decode(input);
    });
    return { letThrough: () => release() };
  };

  it('does not start when stopped while it waits', async () => {
    const { context, player } = playerOnClock();
    const piano = slowPiano(context);
    const playing = player.play(settingsFor(PIANO));
    player.stop();
    piano.letThrough();
    expect(await playing).toBe('stopped');
    expect(player.isPlaying).toBe(false);
  });

  it('lets the later of two plays win, with one timer only', async () => {
    const { context, player, advanceTo, hits } = playerOnClock();
    const piano = slowPiano(context);
    const first = player.play(settingsFor(PIANO));
    const second = player.play(settingsFor(KICKS));
    piano.letThrough();

    expect(await first).toBe('stopped');
    expect(await second).toBe('playing');
    advanceTo(0.2);
    // One timer: three kicks by 0.32 s, not six.
    expect(hits()).toBe(3);
  });
});
