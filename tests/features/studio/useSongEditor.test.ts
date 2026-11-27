import { describe, expect, it } from '@jest/globals';
import { act, renderHook } from '@testing-library/react-native';

import { requireChannelId, requirePatternName } from '@/domain/song/ids';
import { useSongEditor } from '@/features/studio/useSongEditor';

import { songFrom } from '../../domain/editing/songFrom';

const SONG = songFrom(
  'var song = new Song(bpm: 120);',
  'var kick = song.Drum(Drums.Kick808);',
  'var intro = song.Pattern(bars: 1);',
  'intro.Hits(kick, "x...............");',
  'var verse = song.Pattern(bars: 1);',
  'verse.Hits(kick, "....x...........");',
);
const KICK = requireChannelId('kick');

const renderEditor = () => renderHook(() => useSongEditor(SONG));

describe('useSongEditor', () => {
  it('starts on the first pattern of the song', async () => {
    const { result } = await renderEditor();
    expect(result.current.song).toBe(SONG);
    expect(result.current.pattern.name).toBe(SONG.patterns[0].name);
  });

  it('turns a rest into a hit, a long press into a loud one, and a hit back off', async () => {
    const { result } = await renderEditor();
    const hitsOfKick = () => result.current.pattern.hits[KICK]?.slice(0, 3);

    await act(() => {
      expect(result.current.tapStep({ channelId: KICK, step: 1, isLoud: false })).toBe(1);
    });
    await act(() => {
      expect(result.current.tapStep({ channelId: KICK, step: 2, isLoud: true })).toBe(2);
    });
    expect(hitsOfKick()).toEqual([1, 1, 2]);

    await act(() => {
      expect(result.current.tapStep({ channelId: KICK, step: 0, isLoud: true })).toBe(0);
    });
    expect(hitsOfKick()).toEqual([0, 1, 2]);
  });

  it('edits the pattern on screen and no other', async () => {
    const { result } = await renderEditor();
    await act(() => result.current.showPattern(requirePatternName('verse')));
    await act(() => {
      result.current.tapStep({ channelId: KICK, step: 0, isLoud: false });
    });

    const [first, verse] = result.current.song.patterns;
    expect(result.current.pattern).toBe(verse);
    expect(verse?.hits[KICK]?.slice(0, 5)).toEqual([1, 0, 0, 0, 1]);
    expect(first).toBe(SONG.patterns[0]);
  });

  it('ignores a pattern the song does not have', async () => {
    const { result } = await renderEditor();
    await act(() => result.current.showPattern(requirePatternName('chorus')));
    expect(result.current.editedPatternIndex).toBe(0);
  });

  it('sets the tempo and the swing within their limits', async () => {
    const { result } = await renderEditor();
    await act(() => result.current.setTempo(300));
    await act(() => result.current.setSwing(33));
    expect(result.current.song.bpm).toBe(240);
    expect(result.current.song.swing).toBe(35);
  });

  it('mutes and solos a channel', async () => {
    const { result } = await renderEditor();
    await act(() => result.current.toggleMute(KICK));
    await act(() => result.current.toggleSolo(KICK));
    expect(result.current.song.channels[0]?.mixer).toMatchObject({
      isMuted: true,
      isSoloed: true,
    });
  });

  it('keeps the same edit functions from render to render', async () => {
    const { result } = await renderEditor();
    const before = result.current;
    await act(() => result.current.setTempo(90));
    expect(result.current.setTempo).toBe(before.setTempo);
    expect(result.current.tapStep).toBe(before.tapStep);
    expect(result.current.toggleMute).toBe(before.toggleMute);
  });
});
