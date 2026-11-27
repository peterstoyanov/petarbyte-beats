import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { AudioManager } from 'react-native-audio-api';

import { configureAudioSession } from '@/audio/player/audioSession';

describe('configureAudioSession', () => {
  afterEach(() => {
    Reflect.deleteProperty(AudioManager, 'setSystemOptions');
  });

  it('plays through the silent switch on iOS', () => {
    // The library's mock has no setSystemOptions, so the test gives it one.
    const setSystemOptions = jest.fn();
    Object.defineProperty(AudioManager, 'setSystemOptions', {
      value: setSystemOptions,
      configurable: true,
    });

    configureAudioSession();

    expect(setSystemOptions).toHaveBeenCalledWith({
      ios: { category: 'playback', mode: 'default' },
    });
  });
});
