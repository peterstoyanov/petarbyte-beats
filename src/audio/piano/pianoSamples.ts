import c2 from '../../../assets/audio/piano/C2.mp3';
import ds2 from '../../../assets/audio/piano/Ds2.mp3';
import fs2 from '../../../assets/audio/piano/Fs2.mp3';
import a2 from '../../../assets/audio/piano/A2.mp3';
import c3 from '../../../assets/audio/piano/C3.mp3';
import ds3 from '../../../assets/audio/piano/Ds3.mp3';
import fs3 from '../../../assets/audio/piano/Fs3.mp3';
import a3 from '../../../assets/audio/piano/A3.mp3';
import c4 from '../../../assets/audio/piano/C4.mp3';
import ds4 from '../../../assets/audio/piano/Ds4.mp3';
import fs4 from '../../../assets/audio/piano/Fs4.mp3';
import a4 from '../../../assets/audio/piano/A4.mp3';
import c5 from '../../../assets/audio/piano/C5.mp3';
import ds5 from '../../../assets/audio/piano/Ds5.mp3';
import fs5 from '../../../assets/audio/piano/Fs5.mp3';
import a5 from '../../../assets/audio/piano/A5.mp3';
import c6 from '../../../assets/audio/piano/C6.mp3';
import ds6 from '../../../assets/audio/piano/Ds6.mp3';
import fs6 from '../../../assets/audio/piano/Fs6.mp3';
import a6 from '../../../assets/audio/piano/A6.mp3';
import c7 from '../../../assets/audio/piano/C7.mp3';

import type { MidiNote } from '@/domain/music/notes';

export type PianoSample = {
  /** The note the recording was made at. */
  readonly midi: MidiNote;
  readonly asset: number;
};

/**
 * Recordings of a Yamaha C5 grand, one every three semitones from C2 to C7, so every note of the
 * piano's range is within a semitone of one. See assets/audio/piano/LICENSE.md.
 */
export const PIANO_SAMPLES: readonly PianoSample[] = [
  { midi: 36, asset: c2 },
  { midi: 39, asset: ds2 },
  { midi: 42, asset: fs2 },
  { midi: 45, asset: a2 },
  { midi: 48, asset: c3 },
  { midi: 51, asset: ds3 },
  { midi: 54, asset: fs3 },
  { midi: 57, asset: a3 },
  { midi: 60, asset: c4 },
  { midi: 63, asset: ds4 },
  { midi: 66, asset: fs4 },
  { midi: 69, asset: a4 },
  { midi: 72, asset: c5 },
  { midi: 75, asset: ds5 },
  { midi: 78, asset: fs5 },
  { midi: 81, asset: a5 },
  { midi: 84, asset: c6 },
  { midi: 87, asset: ds6 },
  { midi: 90, asset: fs6 },
  { midi: 93, asset: a6 },
  { midi: 96, asset: c7 },
];
