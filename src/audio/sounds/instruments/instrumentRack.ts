import type { NoteStart } from '@/domain/playback/stepEvents';
import type { InstrumentId } from '@/domain/sounds/catalog';

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

type PlayNoteSpec = Pick<NoteSpec, 'context' | 'output' | 'time' | 'bpm'> & {
  readonly note: NoteStart;
};

/**
 * Plays a note on its channel's instrument, with the channel's release and resonance. The grand
 * piano is silent here: it plays recordings, which come with the piano sampler.
 */
export const playNoteStart = ({ context, output, time, bpm, note }: PlayNoteSpec): void => {
  const { channel, midi, velocity, seconds } = note;
  if (channel.sound === 'piano') return;
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
