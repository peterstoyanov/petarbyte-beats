import { describe, expect, it } from '@jest/globals';
import { AudioContext } from 'react-native-audio-api';

import { musicbox } from '@/audio/sounds/instruments/mallets';

import { recordSounds } from '../../support/recordedSounds';

/** How many sources a music box note makes: its sine partials and the mallet's noise. */
const sourcesFor = (midi: number): number => {
  const context = new AudioContext();
  const { sources } = recordSounds(context);
  musicbox({
    context,
    output: context.destination,
    midi,
    time: 0,
    seconds: 1,
    velocity: 0.8,
    release: 0.8,
    resonance: 0,
    bpm: 120,
  });
  return sources.length;
};

describe('mallets', () => {
  it('leaves out partials too high to hear', () => {
    // Middle C has all four partials; at C7 the highest is above 18 kHz.
    expect(sourcesFor(60)).toBe(4 + 1);
    expect(sourcesFor(96)).toBe(3 + 1);
  });
});
