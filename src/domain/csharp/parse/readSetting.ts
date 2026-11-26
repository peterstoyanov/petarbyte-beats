import {
  findChannelSetting,
  findMasterSetting,
  isBooleanSetting,
  MASTER_SETTINGS,
  settingsOf,
  SONG_VARIABLE,
  type NumericChannelSetting,
} from '../vocabulary';
import { isWithin } from '../../song/limits';
import { SETTING_RANGES } from '../../song/settingRanges';
import type { Mixer } from '../../song/types';
import { fail, type ReadContext, type StatementReader } from './context';
import { findChannel, type DraftChannel } from './draft';

/**
 * A number such as 1, 0.5 or .5. Written so that each digit can only be read one way: the shorter
 * \d*\.?\d+ accepts the same numbers but slows to seconds on a long line of digits (ReDoS).
 */
const NUMBER = String.raw`-?(?:\d+(?:\.\d+)?|\.\d+)`;

const BOOLEAN_VALUE = /^(true|false)$/;

/** A setting of a channel or of the song, such as kick.Volume = 0.7; or song.Reverb = 0.5; */
export const SETTING_ASSIGNMENT: StatementReader = {
  pattern: new RegExp(String.raw`^([A-Za-z_]\w*)\.(\w+)\s*=\s*(${NUMBER}|true|false)\s*;$`),
  read: (match, context) => {
    const [, target = '', name = '', valueText = ''] = match;
    if (target === SONG_VARIABLE) {
      readMasterSetting(context, { name, valueText });
    } else {
      readChannelSetting(context, { channelName: target, name, valueText });
    }
    return undefined;
  },
};

/** song.Play(); ends every song's code and needs nothing read. */
export const SONG_PLAY: StatementReader = {
  pattern: /^song\.Play\s*\(\s*\)\s*;$/,
  read: () => undefined,
};

type Assignment = { readonly name: string; readonly valueText: string };

const readMasterSetting = (context: ReadContext, { name, valueText }: Assignment): void => {
  const setting = findMasterSetting(name);
  if (setting === undefined) {
    const names = listWithAnd(MASTER_SETTINGS.map((entry) => entry.name));
    fail(context, `song has ${names}, not ${name}.`);
  }

  const value = Number(valueText);
  const range = SETTING_RANGES[setting.field];
  if (!isWithin(value, range))
    fail(context, `song.${name} goes from ${range.min} to ${range.max}.`);

  context.draft.master[setting.field] = value;
};

type ChannelAssignment = Assignment & { readonly channelName: string };

const readChannelSetting = (
  context: ReadContext,
  { channelName, name, valueText }: ChannelAssignment,
): void => {
  const channel = findChannel(context.draft, channelName);
  if (channel === undefined) fail(context, `There is no channel called "${channelName}".`);

  const setting = findChannelSetting(name, channel.kind);
  if (setting === undefined) {
    const kind = channel.kind === 'drum' ? 'A drum' : 'An instrument';
    const names = settingsOf(channel.kind).map((entry) => entry.name);
    fail(context, `${kind} has ${names.join(', ')}.`);
  }

  if (isBooleanSetting(setting)) {
    channel.mixer = withMixerValue(
      channel.mixer,
      setting.field,
      readBoolean(context, setting.name, valueText),
    );
  } else {
    applyNumber(channel, setting, readNumber(context, setting, valueText));
  }
};

const readBoolean = (context: ReadContext, name: string, valueText: string): boolean => {
  if (!BOOLEAN_VALUE.test(valueText)) fail(context, `${name} is true or false.`);
  return valueText === 'true';
};

const readNumber = (
  context: ReadContext,
  setting: NumericChannelSetting,
  valueText: string,
): number => {
  // The pattern also lets through true and false, which are not numbers.
  const value = Number(valueText);
  if (Number.isNaN(value)) fail(context, `${setting.name} is a number.`);

  const range = SETTING_RANGES[setting.field];
  if (!isWithin(value, range)) {
    fail(context, `${setting.name} goes from ${range.min} to ${range.max}.`);
  }
  return value;
};

const applyNumber = (
  channel: DraftChannel,
  setting: NumericChannelSetting,
  value: number,
): void => {
  if (setting.target === 'mixer') {
    channel.mixer = withMixerValue(channel.mixer, setting.field, value);
    return;
  }
  if (setting.target === 'drum' && channel.kind === 'drum') {
    channel[setting.field] = value;
    return;
  }
  if (setting.target === 'instrument' && channel.kind === 'instrument') {
    channel[setting.field] = value;
    return;
  }
  // findChannelSetting only returns settings of the channel's kind.
  throw new Error(`${setting.name} does not apply to a ${channel.kind} channel.`);
};

/** A copy of the mixer with one field changed. The value's type must match the field's. */
const withMixerValue = <Field extends keyof Mixer>(
  mixer: Mixer,
  field: Field,
  value: Mixer[Field],
): Mixer => ({ ...mixer, [field]: value });

const listWithAnd = (items: readonly string[]): string =>
  items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items.at(-1)}` : items.join('');
