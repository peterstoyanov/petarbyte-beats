// PetarByte Beats: this song, written as C# code.
// Channels are the sounds, patterns are a few bars each, the arrangement plays them in order.
var song = new Song(bpm: 118, swing: 0, key: "G major");

// Channels: one sound each, with its mixer settings below it
var right = song.Instrument(Instruments.GrandPiano);
right.Volume = 1;
right.Reverb = 0.35;
var left = song.Instrument(Instruments.GrandPiano);
left.Volume = 0.9;
left.Reverb = 0.35;

// Pattern a1: Hits(drum, steps) with x = hit, X = loud, . = rest. Play(instrument, step, length, notes).
var a1 = song.Pattern(bars: 3);
a1.Play(right, 0, 4, "D5");
a1.Play(right, 4, 2, "G4");
a1.Play(right, 6, 2, "A4");
a1.Play(right, 8, 2, "B4");
a1.Play(right, 10, 2, "C5");
a1.Play(right, 12, 4, "D5");
// a1, bar 2
a1.Play(right, 16, 4, "G4");
a1.Play(right, 20, 4, "G4");
a1.Play(right, 24, 4, "E5");
a1.Play(right, 28, 2, "C5");
a1.Play(right, 30, 2, "D5");
// a1, bar 3
a1.Play(right, 32, 2, "E5");
a1.Play(right, 34, 2, "F#5");
a1.Play(right, 36, 4, "G5");
a1.Play(right, 40, 4, "G4");
a1.Play(right, 44, 4, "G4");
a1.Play(left, 0, 8, "G3", velocity: 0.6);
a1.Play(left, 8, 4, "A3", velocity: 0.6);
a1.Play(left, 12, 12, "B3", velocity: 0.6);
// a1, bar 2
a1.Play(left, 24, 12, "C4", velocity: 0.6);
// a1, bar 3
a1.Play(left, 36, 12, "B3", velocity: 0.6);

// Pattern a2
var a2 = song.Pattern(bars: 3);
a2.Play(right, 0, 4, "C5");
a2.Play(right, 4, 2, "D5");
a2.Play(right, 6, 2, "C5");
a2.Play(right, 8, 2, "B4");
a2.Play(right, 10, 2, "A4");
a2.Play(right, 12, 4, "B4");
// a2, bar 2
a2.Play(right, 16, 2, "C5");
a2.Play(right, 18, 2, "B4");
a2.Play(right, 20, 2, "A4");
a2.Play(right, 22, 2, "G4");
a2.Play(right, 24, 4, "F#4");
a2.Play(right, 28, 2, "G4");
a2.Play(right, 30, 2, "A4");
// a2, bar 3
a2.Play(right, 32, 2, "B4");
a2.Play(right, 34, 2, "G4");
a2.Play(right, 36, 12, "A4");
a2.Play(left, 0, 12, "A3", velocity: 0.6);
a2.Play(left, 12, 12, "G3", velocity: 0.6);
// a2, bar 2
a2.Play(left, 24, 4, "D4", velocity: 0.6);
a2.Play(left, 28, 4, "B3", velocity: 0.6);
// a2, bar 3
a2.Play(left, 32, 4, "G3", velocity: 0.6);
a2.Play(left, 36, 4, "D4", velocity: 0.6);
a2.Play(left, 40, 2, "D3", velocity: 0.6);
a2.Play(left, 42, 2, "C4", velocity: 0.6);
a2.Play(left, 44, 2, "B3", velocity: 0.6);
a2.Play(left, 46, 2, "A3", velocity: 0.6);

