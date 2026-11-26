// PetarByte Beats: this song, written as C# code.
// Channels are the sounds, patterns are a few bars each, the arrangement plays them in order.
var song = new Song(bpm: 138, swing: 0, key: "B minor");

// Channels: one sound each, with its mixer settings below it
var right = song.Instrument(Instruments.GrandPiano);
right.Volume = 1;
right.Reverb = 0.35;
var left = song.Instrument(Instruments.GrandPiano);
left.Volume = 0.9;
left.Reverb = 0.35;

// Pattern a1: Hits(drum, steps) with x = hit, X = loud, . = rest. Play(instrument, step, length, notes).
var a1 = song.Pattern(bars: 4);
a1.Play(right, 0, 2, "B3", velocity: 0.35);
a1.Play(right, 2, 2, "C#4", velocity: 0.35);
a1.Play(right, 4, 2, "D4", velocity: 0.35);
a1.Play(right, 6, 2, "E4", velocity: 0.35);
a1.Play(right, 8, 2, "F#4", velocity: 0.35);
a1.Play(right, 10, 2, "D4", velocity: 0.35);
a1.Play(right, 12, 4, "F#4", velocity: 0.35);
// a1, bar 2
a1.Play(right, 16, 2, "F4", velocity: 0.35);
a1.Play(right, 18, 2, "C#4", velocity: 0.35);
a1.Play(right, 20, 4, "F4", velocity: 0.35);
a1.Play(right, 24, 2, "E4", velocity: 0.35);
a1.Play(right, 26, 2, "C4", velocity: 0.35);
a1.Play(right, 28, 4, "E4", velocity: 0.35);
// a1, bar 3
a1.Play(right, 32, 2, "B3", velocity: 0.35);
a1.Play(right, 34, 2, "C#4", velocity: 0.35);
a1.Play(right, 36, 2, "D4", velocity: 0.35);
a1.Play(right, 38, 2, "E4", velocity: 0.35);
a1.Play(right, 40, 2, "F#4", velocity: 0.35);
a1.Play(right, 42, 2, "D4", velocity: 0.35);
a1.Play(right, 44, 2, "F#4", velocity: 0.35);
a1.Play(right, 46, 2, "B4", velocity: 0.35);
// a1, bar 4
a1.Play(right, 48, 2, "A4", velocity: 0.35);
a1.Play(right, 50, 2, "F#4", velocity: 0.35);
a1.Play(right, 52, 2, "D4", velocity: 0.35);
a1.Play(right, 54, 2, "F#4", velocity: 0.35);
a1.Play(right, 56, 8, "A4", velocity: 0.35);
a1.Play(left, 0, 4, "B2", velocity: 0.35);
a1.Play(left, 4, 4, "F#3", velocity: 0.35);
a1.Play(left, 8, 4, "B2", velocity: 0.35);
a1.Play(left, 12, 4, "F#3", velocity: 0.35);
// a1, bar 2
a1.Play(left, 16, 4, "B2", velocity: 0.35);
a1.Play(left, 20, 4, "F#3", velocity: 0.35);
a1.Play(left, 24, 4, "B2", velocity: 0.35);
a1.Play(left, 28, 4, "F#3", velocity: 0.35);
// a1, bar 3
a1.Play(left, 32, 4, "B2", velocity: 0.35);
a1.Play(left, 36, 4, "F#3", velocity: 0.35);
a1.Play(left, 40, 4, "B2", velocity: 0.35);
a1.Play(left, 44, 4, "F#3", velocity: 0.35);
// a1, bar 4
a1.Play(left, 48, 4, "B2", velocity: 0.35);
a1.Play(left, 52, 4, "F#3", velocity: 0.35);
a1.Play(left, 56, 4, "D3", velocity: 0.35);
a1.Play(left, 60, 4, "F#3", velocity: 0.35);

