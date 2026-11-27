import { useCallback, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

export type Notice = {
  /** The message on screen, if any. */
  readonly notice: string | undefined;
  /** Shows a message, and reads it out to screen reader users as it appears. */
  readonly tell: (message: string) => void;
  readonly clear: () => void;
};

/** A short message about what just happened, such as a song that stopped because of an error. */
export const useNotice = (): Notice => {
  const [notice, setNotice] = useState<string | undefined>(undefined);

  const tell = useCallback((message: string) => {
    setNotice(message);
    AccessibilityInfo.announceForAccessibility(message);
  }, []);

  const clear = useCallback(() => setNotice(undefined), []);

  return { notice, tell, clear };
};
