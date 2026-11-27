import type { AudioContext } from 'react-native-audio-api';

import {
  scheduleSteps,
  startPlayhead,
  type Playhead,
  type ScheduledStep,
  type ScheduleSpec,
} from '@/domain/playback/scheduleSteps';
import type { Song } from '@/domain/song/types';

import { MixingDesk } from '../mixingDesk';
import { PianoSampler } from '../piano/pianoSampler';
import { HiHatChoke } from '../sounds/hiHatChoke';
import { playEvent, type Instruments } from './playEvent';

/** How far ahead of the audio clock steps are scheduled. */
const LOOKAHEAD_SECONDS = 0.12;
/** How often the scheduler wakes up: well inside the lookahead, so no step is late. */
const TICK_MS = 25;
/** The first step plays a moment after Play, so it is never already late. */
const START_DELAY_SECONDS = 0.06;

/** What to play and how; it can change while the song plays. */
export type PlaybackSettings = Pick<
  ScheduleSpec,
  'song' | 'mode' | 'editedPatternIndex' | 'isMetronomeOn'
>;

/** How a call to play ended: playing, playing with a silent piano, or stopped before it began. */
export type PlayOutcome = 'playing' | 'playing-without-piano' | 'stopped';

type SongPlayerSpec = {
  readonly context: AudioContext;
  /** Told when playback had to stop because of an error, so the app can say so. */
  readonly onError: (error: unknown) => void;
};

/**
 * Plays a song: wakes up every few milliseconds, schedules the steps due soon on the audio clock,
 * and sends each one's sounds on, as the web studio does. Stop lets the sounds already scheduled,
 * a moment ahead at most, ring out, as there.
 */
export class SongPlayer {
  private readonly context: AudioContext;
  private readonly onError: (error: unknown) => void;
  private readonly instruments: Instruments;
  private settings: PlaybackSettings | undefined;
  private playhead: Playhead | undefined;
  private timer: ReturnType<typeof setInterval> | undefined;
  private scheduledSteps: ScheduledStep[] = [];
  /** Counts every start and stop, so a play that waited for the piano knows if it was overtaken. */
  private playCount = 0;
  private isDisposed = false;

  constructor({ context, onError }: SongPlayerSpec) {
    this.context = context;
    this.onError = onError;
    this.instruments = {
      context,
      desk: new MixingDesk(context),
      piano: new PianoSampler(context),
      hiHatChoke: new HiHatChoke(),
    };
  }

  get isPlaying(): boolean {
    return this.timer !== undefined;
  }

  /**
   * Starts the song from the top. A song with a piano waits for its recordings first; if they fail
   * to load, the song plays without them, as in the web studio. A stop, or another play, while it
   * waits wins, and this one ends as 'stopped'.
   */
  async play(settings: PlaybackSettings): Promise<PlayOutcome> {
    if (this.isDisposed) throw new Error('This player has been disposed of.');
    this.stop();
    const thisPlay = this.playCount;

    // A context starts suspended on some phones until the app first plays sound.
    if (this.context.state === 'suspended') await this.context.resume();
    const hasPiano = await this.loadPianoFor(settings.song);
    if (thisPlay !== this.playCount) return 'stopped';

    this.applyMix(settings.song);
    this.settings = settings;
    this.playhead = startPlayhead(this.context.currentTime + START_DELAY_SECONDS);
    this.tick();
    this.timer = setInterval(() => this.tick(), TICK_MS);
    return hasPiano ? 'playing' : 'playing-without-piano';
  }

  /** Takes in an edit, or a change of mode, while the song plays. */
  update(settings: PlaybackSettings): void {
    if (this.settings !== undefined && settings.song !== this.settings.song) {
      this.applyMix(settings.song);
    }
    this.settings = settings;
  }

  stop(): void {
    this.playCount++;
    clearInterval(this.timer);
    this.timer = undefined;
    this.playhead = undefined;
    this.scheduledSteps = [];
  }

  /** The step sounding now, for the screen to follow; undefined before the first or when stopped. */
  currentStep(): ScheduledStep | undefined {
    const now = this.context.currentTime;
    return this.scheduledSteps.findLast((step) => step.time <= now);
  }

  /** Stops for good and takes the desk off the speakers, for when the player is closed. */
  dispose(): void {
    this.stop();
    this.isDisposed = true;
    this.instruments.desk.dispose();
  }

  private async loadPianoFor(song: Song): Promise<boolean> {
    if (!song.channels.some((channel) => channel.sound === 'piano')) return true;
    try {
      await this.instruments.piano.load();
      return true;
    } catch {
      return false;
    }
  }

  private applyMix(song: Song): void {
    this.instruments.desk.applySong(song);
    this.instruments.desk.applyChannels(song.channels);
  }

  /** One wake-up of the scheduler. An error stops playback rather than repeating every tick. */
  private tick(): void {
    try {
      this.scheduleDueSteps();
    } catch (error) {
      this.stop();
      this.onError(error);
    }
  }

  private scheduleDueSteps(): void {
    if (this.settings === undefined || this.playhead === undefined) return;
    const now = this.context.currentTime;

    if (hasStalled(this.playhead, now)) {
      this.playhead = { ...this.playhead, time: now + START_DELAY_SECONDS };
      this.scheduledSteps = [];
    }

    const { steps, playhead } = scheduleSteps({
      ...this.settings,
      playhead: this.playhead,
      until: now + LOOKAHEAD_SECONDS,
    });
    const { bpm } = this.settings.song;
    for (const step of steps) {
      for (const event of step.events) {
        playEvent({ instruments: this.instruments, event, time: step.time, bpm });
      }
    }
    this.scheduledSteps = [...fromSoundingStepOn(this.scheduledSteps, now), ...steps];
    this.playhead = playhead;
  }
}

/**
 * Whether the scheduler fell far behind the clock. In the background timers stop while the audio
 * clock runs on; then the playhead moves up to the clock instead of playing every late step at
 * once. A step only a little late still plays, at once, as in the web studio.
 */
const hasStalled = (playhead: Playhead, now: number): boolean =>
  playhead.time < now - LOOKAHEAD_SECONDS;

/** The step sounding now, which the screen still shows, and the steps still to sound. */
const fromSoundingStepOn = (steps: readonly ScheduledStep[], now: number): ScheduledStep[] => {
  const sounding = steps.findLast((step) => step.time <= now);
  return steps.filter((step) => step === sounding || step.time > now);
};
