import type { AudioNode, BaseAudioContext } from 'react-native-audio-api';

import { chain, filterNode, gainNode, scheduledOscillator, percussiveEnvelope } from './nodes';

const BAR_CLICK_HZ = 1800;
const BEAT_CLICK_HZ = 1200;
const CLICK_RING_SECONDS = 0.05;
const CLICK_LEVEL = 0.18;
const CLICK_DECAY_SECONDS = 0.03;
const CLICK_LOW_CUT_HZ = 600;

type ClickSpec = {
  readonly time: number;
  /** The first beat of a bar clicks higher. */
  readonly isBarStart: boolean;
  /** The speakers: the click skips the desk, so no mix setting changes it. */
  readonly output: AudioNode;
};

export const playClick = (
  context: BaseAudioContext,
  { time, isBarStart, output }: ClickSpec,
): void => {
  const tone = scheduledOscillator(context, {
    type: 'square',
    frequency: isBarStart ? BAR_CLICK_HZ : BEAT_CLICK_HZ,
    start: time,
    stop: time + CLICK_RING_SECONDS,
  });
  const level = gainNode(context, 0);
  percussiveEnvelope(level.gain, { start: time, peak: CLICK_LEVEL, seconds: CLICK_DECAY_SECONDS });
  chain(
    tone,
    filterNode(context, { type: 'highpass', frequency: CLICK_LOW_CUT_HZ }),
    level,
    output,
  );
};
