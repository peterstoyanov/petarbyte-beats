import { AudioManager } from 'react-native-audio-api';

/**
 * A music app plays even when the iPhone's ring switch is on silent, as the Music app does; the
 * default session would mute it. Android has no such switch, so this changes nothing there.
 */
export const configureAudioSession = (): void => {
  AudioManager.setSystemOptions({ ios: { category: 'playback', mode: 'default' } });
};
