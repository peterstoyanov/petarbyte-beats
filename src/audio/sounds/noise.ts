import type { AudioBuffer, AudioBufferSourceNode, BaseAudioContext } from 'react-native-audio-api';

const NOISE_SECONDS = 2;
/** Each burst starts somewhere in the noise, so no two hits sound exactly alike. */
const LATEST_OFFSET_SECONDS = 1.2;
/** Bursts play a little past their length, so their envelope ends before the sound does. */
const TAIL_SECONDS = 0.05;

const noiseByContext = new WeakMap<BaseAudioContext, AudioBuffer>();

type NoiseBurstSpec = {
  readonly start: number;
  readonly seconds: number;
};

/**
 * A burst of white noise, already set to start and stop; the raw sound of snares and hats. The
 * noise loops, so a long burst, such as a riser at a high decay, never runs out before it ends.
 * The web studio does not loop it, so there its long bursts can stop early.
 */
export const noiseBurst = (
  context: BaseAudioContext,
  { start, seconds }: NoiseBurstSpec,
): AudioBufferSourceNode => {
  const source = context.createBufferSource();
  source.buffer = whiteNoise(context);
  source.loop = true;
  source.start(start, Math.random() * LATEST_OFFSET_SECONDS);
  source.stop(start + seconds + TAIL_SECONDS);
  return source;
};

/** Noise made once per context and shared by every burst. */
const whiteNoise = (context: BaseAudioContext): AudioBuffer => {
  const cached = noiseByContext.get(context);
  if (cached !== undefined) return cached;

  const noise = context.createBuffer(1, context.sampleRate * NOISE_SECONDS, context.sampleRate);
  const samples = noise.getChannelData(0);
  for (let index = 0; index < samples.length; index++) samples[index] = Math.random() * 2 - 1;
  noiseByContext.set(context, noise);
  return noise;
};