// Pattern b1
var b1 = song.Pattern(bars: 4);
b1.Play(right, 0, 2, "F#4", velocity: 0.35);
b1.Play(right, 2, 2, "G#4", velocity: 0.35);
b1.Play(right, 4, 2, "A#4", velocity: 0.35);
b1.Play(right, 6, 2, "B4", velocity: 0.35);
b1.Play(right, 8, 2, "C#5", velocity: 0.35);
b1.Play(right, 10, 2, "A#4", velocity: 0.35);
b1.Play(right, 12, 4, "C#5", velocity: 0.35);
// b1, bar 2
b1.Play(right, 16, 2, "D5", velocity: 0.35);
b1.Play(right, 18, 2, "A#4", velocity: 0.35);
b1.Play(right, 20, 4, "D5", velocity: 0.35);
b1.Play(right, 24, 2, "C#5", velocity: 0.35);
b1.Play(right, 26, 2, "A#4", velocity: 0.35);
b1.Play(right, 28, 4, "C#5", velocity: 0.35);
// b1, bar 3
b1.Play(right, 32, 2, "F#4", velocity: 0.35);
b1.Play(right, 34, 2, "G#4", velocity: 0.35);
b1.Play(right, 36, 2, "A#4", velocity: 0.35);
b1.Play(right, 38, 2, "B4", velocity: 0.35);
b1.Play(right, 40, 2, "C#5", velocity: 0.35);
b1.Play(right, 42, 2, "A#4", velocity: 0.35);
b1.Play(right, 44, 4, "C#5", velocity: 0.35);
// b1, bar 4
b1.Play(right, 48, 2, "D5", velocity: 0.35);
b1.Play(right, 50, 2, "A#4", velocity: 0.35);
b1.Play(right, 52, 4, "D5", velocity: 0.35);
b1.Play(right, 56, 8, "C#5", velocity: 0.35);
b1.Play(left, 0, 4, "F#2", velocity: 0.35);
b1.Play(left, 4, 4, "C#3", velocity: 0.35);
b1.Play(left, 8, 4, "F#2", velocity: 0.35);
b1.Play(left, 12, 4, "C#3", velocity: 0.35);
// b1, bar 2
b1.Play(left, 16, 4, "F#2", velocity: 0.35);
b1.Play(left, 20, 4, "C#3", velocity: 0.35);
b1.Play(left, 24, 4, "F#2", velocity: 0.35);
b1.Play(left, 28, 4, "C#3", velocity: 0.35);
// b1, bar 3
b1.Play(left, 32, 4, "F#2", velocity: 0.35);
b1.Play(left, 36, 4, "C#3", velocity: 0.35);
b1.Play(left, 40, 4, "F#2", velocity: 0.35);
b1.Play(left, 44, 4, "C#3", velocity: 0.35);
// b1, bar 4
b1.Play(left, 48, 4, "F#2", velocity: 0.35);
b1.Play(left, 52, 4, "C#3", velocity: 0.35);
b1.Play(left, 56, 4, "F#2", velocity: 0.35);
b1.Play(left, 60, 4, "C#3", velocity: 0.35);

