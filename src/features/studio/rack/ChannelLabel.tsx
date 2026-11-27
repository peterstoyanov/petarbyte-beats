import { memo, type FC } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type AccessibilityActionEvent,
} from 'react-native';

import type { ChannelId } from '@/domain/song/ids';
import { soundLabel } from '@/domain/sounds/catalog';
import type { Channel } from '@/domain/song/types';
import { colors } from '@/theme/colors';
import { SOLO_COLOR, soundColor } from '@/theme/soundColors';
import { MIN_TOUCH_TARGET, spacing } from '@/theme/spacing';
import { fontWeight, typography } from '@/theme/typography';

import { LABEL_WIDTH, ROW_HEIGHT } from './rackLayout';

const LIGHT_SIZE = 12;
const SOLO_RING_WIDTH = 2;
const NAME_STRIPE_WIDTH = 3;
const NAME_RADIUS = 7;
const PRESSED_SCALE = 0.96;
const IS_IOS = Platform.OS === 'ios';
const RIPPLE = { color: colors.ripple, foreground: true } as const;
const LIGHT_ACTIONS = [{ name: 'activate' }, { name: 'longpress', label: 'Solo' }] as const;

type ChannelLabelProps = {
  readonly channel: Channel;
  readonly onToggleMute: (channelId: ChannelId) => void;
  readonly onToggleSolo: (channelId: ChannelId) => void;
  /** A tap on the name plays a drum once, as in the web studio. */
  readonly onTapName: (channel: Channel) => void;
};

/**
 * The start of a channel's row: its light, lit while it can be heard (tap to mute, long press to
 * solo), and its name with the sound it plays.
 */
export const ChannelLabel: FC<ChannelLabelProps> = memo(
  ({ channel, onToggleMute, onToggleSolo, onTapName }) => {
    const { id, mixer, sound } = channel;
    const color = soundColor(sound);
    const onLightAction = (event: AccessibilityActionEvent) =>
      event.nativeEvent.actionName === 'longpress' ? onToggleSolo(id) : onToggleMute(id);

    return (
      <View style={styles.label}>
        <Pressable
          accessibilityRole="switch"
          accessibilityLabel={`Mute ${id}`}
          accessibilityState={{ checked: mixer.isMuted }}
          accessibilityValue={mixer.isSoloed ? { text: 'soloed' } : undefined}
          accessibilityActions={LIGHT_ACTIONS}
          onAccessibilityAction={onLightAction}
          onPress={() => onToggleMute(id)}
          onLongPress={() => onToggleSolo(id)}
          style={styles.lightTarget}
        >
          <View
            style={[
              styles.light,
              !mixer.isMuted && { backgroundColor: color },
              mixer.isSoloed && styles.soloed,
            ]}
          />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${id}, ${soundLabel(sound)}`}
          android_ripple={RIPPLE}
          onPress={() => onTapName(channel)}
          style={({ pressed }) => [
            styles.name,
            { borderLeftColor: color },
            IS_IOS && pressed && styles.pressed,
          ]}
        >
          <Text numberOfLines={1} style={styles.id}>
            {id}
          </Text>
          <Text numberOfLines={1} style={styles.sound}>
            {soundLabel(sound)}
          </Text>
        </Pressable>
      </View>
    );
  },
);
ChannelLabel.displayName = 'ChannelLabel';

const styles = StyleSheet.create({
  label: {
    width: LABEL_WIDTH,
    height: ROW_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lightTarget: {
    width: MIN_TOUCH_TARGET,
    height: MIN_TOUCH_TARGET,
    alignItems: 'center',
    justifyContent: 'center',
  },
  light: {
    width: LIGHT_SIZE,
    height: LIGHT_SIZE,
    borderRadius: LIGHT_SIZE / 2,
    backgroundColor: colors.cell,
  },
  soloed: {
    outlineColor: SOLO_COLOR,
    outlineWidth: SOLO_RING_WIDTH,
    outlineOffset: 1,
    outlineStyle: 'solid',
  },
  name: {
    flex: 1,
    height: ROW_HEIGHT - spacing.sm,
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
    borderRadius: NAME_RADIUS,
    borderCurve: 'continuous',
    borderLeftWidth: NAME_STRIPE_WIDTH,
    overflow: 'hidden',
    backgroundColor: colors.row,
  },
  pressed: {
    transform: [{ scale: PRESSED_SCALE }],
  },
  id: {
    ...typography.footnote,
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
    fontWeight: fontWeight.semibold,
    color: colors.label,
  },
  sound: {
    ...typography.caption,
    color: colors.secondaryLabel,
  },
});
