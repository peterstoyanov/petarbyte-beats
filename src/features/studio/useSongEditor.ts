import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { nextDrumStep, setDrumStep } from '@/domain/editing/drumStepEdits';
import { toggleMute, toggleSolo } from '@/domain/editing/muteEdits';
import { setSwing, setTempo } from '@/domain/editing/tempoEdits';
import type { ChannelId, PatternName } from '@/domain/song/ids';
import type { Steps } from '@/domain/song/limits';
import { editedPattern } from '@/domain/song/timing';
import type { DrumStep, Pattern, Song } from '@/domain/song/types';

export type StepTap = {
  readonly channelId: ChannelId;
  readonly step: Steps;
  /** A long press sets a loud hit, as Shift and a click does in the web studio. */
  readonly isLoud: boolean;
};

export type SongEditor = {
  readonly song: Song;
  /** The pattern on screen, which the channel rack shows and edits. */
  readonly pattern: Pattern;
  readonly editedPatternIndex: number;
  /** Puts a pattern on screen, as when the song moves on to it while it plays. */
  readonly showPattern: (name: PatternName) => void;
  /** Turns a drum step on or off in the pattern on screen, and says what it became. */
  readonly tapStep: (tap: StepTap) => DrumStep;
  readonly toggleMute: (channelId: ChannelId) => void;
  readonly toggleSolo: (channelId: ChannelId) => void;
  readonly setTempo: (bpm: number) => void;
  readonly setSwing: (swing: number) => void;
};

/** The song being edited in the studio, and the edits the studio can make to it. */
export const useSongEditor = (initialSong: Song): SongEditor => {
  const [song, setSong] = useState(initialSong);
  const [editedPatternIndex, setEditedPatternIndex] = useState(0);
  /** The song as last drawn, so a tap can tell what the step it lands on turns into. */
  const shownSong = useRef(song);
  const shownPatternIndex = useRef(editedPatternIndex);

  useEffect(() => {
    shownSong.current = song;
    shownPatternIndex.current = editedPatternIndex;
  }, [song, editedPatternIndex]);

  const showPattern = useCallback((name: PatternName) => {
    const index = shownSong.current.patterns.findIndex((pattern) => pattern.name === name);
    if (index >= 0) setEditedPatternIndex(index);
  }, []);

  const tapStep = useCallback(({ channelId, step, isLoud }: StepTap): DrumStep => {
    const pattern = editedPattern(shownSong.current, shownPatternIndex.current);
    const current = pattern.hits[channelId]?.[step] ?? 0;
    const value = nextDrumStep(current, { isLoud });
    setSong((latest) => setDrumStep(latest, { pattern: pattern.name, channelId, step, value }));
    return value;
  }, []);

  // setSong never changes, so these keep their identity and memoized rows do not redraw.
  const edits = useMemo(() => {
    const edit =
      <Argument>(change: (song: Song, argument: Argument) => Song) =>
      (argument: Argument) =>
        setSong((latest) => change(latest, argument));
    return {
      toggleMute: edit(toggleMute),
      toggleSolo: edit(toggleSolo),
      setTempo: edit(setTempo),
      setSwing: edit(setSwing),
    };
  }, []);

  return {
    song,
    pattern: editedPattern(song, editedPatternIndex),
    editedPatternIndex,
    showPattern,
    tapStep,
    ...edits,
  };
};
