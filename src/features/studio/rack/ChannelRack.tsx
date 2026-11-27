import { type FC } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

import type { ChannelId } from '@/domain/song/ids';
import { stepCount } from '@/domain/song/limits';
import type { Channel, Pattern } from '@/domain/song/types';
import type { StepTap } from '@/features/studio/useSongEditor';
import type { Playhead } from '@/features/studio/useStudioPlayback';
import { colors } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';

import { ChannelLabel } from './ChannelLabel';
import { ChannelSteps } from './ChannelSteps';
import { stepWidth as stepWidthFor } from './rackLayout';
import { useFollowPlayhead } from './useFollowPlayhead';

const PLAYHEAD_BORDER_WIDTH = 1;
/** How much the playing step's column is tinted, as the web studio's 20% mix. */
const PLAYHEAD_OPACITY = 0.2;

type ChannelRackProps = {
  readonly channels: readonly Channel[];
  readonly pattern: Pattern;
  readonly playhead: Playhead | undefined;
  readonly onTapStep: (tap: StepTap) => void;
  readonly onToggleMute: (channelId: ChannelId) => void;
  readonly onToggleSolo: (channelId: ChannelId) => void;
  readonly onTapName: (channel: Channel) => void;
};

/**
 * The channel rack: a row per channel with its light, its name and its steps in the pattern on
 * screen. The names stay put while long patterns scroll sideways, and the step playing lights up.
 */
export const ChannelRack: FC<ChannelRackProps> = ({
  channels,
  pattern,
  playhead,
  onTapStep,
  onToggleMute,
  onToggleSolo,
  onTapName,
}) => {
  const { width: windowWidth } = useWindowDimensions();
  const steps = stepCount(pattern.bars);
  const stepWidth = stepWidthFor(windowWidth, steps);
  const playingStep = playhead?.patternName === pattern.name ? playhead.step : undefined;
  const { scrollerRef, onScroll, onLayout, onScrollBeginDrag, onScrollEndDrag } = useFollowPlayhead(
    {
      step: playingStep,
      stepWidth,
    },
  );

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
      <View style={styles.rack}>
        <View>
          {channels.map((channel) => (
            <ChannelLabel
              key={channel.id}
              channel={channel}
              onToggleMute={onToggleMute}
              onToggleSolo={onToggleSolo}
              onTapName={onTapName}
            />
          ))}
        </View>
        <ScrollView
          horizontal
          ref={scrollerRef}
          onScroll={onScroll}
          onLayout={onLayout}
          onScrollBeginDrag={onScrollBeginDrag}
          onScrollEndDrag={onScrollEndDrag}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ width: steps * stepWidth }}>
            {channels.map((channel) => (
              <ChannelSteps
                key={channel.id}
                channel={channel}
                pattern={pattern}
                stepWidth={stepWidth}
                onTapStep={onTapStep}
              />
            ))}
            {playingStep !== undefined && (
              <View
                pointerEvents="none"
                testID="playhead"
                style={[styles.playhead, { left: playingStep * stepWidth, width: stepWidth }]}
              >
                <View style={[StyleSheet.absoluteFill, styles.playheadTint]} />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
  },
  rack: {
    flexDirection: 'row',
  },
  playhead: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    borderRadius: radius.step,
    borderCurve: 'continuous',
    borderWidth: PLAYHEAD_BORDER_WIDTH,
    borderColor: colors.accent,
    overflow: 'hidden',
  },
  playheadTint: {
    backgroundColor: colors.accent,
    opacity: PLAYHEAD_OPACITY,
  },
});
