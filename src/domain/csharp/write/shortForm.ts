import { INSTRUMENTS } from '../../sounds/catalog';
import { formatDrumSteps } from '../../song/drumSteps';
import { emptyHits } from '../../song/patterns';
import type { DrumChannel, InstrumentChannel, Pattern, Song } from '../../song/types';
import { CSHARP_SOUND_NAMES, SONG_VARIABLE } from '../vocabulary';
import { declarationLine, settingLines } from './channelLines';
import { chordLines, chordNotesText, velocitySuffix } from './noteLines';

const HEADER = [
  '// PetarByte Beats: this beat, written as C# code.',
  '// Draw on the grid or edit this code: they stay in sync.',
];
const DRUMS_COMMENT =
  '// Drums: one character per step. x = hit, X = loud hit, . = rest, | = new bar';
const INSTRUMENTS_COMMENT =
  '// Instruments: Play(step, length in steps, notes). Notes in one string make a chord.';

/** The extra width of "Drums." and the comma around an enum name, for lining up the steps. */
const DRUM_ENUM_EXTRA_WIDTH = 'Drums.,'.length;

/** A song of one pattern: every drum with its steps, every instrument with its notes. */
export const writeShortForm = (song: Song): string[] => {
  const [pattern] = song.patterns;
  const drums = song.channels.filter((channel) => channel.kind === 'drum');
  const instruments = song.channels.filter((channel) => channel.kind === 'instrument');
  return [
    ...HEADER,
    `var ${SONG_VARIABLE} = new Song(bpm: ${song.bpm}, bars: ${pattern.bars}, swing: ${song.swing}, key: "${song.key}");`,
    ...drumSection(drums, pattern),
    ...instruments.flatMap((channel, index) => instrumentSection(channel, pattern, index === 0)),
  ];
};

/** Drums declared with their steps, lined up in columns, then their settings. */
const drumSection = (drums: readonly DrumChannel[], pattern: Pattern): string[] => {
  if (drums.length === 0) return [];

  const idWidth = Math.max(...drums.map((drum) => drum.id.length));
  const enumWidth = Math.max(...drums.map((drum) => CSHARP_SOUND_NAMES[drum.sound].length));
  const declarations = drums.map((drum) => {
    const id = drum.id.padEnd(idWidth);
    const sound = `Drums.${CSHARP_SOUND_NAMES[drum.sound]},`.padEnd(
      enumWidth + DRUM_ENUM_EXTRA_WIDTH,
    );
    const steps = formatDrumSteps(pattern.hits[drum.id] ?? emptyHits(pattern.bars));
    return `var ${id} = ${SONG_VARIABLE}.Drum(${sound} "${steps}");`;
  });
  return ['', DRUMS_COMMENT, ...declarations, ...drums.flatMap(settingLines)];
};

/** An instrument, its settings and its notes, introduced by a comment. */
const instrumentSection = (
  channel: InstrumentChannel,
  pattern: Pattern,
  isFirst: boolean,
): string[] => [
  '',
  isFirst ? INSTRUMENTS_COMMENT : `// ${INSTRUMENTS[channel.sound].label}`,
  declarationLine(channel),
  ...settingLines(channel),
  ...chordLines({
    notes: pattern.notes[channel.id] ?? [],
    bars: pattern.bars,
    playLine: (chord) =>
      `${channel.id}.Play(${chord.step}, ${chord.length}, "${chordNotesText(chord)}"${velocitySuffix(chord)});`,
    barComment: (bar) => `// bar ${bar}`,
  }),
];
