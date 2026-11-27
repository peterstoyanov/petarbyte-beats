import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { PlayerProvider } from '@/audio/player/PlayerProvider';
import { SongPlayer } from '@/audio/player/songPlayer';
import { Studio } from '@/features/studio/Studio';

import { songFrom } from '../../domain/editing/songFrom';

const SONG = songFrom(
  'var song = new Song(bpm: 120);',
  'var kick = song.Drum(Drums.Kick808, "x...............");',
);

const renderStudio = async () => {
  const player = {
    play: jest.spyOn(SongPlayer.prototype, 'play').mockResolvedValue('playing'),
    update: jest.spyOn(SongPlayer.prototype, 'update').mockImplementation(() => {}),
    audition: jest.spyOn(SongPlayer.prototype, 'audition').mockResolvedValue(),
  };
  await render(
    <PlayerProvider>
      <Studio initialSong={SONG} />
    </PlayerProvider>,
  );
  return player;
};

const settle = () => act(async () => {});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Studio', () => {
  it('sets a hit where a step is tapped, and lets it be heard', async () => {
    const player = await renderStudio();
    await fireEvent.press(screen.getByLabelText('kick, step 5'));
    await settle();

    expect(screen.getByLabelText('kick, step 5')).toHaveAccessibilityValue({ text: 'hit' });
    expect(player.audition).toHaveBeenCalledWith(
      expect.objectContaining({ channel: SONG.channels[0], velocity: 0.75 }),
    );
  });

  it('clears a hit without a sound', async () => {
    const player = await renderStudio();
    await fireEvent.press(screen.getByLabelText('kick, step 1'));
    await settle();

    expect(screen.getByLabelText('kick, step 1')).toHaveAccessibilityValue({ text: 'rest' });
    expect(player.audition).not.toHaveBeenCalled();
  });

  it('plays the edited song, and passes later edits on', async () => {
    const player = await renderStudio();
    await fireEvent.press(screen.getByLabelText('Play'));
    await settle();
    expect(player.play).toHaveBeenCalledWith(expect.objectContaining({ mode: 'pattern' }));

    await fireEvent.press(screen.getByLabelText('Faster'));
    expect(player.update).toHaveBeenLastCalledWith(
      expect.objectContaining({ song: expect.objectContaining({ bpm: 121 }) }),
    );
    expect(screen.getByLabelText('Stop')).toBeOnTheScreen();
  });

  it('mutes a channel from its light', async () => {
    await renderStudio();
    await fireEvent.press(screen.getByLabelText('Mute kick'));
    expect(screen.getByLabelText('Mute kick')).toBeChecked();
  });
});
