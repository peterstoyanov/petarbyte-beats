import { useCallback, type FC } from 'react';
import { SectionList, StyleSheet, Text, type SectionListRenderItem } from 'react-native';

import { PRESET_GROUPS, presetsIn, type Preset } from '@/presets/catalog';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { fontWeight, typography } from '@/theme/typography';

import { SongRow } from './SongRow';
import { useSongPlayback } from './useSongPlayback';

type SongSection = {
  readonly title: string;
  readonly data: readonly Preset[];
};

/** The built-in songs are fixed, so their sections are worked out once. */
const SECTIONS: readonly SongSection[] = PRESET_GROUPS.map((group) => ({
  title: group.label,
  data: presetsIn(group.id),
}));

/** The built-in songs in the sections of the web studio's menu; tap one to play or stop it. */
export const SongList: FC = () => {
  const { playingId, notice, play, stop } = useSongPlayback();

  const renderSong: SectionListRenderItem<Preset, SongSection> = useCallback(
    ({ item }) => {
      return (
        <SongRow preset={item} isPlaying={item.id === playingId} onPlay={play} onStop={stop} />
      );
    },
    [playingId, play, stop],
  );

  return (
    <SectionList
      sections={SECTIONS}
      keyExtractor={presetKey}
      renderItem={renderSong}
      renderSectionHeader={renderSectionTitle}
      ListHeaderComponent={notice === undefined ? undefined : <Notice text={notice} />}
      stickySectionHeadersEnabled={false}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
      style={styles.list}
    />
  );
};

const presetKey = (preset: Preset): string => preset.id;

const renderSectionTitle = ({ section }: { section: SongSection }) => {
  return <SectionTitle title={section.title} />;
};

type SectionTitleProps = {
  readonly title: string;
};

const SectionTitle: FC<SectionTitleProps> = ({ title }) => {
  return (
    <Text accessibilityRole="header" style={styles.sectionTitle}>
      {title}
    </Text>
  );
};

type NoticeProps = {
  readonly text: string;
};

/** A message about playback, read out by screen readers as soon as it appears. */
const Notice: FC<NoticeProps> = ({ text }) => {
  return (
    <Text
      selectable
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      style={styles.notice}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  sectionTitle: {
    ...typography.footnote,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xs,
    fontWeight: fontWeight.semibold,
    textTransform: 'uppercase',
    color: colors.secondaryLabel,
  },
  notice: {
    ...typography.subhead,
    color: colors.label,
  },
});
