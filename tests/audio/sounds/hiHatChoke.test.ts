import { describe, expect, it, jest } from '@jest/globals';
import { AudioContext } from 'react-native-audio-api';

import { gainNode } from '@/audio/nodes';
import { HiHatChoke } from '@/audio/sounds/hiHatChoke';

describe('HiHatChoke', () => {
  it('cuts off the open hat that is ringing', () => {
    const openHat = gainNode(new AudioContext());
    const fade = jest.spyOn(openHat.gain, 'setTargetAtTime');
    const choke = new HiHatChoke();

    choke.ring(openHat);
    choke.choke(2);

    expect(fade).toHaveBeenCalledWith(0, 2, 0.01);
  });

  it('cuts it off only once', () => {
    const openHat = gainNode(new AudioContext());
    const fade = jest.spyOn(openHat.gain, 'setTargetAtTime');
    const choke = new HiHatChoke();

    choke.ring(openHat);
    choke.choke(2);
    choke.choke(3);

    expect(fade).toHaveBeenCalledTimes(1);
  });

  it('does nothing when no open hat is ringing', () => {
    expect(() => new HiHatChoke().choke(1)).not.toThrow();
  });
});
