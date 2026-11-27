import { memo, useCallback, useMemo, type FC } from 'react';
import { StyleSheet, View } from 'react-native';

import type { StepTap } from '@/features/studio/useSongEditor';
import type { Steps } from '@/domain/song/limits';
import { stepCount } from '@/domain/song/limits';
import type { Channel, Pattern } from '@/domain/song/types';
import { soundColor } from '@/theme/soundColors';

import { ROW_HEIGHT } from './rackLayout';
import { DrumStepCell, NoteStepCell } from './StepCell';
import { drumStepLooks, noteStepLooks } from './stepLooks';

type ChannelStepsProps = {
  readonly channel: Channel;
  readonly pattern: Pattern;
  readonly stepWidth: number;
  readonly onTapStep: (tap: StepTap) => void;
};

/** A channel's steps in the pattern on screen: drum hits to tap, or where instrument notes lie. */
export const ChannelSteps: FC<ChannelStepsProps> = memo(
  ({ channel, pattern, stepWidth, onTapStep }) => {
    const steps = stepCount(pattern.bars);
    const hits = channel.kind === 'drum' ? pattern.hits[channel.id] : undefined;
    const notes = channel.kind === 'instrument' ? pattern.notes[channel.id] : undefined;
    const looks = useMemo(
      () => (hits !== undefined ? drumStepLooks(hits) : noteStepLooks(notes ?? [], steps)),
      [hits, notes, steps],
    );
    const color = soundColor(channel.sound);
    const { id } = channel;
    const onTap = useCallback(
      (step: Steps, isLoud: boolean) => onTapStep({ channelId: id, step, isLoud }),
      [id, onTapStep],
    );

    return (
      <View
        style={styles.row}
        // An instrument's steps only show its notes, so they are read out as one summary.
        accessible={channel.kind === 'instrument'}
        accessibilityLabel={
          channel.kind === 'instrument' ? `${id}, ${noteCount(notes)} in this pattern` : undefined
        }
      >
        {looks.map((look, step) =>
          channel.kind === 'drum' ? (
            <DrumStepCell
              key={step}
              step={step}
              look={look}
              width={stepWidth}
              color={color}
              channelName={id}
              onTap={onTap}
            />
          ) : (
            <NoteStepCell key={step} step={step} look={look} width={stepWidth} color={color} />
          ),
        )}
      </View>
    );
  },
);
ChannelSteps.displayName = 'ChannelSteps';

const noteCount = (notes: readonly unknown[] | undefined): string => {
  const count = notes?.length ?? 0;
  return count === 1 ? '1 note' : `${count} notes`;
};

const styles = StyleSheet.create({
  row: {
    height: ROW_HEIGHT,
    flexDirection: 'row',
  },
});
