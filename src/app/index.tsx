import { Stack, useRouter } from 'expo-router';
import { useCallback, type FC } from 'react';

import { SongList } from '@/features/songs/SongList';
import type { Preset } from '@/presets/catalog';

const SongsScreen: FC = () => {
  const router = useRouter();
  const openSong = useCallback(
    (preset: Preset) => router.push({ pathname: '/studio/[id]', params: { id: preset.id } }),
    [router],
  );

  return (
    <>
      <Stack.Screen options={{ title: 'Songs', headerLargeTitle: true }} />
      <SongList onOpen={openSong} />
    </>
  );
};

// Expo Router finds each route by its file's default export.
export default SongsScreen;
