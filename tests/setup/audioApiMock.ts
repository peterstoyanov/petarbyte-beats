import { jest } from '@jest/globals';

// The audio engine is native code, so tests run against the library's own mock of it. The mock
// leaves out setSystemOptions, which the app calls to set up the audio session, so it is added.
jest.mock('react-native-audio-api', () => {
  const mock: typeof import('react-native-audio-api/mock') = jest.requireActual(
    'react-native-audio-api/mock',
  );
  return {
    ...mock,
    AudioManager: Object.assign(mock.AudioManager, { setSystemOptions: () => undefined }),
  };
});
