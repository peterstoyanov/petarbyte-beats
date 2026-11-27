import type { TextStyle } from 'react-native';

/** The text styles of the app, named after Apple's text styles; they scale with Dynamic Type. */
export const typography = {
  body: { fontSize: 17 },
  callout: { fontSize: 16 },
  subhead: { fontSize: 15 },
  footnote: { fontSize: 13 },
  caption: { fontSize: 11 },
} as const satisfies Record<string, TextStyle>;

export const fontWeight = {
  semibold: '600',
} as const satisfies Record<string, TextStyle['fontWeight']>;
