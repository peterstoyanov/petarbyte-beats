import type { BarCount } from './limits';
import type { DrumChannel, Master, Mixer, Song } from './types';

export const DEFAULT_MIXER: Mixer = {
  volume: 0.8,
  pan: 0,
  reverb: 0,
  delay: 0,
  cutoff: 1,
  resonance: 0,
  sidechain: 0,
  isMuted: false,
  isSoloed: false,
};

type DrumSettings = Pick<DrumChannel, 'pitch' | 'decay'>;

export const DEFAULT_DRUM_SETTINGS = { pitch: 0, decay: 1 } as const satisfies DrumSettings;

export const DEFAULT_MASTER: Master = { volume: 0.8, reverb: 0.8, delay: 0.6 };

export const DEFAULT_VELOCITY = 0.8;

type SongSettings = Pick<Song, 'bpm' | 'swing' | 'key'> & { readonly bars: BarCount };

/** What a song starts with when its code does not say otherwise. */
export const DEFAULT_SONG_SETTINGS = {
  bpm: 120,
  bars: 1,
  swing: 0,
  key: 'C major',
} as const satisfies SongSettings;
