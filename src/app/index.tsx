import { Stack } from 'expo-router';
import type { FC } from 'react';

import { SongList } from '@/features/songs/SongList';

const SongsScreen: FC = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Songs', headerLargeTitle: true }} />
      <SongList />
    </>
  );
};

// Expo Router finds each route by its file's default export.
export default SongsScreen;
