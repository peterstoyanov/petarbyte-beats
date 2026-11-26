import acid from './songs/acid.cs';
import acidRain from './songs/acid-rain.cs';
import afroSun from './songs/afro-sun.cs';
import bachPreludeInC from './songs/bach-prelude-in-c.cs';
import boomBap from './songs/boom-bap.cs';
import brahmsLullaby from './songs/brahms-lullaby.cs';
import canonInD from './songs/canon-in-d.cs';
import empty from './songs/empty.cs';
import furElise from './songs/fur-elise.cs';
import goldenHour from './songs/golden-hour.cs';
import grayStreets from './songs/gray-streets.cs';
import greensleeves from './songs/greensleeves.cs';
import gymnopedie1 from './songs/gymnopedie-1.cs';
import highway86 from './songs/highway-86.cs';
import house from './songs/house.cs';
import lateNightStudy from './songs/late-night-study.cs';
import minuetInG from './songs/minuet-in-g.cs';
import mountainKing from './songs/mountain-king.cs';
import neonRooftop from './songs/neon-rooftop.cs';
import newWorldLargo from './songs/new-world-largo.cs';
import odeToJoy from './songs/ode-to-joy.cs';
import oldSchool from './songs/old-school.cs';
import pixelQuest from './songs/pixel-quest.cs';
import slowMotion from './songs/slow-motion.cs';
import synthwave from './songs/synthwave.cs';
import trap from './songs/trap.cs';
import warehouse from './songs/warehouse.cs';

/** The sections of the song menu, in the order it lists them. */
export const PRESET_GROUPS = [
  { id: 'songs', label: 'Songs (about 1:30, also on the radio)' },
  { id: 'classical', label: 'Classical piano (public domain)' },
  { id: 'loops', label: 'Short loops' },
] as const;

export type PresetGroupId = (typeof PRESET_GROUPS)[number]['id'];

export type Preset = {
  readonly id: string;
  readonly title: string;
  /** One line under the title: the style, the tempo and what to listen for. */
  readonly note: string;
  readonly group: PresetGroupId;
  /** The song as C# code, from songs/. */
  readonly code: string;
};

