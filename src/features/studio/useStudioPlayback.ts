import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { usePlayer } from '@/audio/player/PlayerProvider';
import type { PlaybackSettings } from '@/audio/player/songPlayer';
import type { PlayMode } from '@/domain/playback/scheduleSteps';
import type { PatternName } from '@/domain/song/ids';
import type { Steps } from '@/domain/song/limits';
import type { DrumChannel, DrumStep, Song } from '@/domain/song/types';
import { useNotice } from '@/features/notice/useNotice';

const PIANO_MISSING = 'The piano recordings did not load, so the piano is silent.';
const PLAYBACK_FAILED = 'Playback stopped because of an error. Try again.';

/** How hard a tapped drum sounds, as in the web studio. */
const AUDITION_VELOCITY = { 1: 0.75, 2: 1 } as const satisfies Record<Exclude<DrumStep, 0>, number>;

/** The step sounding now, for the rack to light up. */
export type Playhead = {
  readonly patternName: PatternName;
  readonly step: Steps;
};

type StudioPlaybackSpec = {
  readonly song: Song;
  readonly editedPatternIndex: number;
  /** Told when the song moves on to another pattern, so the screen can follow it. */
  readonly onPatternPlaying: (name: PatternName) => void;
};

export type StudioPlayback = {
  readonly mode: PlayMode;
  readonly isPlaying: boolean;
  readonly playhead: Playhead | undefined;
  readonly notice: string | undefined;
  readonly togglePlay: () => void;
  /** Plays a drum once, as a tapped step does; a rest makes no sound. */
  readonly audition: (channel: DrumChannel, value: DrumStep) => void;
};

/**
 * Plays the song in the studio. A song with an arrangement plays it and the screen follows the
 * pattern playing; otherwise the pattern on screen loops, as the web studio does when it opens a
 * song. Edits made while it plays are heard from the next step.
 */
export const useStudioPlayback = ({
  song,
  editedPatternIndex,
  onPatternPlaying,
}: StudioPlaybackSpec): StudioPlayback => {
  const { getPlayer, listenForErrors } = usePlayer();
  const { notice, tell, clear } = useNotice();
  const [isPlaying, setIsPlaying] = useState(false);
  const playhead = usePlayhead({ isPlaying, onPatternPlaying });
  const mode: PlayMode = song.arrangement.length > 0 ? 'song' : 'pattern';
  const settings = useMemo<PlaybackSettings>(
    () => ({ song, mode, editedPatternIndex, isMetronomeOn: false }),
    [song, mode, editedPatternIndex],
  );
  /** The settings as last drawn, for a play that starts from a tap. */
  const latestSettings = useRef(settings);
  /** Counts plays and stops, so the answer to an earlier play cannot override a later choice. */
  const requestCount = useRef(0);
  /** Whether this studio has played, so leaving it does not start an audio context to stop. */
  const hasPlayed = useRef(false);

  useEffect(() => {
    latestSettings.current = settings;
    if (isPlaying) getPlayer().update(settings);
  }, [settings, isPlaying, getPlayer]);

  const fail = useCallback(() => {
    requestCount.current++;
    setIsPlaying(false);
    tell(PLAYBACK_FAILED);
  }, [tell]);

  useEffect(() => listenForErrors(fail), [listenForErrors, fail]);

  const stop = useCallback(() => {
    requestCount.current++;
    if (hasPlayed.current) getPlayer().stop();
    setIsPlaying(false);
  }, [getPlayer]);

  // Leaving the studio stops its song.
  useEffect(() => stop, [stop]);

  const play = useCallback(() => {
    const thisRequest = ++requestCount.current;
    hasPlayed.current = true;
    setIsPlaying(true);
    clear();
    const isLatest = () => requestCount.current === thisRequest;

    // Starting inside a promise turns an error in making the player into a failed play.
    Promise.resolve()
      .then(() => getPlayer().play(latestSettings.current))
      .then(
        (outcome) => {
          if (isLatest() && outcome === 'playing-without-piano') tell(PIANO_MISSING);
        },
        () => {
          if (isLatest()) fail();
        },
      );
  }, [getPlayer, clear, tell, fail]);

  const togglePlay = useCallback(() => (isPlaying ? stop() : play()), [isPlaying, play, stop]);

  const audition = useCallback(
    (channel: DrumChannel, value: DrumStep) => {
      if (value === 0) return;
      const velocity = AUDITION_VELOCITY[value];
      // A drum that cannot sound is not worth stopping the studio over.
      Promise.resolve()
        .then(() => getPlayer().audition({ song: latestSettings.current.song, channel, velocity }))
        .catch(() => {});
    },
    [getPlayer],
  );

  return { mode, isPlaying, playhead, notice, togglePlay, audition };
};

type PlayheadSpec = {
  readonly isPlaying: boolean;
  readonly onPatternPlaying: (name: PatternName) => void;
};

/** Follows the step sounding now, once a frame while the song plays. */
const usePlayhead = ({ isPlaying, onPatternPlaying }: PlayheadSpec): Playhead | undefined => {
  const { getPlayer } = usePlayer();
  const [playhead, setPlayhead] = useState<Playhead | undefined>(undefined);
  const shown = useRef<Playhead | undefined>(undefined);

  useEffect(() => {
    if (!isPlaying) return;
    let frame = requestAnimationFrame(function follow() {
      const sounding = getPlayer().currentStep();
      const last = shown.current;
      if (
        sounding !== undefined &&
        (last?.patternName !== sounding.patternName || last.step !== sounding.step)
      ) {
        if (last?.patternName !== sounding.patternName) onPatternPlaying(sounding.patternName);
        shown.current = { patternName: sounding.patternName, step: sounding.step };
        setPlayhead(shown.current);
      }
      frame = requestAnimationFrame(follow);
    });
    return () => {
      cancelAnimationFrame(frame);
      shown.current = undefined;
      setPlayhead(undefined);
    };
  }, [isPlaying, getPlayer, onPatternPlaying]);

  return playhead;
};
