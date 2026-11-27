import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type FC,
  type PropsWithChildren,
} from 'react';
import { AudioContext } from 'react-native-audio-api';

import { configureAudioSession } from './audioSession';
import { SongPlayer } from './songPlayer';

type ErrorListener = (error: unknown) => void;

type PlayerContextValue = {
  /** The app's one player, made the first time it is needed. */
  readonly getPlayer: () => SongPlayer;
  /** Calls the listener when an error stops playback; returns a function that stops listening. */
  readonly listenForErrors: (listener: ErrorListener) => () => void;
};

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

/**
 * Gives the app one song player. Its audio context, and the audio session, start only when
 * something first plays, so opening the app does not take over the phone's audio.
 */
export const PlayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const playerRef = useRef<SongPlayer | undefined>(undefined);
  const contextRef = useRef<AudioContext | undefined>(undefined);
  const listenersRef = useRef(new Set<ErrorListener>());

  const getPlayer = useCallback((): SongPlayer => {
    if (playerRef.current === undefined) {
      configureAudioSession();
      contextRef.current = new AudioContext();
      playerRef.current = new SongPlayer({
        context: contextRef.current,
        onError: (error) => {
          for (const listener of listenersRef.current) listener(error);
        },
      });
    }
    return playerRef.current;
  }, []);

  const listenForErrors = useCallback((listener: ErrorListener) => {
    const listeners = listenersRef.current;
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  useEffect(() => {
    return () => {
      playerRef.current?.dispose();
      void contextRef.current?.close();
      // A remount, as after Fast Refresh, starts a fresh player instead of reusing a disposed one.
      playerRef.current = undefined;
      contextRef.current = undefined;
    };
  }, []);

  const value = useMemo(() => ({ getPlayer, listenForErrors }), [getPlayer, listenForErrors]);
  return <PlayerContext value={value}>{children}</PlayerContext>;
};

export const usePlayer = (): PlayerContextValue => {
  const value = use(PlayerContext);
  if (value === undefined) throw new Error('usePlayer must be used inside a PlayerProvider.');
  return value;
};
