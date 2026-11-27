import { describe, expect, it, jest } from '@jest/globals';
import { AudioContext } from 'react-native-audio-api';

import { HiHatChoke } from '@/audio/sounds/hiHatChoke';
import { DRUM_RECIPES, playDrumHit } from '@/audio/sounds/drums/drumKit';
import { createDrumChannel } from '@/domain/song/channels';
import { requireChannelId } from '@/domain/song/ids';
import { DRUMS, type DrumId } from '@/domain/sounds/catalog';

const drumIds = Object.keys(DRUMS).filter((id): id is DrumId => id in DRUM_RECIPES);

describe('DRUM_RECIPES', () => {
  it('has a recipe for every drum in the catalog', () => {
    expect(Object.keys(DRUM_RECIPES).sort()).toEqual(Object.keys(DRUMS).sort());
  });

  it.each(drumIds)('plays %s', (id) => {
    const context = new AudioContext();
    expect(() =>
      DRUM_RECIPES[id]({
        context,
        output: context.destination,
        time: 0,
        velocity: 0.75,
        pitch: 1,
        decay: 1,
        hiHatChoke: new HiHatChoke(),
      }),
    ).not.toThrow();
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
