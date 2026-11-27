import type { GainNode } from 'react-native-audio-api';

/** How fast a choked open hat falls silent. */
const CHOKE_TIME_CONSTANT = 0.01;

/**
 * On a drum machine a hat cuts off the open hat that is still ringing, as a drummer closes the
 * pedal. One choke serves every hat channel, as in the web studio.
 */
export class HiHatChoke {
  private ringing: GainNode | undefined;

  /**
   * Cuts off the open hat that is ringing, if any, from the level it has fallen to by then. The
   * web studio cancels its fall instead, so there the hat jumps back up for a moment first.
   */
  choke(time: number): void {
    if (this.ringing === undefined) return;
    this.ringing.gain.cancelAndHoldAtTime(time);
    this.ringing.gain.setTargetAtTime(0, time, CHOKE_TIME_CONSTANT);
    this.ringing = undefined;
  }

  /** Remembers an open hat, so the next hat can cut it off. */
  ring(openHat: GainNode): void {
    this.ringing = openHat;
  }
}
