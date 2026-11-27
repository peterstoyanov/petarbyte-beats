import { describe, expect, it, jest } from '@jest/globals';
import { AudioManager } from 'react-native-audio-api';

import { configureAudioSession } from '@/audio/player/audioSession';

describe('configureAudioSession', () => {
  it('plays through the silent switch on iOS', () => {
    const setSystemOptions = jest.spyOn(AudioManager, 'setSystemOptions');

    configureAudioSession();

    expect(setSystemOptions).toHaveBeenCalledWith({
      ios: { category: 'playback', mode: 'default' },
    });
  });
});
