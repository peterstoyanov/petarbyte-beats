import type { Range } from './limits';
import type { DrumChannel, InstrumentChannel, Mixer } from './types';

type NumericSetting =
  | Exclude<keyof Mixer, 'muted' | 'soloed'>
  | keyof Pick<DrumChannel, 'pitch' | 'decay'>
  | keyof Pick<InstrumentChannel, 'releaseSeconds'>;

/** The allowed range of every number a channel has. The compiler checks that none is missing. */
export const SETTING_RANGES = {
  volume: { min: 0, max: 1 },
  pan: { min: -1, max: 1 },
  reverb: { min: 0, max: 1 },
  delay: { min: 0, max: 1 },
  cutoff: { min: 0, max: 1 },
  resonance: { min: 0, max: 1 },
  sidechain: { min: 0, max: 1 },
  pitch: { min: -24, max: 24 },
  decay: { min: 0.2, max: 3 },
  releaseSeconds: { min: 0, max: 4 },
} as const satisfies Record<NumericSetting, Range>;
