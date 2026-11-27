import type { AudioNode, BaseAudioContext } from 'react-native-audio-api';

import type { DrumHit } from '@/domain/playback/stepEvents';
import type { DrumId } from '@/domain/sounds/catalog';

import type { HiHatChoke } from '../hiHatChoke';
import {
  cowbell,
  block,
  bongo,
  claves,
  conga,
  shaker,
  sweep,
  tomhi,
  tomlo,
  zap,
} from './percussion';
import { crash, hat808, hat909, openhat808, openhat909, ride, tamb, triangle } from './cymbals';
import type { DrumRecipe } from './drumRecipe';
import { kick808, kick909, kickhard, kicklofi } from './kicks';
import { clap, rim, snap, snare808, snare909 } from './snares';

const SEMITONES_PER_OCTAVE = 12;

/** Every drum of the catalog, by id. */
export const DRUM_RECIPES = {
  kick808,
  kick909,
  kicklofi,
  snare808,
  snare909,
  clap,
  snap,
  rim,
  hat808,
  openhat808,
  hat909,
  openhat909,
  shaker,
  tomlo,
  tomhi,
  conga,
  cowbell,
  crash,
  ride,
  zap,
  kickhard,
  tamb,
  triangle,
  claves,
  bongo,
  block,
  sweep,
} as const satisfies Record<DrumId, DrumRecipe>;

type PlayDrumSpec = {
  readonly context: BaseAudioContext;
  readonly hit: DrumHit;
  readonly time: number;
  /** The channel's strip on the desk. */
  readonly output: AudioNode;
  readonly hiHatChoke: HiHatChoke;
};

/** Plays a drum hit, tuned and shortened by its channel's pitch and decay. */
export const playDrumHit = ({ context, hit, time, output, hiHatChoke }: PlayDrumSpec): void => {
  const { channel, velocity } = hit;
  DRUM_RECIPES[channel.sound]({
    context,
    output,
    time,
    velocity,
    pitch: 2 ** (channel.pitch / SEMITONES_PER_OCTAVE),
    decay: channel.decay,
    hiHatChoke,
  });
};
