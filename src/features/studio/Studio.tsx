import { useCallback, type FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { Channel, Song } from '@/domain/song/types';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

import { ChannelRack } from './rack/ChannelRack';
import { TransportBar } from './transport/TransportBar';
import { useSongEditor, type StepTap } from './useSongEditor';
import { useStudioPlayback } from './useStudioPlayback';

type StudioProps = {
  readonly initialSong: Song;
};

/** The studio: the transport on top and the channel rack of the pattern on screen below it. */
export const Studio: FC<StudioProps> = ({ initialSong }) => {
  const editor = useSongEditor(initialSong);
  const playback = useStudioPlayback({
    song: editor.song,
    editedPatternIndex: editor.editedPatternIndex,
    onPatternPlaying: editor.showPattern,
  });
  const { tapStep } = editor;
  const { audition } = playback;
  const channels = editor.song.channels;

  const onTapStep = useCallback(
    (tap: StepTap) => {
      const value = tapStep(tap);
      const channel = channels.find((candidate) => candidate.id === tap.channelId);
      if (channel?.kind === 'drum') audition(channel, value);
    },
    [tapStep, audition, channels],
  );

  const onTapName = useCallback(
    (channel: Channel) => {
      if (channel.kind === 'drum') audition(channel, 1);
    },
    [audition],
  );

  return (
    <View style={styles.studio}>
      <TransportBar
        isPlaying={playback.isPlaying}
        mode={playback.mode}
        pattern={editor.pattern}
        bpm={editor.song.bpm}
        swing={editor.song.swing}
        onTogglePlay={playback.togglePlay}
        onTempoChange={editor.setTempo}
        onSwingChange={editor.setSwing}
      />
      {playback.notice !== undefined && (
        <Text
          selectable
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
          style={styles.notice}
        >
          {playback.notice}
        </Text>
      )}
      <ChannelRack
        channels={channels}
        pattern={editor.pattern}
        playhead={playback.playhead}
        onTapStep={onTapStep}
        onToggleMute={editor.toggleMute}
        onToggleSolo={editor.toggleSolo}
        onTapName={onTapName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  studio: {
    flex: 1,
    backgroundColor: colors.background,
  },
  notice: {
    ...typography.subhead,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    color: colors.label,
  },
});