// Pattern a3
var a3 = song.Pattern(bars: 3);
a3.Play(right, 0, 4, "D5");
a3.Play(right, 4, 2, "G4");
a3.Play(right, 6, 2, "A4");
a3.Play(right, 8, 2, "B4");
a3.Play(right, 10, 2, "C5");
a3.Play(right, 12, 4, "D5");
// a3, bar 2
a3.Play(right, 16, 4, "G4");
a3.Play(right, 20, 4, "G4");
a3.Play(right, 24, 4, "E5");
a3.Play(right, 28, 2, "C5");
a3.Play(right, 30, 2, "D5");
// a3, bar 3
a3.Play(right, 32, 2, "E5");
a3.Play(right, 34, 2, "F#5");
a3.Play(right, 36, 4, "G5");
a3.Play(right, 40, 4, "G4");
a3.Play(right, 44, 4, "G4");
a3.Play(left, 0, 8, "B3", velocity: 0.6);
a3.Play(left, 8, 4, "A3", velocity: 0.6);
a3.Play(left, 12, 4, "G3", velocity: 0.6);
// a3, bar 2
a3.Play(left, 16, 4, "B3", velocity: 0.6);
a3.Play(left, 20, 4, "G3", velocity: 0.6);
a3.Play(left, 24, 12, "C4", velocity: 0.6);
// a3, bar 3
a3.Play(left, 36, 4, "B3", velocity: 0.6);
a3.Play(left, 40, 2, "C4", velocity: 0.6);
a3.Play(left, 42, 2, "B3", velocity: 0.6);
a3.Play(left, 44, 2, "A3", velocity: 0.6);
a3.Play(left, 46, 2, "G3", velocity: 0.6);

// Pattern a4
var a4 = song.Pattern(bars: 3);
a4.Play(right, 0, 4, "C5");
a4.Play(right, 4, 2, "D5");
a4.Play(right, 6, 2, "C5");
a4.Play(right, 8, 2, "B4");
a4.Play(right, 10, 2, "A4");
a4.Play(right, 12, 4, "B4");
// a4, bar 2
a4.Play(right, 16, 2, "C5");
a4.Play(right, 18, 2, "B4");
a4.Play(right, 20, 2, "A4");
a4.Play(right, 22, 2, "G4");
a4.Play(right, 24, 4, "A4");
a4.Play(right, 28, 2, "B4");
a4.Play(right, 30, 2, "A4");
// a4, bar 3
a4.Play(right, 32, 2, "G4");
a4.Play(right, 34, 2, "F#4");
a4.Play(right, 36, 12, "G4");
a4.Play(left, 0, 8, "A3", velocity: 0.6);
a4.Play(left, 8, 4, "F#3", velocity: 0.6);
a4.Play(left, 12, 8, "G3", velocity: 0.6);
// a4, bar 2
a4.Play(left, 20, 4, "B3", velocity: 0.6);
a4.Play(left, 24, 4, "C4", velocity: 0.6);
a4.Play(left, 28, 4, "D4", velocity: 0.6);
// a4, bar 3
a4.Play(left, 32, 4, "D3", velocity: 0.6);
a4.Play(left, 36, 8, "G3", velocity: 0.6);
a4.Play(left, 44, 4, "G2", velocity: 0.6);

// Pattern b1
var b1 = song.Pattern(bars: 3);
b1.Play(right, 0, 4, "B5");
b1.Play(right, 4, 2, "G5");
b1.Play(right, 6, 2, "A5");
b1.Play(right, 8, 2, "B5");
b1.Play(right, 10, 2, "G5");
b1.Play(right, 12, 4, "A5");
// b1, bar 2
b1.Play(right, 16, 2, "D5");
b1.Play(right, 18, 2, "E5");
b1.Play(right, 20, 2, "F#5");
b1.Play(right, 22, 2, "D5");
b1.Play(right, 24, 4, "G5");
b1.Play(right, 28, 2, "E5");
b1.Play(right, 30, 2, "F#5");
// b1, bar 3
b1.Play(right, 32, 2, "G5");
b1.Play(right, 34, 2, "D5");
b1.Play(right, 36, 4, "C#5");
b1.Play(right, 40, 2, "B4");
b1.Play(right, 42, 2, "C#5");
b1.Play(right, 44, 4, "A4");
b1.Play(left, 0, 12, "G3", velocity: 0.6);
b1.Play(left, 12, 12, "F#3", velocity: 0.6);
// b1, bar 2
b1.Play(left, 24, 8, "G3", velocity: 0.6);
// b1, bar 3
b1.Play(left, 32, 4, "E3", velocity: 0.6);
b1.Play(left, 36, 8, "A3", velocity: 0.6);
b1.Play(left, 44, 4, "A2", velocity: 0.6);

