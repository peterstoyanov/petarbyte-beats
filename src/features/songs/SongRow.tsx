import { memo, type FC } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Preset } from '@/presets/catalog';
import { colors } from '@/theme/colors';
import { MIN_TOUCH_TARGET, radius, spacing } from '@/theme/spacing';
import { fontWeight, typography } from '@/theme/typography';

/** iOS shows a press by shrinking the row a little; Android uses its ripple instead. */
const PRESSED_SCALE = 0.96;
const IS_IOS = Platform.OS === 'ios';
const RIPPLE = { color: colors.ripple, foreground: true } as const;

type SongRowProps = {
  readonly preset: Preset;
  readonly isPlaying: boolean;
  readonly onPlay: (preset: Preset) => void;
  readonly onStop: () => void;
};

/** One song: its title and what to listen for, and whether it is playing. Tap to play or stop. */
export const SongRow: FC<SongRowProps> = memo(({ preset, isPlaying, onPlay, onStop }) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${isPlaying ? 'Stop' : 'Play'} ${preset.title}`}
      android_ripple={RIPPLE}
      onPress={() => (isPlaying ? onStop() : onPlay(preset))}
      style={({ pressed }) => [styles.row, IS_IOS && pressed && styles.pressed]}
    >
      <View style={styles.text}>
        <Text style={styles.title}>{preset.title}</Text>
        <Text style={styles.note}>{preset.note}</Text>
      </View>
      <Text style={styles.action}>{isPlaying ? 'Stop' : 'Play'}</Text>
    </Pressable>
  );
});
SongRow.displayName = 'SongRow';

const styles = StyleSheet.create({
  row: {
    minHeight: MIN_TOUCH_TARGET,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.card,
    borderCurve: 'continuous',
    overflow: 'hidden',
    backgroundColor: colors.row,
  },
  pressed: {
    transform: [{ scale: PRESSED_SCALE }],
  },
  text: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    ...typography.body,
    fontWeight: fontWeight.semibold,
    color: colors.label,
  },
  note: {
    ...typography.subhead,
    color: colors.secondaryLabel,
  },
  action: {
    ...typography.subhead,
    fontWeight: fontWeight.semibold,
    color: colors.accent,
  },
});
