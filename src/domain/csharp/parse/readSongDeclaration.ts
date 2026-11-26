import { parseKey } from '../../music/scales';
import { BAR_COUNTS, isBarCount, isWithin, SONG_LIMITS, type BarCount } from '../../song/limits';
import { fail, type ReadContext, type StatementReader } from './context';

const ARGUMENT = /^(?:(\w+)\s*:\s*)?(-?\d+(?:\.\d+)?|"[^"]*")$/;

/** The arguments of new Song(...), in the order they can be given without names. */
const ARGUMENT_NAMES = ['bpm', 'bars', 'swing', 'key'] as const;

type ArgumentName = (typeof ARGUMENT_NAMES)[number];

type ArgumentValues = Partial<Record<ArgumentName, number | string>>;

/** The first statement of every song, such as var song = new Song(bpm: 120, bars: 1); */
export const SONG_DECLARATION: StatementReader = {
  pattern: /^var\s+song\s*=\s*new\s+Song\s*\(([^)]*)\)\s*;$/,
  read: (match, context) => {
    const { draft } = context;
    if (draft.isDeclared) fail(context, 'There is already a song. Make it once, at the top.');
    draft.isDeclared = true;

    const values = readArguments(context, match[1] ?? '');
    draft.bpm = readBpm(context, values.bpm ?? draft.bpm);
    draft.bars = readBars(context, values.bars ?? draft.bars);
    draft.swing = readSwing(context, values.swing ?? draft.swing);
    draft.key = readKey(context, values.key ?? draft.key);
    return undefined;
  },
};

const readArguments = (context: ReadContext, text: string): ArgumentValues => {
  const values: ArgumentValues = {};
  const argumentTexts = text
    .split(',')
    .map((argument) => argument.trim())
    .filter(Boolean);

  for (const [position, argument] of argumentTexts.entries()) {
    const parsed = ARGUMENT.exec(argument);
    if (!parsed) fail(context, `I can't read "${argument}". Write it like bpm: 120.`);

    const [, givenName, rawValue = ''] = parsed;
    const name = givenName ?? ARGUMENT_NAMES[position];
    if (name === undefined) fail(context, 'Song takes bpm, bars, swing and key, nothing more.');
    if (!isArgumentName(name)) fail(context, `Song takes bpm, bars, swing and key, not "${name}".`);

    values[name] = rawValue.startsWith('"') ? rawValue.slice(1, -1) : Number(rawValue);
  }
  return values;
};

const isArgumentName = (name: string): name is ArgumentName =>
  ARGUMENT_NAMES.some((argument) => argument === name);

const readBpm = (context: ReadContext, value: number | string): number => {
  const bpm = Number(value);
  if (!isWithin(bpm, SONG_LIMITS.bpm)) {
    fail(context, `bpm goes from ${SONG_LIMITS.bpm.min} to ${SONG_LIMITS.bpm.max}.`);
  }
  return bpm;
};

const readBars = (context: ReadContext, value: number | string): BarCount => {
  if (typeof value !== 'number' || !isBarCount(value)) {
    fail(context, `bars can be ${BAR_COUNTS.join(', ')}.`);
  }
  return value;
};

const readSwing = (context: ReadContext, value: number | string): number => {
  const swing = Number(value);
  if (!isWithin(swing, SONG_LIMITS.swing)) {
    fail(context, `swing goes from ${SONG_LIMITS.swing.min} to ${SONG_LIMITS.swing.max}.`);
  }
  return swing;
};

const readKey = (context: ReadContext, value: number | string): string => {
  const key = String(value);
  if (parseKey(key) === undefined) {
    fail(
      context,
      `I don't know the key "${key}". Write it like "A minor", "F# major" or "D dorian".`,
    );
  }
  return key;
};
