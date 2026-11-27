import type { NoteStart } from '@/domain/playback/stepEvents';
import type { InstrumentId } from '@/domain/sounds/catalog';

import type { PianoSampler } from '../../piano/pianoSampler';

import { acid, bass808, reese, sub, synthbass, wobble } from './bass';
import type { InstrumentRecipe, NoteSpec } from './instrumentRecipe';
import { bell, clav, epiano, organ } from './keys';
import { kalimba, marimba, musicbox, steel, vibes } from './mallets';
import { eguitar, guitar, harp, upright } from './plucked';
import { chip, pad, pluck, sawlead, strings, supersaw } from './synths';
import { brass, choir, flute, sax } from './winds';

/** The grand piano plays recordings, not a recipe. */
export type SynthesizedInstrumentId = Exclude<InstrumentId, 'piano'>;

/** Every synthesized instrument of the catalog, by id. */
export const INSTRUMENT_RECIPES = {
  epiano,
  organ,
  bell,
  pluck,
  chip,
  supersaw,
  pad,
  strings,
  bass808,
  sub,
  synthbass,
  acid,
  reese,
  upright,
  wobble,
  marimba,
  vibes,
  musicbox,
  steel,
  clav,
  guitar,
  eguitar,
  harp,
  kalimba,
  flute,
  brass,
  sax,
  choir,
  sawlead,
} as const satisfies Record<SynthesizedInstrumentId, InstrumentRecipe>;

/** The piano's damper lets part of the channel's release ring on after the key. */
const PIANO_RELEASE_SHARE = 0.4;
/** The recordings are loud; this matches them to the synthesized instruments. */
const PIANO_LEVEL = 0.95;

type PlayNoteSpec = Pick<NoteSpec, 'context' | 'output' | 'time' | 'bpm'> & {
  readonly note: NoteStart;
  readonly piano: PianoSampler;
};

/**
 * Plays a note on its channel's instrument, with the channel's release and resonance. The grand
 * piano plays its recordings, and stays silent until they are loaded, as in the web studio.
 */
export const playNoteStart = ({ context, output, time, bpm, note, piano }: PlayNoteSpec): void => {
  const { channel, midi, velocity, seconds } = note;
  if (channel.sound === 'piano') {
    piano.play({
      output,
      midi,
      time,
      seconds: seconds + channel.releaseSeconds * PIANO_RELEASE_SHARE,
      velocity: velocity * PIANO_LEVEL,
    });
    return;
  }
  INSTRUMENT_RECIPES[channel.sound]({
    context,
    output,
    midi,
    time,
    seconds,
    velocity,
    release: channel.releaseSeconds,
    resonance: channel.mixer.resonance,
    bpm,
  });
};
