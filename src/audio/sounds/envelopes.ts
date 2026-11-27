import type { AudioParam } from 'react-native-audio-api';

/** setTargetAtTime gets about 95% of the way in three time constants. */
const TIME_CONSTANTS_TO_SETTLE = 3;
/** The shortest time constant used, so very short stages do not click. */
const SHORTEST_TIME_CONSTANT = 0.005;
/** The release is near silence after this many release times, so sources can stop there. */
const RELEASES_TO_SILENCE = 1.6;
const STOP_MARGIN_SECONDS = 0.05;
/** A key is held at least long enough for the attack to finish. */
const SHORTEST_HOLD_AFTER_ATTACK = 0.005;

type HeldEnvelopeSpec = {
  readonly start: number;
  /** How long the key is held down. */
  readonly seconds: number;
  readonly peak: number;
  readonly attack: number;
  readonly decay: number;
  /** The level held while the key is down, as a share of the peak. */
  readonly sustain: number;
  readonly release: number;
};

/**
 * An envelope that holds while the key is down: attack, decay to the sustain level, and release
 * after the key is let go. Returns the time the note is silent, when its sources can stop.
 */
export const heldEnvelope = (
  param: AudioParam,
  { start, seconds, peak, attack, decay, sustain, release }: HeldEnvelopeSpec,
): number => {
  param.setValueAtTime(0, start);
  param.linearRampToValueAtTime(peak, start + attack);
  param.setTargetAtTime(peak * sustain, start + attack, settleTime(decay));
  const keyUp = start + Math.max(seconds, attack + SHORTEST_HOLD_AFTER_ATTACK);
  param.setTargetAtTime(0, keyUp, settleTime(release));
  return keyUp + release * RELEASES_TO_SILENCE + STOP_MARGIN_SECONDS;
};

const settleTime = (seconds: number): number =>
  Math.max(SHORTEST_TIME_CONSTANT, seconds / TIME_CONSTANTS_TO_SETTLE);
