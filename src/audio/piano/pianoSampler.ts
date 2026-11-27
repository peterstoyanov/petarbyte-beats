import type { AudioBuffer, AudioNode, BaseAudioContext } from 'react-native-audio-api';

import type { MidiNote } from '@/domain/music/notes';

import { PIANO_SAMPLES, type PianoSample } from './pianoSamples';

const SEMITONES_PER_OCTAVE = 12;
/** Each recording starts with a few milliseconds of silence before the hammer. */
const SKIP_SECONDS = 0.008;
/** A key tapped very briefly still sounds this long. */
const SHORTEST_KEY_SECONDS = 0.08;
/** How fast the damper silences the string once the key is let go. */
const DAMPER_TIME_CONSTANT = 0.12;
/** The damped string has died away this long after the key is let go. */
const DAMPED_SECONDS = 1;

type Recording = {
  readonly midi: MidiNote;
  readonly sound: AudioBuffer;
};

type PianoNoteSpec = {
  readonly output: AudioNode;
  readonly midi: MidiNote;
  readonly time: number;
  /** How long the note sounds before the damper falls: the key, plus part of the release. */
  readonly seconds: number;
  readonly velocity: number;
};

/**
 * The grand piano: real recordings, decoded once for the context it plays in. A note between two
 * recordings plays the nearest one a little faster or slower, which a piano hides well within a
 * semitone.
 */
export class PianoSampler {
  private recordings: readonly Recording[] = [];
  private loading: Promise<void> | undefined;

  constructor(private readonly context: BaseAudioContext) {}

  get isReady(): boolean {
    return this.recordings.length > 0;
  }

  /** Decodes the recordings. Calls while it loads share the same work; after a failure, try again. */
  load(): Promise<void> {
    this.loading ??= decodeRecordings(this.context, PIANO_SAMPLES).then(
      (recordings) => {
        this.recordings = recordings;
      },
      (error: unknown) => {
        this.loading = undefined;
        throw error;
      },
    );
    return this.loading;
  }

  /** Plays a note; silent while the recordings are not loaded yet. */
  play({ output, midi, time, seconds, velocity }: PianoNoteSpec): void {
    const nearest = nearestRecording(this.recordings, midi);
    if (nearest === undefined) return;

    const source = this.context.createBufferSource();
    const level = this.context.createGain();
    source.buffer = nearest.sound;
    source.playbackRate.value = 2 ** ((midi - nearest.midi) / SEMITONES_PER_OCTAVE);
    const keyUp = time + Math.max(SHORTEST_KEY_SECONDS, seconds);
    level.gain.setValueAtTime(velocity, time);
    level.gain.setTargetAtTime(0, keyUp, DAMPER_TIME_CONSTANT);
    source.connect(level);
    level.connect(output);
    source.start(time, SKIP_SECONDS);
    source.stop(keyUp + DAMPED_SECONDS);
  }
}

const decodeRecordings = (
  context: BaseAudioContext,
  samples: readonly PianoSample[],
): Promise<Recording[]> =>
  Promise.all(
    samples.map(async ({ midi, asset }) => ({ midi, sound: await context.decodeAudioData(asset) })),
  );

/** The recording closest to the note. */
const nearestRecording = (
  recordings: readonly Recording[],
  midi: MidiNote,
): Recording | undefined =>
  recordings.reduce<Recording | undefined>((best, recording) => {
    if (best === undefined) return recording;
    return Math.abs(recording.midi - midi) < Math.abs(best.midi - midi) ? recording : best;
  }, undefined);
