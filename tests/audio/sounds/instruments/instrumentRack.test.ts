import { describe, expect, it, jest } from '@jest/globals';
import { AudioContext, type BiquadFilterNode } from 'react-native-audio-api';

import {
  INSTRUMENT_RECIPES,
  playNoteStart,
  type SynthesizedInstrumentId,
} from '@/audio/sounds/instruments/instrumentRack';
import { PianoSampler } from '@/audio/piano/pianoSampler';
import { createInstrumentChannel } from '@/domain/song/channels';
import { requireChannelId } from '@/domain/song/ids';
import { SONG_LIMITS, VELOCITY_RANGE } from '@/domain/song/limits';
import { INSTRUMENTS } from '@/domain/sounds/catalog';

import { recordSounds } from '../../support/recordedSounds';

const instrumentIds = Object.keys(INSTRUMENTS).filter(
  (id): id is SynthesizedInstrumentId => id in INSTRUMENT_RECIPES,
);

/** Plays the lowest note short, soft and slow, and the highest long, loud and fast. */
const recordInstrument = (id: SynthesizedInstrumentId) => {
  const context = new AudioContext();
  const recorded = recordSounds(context);
  const { lowest, highest, releaseSeconds } = INSTRUMENTS[id];
  const extremes = [
    {
      midi: lowest,
      seconds: 0.01,
      velocity: VELOCITY_RANGE.min,
      resonance: 0,
      bpm: SONG_LIMITS.bpm.min,
    },
    {
      midi: highest,
      seconds: 8,
      velocity: VELOCITY_RANGE.max,
      resonance: 1,
      bpm: SONG_LIMITS.bpm.max,
    },
  ];
  for (const extreme of extremes) {
    INSTRUMENT_RECIPES[id]({
      context,
      output: context.destination,
      time: 1,
      release: releaseSeconds,
      ...extreme,
    });
  }
  return recorded;
};

type PlayOptions = {
  readonly resonance?: number;
  readonly piano?: PianoSampler;
};

/** Plays one note on a channel with the given instrument. */
const playNote = (
  context: AudioContext,
  sound: 'piano' | SynthesizedInstrumentId,
  { resonance = 0, piano = new PianoSampler(context) }: PlayOptions = {},
) => {
  const base = createInstrumentChannel(requireChannelId('lead'), sound);
  const channel = { ...base, mixer: { ...base.mixer, resonance } };
  playNoteStart({
    context,
    output: context.destination,
    time: 0,
    bpm: 120,
    note: { kind: 'note', channel, midi: 48, velocity: 0.8, seconds: 0.5 },
    piano,
  });
};

describe('INSTRUMENT_RECIPES', () => {
  it('has a recipe for every instrument in the catalog but the recorded piano', () => {
    const synthesized = Object.keys(INSTRUMENTS).filter((id) => id !== 'piano');
    expect(Object.keys(INSTRUMENT_RECIPES).sort()).toEqual(synthesized.sort());
  });

  it.each(instrumentIds)('%s starts and stops every source it makes', (id) => {
    const { sources } = recordInstrument(id);
    expect(sources.length).toBeGreaterThan(0);
    expect(sources.every((source) => source.isStarted && source.isStopped)).toBe(true);
  });

  it.each(instrumentIds)('%s never ramps towards zero', (id) => {
    expect(recordInstrument(id).exponentialTargets.every((target) => target > 0)).toBe(true);
  });
});

describe('playNoteStart', () => {
  it("turns the acid bass's squelch up with the channel's resonance", () => {
    const context = new AudioContext();
    const create = context.createBiquadFilter.bind(context);
    const filters: BiquadFilterNode[] = [];
    jest.spyOn(context, 'createBiquadFilter').mockImplementation(() => {
      const filter = create();
      filters.push(filter);
      return filter;
    });

    playNote(context, 'acid', { resonance: 0.5 });

    expect(filters[0]?.Q.value).toBe(15);
  });

  it('plays the grand piano from its recordings, a little longer and softer', () => {
    const context = new AudioContext();
    const piano = new PianoSampler(context);
    const play = jest.spyOn(piano, 'play').mockReturnValue();

    playNote(context, 'piano', { piano });

    const release = INSTRUMENTS.piano.releaseSeconds;
    expect(play).toHaveBeenCalledWith(
      expect.objectContaining({ midi: 48, seconds: 0.5 + release * 0.4, velocity: 0.8 * 0.95 }),
    );
  });
});
