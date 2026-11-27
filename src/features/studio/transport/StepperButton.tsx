import { type FC } from 'react';
import { Platform, Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '@/theme/colors';
import { MIN_TOUCH_TARGET } from '@/theme/spacing';
import { fontWeight, typography } from '@/theme/typography';

const PRESSED_SCALE = 0.96;
const IS_IOS = Platform.OS === 'ios';
const RIPPLE = { color: colors.ripple, borderless: true } as const;

type StepperButtonProps = {
  readonly symbol: '−' | '+';
  readonly accessibilityLabel: string;
  readonly isDisabled: boolean;
  readonly onPress: () => void;
};

/** A minus or plus button beside a value. */
export const StepperButton: FC<StepperButtonProps> = ({
  symbol,
  accessibilityLabel,
  isDisabled,
  onPress,
}) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: isDisabled }}
      disabled={isDisabled}
      android_ripple={RIPPLE}
      onPress={onPress}
      style={({ pressed }) => [styles.button, IS_IOS && pressed && styles.pressed]}
    >
      <Text style={[styles.symbol, isDisabled && styles.disabled]}>{symbol}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: MIN_TOUCH_TARGET,
    height: MIN_TOUCH_TARGET,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    transform: [{ scale: PRESSED_SCALE }],
  },
  symbol: {
    ...typography.body,
    fontWeight: fontWeight.semibold,
    color: colors.accent,
  },
  disabled: {
    color: colors.secondaryLabel,
  },
});
