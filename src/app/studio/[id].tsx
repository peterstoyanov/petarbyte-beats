import { Stack, useLocalSearchParams } from 'expo-router';
import { useMemo, type FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Studio } from '@/features/studio/Studio';
import { findPreset } from '@/presets/catalog';
import { openPreset } from '@/presets/openPreset';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

const StudioScreen: FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const preset = findPreset(id);
  const initialSong = useMemo(
    () => (preset === undefined ? undefined : openPreset(preset)),
    [preset],
  );

  if (preset === undefined || initialSong === undefined) {
    return (
      <View style={styles.missing}>
        <Stack.Screen options={{ title: 'Studio' }} />
        <Text selectable style={styles.message}>
          There is no song called “{id}”.
        </Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: preset.title }} />
      {/* A new song starts a new studio, with its own edits. */}
      <Studio key={preset.id} initialSong={initialSong} />
    </>
  );
};

const styles = StyleSheet.create({
  missing: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  message: {
    ...typography.body,
    color: colors.label,
  },
});

// Expo Router finds each route by its file's default export.
export default StudioScreen;
