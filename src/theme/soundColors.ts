import { soundGroup, type SoundGroup, type SoundId } from '@/domain/sounds/catalog';

/**
 * Each group of sounds has the color the web studio gives it, so a channel looks the same in both.
 * Plucked and Winds are the web's color-mix() blends, worked out.
 */
export const SOUND_GROUP_COLORS = {
  Drums: '#fb923c',
  Keys: '#7dd3fc',
  Plucked: '#c2af92',
  Synths: '#a78bfa',
  Winds: '#92affb',
  Bass: '#f0abfc',
} as const satisfies Record<SoundGroup, string>;

/** The outline of a soloed channel's light, as in the web studio. */
export const SOLO_COLOR = '#fbbf24';

export const soundColor = (sound: SoundId): string => SOUND_GROUP_COLORS[soundGroup(sound)];
