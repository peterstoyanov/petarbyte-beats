import { describe, expect, it, jest } from '@jest/globals';
import { AudioContext, type GainNode } from 'react-native-audio-api';

import { DRUM_RECIPES, playDrumHit } from '@/audio/sounds/drums/drumKit';
import { HiHatChoke } from '@/audio/sounds/hiHatChoke';
import { createDrumChannel } from '@/domain/song/channels';
import { requireChannelId } from '@/domain/song/ids';
import { VELOCITY_RANGE } from '@/domain/song/limits';
import { SETTING_RANGES } from '@/domain/song/settingRanges';
import { DRUMS, type DrumId } from '@/domain/sounds/catalog';

import { recordSounds } from '../support/recordedSounds';

const drumIds = Object.keys(DRUMS).filter((id): id is DrumId => id in DRUM_RECIPES);

/** The softest, shortest and lowest hit, and the loudest, longest and highest. */
const EXTREMES = [
  {
    velocity: VELOCITY_RANGE.min,
    decay: SETTING_RANGES.decay.min,
    pitch: 2 ** (SETTING_RANGES.pitch.min / 12),
  },
  {
    velocity: VELOCITY_RANGE.max,
    decay: SETTING_RANGES.decay.max,
    pitch: 2 ** (SETTING_RANGES.pitch.max / 12),
  },
];

/** Plays a drum at both extremes and records what it made. */
const recordDrum = (id: DrumId) => {
  const context = new AudioContext();
  const recorded = recordSounds(context);
  for (const extreme of EXTREMES) {
    DRUM_RECIPES[id]({
      context,
      output: context.destination,
      time: 1,
      hiHatChoke: new HiHatChoke(),
      ...extreme,
    });
  }
  return recorded;
};

describe('DRUM_RECIPES', () => {
  it('has a recipe for every drum in the catalog', () => {
    expect(Object.keys(DRUM_RECIPES).sort()).toEqual(Object.keys(DRUMS).sort());
  });

  it.each(drumIds)('%s starts and stops every source it makes', (id) => {
    const { sources } = recordDrum(id);
    expect(sources.length).toBeGreaterThan(0);
    expect(sources.every((source) => source.isStarted && source.isStopped)).toBe(true);
  });

  it.each(drumIds)('%s never ramps towards zero, which an exponential ramp cannot reach', (id) => {
    expect(recordDrum(id).exponentialTargets.every((target) => target > 0)).toBe(true);
  });
});

describe('playDrumHit', () => {
  it("tunes the drum by its channel's pitch in semitones", () => {
    const context = new AudioContext();
    const create = context.createOscillator.bind(context);
    const startingPitches: number[] = [];
    jest.spyOn(context, 'createOscillator').mockImplementation(() => {
      const oscillator = create();
      jest.spyOn(oscillator.frequency, 'setValueAtTime').mockImplementation((value) => {
        startingPitches.push(value);
        return oscillator.frequency;
      });
      return oscillator;
    });
    const channel = { ...createDrumChannel(requireChannelId('kick'), 'kick808'), pitch: 12 };

    playDrumHit({
      context,
      hit: { kind: 'hit', channel, velocity: 0.75 },
      time: 0,
      output: context.destination,
      hiHatChoke: new HiHatChoke(),
    });

    // The 808 kick starts at 160 Hz; an octave up is twice that.
    expect(startingPitches[0]).toBe(320);
  });
});

describe('the hats', () => {
  /** Plays an open hat, then another hat; true when the second cut the first off. */
  const chokes = (openHat: DrumId, nextHat: DrumId): boolean => {
    const context = new AudioContext();
    const hiHatChoke = new HiHatChoke();
    const ringing: GainNode[] = [];
    const ring = hiHatChoke.ring.bind(hiHatChoke);
    jest.spyOn(hiHatChoke, 'ring').mockImplementation((gain) => {
      ringing.push(gain);
      ring(gain);
    });
    const play = (id: DrumId, time: number) =>
      DRUM_RECIPES[id]({
        context,
        output: context.destination,
        time,
        velocity: 0.8,
        pitch: 1,
        decay: 1,
        hiHatChoke,
      });

    play(openHat, 1);
    const [openHatLevel] = ringing;
    if (openHatLevel === undefined) return false;
    const hold = jest.spyOn(openHatLevel.gain, 'cancelAndHoldAtTime');
    play(nextHat, 1.2);
    return hold.mock.calls.some(([time]) => time === 1.2);
  };

  it.each([
    ['openhat808', 'hat808'],
    ['openhat808', 'hat909'],
    ['openhat909', 'hat808'],
    ['openhat909', 'openhat808'],
  ] as const)('a ringing %s is choked by a %s', (openHat, nextHat) => {
    expect(chokes(openHat, nextHat)).toBe(true);
  });

  it('a cymbal does not choke an open hat', () => {
    expect(chokes('openhat808', 'crash')).toBe(false);
  });
});
