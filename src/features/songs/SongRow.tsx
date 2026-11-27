import { memo, type FC } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Preset } from '@/presets/catalog';
import { colors } from '@/theme/colors';
import { MIN_TOUCH_TARGET, radius, spacing } from '@/theme/spacing';
import { fontWeight, typography } from '@/theme/typography';

/** iOS shows a press by shrinking what is pressed a little; Android uses its ripple instead. */
const PRESSED_SCALE = 0.96;
const IS_IOS = Platform.OS === 'ios';
const RIPPLE = { color: colors.ripple, foreground: true } as const;

type SongRowProps = {
  readonly preset: Preset;
  readonly isPlaying: boolean;
  readonly onOpen: (preset: Preset) => void;
  readonly onPlay: (preset: Preset) => void;
  readonly onStop: () => void;
};

/**
 * One song: tap its title to open it in the studio, or its Play button to listen first. The two
 * are side by side, not nested, so screen readers reach both.
 */
export const SongRow: FC<SongRowProps> = memo(({ preset, isPlaying, onOpen, onPlay, onStop }) => {
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Open ${preset.title}`}
        accessibilityHint={preset.note}
        android_ripple={RIPPLE}
        onPress={() => onOpen(preset)}
        style={({ pressed }) => [styles.open, IS_IOS && pressed && styles.pressed]}
      >
        <Text style={styles.title}>{preset.title}</Text>
        <Text style={styles.note}>{preset.note}</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${isPlaying ? 'Stop' : 'Play'} ${preset.title}`}
        android_ripple={RIPPLE}
        onPress={() => (isPlaying ? onStop() : onPlay(preset))}
        style={({ pressed }) => [styles.listen, IS_IOS && pressed && styles.pressed]}
      >
        <Text style={styles.action}>{isPlaying ? 'Stop' : 'Play'}</Text>
      </Pressable>
    </View>
  );
});
SongRow.displayName = 'SongRow';

const styles = StyleSheet.create({
  row: {
    minHeight: MIN_TOUCH_TARGET,
    flexDirection: 'row',
    alignItems: 'stretch',
    borderRadius: radius.card,
    borderCurve: 'continuous',
    overflow: 'hidden',
    backgroundColor: colors.row,
  },
  pressed: {
    transform: [{ scale: PRESSED_SCALE }],
  },
  open: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.xs,
    paddingLeft: spacing.lg,
    paddingRight: spacing.sm,
    paddingVertical: spacing.md,
  },
  listen: {
    minWidth: MIN_TOUCH_TARGET,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
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
