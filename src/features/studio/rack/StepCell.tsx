import { memo, type FC } from 'react';
import { Pressable, StyleSheet, View, type AccessibilityActionEvent } from 'react-native';

import type { Steps } from '@/domain/song/limits';
import { colors } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';

import { isShadedBeat, type StepLook } from './stepLooks';

const LOUD_BORDER_WIDTH = 2;
/** How strongly a held note tints its steps, as the web studio's 30% mix. */
const HELD_OPACITY = 0.3;
const ACCESSIBILITY_ACTIONS = [
  { name: 'activate' },
  { name: 'longpress', label: 'Set a loud hit' },
] as const;
const SPOKEN_LOOKS = {
  rest: 'rest',
  hit: 'hit',
  loud: 'loud hit',
  held: 'held',
} as const satisfies Record<StepLook, string>;

type StepCellProps = {
  readonly step: Steps;
  readonly look: StepLook;
  readonly width: number;
  readonly color: string;
};

type DrumStepCellProps = StepCellProps & {
  readonly channelName: string;
  /** A tap sets a hit; a long press, a loud one. */
  readonly onTap: (step: Steps, isLoud: boolean) => void;
};

/** One step of a drum channel: tap to set or clear a hit, long press for a loud hit. */
export const DrumStepCell: FC<DrumStepCellProps> = memo(
  ({ step, look, width, color, channelName, onTap }) => {
    const onAccessibilityAction = (event: AccessibilityActionEvent) => {
      onTap(step, event.nativeEvent.actionName === 'longpress');
    };
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${channelName}, step ${step + 1}`}
        accessibilityValue={{ text: SPOKEN_LOOKS[look] }}
        accessibilityActions={ACCESSIBILITY_ACTIONS}
        onAccessibilityAction={onAccessibilityAction}
        onPress={() => onTap(step, false)}
        onLongPress={() => onTap(step, true)}
        style={[styles.cell, { width }]}
      >
        <StepMark step={step} look={look} color={color} />
      </Pressable>
    );
  },
);
DrumStepCell.displayName = 'DrumStepCell';

/** One step of an instrument channel; its notes are drawn in the piano roll. */
export const NoteStepCell: FC<StepCellProps> = memo(({ step, look, width, color }) => {
  return (
    <View style={[styles.cell, styles.noteCell, { width }]}>
      <StepMark step={step} look={look} color={color} />
    </View>
  );
});
NoteStepCell.displayName = 'NoteStepCell';

type StepMarkProps = Omit<StepCellProps, 'width'>;

const StepMark: FC<StepMarkProps> = ({ step, look, color }) => {
  const empty = isShadedBeat(step) ? styles.shaded : styles.empty;
  return (
    <View style={[styles.mark, empty]}>
      {look !== 'rest' && (
        <View
          style={[
            StyleSheet.absoluteFill,
            styles.fill,
            { backgroundColor: color },
            look === 'held' && styles.held,
            look === 'loud' && styles.loud,
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    height: '100%',
    padding: spacing.xs / 2,
  },
  noteCell: {
    paddingVertical: spacing.sm,
  },
  mark: {
    flex: 1,
    borderRadius: radius.step,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  empty: {
    backgroundColor: colors.cell,
  },
  shaded: {
    backgroundColor: colors.cellAlternate,
  },
  fill: {
    borderRadius: radius.step,
    borderCurve: 'continuous',
  },
  held: {
    opacity: HELD_OPACITY,
  },
  loud: {
    borderWidth: LOUD_BORDER_WIDTH,
    borderColor: colors.label,
  },
});