// Pattern a2
var a2 = song.Pattern(bars: 4);
a2.Play(right, 0, 2, "B2 B3", velocity: 0.55);
a2.Play(right, 2, 2, "C#3 C#4", velocity: 0.55);
a2.Play(right, 4, 2, "D3 D4", velocity: 0.55);
a2.Play(right, 6, 2, "E3 E4", velocity: 0.55);
a2.Play(right, 8, 2, "F#3 F#4", velocity: 0.55);
a2.Play(right, 10, 2, "D3 D4", velocity: 0.55);
a2.Play(right, 12, 4, "F#3 F#4", velocity: 0.55);
// a2, bar 2
a2.Play(right, 16, 2, "F3 F4", velocity: 0.55);
a2.Play(right, 18, 2, "C#3 C#4", velocity: 0.55);
a2.Play(right, 20, 4, "F3 F4", velocity: 0.55);
a2.Play(right, 24, 2, "E3 E4", velocity: 0.55);
a2.Play(right, 26, 2, "C3 C4", velocity: 0.55);
a2.Play(right, 28, 4, "E3 E4", velocity: 0.55);
// a2, bar 3
a2.Play(right, 32, 2, "B2 B3", velocity: 0.55);
a2.Play(right, 34, 2, "C#3 C#4", velocity: 0.55);
a2.Play(right, 36, 2, "D3 D4", velocity: 0.55);
a2.Play(right, 38, 2, "E3 E4", velocity: 0.55);
a2.Play(right, 40, 2, "F#3 F#4", velocity: 0.55);
a2.Play(right, 42, 2, "D3 D4", velocity: 0.55);
a2.Play(right, 44, 2, "F#3 F#4", velocity: 0.55);
a2.Play(right, 46, 2, "B3 B4", velocity: 0.55);
// a2, bar 4
a2.Play(right, 48, 2, "A3 A4", velocity: 0.55);
a2.Play(right, 50, 2, "F#3 F#4", velocity: 0.55);
a2.Play(right, 52, 2, "D3 D4", velocity: 0.55);
a2.Play(right, 54, 2, "F#3 F#4", velocity: 0.55);
a2.Play(right, 56, 8, "A3 A4", velocity: 0.55);
a2.Play(left, 0, 4, "B2", velocity: 0.55);
a2.Play(left, 4, 4, "F#3", velocity: 0.55);
a2.Play(left, 8, 4, "B2", velocity: 0.55);
a2.Play(left, 12, 4, "F#3", velocity: 0.55);
// a2, bar 2
a2.Play(left, 16, 4, "B2", velocity: 0.55);
a2.Play(left, 20, 4, "F#3", velocity: 0.55);
a2.Play(left, 24, 4, "B2", velocity: 0.55);
a2.Play(left, 28, 4, "F#3", velocity: 0.55);
// a2, bar 3
a2.Play(left, 32, 4, "B2", velocity: 0.55);
a2.Play(left, 36, 4, "F#3", velocity: 0.55);
a2.Play(left, 40, 4, "B2", velocity: 0.55);
a2.Play(left, 44, 4, "F#3", velocity: 0.55);
// a2, bar 4
a2.Play(left, 48, 4, "B2", velocity: 0.55);
a2.Play(left, 52, 4, "F#3", velocity: 0.55);
a2.Play(left, 56, 4, "D3", velocity: 0.55);
a2.Play(left, 60, 4, "F#3", velocity: 0.55);

