import type { AudioContext } from 'react-native-audio-api';

import type { PlaybackEvent } from '@/domain/playback/scheduleSteps';

import type { MixingDesk } from '../mixingDesk';
import { playClick } from '../metronome';
import type { PianoSampler } from '../piano/pianoSampler';
import { playDrumHit } from '../sounds/drums/drumKit';
import type { HiHatChoke } from '../sounds/hiHatChoke';
import { playNoteStart } from '../sounds/instruments/instrumentRack';

/** Where the sounds of a song go. */
export type Instruments = {
  readonly context: AudioContext;
  readonly desk: MixingDesk;
  readonly piano: PianoSampler;
  readonly hiHatChoke: HiHatChoke;
};

type PlayEventSpec = {
  readonly instruments: Instruments;
  readonly event: PlaybackEvent;
  readonly time: number;
  /** The wobble bass locks to the tempo. */
  readonly bpm: number;
};

/** Sends one event to what makes its sound: a drum, an instrument, the desk or the metronome. */
export const playEvent = ({ instruments, event, time, bpm }: PlayEventSpec): void => {
  const { context, desk, piano, hiHatChoke } = instruments;
  switch (event.kind) {
    case 'hit':
      playDrumHit({
        context,
        hit: event,
        time,
        output: desk.inputFor(event.channel.id),
        hiHatChoke,
      });
      return;
    case 'note':
      playNoteStart({
        context,
        note: event,
        time,
        output: desk.inputFor(event.channel.id),
        bpm,
        piano,
      });
      return;
    case 'duck':
      desk.duck(event, time);
      return;
    case 'click':
      playClick(context, { time, isBarStart: event.isBarStart, output: context.destination });
      return;
    default:
      assertNever(event);
  }
};

const assertNever = (value: never): never => {
  throw new Error(`Unexpected playback event: ${JSON.stringify(value)}`);
};
