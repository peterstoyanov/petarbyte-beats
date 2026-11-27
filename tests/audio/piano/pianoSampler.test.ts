import { describe, expect, it, jest } from '@jest/globals';
import { AudioContext, type AudioBufferSourceNode } from 'react-native-audio-api';

import { PianoSampler } from '@/audio/piano/pianoSampler';
import { PIANO_SAMPLES } from '@/audio/piano/pianoSamples';

/** A sampler, loaded unless told otherwise, and the nodes it makes when it plays. */
const watchedSampler = async ({ isLoaded = true } = {}) => {
  const context = new AudioContext();
  const piano = new PianoSampler(context);
  if (isLoaded) await piano.load();

  const sources: AudioBufferSourceNode[] = [];
  const stopTimes: (number | undefined)[] = [];
  const createSource = context.createBufferSource.bind(context);
  jest.spyOn(context, 'createBufferSource').mockImplementation(() => {
    const source = createSource();
    sources.push(source);
    jest.spyOn(source, 'stop').mockImplementation((when) => {
      stopTimes.push(when);
    });
    return source;
  });
  const damperFalls: [target: number, start: number, timeConstant: number][] = [];
  const createGain = context.createGain.bind(context);
  jest.spyOn(context, 'createGain').mockImplementation(() => {
    const level = createGain();
    jest.spyOn(level.gain, 'setTargetAtTime').mockImplementation((target, start, timeConstant) => {
      damperFalls.push([target, start, timeConstant]);
      return level.gain;
    });
    return level;
  });

  const play = (midi: number, seconds = 0.5) =>
    piano.play({ output: context.destination, midi, time: 1, seconds, velocity: 0.8 });
  return { piano, sources, stopTimes, damperFalls, play };
};

describe('PianoSampler', () => {
  it('stays silent until its recordings are loaded', async () => {
    const { piano, sources, play } = await watchedSampler({ isLoaded: false });
    play(60);
    expect(piano.isReady).toBe(false);
    expect(sources).toHaveLength(0);
  });

  it('decodes every recording once, however often it is asked to load', async () => {
    const context = new AudioContext();
    const decode = jest.spyOn(context, 'decodeAudioData');
    const piano = new PianoSampler(context);

    await Promise.all([piano.load(), piano.load()]);
    await piano.load();

    expect(piano.isReady).toBe(true);
    expect(decode).toHaveBeenCalledTimes(PIANO_SAMPLES.length);
  });

  it('can load again after a failure', async () => {
    const context = new AudioContext();
    const decode = context.decodeAudioData.bind(context);
    const spy = jest
      .spyOn(context, 'decodeAudioData')
      .mockRejectedValueOnce(new Error('No such file'));
    const piano = new PianoSampler(context);

    await expect(piano.load()).rejects.toThrow('No such file');
    spy.mockImplementation(decode);
    await piano.load();

    expect(piano.isReady).toBe(true);
  });

  it('plays a recorded note at its own speed', async () => {
    const { sources, play } = await watchedSampler();
    play(60);
    expect(sources[0]?.playbackRate.value).toBe(1);
  });

  it('plays a note between recordings from the nearest one, a little faster or slower', async () => {
    const { sources, play } = await watchedSampler();
    play(61);
    play(62);
    // 61 is one semitone above the C4 recording; 62 is one below the D#4 one.
    expect(sources[0]?.playbackRate.value).toBeCloseTo(2 ** (1 / 12));
    expect(sources[1]?.playbackRate.value).toBeCloseTo(2 ** (-1 / 12));
  });

  it('plays a note below the recordings from the lowest one', async () => {
    const { sources, play } = await watchedSampler();
    play(30);
    expect(sources[0]?.playbackRate.value).toBeCloseTo(2 ** (-6 / 12));
  });

  it('lets the damper fall when the key is let go', async () => {
    const { damperFalls, play } = await watchedSampler();
    play(60, 0.5);
    expect(damperFalls).toEqual([[0, 1.5, 0.12]]);
  });

  it('stops a note a second after the key is let go', async () => {
    const { stopTimes, play } = await watchedSampler();
    play(60, 0.5);
    expect(stopTimes[0]).toBeCloseTo(1 + 0.5 + 1);
  });

  it('lets even a tapped key sound for a moment', async () => {
    const { stopTimes, play } = await watchedSampler();
    play(60, 0);
    expect(stopTimes[0]).toBeCloseTo(1 + 0.08 + 1);
  });
});
