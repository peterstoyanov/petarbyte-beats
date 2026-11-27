import { jest } from '@jest/globals';
import type { AudioParam, BaseAudioContext } from 'react-native-audio-api';

type SourceRecord = {
  isStarted: boolean;
  isStopped: boolean;
};

export type RecordedSounds = {
  /** One entry per oscillator and buffer source the context made. */
  readonly sources: SourceRecord[];
  /** The targets of every exponential ramp on a gain or a frequency. */
  readonly exponentialTargets: number[];
};

/**
 * Watches a context while a sound is made, since the library's mock records neither when sources
 * play nor how parameters move.
 */
export const recordSounds = (context: BaseAudioContext): RecordedSounds => {
  const recorded: RecordedSounds = { sources: [], exponentialTargets: [] };
  const watchRamps = (param: AudioParam) =>
    jest.spyOn(param, 'exponentialRampToValueAtTime').mockImplementation((value) => {
      recorded.exponentialTargets.push(value);
      return param;
    });

  const createOscillator = context.createOscillator.bind(context);
  jest.spyOn(context, 'createOscillator').mockImplementation(() => {
    const oscillator = createOscillator();
    watchSource(oscillator, recorded);
    watchRamps(oscillator.frequency);
    return oscillator;
  });

  const createBufferSource = context.createBufferSource.bind(context);
  jest.spyOn(context, 'createBufferSource').mockImplementation(() => {
    const source = createBufferSource();
    watchSource(source, recorded);
    return source;
  });

  const createGain = context.createGain.bind(context);
  jest.spyOn(context, 'createGain').mockImplementation(() => {
    const gain = createGain();
    watchRamps(gain.gain);
    return gain;
  });

  const createBiquadFilter = context.createBiquadFilter.bind(context);
  jest.spyOn(context, 'createBiquadFilter').mockImplementation(() => {
    const filter = createBiquadFilter();
    watchRamps(filter.frequency);
    return filter;
  });

  return recorded;
};

type PlayableSource = {
  start: (when?: number, offset?: number) => void;
  stop: (when?: number) => void;
};

const watchSource = (source: PlayableSource, recorded: RecordedSounds): void => {
  const record: SourceRecord = { isStarted: false, isStopped: false };
  recorded.sources.push(record);
  jest.spyOn(source, 'start').mockImplementation(() => {
    record.isStarted = true;
  });
  jest.spyOn(source, 'stop').mockImplementation(() => {
    record.isStopped = true;
  });
};