// Pattern b2
var b2 = song.Pattern(bars: 4);
b2.Play(right, 0, 2, "F#3 F#4", velocity: 0.55);
b2.Play(right, 2, 2, "G#3 G#4", velocity: 0.55);
b2.Play(right, 4, 2, "A#3 A#4", velocity: 0.55);
b2.Play(right, 6, 2, "B3 B4", velocity: 0.55);
b2.Play(right, 8, 2, "C#4 C#5", velocity: 0.55);
b2.Play(right, 10, 2, "A#3 A#4", velocity: 0.55);
b2.Play(right, 12, 4, "C#4 C#5", velocity: 0.55);
// b2, bar 2
b2.Play(right, 16, 2, "D4 D5", velocity: 0.55);
b2.Play(right, 18, 2, "A#3 A#4", velocity: 0.55);
b2.Play(right, 20, 4, "D4 D5", velocity: 0.55);
b2.Play(right, 24, 2, "C#4 C#5", velocity: 0.55);
b2.Play(right, 26, 2, "A#3 A#4", velocity: 0.55);
b2.Play(right, 28, 4, "C#4 C#5", velocity: 0.55);
// b2, bar 3
b2.Play(right, 32, 2, "F#3 F#4", velocity: 0.55);
b2.Play(right, 34, 2, "G#3 G#4", velocity: 0.55);
b2.Play(right, 36, 2, "A#3 A#4", velocity: 0.55);
b2.Play(right, 38, 2, "B3 B4", velocity: 0.55);
b2.Play(right, 40, 2, "C#4 C#5", velocity: 0.55);
b2.Play(right, 42, 2, "A#3 A#4", velocity: 0.55);
b2.Play(right, 44, 4, "C#4 C#5", velocity: 0.55);
// b2, bar 4
b2.Play(right, 48, 2, "D4 D5", velocity: 0.55);
b2.Play(right, 50, 2, "A#3 A#4", velocity: 0.55);
b2.Play(right, 52, 4, "D4 D5", velocity: 0.55);
b2.Play(right, 56, 8, "C#4 C#5", velocity: 0.55);
b2.Play(left, 0, 4, "F#2", velocity: 0.55);
b2.Play(left, 4, 4, "C#3", velocity: 0.55);
b2.Play(left, 8, 4, "F#2", velocity: 0.55);
b2.Play(left, 12, 4, "C#3", velocity: 0.55);
// b2, bar 2
b2.Play(left, 16, 4, "F#2", velocity: 0.55);
b2.Play(left, 20, 4, "C#3", velocity: 0.55);
b2.Play(left, 24, 4, "F#2", velocity: 0.55);
b2.Play(left, 28, 4, "C#3", velocity: 0.55);
// b2, bar 3
b2.Play(left, 32, 4, "F#2", velocity: 0.55);
b2.Play(left, 36, 4, "C#3", velocity: 0.55);
b2.Play(left, 40, 4, "F#2", velocity: 0.55);
b2.Play(left, 44, 4, "C#3", velocity: 0.55);
// b2, bar 4
b2.Play(left, 48, 4, "F#2", velocity: 0.55);
b2.Play(left, 52, 4, "C#3", velocity: 0.55);
b2.Play(left, 56, 4, "F#2", velocity: 0.55);
b2.Play(left, 60, 4, "C#3", velocity: 0.55);

// Pattern a3
var a3 = song.Pattern(bars: 4);
a3.Play(right, 0, 2, "B3 B4", velocity: 0.75);
a3.Play(right, 2, 2, "C#4 C#5", velocity: 0.75);
a3.Play(right, 4, 2, "D4 D5", velocity: 0.75);
a3.Play(right, 6, 2, "E4 E5", velocity: 0.75);
a3.Play(right, 8, 2, "F#4 F#5", velocity: 0.75);
a3.Play(right, 10, 2, "D4 D5", velocity: 0.75);
a3.Play(right, 12, 4, "F#4 F#5", velocity: 0.75);
// a3, bar 2
a3.Play(right, 16, 2, "F4 F5", velocity: 0.75);
a3.Play(right, 18, 2, "C#4 C#5", velocity: 0.75);
a3.Play(right, 20, 4, "F4 F5", velocity: 0.75);
a3.Play(right, 24, 2, "E4 E5", velocity: 0.75);
a3.Play(right, 26, 2, "C4 C5", velocity: 0.75);
a3.Play(right, 28, 4, "E4 E5", velocity: 0.75);
// a3, bar 3
a3.Play(right, 32, 2, "B3 B4", velocity: 0.75);
a3.Play(right, 34, 2, "C#4 C#5", velocity: 0.75);
a3.Play(right, 36, 2, "D4 D5", velocity: 0.75);
a3.Play(right, 38, 2, "E4 E5", velocity: 0.75);
a3.Play(right, 40, 2, "F#4 F#5", velocity: 0.75);
a3.Play(right, 42, 2, "D4 D5", velocity: 0.75);
a3.Play(right, 44, 2, "F#4 F#5", velocity: 0.75);
a3.Play(right, 46, 2, "B4 B5", velocity: 0.75);
// a3, bar 4
a3.Play(right, 48, 2, "A4 A5", velocity: 0.75);
a3.Play(right, 50, 2, "F#4 F#5", velocity: 0.75);
a3.Play(right, 52, 2, "D4 D5", velocity: 0.75);
a3.Play(right, 54, 2, "F#4 F#5", velocity: 0.75);
a3.Play(right, 56, 8, "A4 A5", velocity: 0.75);
a3.Play(left, 0, 4, "B2", velocity: 0.75);
a3.Play(left, 4, 4, "F#3", velocity: 0.75);
a3.Play(left, 8, 4, "B2", velocity: 0.75);
a3.Play(left, 12, 4, "F#3", velocity: 0.75);
// a3, bar 2
a3.Play(left, 16, 4, "B2", velocity: 0.75);
a3.Play(left, 20, 4, "F#3", velocity: 0.75);
a3.Play(left, 24, 4, "B2", velocity: 0.75);
a3.Play(left, 28, 4, "F#3", velocity: 0.75);
// a3, bar 3
a3.Play(left, 32, 4, "B2", velocity: 0.75);
a3.Play(left, 36, 4, "F#3", velocity: 0.75);
a3.Play(left, 40, 4, "B2", velocity: 0.75);
a3.Play(left, 44, 4, "F#3", velocity: 0.75);
// a3, bar 4
a3.Play(left, 48, 4, "B2", velocity: 0.75);
a3.Play(left, 52, 4, "F#3", velocity: 0.75);
a3.Play(left, 56, 4, "D3", velocity: 0.75);
a3.Play(left, 60, 4, "F#3", velocity: 0.75);

