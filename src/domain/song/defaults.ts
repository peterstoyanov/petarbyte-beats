import type { Master, Mixer } from './types';

export const DEFAULT_MIXER: Mixer = {
  volume: 0.8,
  pan: 0,
  reverb: 0,
  delay: 0,
  cutoff: 1,
  resonance: 0,
  sidechain: 0,
  muted: false,
  soloed: false,
};

export const DEFAULT_DRUM_SETTINGS = { pitch: 0, decay: 1 } as const;

export const DEFAULT_MASTER: Master = { volume: 0.8, reverb: 0.8, delay: 0.6 };

export const DEFAULT_VELOCITY = 0.8;

/** What a song starts with when its code does not say otherwise. */
export const DEFAULT_SONG_SETTINGS = { bpm: 120, bars: 1, swing: 0, key: 'C major' } as const;
