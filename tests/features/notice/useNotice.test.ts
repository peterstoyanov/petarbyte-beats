import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react-native';
import { AccessibilityInfo } from 'react-native';

import { useNotice } from '@/features/notice/useNotice';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useNotice', () => {
  it('shows a message and reads it out to screen reader users', async () => {
    const announce = jest.spyOn(AccessibilityInfo, 'announceForAccessibility');
    const { result } = await renderHook(() => useNotice());

    await act(() => result.current.tell('The piano is silent.'));

    expect(result.current.notice).toBe('The piano is silent.');
    expect(announce).toHaveBeenCalledWith('The piano is silent.');
  });

  it('clears the message', async () => {
    const { result } = await renderHook(() => useNotice());
    await act(() => result.current.tell('The piano is silent.'));
    await act(() => result.current.clear());
    expect(result.current.notice).toBeUndefined();
  });
});
