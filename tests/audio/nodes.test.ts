import { describe, expect, it } from '@jest/globals';
import { AudioContext } from 'react-native-audio-api';

import { chain, filterNode, gainNode, scheduledOscillator } from '@/audio/nodes';

describe('node helpers', () => {
  it('makes a gain node at full level unless told otherwise', () => {
    const context = new AudioContext();
    expect(gainNode(context).gain.value).toBe(1);
    expect(gainNode(context, 0.25).gain.value).toBe(0.25);
  });

  it('makes a filter with a gentle Q unless told otherwise', () => {
    const filter = filterNode(new AudioContext(), { type: 'highpass', frequency: 250 });
    expect([filter.type, filter.frequency.value, filter.Q.value]).toEqual(['highpass', 250, 0.7]);
  });

  it('tunes an oscillator, detuned only when asked', () => {
    const context = new AudioContext();
    const plain = scheduledOscillator(context, {
      type: 'square',
      frequency: 220,
      start: 0,
      stop: 1,
    });
    const wide = scheduledOscillator(context, {
      type: 'sawtooth',
      frequency: 220,
      start: 0,
      stop: 1,
      detune: 7,
    });
    expect([plain.type, plain.detune.value]).toEqual(['square', 0]);
    expect(wide.detune.value).toBe(7);
  });

  it('returns the last node of a chain, so it can go on from there', () => {
    const context = new AudioContext();
    const last = gainNode(context);
    expect(chain(gainNode(context), gainNode(context), last)).toBe(last);
  });
});
