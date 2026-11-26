import { describe, expect, it } from '@jest/globals';
import { AudioContext } from 'react-native-audio-api';

import { applyMasterSettings, createMasterBus } from '@/audio/masterBus';

const master = { volume: 0.9, reverb: 0.3, delay: 0.25 };

describe('applyMasterSettings', () => {
  it('sets the volume and the effect returns', () => {
    const bus = createMasterBus(new AudioContext());
    applyMasterSettings(bus, { bpm: 120, master });

    expect(bus.volume.gain.value).toBe(0.9);
    expect(bus.reverbReturn.gain.value).toBe(0.3);
    expect(bus.delayReturn.gain.value).toBe(0.25);
  });

  it('times the echo to a dotted eighth', () => {
    const bus = createMasterBus(new AudioContext());
    applyMasterSettings(bus, { bpm: 120, master });
    expect(bus.delay.delayTime.value).toBeCloseTo(0.375);
  });

  it('keeps the echo inside the delay line even below the tempo limits', () => {
    const bus = createMasterBus(new AudioContext());
    applyMasterSettings(bus, { bpm: 20, master });
    expect(bus.delay.delayTime.value).toBe(1.9);
  });
});
