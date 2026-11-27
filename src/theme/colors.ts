import { Color } from 'expo-router';
import { Platform, type ColorValue } from 'react-native';

/**
 * The system's own colors, which follow light and dark mode and the user's contrast settings by
 * themselves. iOS uses UIKit's semantic colors, Android its Material 3 dynamic ones.
 */
export const colors = {
  label: Platform.select<ColorValue>({
    ios: Color.ios.label,
    android: Color.android.dynamic.onSurface,
    default: '#000000',
  }),
  secondaryLabel: Platform.select<ColorValue>({
    ios: Color.ios.secondaryLabel,
    android: Color.android.dynamic.onSurfaceVariant,
    default: '#3c3c43',
  }),
  background: Platform.select<ColorValue>({
    ios: Color.ios.systemGroupedBackground,
    android: Color.android.dynamic.surface,
    default: '#f2f2f7',
  }),
  row: Platform.select<ColorValue>({
    ios: Color.ios.secondarySystemGroupedBackground,
    android: Color.android.dynamic.surfaceContainer,
    default: '#ffffff',
  }),
  accent: Platform.select<ColorValue>({
    ios: Color.ios.systemBlue,
    android: Color.android.dynamic.primary,
    default: '#007aff',
  }),
  /** Text on the accent color, such as the Play button's. */
  onAccent: Platform.select<ColorValue>({
    ios: '#ffffff',
    android: Color.android.dynamic.onPrimary,
    default: '#ffffff',
  }),
  /** An empty step of the channel rack. */
  cell: Platform.select<ColorValue>({
    ios: Color.ios.tertiarySystemFill,
    android: Color.android.dynamic.surfaceContainerHighest,
    default: '#e5e5ea',
  }),
  /** Every second beat's steps, a shade apart so the beats can be counted. */
  cellAlternate: Platform.select<ColorValue>({
    ios: Color.ios.secondarySystemFill,
    android: Color.android.dynamic.surfaceContainerHigh,
    default: '#d1d1d6',
  }),
  separator: Platform.select<ColorValue>({
    ios: Color.ios.separator,
    android: Color.android.dynamic.outlineVariant,
    default: '#c6c6c8',
  }),
  ripple: Platform.select<ColorValue>({
    android: Color.android.dynamic.onSurfaceVariant,
    default: 'transparent',
  }),
} as const;
