import { requirePatternName } from '../../song/ids';
import { BAR_COUNTS, isBarCount, SONG_LIMITS } from '../../song/limits';
import { fail, type ReadContext, type StatementReader } from './context';
import {
  createDraftPattern,
  findChannel,
  findPattern,
  isNameTaken,
  mainPatternOf,
  type DraftChannel,
  type DraftPattern,
} from './draft';
import { readHits } from './readHits';
import { readNotes } from './readNotes';

/** A velocity such as 0.6 or .6, written so a long line of digits cannot slow the parser down. */
const VELOCITY = String.raw`(?:\d+(?:\.\d+)?|\.\d+)`;

export const PATTERN_DECLARATION: StatementReader = {
  pattern: /^var\s+([A-Za-z_]\w*)\s*=\s*song\.Pattern\s*\(\s*(?:bars\s*:\s*)?(\d+)\s*\)\s*;$/,
  read: (match, context) => {
    const [, name = '', barsText = ''] = match;
    const bars = Number(barsText);
    const { draft } = context;

    if (isNameTaken(draft, name)) {
      fail(context, `"${name}" is already taken. Give each pattern its own name.`);
    }
    if (!isBarCount(bars)) fail(context, `A pattern is ${BAR_COUNTS.join(', ')} bars long.`);
    if (draft.patterns.length >= SONG_LIMITS.maxPatterns) {
      fail(context, `${SONG_LIMITS.maxPatterns} patterns at most.`);
    }

    const pattern = createDraftPattern(requirePatternName(name), bars);
    draft.patterns.push(pattern);
    return { kind: 'pattern', pattern: pattern.name };
  },
};

export const HITS: StatementReader = {
  pattern: /^([A-Za-z_]\w*)\.Hits\s*\(\s*([A-Za-z_]\w*)\s*,\s*"([^"]*)"\s*\)\s*;$/,
  read: (match, context) => {
    const [, patternName = '', channelName = '', text = ''] = match;
    const pattern = requirePattern(context, {
      name: patternName,
      ifMissing: `There is no pattern called "${patternName}". Make it first: var ${patternName} = song.Pattern(bars: 1);`,
    });
    const channel = requireChannel(context, channelName);
    if (channel.kind !== 'drum') {
      fail(
        context,
        `${channelName} is an instrument: give it notes with ${patternName}.Play(${channelName}, step, length, "C4").`,
      );
    }
    return readHits(context, { channel: channel.id, pattern, text });
  },
};

/** Notes in a named pattern: intro.Play(piano, 0, 4, "C4"); */
export const PATTERN_PLAY: StatementReader = {
  pattern: new RegExp(
    String.raw`^([A-Za-z_]\w*)\.Play\s*\(\s*([A-Za-z_]\w*)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*"([^"]*)"\s*(?:,\s*(?:velocity\s*:\s*)?(${VELOCITY})\s*)?\)\s*;$`,
  ),
  read: (match, context) => {
    const [, patternName = '', channelName = '', stepText = '', lengthText = '', notesText = ''] =
      match;
    const pattern = requirePattern(context, {
      name: patternName,
      ifMissing: `There is no pattern called "${patternName}".`,
    });
    const channel = requireChannel(context, channelName);
    if (channel.kind !== 'instrument') {
      fail(
        context,
        `${channelName} is a drum: write its hits with ${patternName}.Hits(${channelName}, "x...").`,
      );
    }
    return readNotes(context, {
      channel,
      pattern,
      stepText,
      lengthText,
      notesText,
      velocityText: match[6],
    });
  },
};

/** Notes in the short form's single pattern: piano.Play(0, 4, "C4"); */
export const SHORT_PLAY: StatementReader = {
  pattern: new RegExp(
    String.raw`^([A-Za-z_]\w*)\.Play\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*"([^"]*)"\s*(?:,\s*(?:velocity\s*:\s*)?(${VELOCITY})\s*)?\)\s*;$`,
  ),
  read: (match, context) => {
    const [, channelName = '', stepText = '', lengthText = '', notesText = ''] = match;
    const channel = findChannel(context.draft, channelName);
    if (channel === undefined) {
      fail(
        context,
        `There is no channel called "${channelName}" yet. Make it first: var ${channelName} = song.Instrument(Instruments.GrandPiano);`,
      );
    }
    if (channel.kind !== 'instrument') {
      fail(context, `${channelName} is a drum: write its hits in its pattern string.`);
    }
    const pattern = mainPatternOf(context.draft);
    return readNotes(context, {
      channel,
      pattern,
      stepText,
      lengthText,
      notesText,
      velocityText: match[5],
    });
  },
};

export const ARRANGE: StatementReader = {
  pattern: /^song\.Arrange\s*\(([^)]*)\)\s*;$/,
  read: (match, context) => {
    const names = (match[1] ?? '')
      .split(',')
      .map((name) => name.trim())
      .filter(Boolean);
    const patterns = names.map((name) =>
      requirePattern(context, {
        name,
        ifMissing: `There is no pattern called "${name}" to arrange.`,
      }),
    );
    if (names.length > SONG_LIMITS.maxArrangementLength) {
      fail(context, `${SONG_LIMITS.maxArrangementLength} patterns in the arrangement at most.`);
    }
    context.draft.arrangement = patterns.map((pattern) => pattern.name);
    return { kind: 'arrangement' };
  },
};

type PatternReference = {
  readonly name: string;
  /** The message when no pattern has this name; it differs by statement, as in the web studio. */
  readonly ifMissing: string;
};

const requirePattern = (
  context: ReadContext,
  { name, ifMissing }: PatternReference,
): DraftPattern => {
  const pattern = findPattern(context.draft, name);
  if (pattern === undefined) fail(context, ifMissing);
  return pattern;
};

const requireChannel = (context: ReadContext, name: string): DraftChannel => {
  const channel = findChannel(context.draft, name);
  if (channel === undefined) fail(context, `There is no channel called "${name}".`);
  return channel;
};
