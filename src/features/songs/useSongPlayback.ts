import { useCallback, useEffect, useRef, useState } from 'react';

import type { PlaybackSettings } from '@/audio/player/songPlayer';
import { usePlayer } from '@/audio/player/PlayerProvider';
import type { Song } from '@/domain/song/types';
import { useNotice } from '@/features/notice/useNotice';
import type { Preset } from '@/presets/catalog';
import { openPreset } from '@/presets/openPreset';

const PIANO_MISSING = 'The piano recordings did not load, so the piano is silent.';
const PLAYBACK_FAILED = 'Playback stopped because of an error. Try again.';

export type SongPlayback = {
  /** The preset playing now, if any. */
  readonly playingId: string | undefined;
  /** Something to tell the listener, such as a silent piano. */
  readonly notice: string | undefined;
  /** Plays the preset from the top, in place of whatever was playing. */
  readonly play: (preset: Preset) => void;
  readonly stop: () => void;
};

/** Plays one built-in song at a time from the song list. */
export const useSongPlayback = (): SongPlayback => {
  const { getPlayer, listenForErrors } = usePlayer();
  const [playingId, setPlayingId] = useState<string | undefined>(undefined);
  const { notice, tell, clear } = useNotice();
  /** The song asked for last, so the answer to an earlier request cannot override it. */
  const latestRequest = useRef<string | undefined>(undefined);

  const fail = useCallback(() => {
    latestRequest.current = undefined;
    setPlayingId(undefined);
    tell(PLAYBACK_FAILED);
  }, [tell]);

  useEffect(() => listenForErrors(fail), [listenForErrors, fail]);

  const play = useCallback(
    (preset: Preset) => {
      latestRequest.current = preset.id;
      setPlayingId(preset.id);
      clear();
      const isLatest = () => latestRequest.current === preset.id;

      // Starting inside a promise turns an error in making the player into a failed play.
      Promise.resolve()
        .then(() => getPlayer().play(settingsFor(openPreset(preset))))
        .then(
          (outcome) => {
            if (isLatest() && outcome === 'playing-without-piano') tell(PIANO_MISSING);
          },
          () => {
            if (isLatest()) fail();
          },
        );
    },
    [getPlayer, fail, tell, clear],
  );

  const stop = useCallback(() => {
    latestRequest.current = undefined;
    getPlayer().stop();
    setPlayingId(undefined);
    clear();
  }, [getPlayer, clear]);

  return { playingId, notice, play, stop };
};

/** A song with an arrangement plays it from the top; a loop plays its one pattern over and over. */
const settingsFor = (song: Song): PlaybackSettings => ({
  song,
  mode: song.arrangement.length > 0 ? 'song' : 'pattern',
  editedPatternIndex: 0,
  isMetronomeOn: false,
});
