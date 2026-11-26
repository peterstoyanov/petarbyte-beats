import { CSHARP_SOUND_NAMES, soundFromCSharpName } from '../vocabulary';
import { isDrumId, isInstrumentId } from '../../sounds/catalog';
import { createDrumChannel, createInstrumentChannel } from '../../song/channels';
import { requireChannelId } from '../../song/ids';
import { fail, type ReadContext, type StatementReader } from './context';
import { isNameTaken, mainPatternOf } from './draft';
import { readHits } from './readHits';

/** How many sounds an error message suggests when the code names one that does not exist. */
const SUGGESTED_SOUNDS = 6;

export const DRUM_DECLARATION: StatementReader = {
  pattern:
    /^var\s+([A-Za-z_]\w*)\s*=\s*song\.Drum\s*\(\s*Drums\.(\w+)\s*(?:,\s*"([^"]*)"\s*)?\)\s*;$/,
  read: (match, context) => {
    const [, name = '', soundName = '', steps] = match;
    const sound = soundFromCSharpName(soundName);
    if (sound === undefined || !isDrumId(sound)) {
      fail(context, `There is no Drums.${soundName}. Try ${suggestedSounds('Drums')} and more.`);
    }
    claimChannelName(context, name);

    const channel = createDrumChannel(requireChannelId(name), sound);
    context.draft.channels.set(channel.id, { ...channel });
    if (steps === undefined) return { kind: 'channel', channel: channel.id };

    const pattern = mainPatternOf(context.draft);
    return readHits(context, { channel: channel.id, pattern, text: steps });
  },
};

export const INSTRUMENT_DECLARATION: StatementReader = {
  pattern: /^var\s+([A-Za-z_]\w*)\s*=\s*song\.Instrument\s*\(\s*Instruments\.(\w+)\s*\)\s*;$/,
  read: (match, context) => {
    const [, name = '', soundName = ''] = match;
    const sound = soundFromCSharpName(soundName);
    if (sound === undefined || !isInstrumentId(sound)) {
      fail(
        context,
        `There is no Instruments.${soundName}. Try ${suggestedSounds('Instruments')} and more.`,
      );
    }
    claimChannelName(context, name);

    const channel = createInstrumentChannel(requireChannelId(name), sound);
    context.draft.channels.set(channel.id, { ...channel });
    return { kind: 'channel', channel: channel.id };
  },
};

const claimChannelName = (context: ReadContext, name: string): void => {
  if (isNameTaken(context.draft, name)) {
    fail(context, `"${name}" is already taken. Give each channel its own name.`);
  }
};

const suggestedSounds = (enumName: 'Drums' | 'Instruments'): string => {
  const isOfEnum = enumName === 'Drums' ? isDrumId : isInstrumentId;
  return Object.entries(CSHARP_SOUND_NAMES)
    .filter(([id]) => isOfEnum(id))
    .slice(0, SUGGESTED_SOUNDS)
    .map(([, name]) => `${enumName}.${name}`)
    .join(', ');
};
