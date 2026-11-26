// PetarByte Beats: this song, written as C# code.
// Channels are the sounds, patterns are a few bars each, the arrangement plays them in order.
var song = new Song(bpm: 64, swing: 0, key: "A minor");

// Channels: one sound each, with its mixer settings below it
var right = song.Instrument(Instruments.GrandPiano);
right.Volume = 1;
right.Reverb = 0.35;
var left = song.Instrument(Instruments.GrandPiano);
left.Volume = 0.9;
left.Reverb = 0.35;

// Pattern theme: Hits(drum, steps) with x = hit, X = loud, . = rest. Play(instrument, step, length, notes).
var theme = song.Pattern(bars: 3);
theme.Play(right, 4, 1, "E5");
theme.Play(right, 5, 1, "D#5");
theme.Play(right, 6, 1, "E5");
theme.Play(right, 7, 1, "D#5");
theme.Play(right, 8, 1, "E5");
theme.Play(right, 9, 1, "B4");
theme.Play(right, 10, 1, "D5");
theme.Play(right, 11, 1, "C5");
theme.Play(right, 12, 2, "A4");
theme.Play(right, 15, 1, "C4");
// theme, bar 2
theme.Play(right, 16, 1, "E4");
theme.Play(right, 17, 1, "A4");
theme.Play(right, 18, 2, "B4");
theme.Play(right, 21, 1, "E4");
theme.Play(right, 22, 1, "G#4");
theme.Play(right, 23, 1, "B4");
theme.Play(right, 24, 2, "C5");
theme.Play(right, 27, 1, "E4");
theme.Play(right, 28, 1, "E5");
theme.Play(right, 29, 1, "D#5");
theme.Play(right, 30, 1, "E5");
theme.Play(right, 31, 1, "D#5");
// theme, bar 3
theme.Play(right, 32, 1, "E5");
theme.Play(right, 33, 1, "B4");
theme.Play(right, 34, 1, "D5");
theme.Play(right, 35, 1, "C5");
theme.Play(right, 36, 2, "A4");
theme.Play(right, 39, 1, "C4");
theme.Play(right, 40, 1, "E4");
theme.Play(right, 41, 1, "A4");
theme.Play(right, 42, 2, "B4");
theme.Play(right, 45, 1, "E4");
theme.Play(right, 46, 1, "C5");
theme.Play(right, 47, 1, "B4");
theme.Play(left, 12, 6, "A2", velocity: 0.6);
theme.Play(left, 13, 5, "E3", velocity: 0.6);
theme.Play(left, 14, 4, "A3", velocity: 0.6);
// theme, bar 2
theme.Play(left, 18, 6, "E2", velocity: 0.6);
theme.Play(left, 19, 5, "E3", velocity: 0.6);
theme.Play(left, 20, 4, "G#3", velocity: 0.6);
theme.Play(left, 24, 6, "A2", velocity: 0.6);
theme.Play(left, 25, 5, "E3", velocity: 0.6);
theme.Play(left, 26, 4, "A3", velocity: 0.6);
// theme, bar 3
theme.Play(left, 36, 6, "A2", velocity: 0.6);
theme.Play(left, 37, 5, "E3", velocity: 0.6);
theme.Play(left, 38, 4, "A3", velocity: 0.6);
theme.Play(left, 42, 6, "E2", velocity: 0.6);
theme.Play(left, 43, 5, "E3", velocity: 0.6);
theme.Play(left, 44, 4, "G#3", velocity: 0.6);

// Pattern again
var again = song.Pattern(bars: 3);
again.Play(right, 0, 2, "A4");
again.Play(right, 4, 1, "E5");
again.Play(right, 5, 1, "D#5");
again.Play(right, 6, 1, "E5");
again.Play(right, 7, 1, "D#5");
again.Play(right, 8, 1, "E5");
again.Play(right, 9, 1, "B4");
again.Play(right, 10, 1, "D5");
again.Play(right, 11, 1, "C5");
again.Play(right, 12, 2, "A4");
again.Play(right, 15, 1, "C4");
// again, bar 2
again.Play(right, 16, 1, "E4");
again.Play(right, 17, 1, "A4");
again.Play(right, 18, 2, "B4");
again.Play(right, 21, 1, "E4");
again.Play(right, 22, 1, "G#4");
again.Play(right, 23, 1, "B4");
again.Play(right, 24, 2, "C5");
again.Play(right, 27, 1, "E4");
again.Play(right, 28, 1, "E5");
again.Play(right, 29, 1, "D#5");
again.Play(right, 30, 1, "E5");
again.Play(right, 31, 1, "D#5");
// again, bar 3
again.Play(right, 32, 1, "E5");
again.Play(right, 33, 1, "B4");
again.Play(right, 34, 1, "D5");
again.Play(right, 35, 1, "C5");
again.Play(right, 36, 2, "A4");
again.Play(right, 39, 1, "C4");
again.Play(right, 40, 1, "E4");
again.Play(right, 41, 1, "A4");
again.Play(right, 42, 2, "B4");
again.Play(right, 45, 1, "E4");
again.Play(right, 46, 1, "C5");
again.Play(right, 47, 1, "B4");
again.Play(left, 0, 6, "A2", velocity: 0.6);
again.Play(left, 1, 5, "E3", velocity: 0.6);
again.Play(left, 2, 4, "A3", velocity: 0.6);
again.Play(left, 12, 6, "A2", velocity: 0.6);
again.Play(left, 13, 5, "E3", velocity: 0.6);
again.Play(left, 14, 4, "A3", velocity: 0.6);
// again, bar 2
again.Play(left, 18, 6, "E2", velocity: 0.6);
again.Play(left, 19, 5, "E3", velocity: 0.6);
again.Play(left, 20, 4, "G#3", velocity: 0.6);
again.Play(left, 24, 6, "A2", velocity: 0.6);
again.Play(left, 25, 5, "E3", velocity: 0.6);
again.Play(left, 26, 4, "A3", velocity: 0.6);
// again, bar 3
again.Play(left, 36, 6, "A2", velocity: 0.6);
again.Play(left, 37, 5, "E3", velocity: 0.6);
again.Play(left, 38, 4, "A3", velocity: 0.6);
again.Play(left, 42, 6, "E2", velocity: 0.6);
again.Play(left, 43, 5, "E3", velocity: 0.6);
again.Play(left, 44, 4, "G#3", velocity: 0.6);

