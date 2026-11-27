import { describe, expect, it } from '@jest/globals';
import { AudioContext } from 'react-native-audio-api';

import { bell } from '@/audio/sounds/instruments/keys';
import { SETTING_RANGES } from '@/domain/song/settingRanges';

import { recordSounds } from '../../support/recordedSounds';

/** When a bell's sources stop, for a release. */
const bellStops = (release: number): number[] => {
  const context = new AudioContext();
  const { sources } = recordSounds(context);
  bell({
    context,
    output: context.destination,
    midi: 72,
    time: 1,
    seconds: 0.2,
    velocity: 0.8,
    release,
    resonance: 0,
    bpm: 120,
  });
  return sources.map((source) => source.stopTime ?? 0);
};

describe('bell', () => {
  it.each([SETTING_RANGES.releaseSeconds.min, 0.9, SETTING_RANGES.releaseSeconds.max])(
    'rings out before it stops, with a release of %p s',
    (release) => {
      // Five time constants after the strike the bell is under 1% of its peak.
      const silent = 1 + 0.002 + (0.5 + release * 0.4) * 5;
      for (const stop of bellStops(release)) expect(stop).toBeGreaterThanOrEqual(silent);
    },
  );
});
