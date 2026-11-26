import { describe, expect, it } from '@jest/globals';

import { INSTRUMENTS } from '../sounds/catalog';
import { createChannel, createDrumChannel, createInstrumentChannel } from './channels';
import { DEFAULT_MIXER } from './defaults';

describe('createDrumChannel', () => {
  it('starts with the default mixer, pitch and decay', () => {
    expect(createDrumChannel('kick', 'kick808')).toEqual({
      kind: 'drum',
      id: 'kick',
      sound: 'kick808',
      mixer: DEFAULT_MIXER,
      pitch: 0,
      decay: 1,
    });
  });
});

describe('createInstrumentChannel', () => {
  it("takes the release time from the instrument's catalog entry", () => {
    expect(createInstrumentChannel('pad', 'pad')).toEqual({
      kind: 'instrument',
      id: 'pad',
      sound: 'pad',
      mixer: DEFAULT_MIXER,
      releaseSeconds: INSTRUMENTS.pad.releaseSeconds,
    });
  });
});

describe('createChannel', () => {
  it('makes a drum channel for a drum sound', () => {
    expect(createChannel('snare', 'snare909').kind).toBe('drum');
  });

  it('makes an instrument channel for an instrument sound', () => {
    expect(createChannel('keys', 'epiano').kind).toBe('instrument');
  });
});
