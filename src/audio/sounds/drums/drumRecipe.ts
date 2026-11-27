import type { AudioNode, BaseAudioContext } from 'react-native-audio-api';

import type { HiHatChoke } from '../hiHatChoke';

export type DrumHitSpec = {
  readonly context: BaseAudioContext;
  /** The channel strip the drum plays into. */
  readonly output: AudioNode;
  readonly time: number;
  readonly velocity: number;
  /** How much higher or lower the drum is tuned, as a factor: 2 is an octave up. */
  readonly pitch: number;
  /** How much longer or shorter the drum rings, as a factor. */
  readonly decay: number;
  readonly hiHatChoke: HiHatChoke;
};

/**
 * One drum, synthesized from oscillators, noise and filters. Its numbers (frequencies, times and
 * levels) are the sound itself, copied from the web studio, so they stay inline as a recipe.
 */
export type DrumRecipe = (spec: DrumHitSpec) => void;
