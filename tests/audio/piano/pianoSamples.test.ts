import { describe, expect, it } from '@jest/globals';

import { PIANO_SAMPLES } from '@/audio/piano/pianoSamples';
import { INSTRUMENTS } from '@/domain/sounds/catalog';

describe('PIANO_SAMPLES', () => {
  const notes = PIANO_SAMPLES.map((sample) => sample.midi);

  it('has one recording every three semitones, from C2 to C7', () => {
    expect(notes).toEqual(Array.from({ length: 21 }, (_, index) => 36 + index * 3));
  });

  it("covers the piano's whole range within a semitone", () => {
    const { lowest, highest } = INSTRUMENTS.piano;
    for (let midi = lowest; midi <= highest; midi++) {
      const distance = Math.min(...notes.map((note) => Math.abs(note - midi)));
      expect(distance).toBeLessThanOrEqual(1);
    }
  });
});
