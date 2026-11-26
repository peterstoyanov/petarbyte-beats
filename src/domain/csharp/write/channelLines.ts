import { INSTRUMENTS } from '../../sounds/catalog';
import { DEFAULT_DRUM_SETTINGS, DEFAULT_MIXER } from '../../song/defaults';
import type { Channel } from '../../song/types';
import {
  CSHARP_SOUND_NAMES,
  isBooleanSetting,
  SONG_VARIABLE,
  settingsOf,
  type ChannelSettingEntry,
  type NumericChannelSetting,
} from '../vocabulary';
import { differsFrom, formatNumber } from './numbers';

/** var kick = song.Drum(Drums.Kick808); or var piano = song.Instrument(Instruments.GrandPiano); */
export const declarationLine = (channel: Channel): string => {
  const sound = CSHARP_SOUND_NAMES[channel.sound];
  return channel.kind === 'drum'
    ? `var ${channel.id} = ${SONG_VARIABLE}.Drum(Drums.${sound});`
    : `var ${channel.id} = ${SONG_VARIABLE}.Instrument(Instruments.${sound});`;
};

/** The channel's settings that differ from their defaults, in the order the code lists them. */
export const settingLines = (channel: Channel): string[] =>
  settingsOf(channel.kind).flatMap((setting) => {
    const line = settingLine(channel, setting);
    return line === undefined ? [] : [line];
  });

const settingLine = (channel: Channel, setting: ChannelSettingEntry): string | undefined => {
  if (isBooleanSetting(setting)) {
    return channel.mixer[setting.field] ? `${channel.id}.${setting.name} = true;` : undefined;
  }

  const { value, defaultValue } = numericSetting(channel, setting);
  if (!differsFrom(value, defaultValue)) return undefined;
  return `${channel.id}.${setting.name} = ${formatNumber(value)};`;
};

type NumericSetting = { value: number; defaultValue: number };

const numericSetting = (channel: Channel, setting: NumericChannelSetting): NumericSetting => {
  if (setting.target === 'mixer') {
    return { value: channel.mixer[setting.field], defaultValue: DEFAULT_MIXER[setting.field] };
  }
  if (setting.target === 'drum' && channel.kind === 'drum') {
    return { value: channel[setting.field], defaultValue: DEFAULT_DRUM_SETTINGS[setting.field] };
  }
  if (setting.target === 'instrument' && channel.kind === 'instrument') {
    const defaultValue = INSTRUMENTS[channel.sound].releaseSeconds;
    return { value: channel[setting.field], defaultValue };
  }
  // settingsOf only returns settings of the channel's kind.
  throw new Error(`${setting.name} does not apply to a ${channel.kind} channel.`);
};
