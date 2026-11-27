import { type FC } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import type { PlayMode } from '@/domain/playback/scheduleSteps';
import type { Pattern } from '@/domain/song/types';
import { colors } from '@/theme/colors';
import { MIN_TOUCH_TARGET, radius, spacing } from '@/theme/spacing';
import { fontWeight, typography } from '@/theme/typography';

import { SwingControl } from './SwingControl';
import { TempoControl } from './TempoControl';

const PLAY_BUTTON_WIDTH = 88;
const PRESSED_SCALE = 0.96;
const IS_IOS = Platform.OS === 'ios';
const RIPPLE = { color: colors.ripple, foreground: true } as const;
/** The web studio's two modes: loop the pattern on screen, or play the arrangement. */
const MODE_LABELS = {
  pattern: 'Pattern',
  song: 'Song',
} as const satisfies Record<PlayMode, string>;

type TransportBarProps = {
  readonly isPlaying: boolean;
  readonly mode: PlayMode;
  readonly pattern: Pattern;
  readonly bpm: number;
  readonly swing: number;
  readonly onTogglePlay: () => void;
  readonly onTempoChange: (bpm: number) => void;
  readonly onSwingChange: (swing: number) => void;
};

/** Play and Stop, what plays, and the tempo and the swing. */
export const TransportBar: FC<TransportBarProps> = ({
  isPlaying,
  mode,
  pattern,
  bpm,
  swing,
  onTogglePlay,
  onTempoChange,
  onSwingChange,
}) => {
  return (
    <View style={styles.bar}>
      <View style={styles.top}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isPlaying ? 'Stop' : 'Play'}
          android_ripple={RIPPLE}
          onPress={onTogglePlay}
          style={({ pressed }) => [styles.play, IS_IOS && pressed && styles.pressed]}
        >
          <Text style={styles.playLabel}>{isPlaying ? 'Stop' : 'Play'}</Text>
        </Pressable>
        <Text numberOfLines={1} style={styles.playing}>
          {MODE_LABELS[mode]} · <Text style={styles.pattern}>{pattern.name}</Text>
        </Text>
      </View>
      <View style={styles.settings}>
        <TempoControl bpm={bpm} onChange={onTempoChange} />
        <SwingControl swing={swing} onChange={onSwingChange} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
    backgroundColor: colors.background,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  play: {
    minWidth: PLAY_BUTTON_WIDTH,
    minHeight: MIN_TOUCH_TARGET,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    borderRadius: radius.card,
    borderCurve: 'continuous',
    overflow: 'hidden',
    backgroundColor: colors.accent,
  },
  pressed: {
    transform: [{ scale: PRESSED_SCALE }],
  },
  playLabel: {
    ...typography.body,
    fontWeight: fontWeight.semibold,
    color: colors.onAccent,
  },
  playing: {
    ...typography.subhead,
    flex: 1,
    color: colors.secondaryLabel,
  },
  pattern: {
    fontWeight: fontWeight.semibold,
    color: colors.label,
  },
  settings: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
});