// Pattern b3
var b3 = song.Pattern(bars: 4);
b3.Play(right, 0, 2, "F#4 F#5", velocity: 0.75);
b3.Play(right, 2, 2, "G#4 G#5", velocity: 0.75);
b3.Play(right, 4, 2, "A#4 A#5", velocity: 0.75);
b3.Play(right, 6, 2, "B4 B5", velocity: 0.75);
b3.Play(right, 8, 2, "C#5 C#6", velocity: 0.75);
b3.Play(right, 10, 2, "A#4 A#5", velocity: 0.75);
b3.Play(right, 12, 4, "C#5 C#6", velocity: 0.75);
// b3, bar 2
b3.Play(right, 16, 2, "D5 D6", velocity: 0.75);
b3.Play(right, 18, 2, "A#4 A#5", velocity: 0.75);
b3.Play(right, 20, 4, "D5 D6", velocity: 0.75);
b3.Play(right, 24, 2, "C#5 C#6", velocity: 0.75);
b3.Play(right, 26, 2, "A#4 A#5", velocity: 0.75);
b3.Play(right, 28, 4, "C#5 C#6", velocity: 0.75);
// b3, bar 3
b3.Play(right, 32, 2, "F#4 F#5", velocity: 0.75);
b3.Play(right, 34, 2, "G#4 G#5", velocity: 0.75);
b3.Play(right, 36, 2, "A#4 A#5", velocity: 0.75);
b3.Play(right, 38, 2, "B4 B5", velocity: 0.75);
b3.Play(right, 40, 2, "C#5 C#6", velocity: 0.75);
b3.Play(right, 42, 2, "A#4 A#5", velocity: 0.75);
b3.Play(right, 44, 4, "C#5 C#6", velocity: 0.75);
// b3, bar 4
b3.Play(right, 48, 2, "D5 D6", velocity: 0.75);
b3.Play(right, 50, 2, "A#4 A#5", velocity: 0.75);
b3.Play(right, 52, 4, "D5 D6", velocity: 0.75);
b3.Play(right, 56, 8, "C#5 C#6", velocity: 0.75);
b3.Play(left, 0, 4, "F#2", velocity: 0.75);
b3.Play(left, 4, 4, "C#3", velocity: 0.75);
b3.Play(left, 8, 4, "F#2", velocity: 0.75);
b3.Play(left, 12, 4, "C#3", velocity: 0.75);
// b3, bar 2
b3.Play(left, 16, 4, "F#2", velocity: 0.75);
b3.Play(left, 20, 4, "C#3", velocity: 0.75);
b3.Play(left, 24, 4, "F#2", velocity: 0.75);
b3.Play(left, 28, 4, "C#3", velocity: 0.75);
// b3, bar 3
b3.Play(left, 32, 4, "F#2", velocity: 0.75);
b3.Play(left, 36, 4, "C#3", velocity: 0.75);
b3.Play(left, 40, 4, "F#2", velocity: 0.75);
b3.Play(left, 44, 4, "C#3", velocity: 0.75);
// b3, bar 4
b3.Play(left, 48, 4, "F#2", velocity: 0.75);
b3.Play(left, 52, 4, "C#3", velocity: 0.75);
b3.Play(left, 56, 4, "F#2", velocity: 0.75);
b3.Play(left, 60, 4, "C#3", velocity: 0.75);