/** The songs built into the app, in the order the web studio lists them. */
export const PRESETS = [
  {
    id: 'neon-rooftop',
    title: 'Neon Rooftop',
    note: 'Trap, 140 BPM: a bell hook, a long 808, hi-hat rolls',
    group: 'songs',
    code: neonRooftop,
  },
  {
    id: 'golden-hour',
    title: 'Golden Hour',
    note: 'Pop, 116 BPM: piano verses, a super saw chorus',
    group: 'songs',
    code: goldenHour,
  },
  {
    id: 'late-night-study',
    title: 'Late Night Study',
    note: 'Lo-fi, 82 BPM: Rhodes, bells and dusty drums',
    group: 'songs',
    code: lateNightStudy,
  },
  {
    id: 'gray-streets',
    title: 'Gray Streets',
    note: 'Drill, 142 BPM: a sliding 808 and a cold piano',
    group: 'songs',
    code: grayStreets,
  },
  {
    id: 'afro-sun',
    title: 'Afro Sun',
    note: 'Afrobeats, 104 BPM: congas, shaker, a singing pluck',
    group: 'songs',
    code: afroSun,
  },
  {
    id: 'highway-86',
    title: 'Highway 86',
    note: 'Synthwave, 104 BPM: an arpeggio in the dark',
    group: 'songs',
    code: highway86,
  },
  {
    id: 'warehouse',
    title: 'Warehouse',
    note: 'House, 124 BPM: piano stabs and a pumping drop',
    group: 'songs',
    code: warehouse,
  },
  {
    id: 'acid-rain',
    title: 'Acid Rain',
    note: 'Acid techno, 128 BPM: a 303 that squelches',
    group: 'songs',
    code: acidRain,
  },
  {
    id: 'pixel-quest',
    title: 'Pixel Quest',
    note: 'Chiptune, 150 BPM: an 8-bit adventure theme',
    group: 'songs',
    code: pixelQuest,
  },
  {
    id: 'old-school',
    title: 'Old School',
    note: 'Boom bap, 90 BPM: a Rhodes loop with swing',
    group: 'songs',
    code: oldSchool,
  },
  {
    id: 'slow-motion',
    title: 'Slow Motion',
    note: 'R&B, 72 BPM: electric piano, strings, an 808',
    group: 'songs',
    code: slowMotion,
  },
  {
    id: 'fur-elise',
    title: 'Für Elise',
    note: 'Beethoven, 1810: the theme and the episode, all of it',
    group: 'classical',
    code: furElise,
  },
  {
    id: 'bach-prelude-in-c',
    title: 'Prelude in C major',
    note: 'J. S. Bach, BWV 846: every measure, start to end',
    group: 'classical',
    code: bachPreludeInC,
  },
  {
    id: 'canon-in-d',
    title: 'Canon in D',
    note: 'Pachelbel: the ground bass and its famous lines',
    group: 'classical',
    code: canonInD,
  },
  {
    id: 'minuet-in-g',
    title: 'Minuet in G',
    note: 'Notebook for Anna Magdalena Bach: both halves, twice',
    group: 'classical',
    code: minuetInG,
  },
  {
    id: 'ode-to-joy',
    title: 'Ode to Joy',
    note: 'Beethoven, Symphony No. 9: the whole tune three times',
    group: 'classical',
    code: odeToJoy,
  },
  {
    id: 'new-world-largo',
    title: 'Largo, New World',
    note: 'Dvořák, Symphony No. 9: the slow tune',
    group: 'classical',
    code: newWorldLargo,
  },
  {
    id: 'mountain-king',
    title: 'In the Hall of the Mountain King',
    note: 'Grieg, Peer Gynt: louder and higher each time',
    group: 'classical',
    code: mountainKing,
  },
  {
    id: 'greensleeves',
    title: 'Greensleeves',
    note: 'English tune of the 1500s: three verses',
    group: 'classical',
    code: greensleeves,
  },
  {
    id: 'gymnopedie-1',
    title: 'Gymnopédie No. 1',
    note: 'Satie, 1888: the rocking chords and the slow tune',
    group: 'classical',
    code: gymnopedie1,
  },
  {
    id: 'brahms-lullaby',
    title: 'Lullaby',
    note: 'Brahms, Op. 49 No. 4: the cradle song, three verses',
    group: 'classical',
    code: brahmsLullaby,
  },
  {
    id: 'synthwave',
    title: 'Synthwave',
    note: 'Super saw, arpeggio, gated drums, 104 BPM',
    group: 'loops',
    code: synthwave,
  },
  {
    id: 'boom-bap',
    title: 'Boom bap',
    note: 'Hip-hop, 88 BPM, Rhodes chords, swung',
    group: 'loops',
    code: boomBap,
  },
  {
    id: 'house',
    title: 'House',
    note: 'Four on the floor, piano stabs, sidechained bass',
    group: 'loops',
    code: house,
  },
  {
    id: 'trap',
    title: 'Trap',
    note: 'Half time, 140 BPM, long 808 and bells',
    group: 'loops',
    code: trap,
  },
  {
    id: 'acid',
    title: 'Acid techno',
    note: 'A 303 line that squelches, 128 BPM',
    group: 'loops',
    code: acid,
  },
  { id: 'empty', title: 'Empty', note: 'Start from nothing', group: 'loops', code: empty },
] as const satisfies readonly Preset[];

/** The presets in one section of the song menu, in menu order. */
export const presetsIn = (group: PresetGroupId): readonly Preset[] =>
  PRESETS.filter((preset) => preset.group === group);

/** The preset with this id, for example one taken from a link; undefined when there is none. */
export const findPreset = (id: string): Preset | undefined =>
  PRESETS.find((preset) => preset.id === id);
