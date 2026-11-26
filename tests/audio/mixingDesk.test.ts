import { describe, expect, it, jest } from '@jest/globals';
import { AudioContext } from 'react-native-audio-api';

import { MixingDesk } from '@/audio/mixingDesk';
import { createInstrumentChannel } from '@/domain/song/channels';
import { requireChannelId } from '@/domain/song/ids';

const bass = createInstrumentChannel(requireChannelId('bass'), 'sub');
const pad = createInstrumentChannel(requireChannelId('pad'), 'pad');

describe('MixingDesk', () => {
  it('gives a channel the same strip every time it plays', () => {
    const desk = new MixingDesk(new AudioContext());
    expect(desk.inputFor(bass.id)).toBe(desk.inputFor(bass.id));
  });

  it('gives each channel its own strip', () => {
    const desk = new MixingDesk(new AudioContext());
    expect(desk.inputFor(pad.id)).not.toBe(desk.inputFor(bass.id));
  });

  it('keeps the strips of channels still in the song', () => {
    const desk = new MixingDesk(new AudioContext());
    const input = desk.inputFor(bass.id);
    desk.applyChannels([bass, pad]);
    expect(desk.inputFor(bass.id)).toBe(input);
  });

  it('takes a deleted channel off the desk', () => {
    const desk = new MixingDesk(new AudioContext());
    const input = desk.inputFor(bass.id);
    const disconnect = jest.spyOn(input, 'disconnect');

    desk.applyChannels([pad]);

    expect(disconnect).toHaveBeenCalled();
    expect(desk.inputFor(bass.id)).not.toBe(input);
  });

  it('reads silence for a channel that has not played', () => {
    const desk = new MixingDesk(new AudioContext());
    expect(desk.levelOf(requireChannelId('drums'))).toBe(0);
  });
});
