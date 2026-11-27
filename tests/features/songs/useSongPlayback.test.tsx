import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react-native';
import type { FC, PropsWithChildren } from 'react';

import { PlayerProvider } from '@/audio/player/PlayerProvider';
import { SongPlayer } from '@/audio/player/songPlayer';
import { useSongPlayback } from '@/features/songs/useSongPlayback';
import { findPreset } from '@/presets/catalog';

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return <PlayerProvider>{children}</PlayerProvider>;
};

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useSongPlayback', () => {
  it.each([
    ['neon-rooftop', 'song'],
    ['house', 'pattern'],
  ] as const)('plays %s in %s mode', async (id, mode) => {
    const play = jest.spyOn(SongPlayer.prototype, 'play').mockResolvedValue('playing');
    const preset = findPreset(id);
    if (preset === undefined) throw new Error(`${id} is missing.`);
    const { result } = await renderHook(() => useSongPlayback(), { wrapper: Wrapper });

    await act(async () => {
      result.current.play(preset);
    });

    expect(play).toHaveBeenCalledWith(expect.objectContaining({ mode }));
    expect(result.current.playingId).toBe(id);
  });
});
