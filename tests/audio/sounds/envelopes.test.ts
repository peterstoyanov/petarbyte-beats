import { describe, expect, it, jest } from '@jest/globals';
import { AudioContext } from 'react-native-audio-api';

import { gainNode } from '@/audio/nodes';
import { heldEnvelope } from '@/audio/sounds/envelopes';

const envelope = { peak: 0.5, attack: 0.01, decay: 0.3, sustain: 0.6, release: 0.5 };

describe('heldEnvelope', () => {
  it('rises to the peak, settles to the sustain level, and lets go when the key is up', () => {
    const level = gainNode(new AudioContext());
    const rise = jest.spyOn(level.gain, 'linearRampToValueAtTime');
    const settle = jest.spyOn(level.gain, 'setTargetAtTime');

    heldEnvelope(level.gain, { start: 1, seconds: 2, ...envelope });

    expect(rise).toHaveBeenCalledWith(0.5, 1.01);
    expect(settle.mock.calls[0]?.[0]).toBeCloseTo(0.3);
    expect(settle.mock.calls[0]?.[1]).toBeCloseTo(1.01);
    expect(settle.mock.calls[1]?.slice(0, 2)).toEqual([0, 3]);
  });

  it('says when the note is silent: 1.6 releases after the key is up', () => {
    const level = gainNode(new AudioContext());
    expect(heldEnvelope(level.gain, { start: 1, seconds: 2, ...envelope })).toBeCloseTo(3.85);
  });

  it('lets go quickly but smoothly with no release at all', () => {
    const level = gainNode(new AudioContext());
    const settle = jest.spyOn(level.gain, 'setTargetAtTime');
    const silent = heldEnvelope(level.gain, { start: 1, seconds: 2, ...envelope, release: 0 });
    expect(settle.mock.calls[1]).toEqual([0, 3, 0.005]);
    expect(silent).toBeCloseTo(3.05);
  });

  it('holds a very short note long enough to finish its attack', () => {
    const level = gainNode(new AudioContext());
    const settle = jest.spyOn(level.gain, 'setTargetAtTime');
    heldEnvelope(level.gain, { start: 1, seconds: 0, ...envelope });
    expect(settle.mock.calls[1]?.[1]).toBeCloseTo(1.015);
  });
});
