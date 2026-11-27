import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react-native';
import type { PropsWithChildren } from 'react';

import { PlayerProvider } from '@/audio/player/PlayerProvider';
import { SongPlayer, type PlayOutcome } from '@/audio/player/songPlayer';
import type { ScheduledStep } from '@/domain/playback/scheduleSteps';
import { requirePatternName } from '@/domain/song/ids';
import type { DrumChannel, Song } from '@/domain/song/types';
import { useStudioPlayback } from '@/features/studio/useStudioPlayback';

import { songFrom } from '../../domain/editing/songFrom';

const LOOP = songFrom(
  'var song = new Song(bpm: 120);',
  'var kick = song.Drum(Drums.Kick808, "x...............");',
);
const ARRANGED = songFrom(
  'var song = new Song(bpm: 120);',
  'var kick = song.Drum(Drums.Kick808);',
  'var intro = song.Pattern(bars: 1);',
  'intro.Hits(kick, "x...............");',
  'var verse = song.Pattern(bars: 1);',
  'verse.Hits(kick, "....x...........");',
  'song.Arrange(intro, verse);',
);

const kickOf = (song: Song): DrumChannel => {
  const [kick] = song.channels;
  if (kick?.kind !== 'drum') throw new Error('The song has no drum channel first.');
  return kick;
};

const wrapper = ({ children }: PropsWithChildren) => <PlayerProvider>{children}</PlayerProvider>;

/** The studio's playback over a player the test watches instead of letting it sound. */
const renderPlayback = async (song: Song, outcome: PlayOutcome = 'playing') => {
  const player = {
    play: jest.spyOn(SongPlayer.prototype, 'play').mockResolvedValue(outcome),
    update: jest.spyOn(SongPlayer.prototype, 'update').mockImplementation(() => {}),
    stop: jest.spyOn(SongPlayer.prototype, 'stop'),
    audition: jest.spyOn(SongPlayer.prototype, 'audition').mockResolvedValue(),
    currentStep: jest
      .spyOn(SongPlayer.prototype, 'currentStep')
      .mockReturnValue(undefined as ScheduledStep | undefined),
  };
  const onPatternPlaying = jest.fn();
  const view = await renderHook(
    ({ current }: { current: Song }) =>
      useStudioPlayback({ song: current, editedPatternIndex: 0, onPatternPlaying }),
    { wrapper, initialProps: { current: song } },
  );
  return { ...view, player, onPatternPlaying };
};

const stepAt = (patternName: string, step: number): ScheduledStep => ({
  time: 0,
  slot: 0,
  patternName: requirePatternName(patternName),
  step,
  events: [],
});

/** Lets a play's promise settle. */
const settle = () => act(async () => {});

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe('useStudioPlayback', () => {
  it('loops the pattern on screen, or plays the arrangement when the song has one', async () => {
    expect((await renderPlayback(LOOP)).result.current.mode).toBe('pattern');
    expect((await renderPlayback(ARRANGED)).result.current.mode).toBe('song');
  });

  it('plays and stops', async () => {
    const { result, player } = await renderPlayback(LOOP);

    await act(() => result.current.togglePlay());
    await settle();
    expect(result.current.isPlaying).toBe(true);
    expect(player.play).toHaveBeenCalledWith({
      song: LOOP,
      mode: 'pattern',
      editedPatternIndex: 0,
      isMetronomeOn: false,
    });

    await act(() => result.current.togglePlay());
    expect(result.current.isPlaying).toBe(false);
    expect(player.stop).toHaveBeenCalled();
  });

  it('passes edits on while the song plays', async () => {
    const { result, rerender, player } = await renderPlayback(LOOP);
    await act(() => result.current.togglePlay());
    await settle();

    const faster = { ...LOOP, bpm: 140 };
    await rerender({ current: faster });
    expect(player.update).toHaveBeenLastCalledWith(expect.objectContaining({ song: faster }));
  });

  it('follows the step sounding now, and tells when the song moves on to a pattern', async () => {
    const { result, player, onPatternPlaying } = await renderPlayback(ARRANGED);
    await act(() => result.current.togglePlay());
    await settle();

    player.currentStep.mockReturnValue(stepAt('intro', 3));
    await act(() => jest.advanceTimersByTime(20));
    expect(result.current.playhead).toEqual({ patternName: 'intro', step: 3 });

    player.currentStep.mockReturnValue(stepAt('verse', 0));
    await act(() => jest.advanceTimersByTime(20));
    expect(result.current.playhead).toEqual({ patternName: 'verse', step: 0 });
    expect(onPatternPlaying.mock.calls).toEqual([['intro'], ['verse']]);

    await act(() => result.current.togglePlay());
    expect(result.current.playhead).toBeUndefined();
  });

  it('says when the piano is silent', async () => {
    const { result } = await renderPlayback(LOOP, 'playing-without-piano');
    await act(() => result.current.togglePlay());
    await settle();
    expect(result.current.notice).toBe(
      'The piano recordings did not load, so the piano is silent.',
    );
  });

  it('stops and says so when the song cannot play', async () => {
    const { result, player } = await renderPlayback(LOOP);
    player.play.mockRejectedValue(new Error('No audio'));
    await act(() => result.current.togglePlay());
    await settle();
    expect(result.current.isPlaying).toBe(false);
    expect(result.current.notice).toBe('Playback stopped because of an error. Try again.');
  });

  it('plays a tapped drum, loud hits harder, and a rest not at all', async () => {
    const { result, player } = await renderPlayback(LOOP);
    const kick = kickOf(LOOP);

    await act(() => result.current.audition(kick, 2));
    await act(() => result.current.audition(kick, 1));
    await act(() => result.current.audition(kick, 0));
    await settle();

    expect(player.audition.mock.calls).toEqual([
      [{ song: LOOP, channel: kick, velocity: 1 }],
      [{ song: LOOP, channel: kick, velocity: 0.75 }],
    ]);
  });

  it('stops the song when the studio closes, and touches no player if it never played', async () => {
    const quiet = await renderPlayback(LOOP);
    await quiet.unmount();
    expect(quiet.player.stop).not.toHaveBeenCalled();
    jest.restoreAllMocks();

    const playing = await renderPlayback(LOOP);
    await act(() => playing.result.current.togglePlay());
    await settle();
    await playing.unmount();
    expect(playing.player.stop).toHaveBeenCalled();
  });
});
