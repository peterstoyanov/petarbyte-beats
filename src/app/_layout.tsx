import { Stack } from 'expo-router';
import type { FC } from 'react';

import { PlayerProvider } from '@/audio/player/PlayerProvider';

const RootLayout: FC = () => {
  return (
    <PlayerProvider>
      <Stack />
    </PlayerProvider>
  );
};

// Expo Router finds each route by its file's default export.
export default RootLayout;
