import { describe, expect, it, jest } from '@jest/globals';
import { AudioContext } from 'react-native-audio-api';

import {
  applyMixer,
  createChannelStrip,
  cutoffHz,
  duckStrip,
  peakLevel,
} from '@/audio/channelStrip';
import { createMasterBus } from '@/audio/masterBus';
import { DEFAULT_MIXER } from '@/domain/song/defaults';

const newStrip = () => {
  const context = new AudioContext();
  return createChannelStrip(context, createMasterBus(context));
};

describe('applyMixer', () => {
  it("sets the strip to the channel's mixer", () => {
    const strip = newStrip();
    applyMixer(strip, { ...DEFAULT_MIXER, volume: 0.7, pan: -0.3, reverb: 0.2, delay: 0.1 });

    expect(strip.volume.gain.value).toBe(0.7);
    expect(strip.panner.pan.value).toBe(-0.3);
    expect(strip.reverbSend.gain.value).toBe(0.2);
    expect(strip.delaySend.gain.value).toBe(0.1);
  });

  it('silences a muted channel', () => {
    const strip = newStrip();
    applyMixer(strip, { ...DEFAULT_MIXER, volume: 0.7, isMuted: true });
    expect(strip.volume.gain.value).toBe(0);
  });

  it('adds resonance to the filter', () => {
    const strip = newStrip();
    applyMixer(strip, { ...DEFAULT_MIXER, resonance: 0.5 });
    expect(strip.filter.Q.value).toBeCloseTo(6.7);
  });
});

describe('cutoffHz', () => {
  it('runs from 120 Hz to 18 kHz on an even scale', () => {
    expect(cutoffHz(0)).toBe(120);
    expect(cutoffHz(0.5)).toBeCloseTo(Math.sqrt(120 * 18000));
  });

  it('opens the filter all the way at the top', () => {
    expect(cutoffHz(1)).toBe(20000);
  });
});

describe('duckStrip', () => {
  it('dips from wherever the last duck has got to, then swells back', () => {
    const strip = newStrip();
    const gain = strip.duck.gain;
    const hold = jest.spyOn(gain, 'cancelAndHoldAtTime');
    const dip = jest.spyOn(gain, 'linearRampToValueAtTime');
    const swell = jest.spyOn(gain, 'setTargetAtTime');

    duckStrip(strip, { time: 1.5, depth: 0.6, seconds: 0.6 });

    expect(hold).toHaveBeenCalledWith(1.5);
    expect(dip.mock.calls[0]?.[0]).toBeCloseTo(0.46);
    expect(dip.mock.calls[0]?.[1]).toBeCloseTo(1.508);
    expect(swell.mock.calls[0]?.[0]).toBe(1);
    expect(swell.mock.calls[0]?.[1]).toBeCloseTo(1.52);
    expect(swell.mock.calls[0]?.[2]).toBeCloseTo(0.2);
  });
});

describe('peakLevel', () => {
  it('reads the loudest sample, either side of zero', () => {
    const strip = newStrip();
    jest
      .spyOn(strip.meter, 'getFloatTimeDomainData')
      .mockImplementation((samples) => samples.set([0.1, -0.5, 0.3]));
    expect(peakLevel(strip)).toBe(0.5);
  });
});