// Pattern episode
var episode = song.Pattern(bars: 3);
episode.Play(right, 0, 2, "A4");
episode.Play(right, 3, 1, "B4");
episode.Play(right, 4, 1, "C5");
episode.Play(right, 5, 1, "D5");
episode.Play(right, 6, 3, "E5");
episode.Play(right, 9, 1, "G4");
episode.Play(right, 10, 1, "F5");
episode.Play(right, 11, 1, "E5");
episode.Play(right, 12, 3, "D5");
episode.Play(right, 15, 1, "F4");
// episode, bar 2
episode.Play(right, 16, 1, "E5");
episode.Play(right, 17, 1, "D5");
episode.Play(right, 18, 3, "C5");
episode.Play(right, 21, 1, "E4");
episode.Play(right, 22, 1, "D5");
episode.Play(right, 23, 1, "C5");
episode.Play(right, 24, 2, "B4");
episode.Play(right, 27, 1, "E4");
episode.Play(right, 28, 1, "E5");
episode.Play(right, 29, 1, "E4");
episode.Play(right, 30, 2, "E5");
// episode, bar 3
episode.Play(right, 32, 1, "E5");
episode.Play(right, 33, 2, "E6");
episode.Play(right, 35, 1, "D#5");
episode.Play(right, 36, 1, "E5");
episode.Play(right, 37, 1, "D#5");
episode.Play(right, 38, 1, "E5");
episode.Play(right, 39, 1, "D#5");
episode.Play(right, 40, 1, "E5");
episode.Play(right, 41, 1, "D#5");
episode.Play(right, 42, 1, "E5");
episode.Play(right, 43, 1, "D#5");
episode.Play(right, 44, 1, "E5");
episode.Play(right, 45, 1, "D#5");
episode.Play(right, 46, 1, "E5");
episode.Play(right, 47, 1, "D#5");
episode.Play(left, 0, 6, "A2", velocity: 0.6);
episode.Play(left, 1, 5, "E3", velocity: 0.6);
episode.Play(left, 2, 4, "A3", velocity: 0.6);
episode.Play(left, 6, 6, "C3", velocity: 0.6);
episode.Play(left, 7, 5, "G3", velocity: 0.6);
episode.Play(left, 8, 4, "C4", velocity: 0.6);
episode.Play(left, 12, 6, "G2", velocity: 0.6);
episode.Play(left, 13, 5, "G3", velocity: 0.6);
episode.Play(left, 14, 4, "B3", velocity: 0.6);
// episode, bar 2
episode.Play(left, 18, 6, "A2", velocity: 0.6);
episode.Play(left, 19, 5, "E3", velocity: 0.6);
episode.Play(left, 20, 4, "A3", velocity: 0.6);
episode.Play(left, 24, 6, "E2", velocity: 0.6);
episode.Play(left, 25, 5, "E3", velocity: 0.6);

