import {
  INSTRUMENTS,
  isDrumId,
  type DrumId,
  type InstrumentId,
  type SoundId,
} from '../sounds/catalog';
import { DEFAULT_DRUM_SETTINGS, DEFAULT_MIXER } from './defaults';
import type { Channel, DrumChannel, InstrumentChannel } from './types';

export const createDrumChannel = (id: string, sound: DrumId): DrumChannel => ({
  kind: 'drum',
  id,
  sound,
  mixer: DEFAULT_MIXER,
  ...DEFAULT_DRUM_SETTINGS,
});

export const createInstrumentChannel = (id: string, sound: InstrumentId): InstrumentChannel => ({
  kind: 'instrument',
  id,
  sound,
  mixer: DEFAULT_MIXER,
  releaseSeconds: INSTRUMENTS[sound].releaseSeconds,
});

/** A channel with default settings for any sound: a drum channel for drums, otherwise an instrument. */
export const createChannel = (id: string, sound: SoundId): Channel =>
  isDrumId(sound) ? createDrumChannel(id, sound) : createInstrumentChannel(id, sound);
