import { type FC } from 'react';
import { StyleSheet, Text, View, type AccessibilityActionEvent } from 'react-native';

import { SONG_LIMITS } from '@/domain/song/limits';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

import { StepperButton } from './StepperButton';

/** The swing moves in steps of 5%, as the web studio's knob does. */
const SWING_STEP = 5;
const ADJUST_ACTIONS = [{ name: 'increment' }, { name: 'decrement' }] as const;

type SwingControlProps = {
  readonly swing: number;
  readonly onChange: (swing: number) => void;
};

/** How late every second step plays, in percent. */
export const SwingControl: FC<SwingControlProps> = ({ swing, onChange }) => {
  const { min, max } = SONG_LIMITS.swing;
  const onAction = (event: AccessibilityActionEvent) =>
    onChange(swing + (event.nativeEvent.actionName === 'increment' ? SWING_STEP : -SWING_STEP));

  return (
    <View style={styles.control}>
      <StepperButton
        symbol="−"
        accessibilityLabel="Less swing"
        isDisabled={swing <= min}
        onPress={() => onChange(swing - SWING_STEP)}
      />
      <View
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel="Swing"
        accessibilityValue={{ min, max, now: swing, text: `${swing}%` }}
        accessibilityActions={ADJUST_ACTIONS}
        onAccessibilityAction={onAction}
        style={styles.value}
      >
        <Text style={styles.caption}>Swing</Text>
        <Text style={styles.number}>{swing}%</Text>
      </View>
      <StepperButton
        symbol="+"
        accessibilityLabel="More swing"
        isDisabled={swing >= max}
        onPress={() => onChange(swing + SWING_STEP)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  control: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    alignItems: 'center',
  },
  caption: {
    ...typography.caption,
    color: colors.secondaryLabel,
  },
  number: {
    ...typography.body,
    fontVariant: ['tabular-nums'],
    color: colors.label,
  },
});
