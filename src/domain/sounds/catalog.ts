import type { MidiNote } from '../music/notes';

/** The groups the sounds are sorted into, in the order the studio shows them. */
export const SOUND_GROUPS = ['Drums', 'Keys', 'Plucked', 'Synths', 'Winds', 'Bass'] as const;

export type SoundGroup = (typeof SOUND_GROUPS)[number];

export type InstrumentGroup = Exclude<SoundGroup, 'Drums'>;

export const SOUND_GROUP_LABELS = {
  Drums: 'Drums',
  Keys: 'Keys and mallets',
  Plucked: 'Guitars and plucked',
  Synths: 'Synths',
  Winds: 'Winds and voices',
  Bass: 'Bass',
} as const satisfies Record<SoundGroup, string>;

type DrumSound = {
  readonly label: string;
};

type InstrumentSound = {
  readonly label: string;
  readonly group: InstrumentGroup;
  /** The lowest note the instrument can play. */
  readonly lowest: MidiNote;
  /** The highest note the instrument can play. */
  readonly highest: MidiNote;
  /** How long a note rings after it is released. */
  readonly releaseSeconds: number;
};

/*
 * The ids and their order must stay as they are. The order is the order of the sound browser,
 * of the Drums and Instruments enums in the C# code and of the hints in parse errors, all shared
 * with the web studio. New sounds go at the end.
 */
export const DRUMS = {
  kick808: { label: '808 Kick' },
  kick909: { label: '909 Kick' },
  kicklofi: { label: 'Lo-fi Kick' },
  snare808: { label: '808 Snare' },
  snare909: { label: '909 Snare' },
  clap: { label: 'Clap' },
  snap: { label: 'Finger snap' },
  rim: { label: 'Rimshot' },
  hat808: { label: '808 Hat' },
  openhat808: { label: '808 Open hat' },
  hat909: { label: '909 Hat' },
  openhat909: { label: '909 Open hat' },
  shaker: { label: 'Shaker' },
  tomlo: { label: 'Low tom' },
  tomhi: { label: 'High tom' },
  conga: { label: 'Conga' },
  cowbell: { label: '808 Cowbell' },
  crash: { label: 'Crash' },
  ride: { label: 'Ride' },
  zap: { label: 'Laser zap' },
  kickhard: { label: 'Hard Kick' },
  tamb: { label: 'Tambourine' },
  triangle: { label: 'Triangle' },
  claves: { label: 'Claves' },
  bongo: { label: 'Bongo' },
  block: { label: 'Wood block' },
  sweep: { label: 'Noise riser' },
} as const satisfies Record<string, DrumSound>;

export const INSTRUMENTS = {
  piano: { label: 'Grand Piano', group: 'Keys', lowest: 36, highest: 96, releaseSeconds: 0.35 },
  epiano: { label: 'Electric Piano', group: 'Keys', lowest: 36, highest: 96, releaseSeconds: 0.4 },
  organ: { label: 'Organ', group: 'Keys', lowest: 36, highest: 96, releaseSeconds: 0.08 },
  bell: { label: 'Bell', group: 'Keys', lowest: 48, highest: 96, releaseSeconds: 0.9 },
  pluck: { label: 'Pluck', group: 'Synths', lowest: 36, highest: 96, releaseSeconds: 0.2 },
  chip: { label: '8-bit Lead', group: 'Synths', lowest: 36, highest: 96, releaseSeconds: 0.03 },
  supersaw: { label: 'Super Saw', group: 'Synths', lowest: 36, highest: 96, releaseSeconds: 0.3 },
  pad: { label: 'Warm Pad', group: 'Synths', lowest: 36, highest: 96, releaseSeconds: 1.3 },
  strings: { label: 'Strings', group: 'Synths', lowest: 36, highest: 96, releaseSeconds: 0.6 },
  bass808: { label: '808 Bass', group: 'Bass', lowest: 24, highest: 60, releaseSeconds: 0.08 },
  sub: { label: 'Sub Bass', group: 'Bass', lowest: 24, highest: 60, releaseSeconds: 0.06 },
  synthbass: { label: 'Synth Bass', group: 'Bass', lowest: 24, highest: 60, releaseSeconds: 0.07 },
  acid: { label: 'Acid 303', group: 'Bass', lowest: 24, highest: 60, releaseSeconds: 0.04 },
  reese: { label: 'Reese Bass', group: 'Bass', lowest: 24, highest: 60, releaseSeconds: 0.1 },
  upright: { label: 'Upright Bass', group: 'Bass', lowest: 28, highest: 60, releaseSeconds: 0.12 },
  wobble: { label: 'Wobble Bass', group: 'Bass', lowest: 24, highest: 60, releaseSeconds: 0.05 },
  marimba: { label: 'Marimba', group: 'Keys', lowest: 45, highest: 96, releaseSeconds: 0.3 },
  vibes: { label: 'Vibraphone', group: 'Keys', lowest: 48, highest: 96, releaseSeconds: 1.2 },
  musicbox: { label: 'Music Box', group: 'Keys', lowest: 60, highest: 96, releaseSeconds: 0.8 },
  steel: { label: 'Steel Drum', group: 'Keys', lowest: 48, highest: 88, releaseSeconds: 0.5 },
  clav: { label: 'Clavinet', group: 'Keys', lowest: 36, highest: 88, releaseSeconds: 0.06 },
  guitar: {
    label: 'Nylon Guitar',
    group: 'Plucked',
    lowest: 40,
    highest: 88,
    releaseSeconds: 0.25,
  },
  eguitar: {
    label: 'Electric Guitar',
    group: 'Plucked',
    lowest: 40,
    highest: 88,
    releaseSeconds: 0.15,
  },
  harp: { label: 'Harp', group: 'Plucked', lowest: 36, highest: 96, releaseSeconds: 1.4 },
  kalimba: { label: 'Kalimba', group: 'Plucked', lowest: 55, highest: 96, releaseSeconds: 0.6 },
  flute: { label: 'Flute', group: 'Winds', lowest: 60, highest: 96, releaseSeconds: 0.12 },
  brass: { label: 'Brass', group: 'Winds', lowest: 40, highest: 84, releaseSeconds: 0.15 },
  sax: { label: 'Saxophone', group: 'Winds', lowest: 44, highest: 84, releaseSeconds: 0.1 },
  choir: { label: 'Choir', group: 'Winds', lowest: 48, highest: 84, releaseSeconds: 0.7 },
  sawlead: { label: 'Saw Lead', group: 'Synths', lowest: 48, highest: 96, releaseSeconds: 0.12 },
} as const satisfies Record<string, InstrumentSound>;

export type DrumId = keyof typeof DRUMS;
export type InstrumentId = keyof typeof INSTRUMENTS;
export type SoundId = DrumId | InstrumentId;

export const isDrumId = (id: string): id is DrumId => Object.hasOwn(DRUMS, id);

/** Kicks are the drums that make sidechained channels duck. */
export const isKick = (id: DrumId): boolean => id.startsWith('kick');

export const isInstrumentId = (id: string): id is InstrumentId => Object.hasOwn(INSTRUMENTS, id);

export const soundLabel = (id: SoundId): string =>
  isDrumId(id) ? DRUMS[id].label : INSTRUMENTS[id].label;

export const soundGroup = (id: SoundId): SoundGroup =>
  isDrumId(id) ? 'Drums' : INSTRUMENTS[id].group;
