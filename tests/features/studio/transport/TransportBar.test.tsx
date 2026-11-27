import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';

import type { PlayMode } from '@/domain/playback/scheduleSteps';
import { TransportBar } from '@/features/studio/transport/TransportBar';

import { songFrom } from '../../../domain/editing/songFrom';

const SONG = songFrom('var song = new Song(bpm: 120, swing: 20);');

const renderBar = async ({
  isPlaying = false,
  mode = 'pattern',
  bpm = 120,
  swing = 20,
}: { isPlaying?: boolean; mode?: PlayMode; bpm?: number; swing?: number } = {}) => {
  const handlers = { onTogglePlay: jest.fn(), onTempoChange: jest.fn(), onSwingChange: jest.fn() };
  await render(
    <TransportBar
      isPlaying={isPlaying}
      mode={mode}
      pattern={SONG.patterns[0]}
      bpm={bpm}
      swing={swing}
      {...handlers}
    />,
  );
  return handlers;
};

describe('TransportBar', () => {
  it('plays, and offers to stop while playing', async () => {
    const { onTogglePlay } = await renderBar();
    await fireEvent.press(screen.getByLabelText('Play'));
    expect(onTogglePlay).toHaveBeenCalled();

    await renderBar({ isPlaying: true });
    expect(screen.getByLabelText('Stop')).toBeOnTheScreen();
  });

  it('says whether it loops the pattern or plays the song', async () => {
    await renderBar({ mode: 'song' });
    expect(screen.getByText(/^Song · /)).toBeOnTheScreen();
  });

  it('nudges the tempo a beat per minute at a time', async () => {
    const { onTempoChange } = await renderBar();
    await fireEvent.press(screen.getByLabelText('Faster'));
    await fireEvent.press(screen.getByLabelText('Slower'));
    expect(onTempoChange.mock.calls).toEqual([[121], [119]]);
  });

  it('takes a typed tempo once the field is left, and ignores an empty one', async () => {
    const { onTempoChange } = await renderBar();
    const field = screen.getByLabelText('Tempo in beats per minute');
    await fireEvent.changeText(field, '96');
    expect(onTempoChange).not.toHaveBeenCalled();
    await fireEvent(field, 'endEditing');
    expect(onTempoChange).toHaveBeenLastCalledWith(96);

    await fireEvent.changeText(field, '');
    await fireEvent(field, 'endEditing');
    expect(onTempoChange).toHaveBeenLastCalledWith(Number.NaN);
    expect(field).toHaveDisplayValue('120');
  });

  it('stops nudging at the limits', async () => {
    await renderBar({ bpm: 240, swing: 0 });
    expect(screen.getByLabelText('Faster')).toBeDisabled();
    expect(screen.getByLabelText('Less swing')).toBeDisabled();
  });

  it('moves the swing in steps of 5%, by button or screen reader', async () => {
    const { onSwingChange } = await renderBar();
    await fireEvent.press(screen.getByLabelText('More swing'));
    await fireEvent(screen.getByLabelText('Swing'), 'accessibilityAction', {
      nativeEvent: { actionName: 'decrement' },
    });
    expect(onSwingChange.mock.calls).toEqual([[25], [15]]);
    expect(screen.getByLabelText('Swing')).toHaveAccessibilityValue({ text: '20%' });
  });
});
