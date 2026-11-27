import { describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { useLocalSearchParams } from 'expo-router';

import { PlayerProvider } from '@/audio/player/PlayerProvider';
import StudioScreen from '@/app/studio/[id]';

// The screen is rendered on its own: the test gives the id the URL would, and drops the header.
jest.mock('expo-router', () => ({
  ...jest.requireActual<typeof import('expo-router')>('expo-router'),
  useLocalSearchParams: jest.fn(),
  Stack: { Screen: () => null },
}));

const openStudio = async (id: string) => {
  jest.mocked(useLocalSearchParams).mockReturnValue({ id });
  await render(
    <PlayerProvider>
      <StudioScreen />
    </PlayerProvider>,
  );
};

describe('the studio screen', () => {
  it('opens a built-in song by its id', async () => {
    await openStudio('house');
    expect(screen.getByLabelText('Play')).toBeOnTheScreen();
    expect(screen.getByLabelText('kick, 909 Kick')).toBeOnTheScreen();
  });

  it('says so when there is no such song', async () => {
    await openStudio('nothing');
    expect(screen.getByText('There is no song called “nothing”.')).toBeOnTheScreen();
  });
});
