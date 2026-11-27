import type {
  AudioNode,
  AudioParam,
  BaseAudioContext,
  BiquadFilterNode,
  BiquadFilterType,
  GainNode,
  OscillatorNode,
  OscillatorType,
} from 'react-native-audio-api';

/** The Q a filter has unless a sound asks for more resonance. */
export const DEFAULT_Q = 0.7;

/** An exponential ramp cannot reach zero, so sounds fall to this level, which is silent. */
export const SILENCE = 0.0005;

const DEFAULT_ATTACK_SECONDS = 0.001;

export const gainNode = (context: BaseAudioContext, level = 1): GainNode => {
  const node = context.createGain();
  node.gain.value = level;
  return node;
};

type FilterSpec = {
  readonly type: BiquadFilterType;
  readonly frequency: number;
  readonly q?: number;
};

export const filterNode = (
  context: BaseAudioContext,
  { type, frequency, q = DEFAULT_Q }: FilterSpec,
): BiquadFilterNode => {
  const node = context.createBiquadFilter();
  node.type = type;
  node.frequency.value = frequency;
  node.Q.value = q;
  return node;
};

type OscillatorSpec = {
  readonly type: OscillatorType;
  readonly frequency: number;
  readonly start: number;
  readonly stop: number;
  /** In cents. */
  readonly detune?: number;
};

/** An oscillator already set to start and stop at the given times. */
export const scheduledOscillator = (
  context: BaseAudioContext,
  { type, frequency, start, stop, detune = 0 }: OscillatorSpec,
): OscillatorNode => {
  const node = context.createOscillator();
  node.type = type;
  node.frequency.setValueAtTime(frequency, start);
  if (detune !== 0) node.detune.value = detune;
  node.start(start);
  node.stop(stop);
  return node;
};

/** Connects the nodes one after another and returns the last, so the chain can go on from it. */
export const chain = (first: AudioNode, ...rest: readonly AudioNode[]): AudioNode =>
  rest.reduce((previous, next) => {
    previous.connect(next);
    return next;
  }, first);

type PercussiveEnvelopeSpec = {
  readonly start: number;
  readonly peak: number;
  /** How long the sound takes to die away after the attack. */
  readonly seconds: number;
  readonly attack?: number;
};

/** A struck sound: a fast rise to the peak, then an exponential fall to silence. */
export const percussiveEnvelope = (
  param: AudioParam,
  { start, peak, seconds, attack = DEFAULT_ATTACK_SECONDS }: PercussiveEnvelopeSpec,
): void => {
  param.setValueAtTime(0, start);
  param.linearRampToValueAtTime(peak, start + attack);
  param.exponentialRampToValueAtTime(SILENCE, start + attack + seconds);
};
