import { jest } from '@jest/globals';

// The audio engine is native code, so tests run against the library's own mock of it.
jest.mock('react-native-audio-api', () => jest.requireActual('react-native-audio-api/mock'));