// Pattern back
var back = song.Pattern(bars: 3);
back.Play(right, 0, 1, "E5");
back.Play(right, 1, 1, "D#5");
back.Play(right, 2, 1, "E5");
back.Play(right, 3, 1, "B4");
back.Play(right, 4, 1, "D5");
back.Play(right, 5, 1, "C5");
back.Play(right, 6, 2, "A4");
back.Play(right, 9, 1, "C4");
back.Play(right, 10, 1, "E4");
back.Play(right, 11, 1, "A4");
back.Play(right, 12, 2, "B4");
back.Play(right, 15, 1, "E4");
// back, bar 2
back.Play(right, 16, 1, "G#4");
back.Play(right, 17, 1, "B4");
back.Play(right, 18, 2, "C5");
back.Play(right, 21, 1, "E4");
back.Play(right, 22, 1, "E5");
back.Play(right, 23, 1, "D#5");
back.Play(right, 24, 1, "E5");
back.Play(right, 25, 1, "D#5");
back.Play(right, 26, 1, "E5");
back.Play(right, 27, 1, "B4");
back.Play(right, 28, 1, "D5");
back.Play(right, 29, 1, "C5");
back.Play(right, 30, 2, "A4");
// back, bar 3
back.Play(right, 33, 1, "C4");
back.Play(right, 34, 1, "E4");
back.Play(right, 35, 1, "A4");
back.Play(right, 36, 2, "B4");
back.Play(right, 39, 1, "E4");
back.Play(right, 40, 1, "C5");
back.Play(right, 41, 1, "B4");
back.Play(right, 42, 2, "A4");
back.Play(right, 46, 1, "E5");
back.Play(right, 47, 1, "D#5");
back.Play(left, 6, 6, "A2", velocity: 0.6);
back.Play(left, 7, 5, "E3", velocity: 0.6);
back.Play(left, 8, 4, "A3", velocity: 0.6);
back.Play(left, 12, 6, "E2", velocity: 0.6);
back.Play(left, 13, 5, "E3", velocity: 0.6);
back.Play(left, 14, 4, "G#3", velocity: 0.6);
// back, bar 2
back.Play(left, 18, 6, "A2", velocity: 0.6);
back.Play(left, 19, 5, "E3", velocity: 0.6);
back.Play(left, 20, 4, "A3", velocity: 0.6);
back.Play(left, 30, 6, "A2", velocity: 0.6);
back.Play(left, 31, 5, "E3", velocity: 0.6);
// back, bar 3
back.Play(left, 32, 4, "A3", velocity: 0.6);
back.Play(left, 36, 6, "E2", velocity: 0.6);
back.Play(left, 37, 5, "E3", velocity: 0.6);
back.Play(left, 38, 4, "G#3", velocity: 0.6);
back.Play(left, 42, 6, "A2", velocity: 0.6);
back.Play(left, 43, 5, "E3", velocity: 0.6);
back.Play(left, 44, 4, "A3", velocity: 0.6);

// Pattern end
var end = song.Pattern(bars: 3);
end.Play(right, 0, 1, "E5");
end.Play(right, 1, 1, "D#5");
end.Play(right, 2, 1, "E5");
end.Play(right, 3, 1, "B4");
end.Play(right, 4, 1, "D5");
end.Play(right, 5, 1, "C5");
end.Play(right, 6, 2, "A4");
end.Play(right, 9, 1, "C4");
end.Play(right, 10, 1, "E4");
end.Play(right, 11, 1, "A4");
end.Play(right, 12, 2, "B4");
end.Play(right, 15, 1, "E4");
// end, bar 2
end.Play(right, 16, 1, "G#4");
end.Play(right, 17, 1, "B4");
end.Play(right, 18, 2, "C5");
end.Play(right, 21, 1, "E4");
end.Play(right, 22, 1, "E5");
end.Play(right, 23, 1, "D#5");
end.Play(right, 24, 1, "E5");
end.Play(right, 25, 1, "D#5");
end.Play(right, 26, 1, "E5");
end.Play(right, 27, 1, "B4");
end.Play(right, 28, 1, "D5");
end.Play(right, 29, 1, "C5");
end.Play(right, 30, 2, "A4");
// end, bar 3
end.Play(right, 33, 1, "C4");
end.Play(right, 34, 1, "E4");
end.Play(right, 35, 1, "A4");
end.Play(right, 36, 2, "B4");
end.Play(right, 39, 1, "E4");
end.Play(right, 40, 1, "C5");
end.Play(right, 41, 1, "B4");
end.Play(right, 42, 6, "A4");
end.Play(left, 6, 6, "A2", velocity: 0.6);
end.Play(left, 7, 5, "E3", velocity: 0.6);
end.Play(left, 8, 4, "A3", velocity: 0.6);
end.Play(left, 12, 6, "E2", velocity: 0.6);
end.Play(left, 13, 5, "E3", velocity: 0.6);
end.Play(left, 14, 4, "G#3", velocity: 0.6);
// end, bar 2
end.Play(left, 18, 6, "A2", velocity: 0.6);
end.Play(left, 19, 5, "E3", velocity: 0.6);
end.Play(left, 20, 4, "A3", velocity: 0.6);
end.Play(left, 30, 6, "A2", velocity: 0.6);
end.Play(left, 31, 5, "E3", velocity: 0.6);
// end, bar 3
end.Play(left, 32, 4, "A3", velocity: 0.6);
end.Play(left, 36, 6, "E2", velocity: 0.6);
end.Play(left, 37, 5, "E3", velocity: 0.6);
end.Play(left, 38, 4, "G#3", velocity: 0.6);
end.Play(left, 42, 6, "A2", velocity: 0.6);
end.Play(left, 43, 5, "E3", velocity: 0.6);
end.Play(left, 44, 4, "A3", velocity: 0.6);

// The arrangement: the patterns in the order they play (27 bars, 1:41)
song.Arrange(theme, again, episode, back, again, episode, back, again,
    end);

// The master: volume, and how much reverb and delay come back
song.Volume = 1;
song.Reverb = 0.9;

song.Play();
