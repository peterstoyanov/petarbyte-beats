type Brand<Value, Name extends string> = Value & { readonly __brand: Name };

/** A channel's name in the code, such as "kick". Unique within a song. */
export type ChannelId = Brand<string, 'ChannelId'>;

/** A pattern's name in the code, such as "intro". Unique within a song. */
export type PatternName = Brand<string, 'PatternName'>;

/** Channels and patterns are variables in the C# code, so their names follow its rules. */
const CODE_NAME_PATTERN = /^[A-Za-z_]\w*$/;

export const isCodeName = (text: string): boolean => CODE_NAME_PATTERN.test(text);

/** A channel id from text, or undefined if the text is not a valid name in the code. */
export const parseChannelId = (text: string): ChannelId | undefined =>
  isCodeName(text) ? (text as ChannelId) : undefined;

/** A pattern name from text, or undefined if the text is not a valid name in the code. */
export const parsePatternName = (text: string): PatternName | undefined =>
  isCodeName(text) ? (text as PatternName) : undefined;

/** Like parseChannelId, for names written in the source code, where an invalid one is a bug. */
export const requireChannelId = (text: string): ChannelId => {
  const id = parseChannelId(text);
  if (id === undefined) throw new RangeError(`"${text}" is not a valid channel name.`);
  return id;
};

/** Like parsePatternName, for names written in the source code, where an invalid one is a bug. */
export const requirePatternName = (text: string): PatternName => {
  const name = parsePatternName(text);
  if (name === undefined) throw new RangeError(`"${text}" is not a valid pattern name.`);
  return name;
};
