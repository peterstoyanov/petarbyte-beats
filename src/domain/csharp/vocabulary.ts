import { isDrumId, isInstrumentId, type SoundId } from '../sounds/catalog';
import type { Channel, DrumChannel, InstrumentChannel, Master, Mixer } from '../song/types';

/** The song's own variable in the code: var song = new Song(...); */
export const SONG_VARIABLE = 'song';

/**
 * The name of every sound in the Drums and Instruments enums of the C# code. The compiler checks
 * that no sound is missing.
 */
export const CSHARP_SOUND_NAMES = {
  kick808: 'Kick808',
  kick909: 'Kick909',
  kicklofi: 'LofiKick',
  snare808: 'Snare808',
  snare909: 'Snare909',
  clap: 'Clap',
  snap: 'Snap',
  rim: 'Rimshot',
  hat808: 'Hat808',
  openhat808: 'OpenHat808',
  hat909: 'Hat909',
  openhat909: 'OpenHat909',
  shaker: 'Shaker',
  tomlo: 'LowTom',
  tomhi: 'HighTom',
  conga: 'Conga',
  cowbell: 'Cowbell',
  crash: 'Crash',
  ride: 'Ride',
  zap: 'Zap',
  kickhard: 'HardKick',
  tamb: 'Tambourine',
  triangle: 'Triangle',
  claves: 'Claves',
  bongo: 'Bongo',
  block: 'WoodBlock',
  sweep: 'NoiseRiser',
  piano: 'GrandPiano',
  epiano: 'ElectricPiano',
  organ: 'Organ',
  bell: 'Bell',
  pluck: 'Pluck',
  chip: 'ChipLead',
  supersaw: 'SuperSaw',
  pad: 'WarmPad',
  strings: 'Strings',
  bass808: 'Bass808',
  sub: 'SubBass',
  synthbass: 'SynthBass',
  acid: 'Acid303',
  reese: 'ReeseBass',
  upright: 'UprightBass',
  wobble: 'WobbleBass',
  marimba: 'Marimba',
  vibes: 'Vibraphone',
  musicbox: 'MusicBox',
  steel: 'SteelDrum',
  clav: 'Clavinet',
  guitar: 'NylonGuitar',
  eguitar: 'ElectricGuitar',
  harp: 'Harp',
  kalimba: 'Kalimba',
  flute: 'Flute',
  brass: 'Brass',
  sax: 'Saxophone',
  choir: 'Choir',
  sawlead: 'SawLead',
} as const satisfies Record<SoundId, string>;

type ChannelSetting =
  | { readonly name: string; readonly target: 'mixer'; readonly field: keyof Mixer }
  | {
      readonly name: string;
      readonly target: 'drum';
      readonly field: keyof Pick<DrumChannel, 'pitch' | 'decay'>;
    }
  | {
      readonly name: string;
      readonly target: 'instrument';
      readonly field: keyof Pick<InstrumentChannel, 'releaseSeconds'>;
    };

/**
 * The settings a channel has in the code, such as kick.Volume = 0.7. The code lists them in this
 * order, so it must stay as it is.
 */
export const CHANNEL_SETTINGS = [
  { name: 'Volume', target: 'mixer', field: 'volume' },
  { name: 'Pan', target: 'mixer', field: 'pan' },
  { name: 'Reverb', target: 'mixer', field: 'reverb' },
  { name: 'Delay', target: 'mixer', field: 'delay' },
  { name: 'Cutoff', target: 'mixer', field: 'cutoff' },
  { name: 'Resonance', target: 'mixer', field: 'resonance' },
  { name: 'Sidechain', target: 'mixer', field: 'sidechain' },
  { name: 'Pitch', target: 'drum', field: 'pitch' },
  { name: 'Decay', target: 'drum', field: 'decay' },
  { name: 'Release', target: 'instrument', field: 'releaseSeconds' },
  { name: 'Mute', target: 'mixer', field: 'isMuted' },
  { name: 'Solo', target: 'mixer', field: 'isSoloed' },
] as const satisfies readonly ChannelSetting[];

export type ChannelSettingEntry = (typeof CHANNEL_SETTINGS)[number];

/** Mute and Solo, written as true or false. */
export type BooleanChannelSetting = Extract<ChannelSettingEntry, { field: 'isMuted' | 'isSoloed' }>;

/** Every other channel setting, written as a number. */
export type NumericChannelSetting = Exclude<ChannelSettingEntry, BooleanChannelSetting>;

export const isBooleanSetting = (setting: ChannelSettingEntry): setting is BooleanChannelSetting =>
  setting.field === 'isMuted' || setting.field === 'isSoloed';

/** The master settings in the code, such as song.Reverb = 0.5, in the order the code lists them. */
export const MASTER_SETTINGS = [
  { name: 'Volume', field: 'volume' },
  { name: 'Reverb', field: 'reverb' },
  { name: 'Delay', field: 'delay' },
] as const satisfies readonly { readonly name: string; readonly field: keyof Master }[];

export type MasterSettingEntry = (typeof MASTER_SETTINGS)[number];

const SOUNDS_BY_CSHARP_NAME: ReadonlyMap<string, SoundId> = new Map(
  Object.entries(CSHARP_SOUND_NAMES).flatMap(([id, name]) =>
    isDrumId(id) || isInstrumentId(id) ? [[name, id] as const] : [],
  ),
);

/** The sound a C# enum member names, such as Kick808, or undefined if there is none. */
export const soundFromCSharpName = (name: string): SoundId | undefined =>
  SOUNDS_BY_CSHARP_NAME.get(name);

/** The settings a channel of this kind has: the mixer settings plus its own. */
export const settingsOf = (kind: Channel['kind']): readonly ChannelSettingEntry[] =>
  CHANNEL_SETTINGS.filter((setting) => setting.target === 'mixer' || setting.target === kind);

export const findChannelSetting = (
  name: string,
  kind: Channel['kind'],
): ChannelSettingEntry | undefined => settingsOf(kind).find((setting) => setting.name === name);

export const findMasterSetting = (name: string): MasterSettingEntry | undefined =>
  MASTER_SETTINGS.find((setting) => setting.name === name);
