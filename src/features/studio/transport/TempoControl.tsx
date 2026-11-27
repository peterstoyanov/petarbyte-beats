import { useState, type FC } from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';

import { SONG_LIMITS } from '@/domain/song/limits';
import { colors } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

import { StepperButton } from './StepperButton';

const TEMPO_FIELD_WIDTH = 56;
const MAX_DIGITS = 3;

type TempoControlProps = {
  readonly bpm: number;
  readonly onChange: (bpm: number) => void;
};

/**
 * The tempo, typed in like the web studio's display or nudged a beat per minute at a time. What is
 * typed counts once the field is left; the song keeps the tempo within its limits.
 */
export const TempoControl: FC<TempoControlProps> = ({ bpm, onChange }) => {
  const { min, max } = SONG_LIMITS.bpm;
  /** What is being typed; the song's tempo shows when nothing is. */
  const [draft, setDraft] = useState<string | undefined>(undefined);

  const commit = () => {
    // An empty field reads as NaN, which leaves the tempo as it was.
    if (draft !== undefined) onChange(Number.parseInt(draft, 10));
    setDraft(undefined);
  };

  return (
    <View style={styles.control}>
      <StepperButton
        symbol="−"
        accessibilityLabel="Slower"
        isDisabled={bpm <= min}
        onPress={() => onChange(bpm - 1)}
      />
      <View style={styles.value}>
        <Text style={styles.caption}>BPM</Text>
        <TextInput
          accessibilityLabel="Tempo in beats per minute"
          value={draft ?? String(bpm)}
          onChangeText={setDraft}
          onEndEditing={commit}
          onSubmitEditing={commit}
          keyboardType="number-pad"
          returnKeyType="done"
          maxLength={MAX_DIGITS}
          selectTextOnFocus
          style={styles.field}
        />
      </View>
      <StepperButton
        symbol="+"
        accessibilityLabel="Faster"
        isDisabled={bpm >= max}
        onPress={() => onChange(bpm + 1)}
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
  field: {
    ...typography.body,
    width: TEMPO_FIELD_WIDTH,
    paddingVertical: Platform.select({ android: 0, default: spacing.xs }),
    borderRadius: radius.step,
    borderCurve: 'continuous',
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
    color: colors.label,
    backgroundColor: colors.cell,
  },
});
