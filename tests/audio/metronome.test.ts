import { describe, expect, it, jest } from '@jest/globals';
import { AudioContext, type OscillatorNode } from 'react-native-audio-api';

import { playClick } from '@/audio/metronome';

/** The pitch of the click's tone, caught as the click creates it. */
const clickPitch = (isBarStart: boolean): number | undefined => {
  const context = new AudioContext();
  const create = context.createOscillator.bind(context);
  const tones: OscillatorNode[] = [];
  jest.spyOn(context, 'createOscillator').mockImplementation(() => {
    const tone = create();
    tones.push(tone);
    return tone;
  });

  playClick(context, { time: 2, isBarStart, output: context.destination });
  return tones[0]?.frequency.value;
};

describe('playClick', () => {
  it('clicks higher on the first beat of a bar', () => {
    expect(clickPitch(true)).toBe(1800);
    expect(clickPitch(false)).toBe(1200);
  });
});
