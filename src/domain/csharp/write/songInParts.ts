import { formatDrumSteps } from '../../song/drumSteps';
import { formatDuration, playOrder, songSeconds } from '../../song/timing';
import type { Channel, Pattern, Song } from '../../song/types';
import { SONG_VARIABLE } from '../vocabulary';
import { declarationLine, settingLines } from './channelLines';
import { chordLines, chordNotesText, velocitySuffix } from './noteLines';

const HEADER = [
  '// PetarByte Beats: this song, written as C# code.',
  '// Channels are the sounds, patterns are a few bars each, the arrangement plays them in order.',
];
const CHANNELS_COMMENT = '// Channels: one sound each, with its mixer settings below it';
const FIRST_PATTERN_COMMENT =
  'Hits(drum, steps) with x = hit, X = loud, . = rest. Play(instrument, step, length, notes).';

/** How many pattern names the arrangement writes on each line. */
const PATTERNS_PER_ARRANGEMENT_LINE = 8;
const ARRANGEMENT_INDENT = '    ';

/** A song of several patterns or with an arrangement: channels, then each pattern, then the order. */
export const writeSongInParts = (song: Song): string[] => [
  ...HEADER,
  `var ${SONG_VARIABLE} = new Song(bpm: ${song.bpm}, swing: ${song.swing}, key: "${song.key}");`,
  '',
  CHANNELS_COMMENT,
  ...song.channels.flatMap((channel) => [declarationLine(channel), ...settingLines(channel)]),
  ...song.patterns.flatMap((pattern, index) => patternSection(song.channels, pattern, index === 0)),
  ...arrangementSection(song),
];

const patternSection = (
  channels: readonly Channel[],
  pattern: Pattern,
  isFirst: boolean,
): string[] => [
  '',
  isFirst ? `// Pattern ${pattern.name}: ${FIRST_PATTERN_COMMENT}` : `// Pattern ${pattern.name}`,
  `var ${pattern.name} = ${SONG_VARIABLE}.Pattern(bars: ${pattern.bars});`,
  ...hitsLines(channels, pattern),
  ...channels
    .filter((channel) => channel.kind === 'instrument')
    .flatMap((channel) =>
      chordLines({
        notes: pattern.notes[channel.id] ?? [],
        bars: pattern.bars,
        playLine: (chord) =>
          `${pattern.name}.Play(${channel.id}, ${chord.step}, ${chord.length}, "${chordNotesText(chord)}"${velocitySuffix(chord)});`,
        barComment: (bar) => `// ${pattern.name}, bar ${bar}`,
      }),
    ),
];

/** One Hits call for every drum that plays in the pattern, lined up in columns. */
const hitsLines = (channels: readonly Channel[], pattern: Pattern): string[] => {
  const playing = channels.flatMap((channel) => {
    const steps = channel.kind === 'drum' ? pattern.hits[channel.id] : undefined;
    return steps?.some((step) => step > 0) ? [{ id: channel.id, steps }] : [];
  });
  const idWidth = Math.max(0, ...playing.map(({ id }) => id.length));
  return playing.map(
    ({ id, steps }) =>
      `${pattern.name}.Hits(${`${id},`.padEnd(idWidth + 1)} "${formatDrumSteps(steps)}");`,
  );
};

/** The patterns in play order, a few per line, after a comment with the song's length. */
const arrangementSection = (song: Song): string[] => {
  if (song.arrangement.length === 0) return [];

  const bars = playOrder(song).reduce((total, pattern) => total + pattern.bars, 0);
  const lines = [
    '',
    `// The arrangement: the patterns in the order they play (${bars} bars, ${formatDuration(songSeconds(song))})`,
  ];

  for (let start = 0; start < song.arrangement.length; start += PATTERNS_PER_ARRANGEMENT_LINE) {
    const names = song.arrangement.slice(start, start + PATTERNS_PER_ARRANGEMENT_LINE).join(', ');
    const isLast = start + PATTERNS_PER_ARRANGEMENT_LINE >= song.arrangement.length;
    const opening = start === 0 ? `${SONG_VARIABLE}.Arrange(` : ARRANGEMENT_INDENT;
    lines.push(`${opening}${names}${isLast ? ');' : ','}`);
  }
  return lines;
};