// Pattern a4
var a4 = song.Pattern(bars: 4);
a4.Play(right, 0, 2, "B3 B4", velocity: 1);
a4.Play(right, 2, 2, "C#4 C#5", velocity: 1);
a4.Play(right, 4, 2, "D4 D5", velocity: 1);
a4.Play(right, 6, 2, "E4 E5", velocity: 1);
a4.Play(right, 8, 2, "F#4 F#5", velocity: 1);
a4.Play(right, 10, 2, "D4 D5", velocity: 1);
a4.Play(right, 12, 4, "F#4 F#5", velocity: 1);
// a4, bar 2
a4.Play(right, 16, 2, "F4 F5", velocity: 1);
a4.Play(right, 18, 2, "C#4 C#5", velocity: 1);
a4.Play(right, 20, 4, "F4 F5", velocity: 1);
a4.Play(right, 24, 2, "E4 E5", velocity: 1);
a4.Play(right, 26, 2, "C4 C5", velocity: 1);
a4.Play(right, 28, 4, "E4 E5", velocity: 1);
// a4, bar 3
a4.Play(right, 32, 2, "B3 B4", velocity: 1);
a4.Play(right, 34, 2, "C#4 C#5", velocity: 1);
a4.Play(right, 36, 2, "D4 D5", velocity: 1);
a4.Play(right, 38, 2, "E4 E5", velocity: 1);
a4.Play(right, 40, 2, "F#4 F#5", velocity: 1);
a4.Play(right, 42, 2, "D4 D5", velocity: 1);
a4.Play(right, 44, 2, "F#4 F#5", velocity: 1);
a4.Play(right, 46, 2, "B4 B5", velocity: 1);
// a4, bar 4
a4.Play(right, 48, 2, "A4 A5", velocity: 1);
a4.Play(right, 50, 2, "F#4 F#5", velocity: 1);
a4.Play(right, 52, 2, "D4 D5", velocity: 1);
a4.Play(right, 54, 2, "F#4 F#5", velocity: 1);
a4.Play(right, 56, 8, "A4 A5", velocity: 1);
a4.Play(left, 0, 4, "B2", velocity: 1);
a4.Play(left, 4, 4, "F#3", velocity: 1);
a4.Play(left, 8, 4, "B2", velocity: 1);
a4.Play(left, 12, 4, "F#3", velocity: 1);
// a4, bar 2
a4.Play(left, 16, 4, "B2", velocity: 1);
a4.Play(left, 20, 4, "F#3", velocity: 1);
a4.Play(left, 24, 4, "B2", velocity: 1);
a4.Play(left, 28, 4, "F#3", velocity: 1);
// a4, bar 3
a4.Play(left, 32, 4, "B2", velocity: 1);
a4.Play(left, 36, 4, "F#3", velocity: 1);
a4.Play(left, 40, 4, "B2", velocity: 1);
a4.Play(left, 44, 4, "F#3", velocity: 1);
// a4, bar 4
a4.Play(left, 48, 4, "B2", velocity: 1);
a4.Play(left, 52, 4, "F#3", velocity: 1);
a4.Play(left, 56, 4, "D3", velocity: 1);
a4.Play(left, 60, 4, "F#3", velocity: 1);

