import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { AudioContext } from 'react-native-audio-api';

import { PlayerProvider } from '@/audio/player/PlayerProvider';
import { SongPlayer, type PlayOutcome } from '@/audio/player/songPlayer';
import * as scheduler from '@/domain/playback/scheduleSteps';
import { SongList } from '@/features/songs/SongList';

/** The song list with the app's player, which the test watches instead of letting it sound. */
const renderSongList = async (outcome: PlayOutcome = 'playing') => {
  const play = jest.spyOn(SongPlayer.prototype, 'play').mockResolvedValue(outcome);
  const stop = jest.spyOn(SongPlayer.prototype, 'stop');
  const onOpen = jest.fn();
  const view = await render(
    <PlayerProvider>
      <SongList onOpen={onOpen} />
    </PlayerProvider>,
  );
  return { play, stop, onOpen, view };
};

const tap = (label: string) => fireEvent.press(screen.getByLabelText(label));

/** A play that the test answers when it chooses. */
const deferredPlay = () => {
  let answer: (outcome: PlayOutcome) => void = () => {};
  let refuse: (error: Error) => void = () => {};
  const promise = new Promise<PlayOutcome>((resolve, reject) => {
    answer = resolve;
    refuse = reject;
  });
  return { promise, answer, refuse };
};

afterEach(() => {
  jest.restoreAllMocks();
});

describe('SongList', () => {
  it("lists the songs in the web studio's sections", async () => {
    await renderSongList();
    expect(screen.getByText('Songs (about 1:30, also on the radio)')).toBeOnTheScreen();
    expect(screen.getByText('Neon Rooftop')).toBeOnTheScreen();
    expect(
      screen.getByText('Trap, 140 BPM: a bell hook, a long 808, hi-hat rolls'),
    ).toBeOnTheScreen();
  });

  it('plays a song when its Play button is tapped, through its arrangement', async () => {
    const { play } = await renderSongList();
    await tap('Play Neon Rooftop');

    expect(play).toHaveBeenCalledWith(expect.objectContaining({ mode: 'song' }));
    expect(await screen.findByLabelText('Stop Neon Rooftop')).toBeOnTheScreen();
  });

  it('opens a song in the studio when its title is tapped', async () => {
    const { onOpen } = await renderSongList();
    await tap('Open Neon Rooftop');
    expect(onOpen).toHaveBeenCalledWith(expect.objectContaining({ title: 'Neon Rooftop' }));
  });

  it('stops the song playing here when one is opened, and starts no audio otherwise', async () => {
    const { stop } = await renderSongList();
    await tap('Open Golden Hour');
    expect(stop).not.toHaveBeenCalled();

    await tap('Play Neon Rooftop');
    await tap('Open Golden Hour');
    expect(stop).toHaveBeenCalled();
    expect(screen.getByLabelText('Play Neon Rooftop')).toBeOnTheScreen();
  });

  it('stops the song when it is tapped again', async () => {
    const { stop } = await renderSongList();
    await tap('Play Neon Rooftop');
    await tap('Stop Neon Rooftop');

    expect(stop).toHaveBeenCalled();
    expect(screen.getByLabelText('Play Neon Rooftop')).toBeOnTheScreen();
  });

  it('plays one song at a time', async () => {
    await renderSongList();
    await tap('Play Neon Rooftop');
    await tap('Play Golden Hour');

    expect(screen.getByLabelText('Play Neon Rooftop')).toBeOnTheScreen();
    expect(screen.getByLabelText('Stop Golden Hour')).toBeOnTheScreen();
  });

  it('says so when the piano is silent', async () => {
    await renderSongList('playing-without-piano');
    await tap('Play Neon Rooftop');
    expect(await screen.findByText(/piano is silent/)).toBeOnTheScreen();
  });

  it('says so when playback fails, and shows the song as stopped', async () => {
    const { play } = await renderSongList();
    play.mockRejectedValueOnce(new Error('No audio device'));
    await tap('Play Neon Rooftop');

    expect(await screen.findByText(/stopped because of an error/)).toBeOnTheScreen();
    await waitFor(() => expect(screen.getByLabelText('Play Neon Rooftop')).toBeOnTheScreen());
  });

  it('does not let a late failure of an earlier song stop the one playing now', async () => {
    const { play } = await renderSongList();
    const first = deferredPlay();
    play.mockReturnValueOnce(first.promise);
    await tap('Play Neon Rooftop');
    await tap('Play Golden Hour');

    first.refuse(new Error('Too late'));
    await waitFor(() => expect(screen.getByLabelText('Stop Golden Hour')).toBeOnTheScreen());
    expect(screen.queryByText(/stopped because of an error/)).toBeNull();
  });

  it('leaves the newer song alone when the earlier play ends as stopped', async () => {
    const { play } = await renderSongList();
    const first = deferredPlay();
    play.mockReturnValueOnce(first.promise);
    await tap('Play Neon Rooftop');
    await tap('Play Golden Hour');

    first.answer('stopped');
    await waitFor(() => expect(screen.getByLabelText('Stop Golden Hour')).toBeOnTheScreen());
  });
});

describe('SongList with the real player', () => {
  it('says so when an error stops a song while it plays', async () => {
    jest.spyOn(scheduler, 'scheduleSteps').mockImplementation(() => {
      throw new RangeError('A broken tempo');
    });
    await render(
      <PlayerProvider>
        <SongList onOpen={() => {}} />
      </PlayerProvider>,
    );
    await tap('Play Neon Rooftop');

    expect(await screen.findByText(/stopped because of an error/)).toBeOnTheScreen();
    expect(screen.getByLabelText('Play Neon Rooftop')).toBeOnTheScreen();
  });

  it('closes the audio when the app closes', async () => {
    const close = jest.spyOn(AudioContext.prototype, 'close');
    const dispose = jest.spyOn(SongPlayer.prototype, 'dispose');
    jest.spyOn(SongPlayer.prototype, 'play').mockResolvedValue('playing');
    const view = await render(
      <PlayerProvider>
        <SongList onOpen={() => {}} />
      </PlayerProvider>,
    );
    await tap('Play Neon Rooftop');

    await view.unmount();

    expect(dispose).toHaveBeenCalled();
    expect(close).toHaveBeenCalled();
  });
});