// Pattern b2
var b2 = song.Pattern(bars: 3);
b2.Play(right, 0, 2, "A4");
b2.Play(right, 2, 2, "B4");
b2.Play(right, 4, 2, "C#5");
b2.Play(right, 6, 2, "D5");
b2.Play(right, 8, 2, "E5");
b2.Play(right, 10, 2, "F#5");
b2.Play(right, 12, 4, "G5");
// b2, bar 2
b2.Play(right, 16, 4, "F#5");
b2.Play(right, 20, 4, "E5");
b2.Play(right, 24, 4, "F#5");
b2.Play(right, 28, 4, "A4");
// b2, bar 3
b2.Play(right, 32, 4, "C#5");
b2.Play(right, 36, 12, "D5");
b2.Play(left, 0, 12, "A3", velocity: 0.6);
b2.Play(left, 12, 4, "B3", velocity: 0.6);
// b2, bar 2
b2.Play(left, 16, 4, "D4", velocity: 0.6);
b2.Play(left, 20, 4, "C#4", velocity: 0.6);
b2.Play(left, 24, 4, "D4", velocity: 0.6);
b2.Play(left, 28, 4, "F#3", velocity: 0.6);
// b2, bar 3
b2.Play(left, 32, 4, "A3", velocity: 0.6);
b2.Play(left, 36, 4, "D4", velocity: 0.6);
b2.Play(left, 40, 4, "D3", velocity: 0.6);
b2.Play(left, 44, 4, "C4", velocity: 0.6);

// Pattern b3
var b3 = song.Pattern(bars: 3);
b3.Play(right, 0, 4, "D5");
b3.Play(right, 4, 2, "G4");
b3.Play(right, 6, 2, "F#4");
b3.Play(right, 8, 4, "G4");
b3.Play(right, 12, 4, "E5");
// b3, bar 2
b3.Play(right, 16, 2, "G4");
b3.Play(right, 18, 2, "F#4");
b3.Play(right, 20, 4, "G4");
b3.Play(right, 24, 4, "D5");
b3.Play(right, 28, 4, "C5");
// b3, bar 3
b3.Play(right, 32, 4, "B4");
b3.Play(right, 36, 2, "A4");
b3.Play(right, 38, 2, "G4");
b3.Play(right, 40, 2, "F#4");
b3.Play(right, 42, 2, "G4");
b3.Play(right, 44, 4, "A4");
b3.Play(left, 0, 12, "B3", velocity: 0.6);
b3.Play(left, 12, 12, "C4", velocity: 0.6);
// b3, bar 2
b3.Play(left, 24, 4, "B3", velocity: 0.6);
b3.Play(left, 28, 4, "A3", velocity: 0.6);
// b3, bar 3
b3.Play(left, 32, 4, "G3", velocity: 0.6);
b3.Play(left, 36, 12, "D4", velocity: 0.6);

// Pattern b4
var b4 = song.Pattern(bars: 3);
b4.Play(right, 0, 2, "D4");
b4.Play(right, 2, 2, "E4");
b4.Play(right, 4, 2, "F#4");
b4.Play(right, 6, 2, "G4");
b4.Play(right, 8, 2, "A4");
b4.Play(right, 10, 2, "B4");
b4.Play(right, 12, 4, "C5");
// b4, bar 2
b4.Play(right, 16, 4, "B4");
b4.Play(right, 20, 4, "A4");
b4.Play(right, 24, 2, "B4");
b4.Play(right, 26, 2, "D5");
b4.Play(right, 28, 4, "G4");
// b4, bar 3
b4.Play(right, 32, 4, "F#4");
b4.Play(right, 36, 12, "G4");
b4.Play(left, 0, 8, "D3", velocity: 0.6);
b4.Play(left, 8, 4, "F#3", velocity: 0.6);
b4.Play(left, 12, 4, "E3", velocity: 0.6);
// b4, bar 2
b4.Play(left, 16, 4, "G3", velocity: 0.6);
b4.Play(left, 20, 4, "F#3", velocity: 0.6);
b4.Play(left, 24, 8, "G3", velocity: 0.6);
// b4, bar 3
b4.Play(left, 32, 4, "D3", velocity: 0.6);
b4.Play(left, 36, 8, "G2", velocity: 0.6);
b4.Play(left, 44, 4, "G3", velocity: 0.6);

// The arrangement: the patterns in the order they play (48 bars, 1:38)
song.Arrange(a1, a2, a3, a4, a1, a2, a3, a4,
    b1, b2, b3, b4, b1, b2, b3, b4);

// The master: volume, and how much reverb and delay come back
song.Volume = 1;
song.Reverb = 0.9;

song.Play();
