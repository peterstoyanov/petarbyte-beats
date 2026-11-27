import { useCallback, useEffect, useRef } from 'react';
import type {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollViewInstance,
} from 'react-native';

import type { Steps } from '@/domain/song/limits';

/** The steps kept visible to the left of the playhead when the rack scrolls to it. */
const LEAD_STEPS = 0.3;

type FollowPlayheadSpec = {
  readonly step: Steps | undefined;
  readonly stepWidth: number;
};

/**
 * Scrolls the steps sideways to keep the playing step on screen, as the web studio does, unless
 * the user is dragging them.
 */
export const useFollowPlayhead = ({ step, stepWidth }: FollowPlayheadSpec) => {
  const scrollerRef = useRef<ScrollViewInstance>(null);
  const view = useRef({ left: 0, width: 0 });
  const isDragging = useRef(false);

  useEffect(() => {
    if (step === undefined || isDragging.current) return;
    const { left, width } = view.current;
    const x = step * stepWidth;
    if (x < left || x > left + width - stepWidth) {
      scrollerRef.current?.scrollTo({
        x: Math.max(0, x - stepWidth * LEAD_STEPS),
        animated: false,
      });
    }
  }, [step, stepWidth]);

  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    view.current.left = event.nativeEvent.contentOffset.x;
  }, []);
  const onLayout = useCallback((event: LayoutChangeEvent) => {
    view.current.width = event.nativeEvent.layout.width;
  }, []);
  const onScrollBeginDrag = useCallback(() => {
    isDragging.current = true;
  }, []);
  const onScrollEndDrag = useCallback(() => {
    isDragging.current = false;
  }, []);

  return { scrollerRef, onScroll, onLayout, onScrollBeginDrag, onScrollEndDrag };
};
