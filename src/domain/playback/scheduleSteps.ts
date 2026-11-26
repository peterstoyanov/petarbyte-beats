import { STEPS_PER_BAR, STEPS_PER_BEAT, stepCount, type Steps } from '../song/limits';
import { playOrder, stepSeconds, swingOffsetSeconds, type PlayOrder } from '../song/timing';
import type { Pattern, Song } from '../song/types';
import { stepEvents, type StepEvent } from './stepEvents';

/** Pattern mode loops the pattern on screen; song mode plays the arrangement. */
export type PlayMode = 'pattern' | 'song';

/** The next step to schedule, and when it is due before swing moves it. */
export type Playhead = {
  /** The position in the play order. */
  readonly slot: number;
  readonly step: Steps;
  /** In seconds on the audio clock. */
  readonly time: number;
};

export type MetronomeClick = {
  readonly kind: 'click';
  readonly isBarStart: boolean;
};

export type PlaybackEvent = StepEvent | MetronomeClick;

/** One step ready for the audio engine, and where it is so the screen can follow it. */
export type ScheduledStep = {
  /** When the step sounds, swing included. */
  readonly time: number;
  readonly slot: number;
  readonly pattern: Pattern;
  readonly step: Steps;
  readonly events: readonly PlaybackEvent[];
};

export type ScheduleSpec = {
  readonly song: Song;
  readonly mode: PlayMode;
  /** The pattern on screen: pattern mode loops it, and a song with no arrangement plays it. */
  readonly editedPatternIndex: number;
  readonly isMetronomeOn: boolean;
  readonly playhead: Playhead;
  /** Every step due before this time is scheduled. */
  readonly until: number;
};

export type Schedule = {
  readonly steps: readonly ScheduledStep[];
  /** Where the next call carries on. */
  readonly playhead: Playhead;
};

export const startPlayhead = (time: number): Playhead => ({ slot: 0, step: 0, time });

/**
 * The steps due before `until`, from the playhead on. Each call reads the song afresh, so an edit
 * made while the song plays is heard from the next step scheduled, as in the web studio.
 *
 * Every step up to `until` is returned, however many that is. After the app has been in the
 * background the caller should move the playhead up to the audio clock first, or it gets a burst
 * of late steps.
 */
export const scheduleSteps = (spec: ScheduleSpec): Schedule => {
  const order = patternsInPlay(spec);
  const stepLength = stepSeconds(spec.song.bpm);
  // A step that does not move time forward would schedule forever.
  if (!(Number.isFinite(stepLength) && stepLength > 0)) {
    throw new RangeError(`A song needs a positive tempo to play, not ${spec.song.bpm} BPM.`);
  }
  const steps: ScheduledStep[] = [];

  let playhead = spec.playhead;
  while (playhead.time < spec.until) {
    const position = positionOf(playhead, order);
    steps.push(scheduledStep({ spec, position, time: playhead.time }));
    playhead = { slot: position.slot, step: position.step + 1, time: playhead.time + stepLength };
  }

  return { steps, playhead };
};

const patternsInPlay = ({ song, mode, editedPatternIndex }: ScheduleSpec): PlayOrder =>
  mode === 'song'
    ? playOrder(song, editedPatternIndex)
    : [song.patterns[editedPatternIndex] ?? song.patterns[0]];

type Position = {
  readonly slot: number;
  readonly step: Steps;
  readonly pattern: Pattern;
};

/**
 * Where the playhead really is. It moves to the next pattern after the last step, and to the start
 * when an edit has made the pattern shorter or the arrangement shorter than where it was.
 */
const positionOf = (playhead: Playhead, order: PlayOrder): Position => {
  const slot = playhead.slot < order.length ? playhead.slot : 0;
  const pattern = patternAt(order, slot);
  if (playhead.step < stepCount(pattern.bars)) return { slot, step: playhead.step, pattern };

  const nextSlot = (slot + 1) % order.length;
  return { slot: nextSlot, step: 0, pattern: patternAt(order, nextSlot) };
};

const patternAt = (order: PlayOrder, slot: number): Pattern => order[slot] ?? order[0];

type ScheduledStepSpec = {
  readonly spec: ScheduleSpec;
  readonly position: Position;
  readonly time: number;
};

const scheduledStep = ({ spec, position, time }: ScheduledStepSpec): ScheduledStep => {
  const { song, isMetronomeOn } = spec;
  const { slot, step, pattern } = position;
  return {
    time: time + swingOffsetSeconds(song, step),
    slot,
    pattern,
    step,
    events: [...stepEvents({ song, pattern, step }), ...metronomeClicks(isMetronomeOn, step)],
  };
};

/** The metronome clicks on every beat, louder at the start of a bar. */
const metronomeClicks = (isMetronomeOn: boolean, step: Steps): MetronomeClick[] =>
  isMetronomeOn && step % STEPS_PER_BEAT === 0
    ? [{ kind: 'click', isBarStart: step % STEPS_PER_BAR === 0 }]
    : [];