// Pattern b4
var b4 = song.Pattern(bars: 4);
b4.Play(right, 0, 2, "F#4 F#5", velocity: 1);
b4.Play(right, 2, 2, "G#4 G#5", velocity: 1);
b4.Play(right, 4, 2, "A#4 A#5", velocity: 1);
b4.Play(right, 6, 2, "B4 B5", velocity: 1);
b4.Play(right, 8, 2, "C#5 C#6", velocity: 1);
b4.Play(right, 10, 2, "A#4 A#5", velocity: 1);
b4.Play(right, 12, 4, "C#5 C#6", velocity: 1);
// b4, bar 2
b4.Play(right, 16, 2, "D5 D6", velocity: 1);
b4.Play(right, 18, 2, "A#4 A#5", velocity: 1);
b4.Play(right, 20, 4, "D5 D6", velocity: 1);
b4.Play(right, 24, 2, "C#5 C#6", velocity: 1);
b4.Play(right, 26, 2, "A#4 A#5", velocity: 1);
b4.Play(right, 28, 4, "C#5 C#6", velocity: 1);
// b4, bar 3
b4.Play(right, 32, 2, "F#4 F#5", velocity: 1);
b4.Play(right, 34, 2, "G#4 G#5", velocity: 1);
b4.Play(right, 36, 2, "A#4 A#5", velocity: 1);
b4.Play(right, 38, 2, "B4 B5", velocity: 1);
b4.Play(right, 40, 2, "C#5 C#6", velocity: 1);
b4.Play(right, 42, 2, "A#4 A#5", velocity: 1);
b4.Play(right, 44, 4, "C#5 C#6", velocity: 1);
// b4, bar 4
b4.Play(right, 48, 2, "D5 D6", velocity: 1);
b4.Play(right, 50, 2, "A#4 A#5", velocity: 1);
b4.Play(right, 52, 4, "D5 D6", velocity: 1);
b4.Play(right, 56, 8, "C#5 C#6", velocity: 1);
b4.Play(left, 0, 4, "F#2", velocity: 1);
b4.Play(left, 4, 4, "C#3", velocity: 1);
b4.Play(left, 8, 4, "F#2", velocity: 1);
b4.Play(left, 12, 4, "C#3", velocity: 1);
// b4, bar 2
b4.Play(left, 16, 4, "F#2", velocity: 1);
b4.Play(left, 20, 4, "C#3", velocity: 1);
b4.Play(left, 24, 4, "F#2", velocity: 1);
b4.Play(left, 28, 4, "C#3", velocity: 1);
// b4, bar 3
b4.Play(left, 32, 4, "F#2", velocity: 1);
b4.Play(left, 36, 4, "C#3", velocity: 1);
b4.Play(left, 40, 4, "F#2", velocity: 1);
b4.Play(left, 44, 4, "C#3", velocity: 1);
// b4, bar 4
b4.Play(left, 48, 4, "F#2", velocity: 1);
b4.Play(left, 52, 4, "C#3", velocity: 1);
b4.Play(left, 56, 4, "F#2", velocity: 1);
b4.Play(left, 60, 4, "C#3", velocity: 1);

// Pattern end
var end = song.Pattern(bars: 4);
end.Play(right, 0, 4, "B3 B4 D5 F#5");
// end, bar 3
end.Play(right, 32, 4, "F#4 A#4 C#5");
// end, bar 4
end.Play(right, 48, 16, "B3 D4 F#4 B4");
end.Play(left, 0, 4, "B2 B3", velocity: 0.6);
// end, bar 3
end.Play(left, 32, 4, "F#2 F#3", velocity: 0.6);
// end, bar 4
end.Play(left, 48, 16, "B2 F#3", velocity: 0.6);

// The arrangement: the patterns in the order they play (52 bars, 1:30)
song.Arrange(a1, b1, a1, a2, b2, a2, a3, b3,
    a3, a4, b4, a4, end);

// The master: volume, and how much reverb and delay come back
song.Volume = 1;
song.Reverb = 0.9;

song.Play();
