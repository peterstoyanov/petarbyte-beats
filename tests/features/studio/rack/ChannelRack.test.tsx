import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Dimensions } from 'react-native';

import { requireChannelId, requirePatternName } from '@/domain/song/ids';
import type { Song } from '@/domain/song/types';
import { ChannelRack } from '@/features/studio/rack/ChannelRack';
import { stepWidth } from '@/features/studio/rack/rackLayout';
import type { Playhead } from '@/features/studio/useStudioPlayback';

import { songFrom } from '../../../domain/editing/songFrom';

const SONG = songFrom(
  'var song = new Song();',
  'var kick = song.Drum(Drums.Kick808, "x...............");',
  'var lead = song.Instrument(Instruments.Pluck);',
  'lead.Play(0, 2, "C4");',
  'lead.Play(4, 1, "E4");',
);

const renderRack = async ({ song = SONG, playhead }: { song?: Song; playhead?: Playhead } = {}) => {
  const handlers = {
    onTapStep: jest.fn(),
    onToggleMute: jest.fn(),
    onToggleSolo: jest.fn(),
    onTapName: jest.fn(),
  };
  await render(
    <ChannelRack
      channels={song.channels}
      pattern={song.patterns[0]}
      playhead={playhead}
      {...handlers}
    />,
  );
  return handlers;
};

describe('ChannelRack', () => {
  it('names each channel and the sound it plays', async () => {
    await renderRack();
    expect(screen.getByLabelText('kick, 808 Kick')).toBeOnTheScreen();
    expect(screen.getByLabelText('lead, Pluck')).toBeOnTheScreen();
  });

  it('reads out each drum step and what is on it', async () => {
    await renderRack();
    expect(screen.getByLabelText('kick, step 1')).toHaveAccessibilityValue({ text: 'hit' });
    expect(screen.getByLabelText('kick, step 2')).toHaveAccessibilityValue({ text: 'rest' });
  });

  it('sets a hit on a tap and a loud hit on a long press', async () => {
    const { onTapStep } = await renderRack();
    await fireEvent.press(screen.getByLabelText('kick, step 3'));
    await fireEvent(screen.getByLabelText('kick, step 4'), 'longPress');

    const kick = requireChannelId('kick');
    expect(onTapStep.mock.calls).toEqual([
      [{ channelId: kick, step: 2, isLoud: false }],
      [{ channelId: kick, step: 3, isLoud: true }],
    ]);
  });

  it('offers the loud hit to screen reader users as an action', async () => {
    const { onTapStep } = await renderRack();
    await fireEvent(screen.getByLabelText('kick, step 5'), 'accessibilityAction', {
      nativeEvent: { actionName: 'longpress' },
    });
    expect(onTapStep).toHaveBeenCalledWith(expect.objectContaining({ step: 4, isLoud: true }));
  });

  it('mutes on a tap of the light and solos on a long press', async () => {
    const { onToggleMute, onToggleSolo } = await renderRack();
    await fireEvent.press(screen.getByLabelText('Mute kick'));
    await fireEvent(screen.getByLabelText('Mute kick'), 'longPress');
    expect(onToggleMute).toHaveBeenCalledWith('kick');
    expect(onToggleSolo).toHaveBeenCalledWith('kick');
  });

  it('shows a muted and a soloed channel as such', async () => {
    const [kick, lead] = SONG.channels;
    if (kick === undefined || lead === undefined) throw new Error('The song has two channels.');
    const song = {
      ...SONG,
      channels: [
        { ...kick, mixer: { ...kick.mixer, isMuted: true } },
        { ...lead, mixer: { ...lead.mixer, isSoloed: true } },
      ],
    };
    await renderRack({ song });
    expect(screen.getByLabelText('Mute kick')).toBeChecked();
    expect(screen.getByLabelText('Mute lead')).toHaveAccessibilityValue({ text: 'soloed' });
  });

  it('passes a tapped name on', async () => {
    const { onTapName } = await renderRack();
    await fireEvent.press(screen.getByLabelText('kick, 808 Kick'));
    expect(onTapName).toHaveBeenCalledWith(SONG.channels[0]);
  });

  it('sums up an instrument row, whose notes are drawn in the piano roll', async () => {
    await renderRack();
    expect(screen.getByLabelText('lead, 2 notes in this pattern')).toBeOnTheScreen();
  });

  it('lights up the step playing in the pattern on screen only', async () => {
    const name = SONG.patterns[0].name;
    await renderRack({ playhead: { patternName: name, step: 4 } });
    const width = stepWidth(Dimensions.get('window').width, 16);
    expect(screen.getByTestId('playhead')).toHaveStyle({ left: 4 * width, width });

    await renderRack({ playhead: { patternName: requirePatternName('other'), step: 4 } });
    expect(screen.queryByTestId('playhead')).not.toBeOnTheScreen();
  });
});
