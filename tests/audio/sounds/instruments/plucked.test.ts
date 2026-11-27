import { describe, expect, it, jest } from '@jest/globals';
import { AudioContext, type AudioBuffer } from 'react-native-audio-api';

import type { InstrumentRecipe } from '@/audio/sounds/instruments/instrumentRecipe';
import { guitar, harp } from '@/audio/sounds/instruments/plucked';
import type { MidiNote } from '@/domain/music/notes';

type Pluck = readonly [recipe: InstrumentRecipe, midi: MidiNote];

/** The string sound each plucked note plays, caught as its source is made. */
const stringSounds = (context: AudioContext, plucks: readonly Pluck[]) => {
  const sounds: (AudioBuffer | null)[] = [];
  const create = context.createBufferSource.bind(context);
  jest.spyOn(context, 'createBufferSource').mockImplementation(() => {
    const source = create();
    jest.spyOn(source, 'start').mockImplementation(() => {
      sounds.push(source.buffer);
    });
    return source;
  });
  for (const [recipe, midi] of plucks) {
    recipe({
      context,
      output: context.destination,
      midi,
      time: 0,
      seconds: 1,
      velocity: 0.8,
      release: 0.3,
      resonance: 0,
      bpm: 120,
    });
  }
  return sounds;
};

describe('plucked strings', () => {
  it('works out the sound of a note once and plays it again from there', () => {
    const [first, second] = stringSounds(new AudioContext(), [
      [guitar, 52],
      [guitar, 52],
    ]);
    expect(first).not.toBeNull();
    expect(second).toBe(first);
  });

  it('works out each note and each tone apart', () => {
    const [low, high, harpLow] = stringSounds(new AudioContext(), [
      [guitar, 52],
      [guitar, 64],
      [harp, 52],
    ]);
    expect(high).not.toBe(low);
    expect(harpLow).not.toBe(low);
  });

  it('keeps the sounds of each context apart, since each has its own sample rate', () => {
    const [first] = stringSounds(new AudioContext(), [[guitar, 52]]);
    const [second] = stringSounds(new AudioContext(), [[guitar, 52]]);
    expect(second).not.toBe(first);
  });

  it('rings longer on a low string than on a high one', () => {
    const [low, high] = stringSounds(new AudioContext(), [
      [guitar, 40],
      [guitar, 76],
    ]);
    expect(low?.duration ?? 0).toBeGreaterThan(high?.duration ?? 0);
  });
});
