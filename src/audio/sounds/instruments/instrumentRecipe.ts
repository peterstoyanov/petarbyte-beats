import type { AudioNode, BaseAudioContext } from 'react-native-audio-api';

import type { MidiNote } from '@/domain/music/notes';

export type NoteSpec = {
  readonly context: BaseAudioContext;
  /** The channel strip the note plays into. */
  readonly output: AudioNode;
  readonly midi: MidiNote;
  readonly time: number;
  /** How long the key is held down. */
  readonly seconds: number;
  readonly velocity: number;
  /** How long the note rings after the key is let go: the channel's release. */
  readonly release: number;
  /** The channel's filter resonance, which the acid bass also uses for its squelch. */
  readonly resonance: number;
  /** The song's tempo, which the wobble bass locks its wobble to. */
  readonly bpm: number;
};

/**
 * One instrument, synthesized from oscillators, noise and filters. Its numbers (ratios, times and
 * levels) are the sound itself, copied from the web studio, so they stay inline as a recipe.
 */
export type InstrumentRecipe = (spec: NoteSpec) => void;
