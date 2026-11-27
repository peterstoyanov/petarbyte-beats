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
  ripple: Platform.select<ColorValue>({
    android: Color.android.dynamic.onSurfaceVariant,
    default: 'transparent',
  }),
} as const;
