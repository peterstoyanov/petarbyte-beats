// PetarByte Beats: this song, written as C# code.
// Channels are the sounds, patterns are a few bars each, the arrangement plays them in order.
var song = new Song(bpm: 104, swing: 0, key: "D major");

// Channels: one sound each, with its mixer settings below it
var right = song.Instrument(Instruments.GrandPiano);
right.Volume = 1;
right.Reverb = 0.35;
var left = song.Instrument(Instruments.GrandPiano);
left.Volume = 0.9;
left.Reverb = 0.35;

// Pattern simple1: Hits(drum, steps) with x = hit, X = loud, . = rest. Play(instrument, step, length, notes).
var simple1 = song.Pattern(bars: 4);
simple1.Play(right, 0, 4, "F#4");
simple1.Play(right, 4, 4, "F#4");
simple1.Play(right, 8, 4, "G4");
simple1.Play(right, 12, 4, "A4");
// simple1, bar 2
simple1.Play(right, 16, 4, "A4");
simple1.Play(right, 20, 4, "G4");
simple1.Play(right, 24, 4, "F#4");
simple1.Play(right, 28, 4, "E4");
// simple1, bar 3
simple1.Play(right, 32, 4, "D4");
simple1.Play(right, 36, 4, "D4");
simple1.Play(right, 40, 4, "E4");
simple1.Play(right, 44, 4, "F#4");
// simple1, bar 4
simple1.Play(right, 48, 6, "F#4");
simple1.Play(right, 54, 2, "E4");
simple1.Play(right, 56, 8, "E4");
simple1.Play(left, 0, 8, "D2", velocity: 0.6);
simple1.Play(left, 8, 8, "D3 F#3 A3", velocity: 0.6);
// simple1, bar 2
simple1.Play(left, 16, 8, "A2", velocity: 0.6);
simple1.Play(left, 24, 8, "C#3 E3 A3", velocity: 0.6);
// simple1, bar 3
simple1.Play(left, 32, 8, "D2", velocity: 0.6);
simple1.Play(left, 40, 8, "D3 F#3 A3", velocity: 0.6);
// simple1, bar 4
simple1.Play(left, 48, 8, "A2", velocity: 0.6);
simple1.Play(left, 56, 8, "C#3 E3 A3", velocity: 0.6);

// Pattern simple2
var simple2 = song.Pattern(bars: 4);
simple2.Play(right, 0, 4, "F#4");
simple2.Play(right, 4, 4, "F#4");
simple2.Play(right, 8, 4, "G4");
simple2.Play(right, 12, 4, "A4");
// simple2, bar 2
simple2.Play(right, 16, 4, "A4");
simple2.Play(right, 20, 4, "G4");
simple2.Play(right, 24, 4, "F#4");
simple2.Play(right, 28, 4, "E4");
// simple2, bar 3
simple2.Play(right, 32, 4, "D4");
simple2.Play(right, 36, 4, "D4");
simple2.Play(right, 40, 4, "E4");
simple2.Play(right, 44, 4, "F#4");
// simple2, bar 4
simple2.Play(right, 48, 6, "E4");
simple2.Play(right, 54, 2, "D4");
simple2.Play(right, 56, 8, "D4");
simple2.Play(left, 0, 8, "D2", velocity: 0.6);
simple2.Play(left, 8, 8, "D3 F#3 A3", velocity: 0.6);
// simple2, bar 2
simple2.Play(left, 16, 8, "A2", velocity: 0.6);
simple2.Play(left, 24, 8, "C#3 E3 A3", velocity: 0.6);
// simple2, bar 3
simple2.Play(left, 32, 8, "D2", velocity: 0.6);
simple2.Play(left, 40, 8, "D3 F#3 A3", velocity: 0.6);
// simple2, bar 4
simple2.Play(left, 48, 8, "D2", velocity: 0.6);
simple2.Play(left, 56, 8, "D3 F#3 A3", velocity: 0.6);

// Pattern simple3
var simple3 = song.Pattern(bars: 4);
simple3.Play(right, 0, 4, "E4");
simple3.Play(right, 4, 4, "E4");
simple3.Play(right, 8, 4, "F#4");
simple3.Play(right, 12, 4, "D4");
// simple3, bar 2
simple3.Play(right, 16, 4, "E4");
simple3.Play(right, 20, 2, "F#4");
simple3.Play(right, 22, 2, "G4");
simple3.Play(right, 24, 4, "F#4");
simple3.Play(right, 28, 4, "D4");
// simple3, bar 3
simple3.Play(right, 32, 4, "E4");
simple3.Play(right, 36, 2, "F#4");
simple3.Play(right, 38, 2, "G4");
simple3.Play(right, 40, 4, "F#4");
simple3.Play(right, 44, 4, "E4");
// simple3, bar 4
simple3.Play(right, 48, 4, "D4");
simple3.Play(right, 52, 4, "E4");
simple3.Play(right, 56, 8, "A3");
simple3.Play(left, 0, 8, "A2", velocity: 0.6);
simple3.Play(left, 8, 8, "C#3 E3 A3", velocity: 0.6);
// simple3, bar 2
simple3.Play(left, 16, 8, "D2", velocity: 0.6);
simple3.Play(left, 24, 8, "D3 F#3 A3", velocity: 0.6);
// simple3, bar 3
simple3.Play(left, 32, 8, "A2", velocity: 0.6);
simple3.Play(left, 40, 8, "C#3 E3 A3", velocity: 0.6);
// simple3, bar 4
simple3.Play(left, 48, 8, "A2", velocity: 0.6);
simple3.Play(left, 56, 8, "C#3 E3 A3", velocity: 0.6);

// Pattern simple4
var simple4 = song.Pattern(bars: 4);
simple4.Play(right, 0, 4, "F#4");
simple4.Play(right, 4, 4, "F#4");
simple4.Play(right, 8, 4, "G4");
simple4.Play(right, 12, 4, "A4");
// simple4, bar 2
simple4.Play(right, 16, 4, "A4");
simple4.Play(right, 20, 4, "G4");
simple4.Play(right, 24, 4, "F#4");
simple4.Play(right, 28, 4, "E4");
// simple4, bar 3
simple4.Play(right, 32, 4, "D4");
simple4.Play(right, 36, 4, "D4");
simple4.Play(right, 40, 4, "E4");
simple4.Play(right, 44, 4, "F#4");
// simple4, bar 4
simple4.Play(right, 48, 6, "E4");
simple4.Play(right, 54, 2, "D4");
simple4.Play(right, 56, 8, "D4");
simple4.Play(left, 0, 8, "D2", velocity: 0.6);
simple4.Play(left, 8, 8, "D3 F#3 A3", velocity: 0.6);
// simple4, bar 2
simple4.Play(left, 16, 8, "A2", velocity: 0.6);
simple4.Play(left, 24, 8, "C#3 E3 A3", velocity: 0.6);
// simple4, bar 3
simple4.Play(left, 32, 8, "D2", velocity: 0.6);
simple4.Play(left, 40, 8, "D3 F#3 A3", velocity: 0.6);
// simple4, bar 4
simple4.Play(left, 48, 8, "D2", velocity: 0.6);
simple4.Play(left, 56, 8, "D3 F#3 A3", velocity: 0.6);

// Pattern flowing1
var flowing1 = song.Pattern(bars: 4);
flowing1.Play(right, 0, 4, "F#5");
flowing1.Play(right, 4, 4, "F#5");
flowing1.Play(right, 8, 4, "G5");
flowing1.Play(right, 12, 4, "A5");
// flowing1, bar 2
flowing1.Play(right, 16, 4, "A5");
flowing1.Play(right, 20, 4, "G5");
flowing1.Play(right, 24, 4, "F#5");
flowing1.Play(right, 28, 4, "E5");
// flowing1, bar 3
flowing1.Play(right, 32, 4, "D5");
flowing1.Play(right, 36, 4, "D5");
flowing1.Play(right, 40, 4, "E5");
flowing1.Play(right, 44, 4, "F#5");
// flowing1, bar 4
flowing1.Play(right, 48, 6, "F#5");
flowing1.Play(right, 54, 2, "E5");
flowing1.Play(right, 56, 8, "E5");
flowing1.Play(left, 0, 2, "D2", velocity: 0.6);
flowing1.Play(left, 2, 2, "F#3", velocity: 0.6);
flowing1.Play(left, 4, 2, "A3", velocity: 0.6);
flowing1.Play(left, 6, 2, "F#3", velocity: 0.6);
flowing1.Play(left, 8, 2, "D2", velocity: 0.6);
flowing1.Play(left, 10, 2, "F#3", velocity: 0.6);
flowing1.Play(left, 12, 2, "A3", velocity: 0.6);
flowing1.Play(left, 14, 2, "F#3", velocity: 0.6);
// flowing1, bar 2
flowing1.Play(left, 16, 2, "A2", velocity: 0.6);
flowing1.Play(left, 18, 2, "E3", velocity: 0.6);
flowing1.Play(left, 20, 2, "A3", velocity: 0.6);
flowing1.Play(left, 22, 2, "E3", velocity: 0.6);
flowing1.Play(left, 24, 2, "A2", velocity: 0.6);
flowing1.Play(left, 26, 2, "E3", velocity: 0.6);
flowing1.Play(left, 28, 2, "A3", velocity: 0.6);
flowing1.Play(left, 30, 2, "E3", velocity: 0.6);
// flowing1, bar 3
flowing1.Play(left, 32, 2, "D2", velocity: 0.6);
flowing1.Play(left, 34, 2, "F#3", velocity: 0.6);
flowing1.Play(left, 36, 2, "A3", velocity: 0.6);
flowing1.Play(left, 38, 2, "F#3", velocity: 0.6);
flowing1.Play(left, 40, 2, "D2", velocity: 0.6);
flowing1.Play(left, 42, 2, "F#3", velocity: 0.6);
flowing1.Play(left, 44, 2, "A3", velocity: 0.6);
flowing1.Play(left, 46, 2, "F#3", velocity: 0.6);
// flowing1, bar 4
flowing1.Play(left, 48, 2, "A2", velocity: 0.6);
flowing1.Play(left, 50, 2, "E3", velocity: 0.6);
flowing1.Play(left, 52, 2, "A3", velocity: 0.6);
flowing1.Play(left, 54, 2, "E3", velocity: 0.6);
flowing1.Play(left, 56, 2, "A2", velocity: 0.6);
flowing1.Play(left, 58, 2, "E3", velocity: 0.6);
flowing1.Play(left, 60, 2, "A3", velocity: 0.6);
flowing1.Play(left, 62, 2, "E3", velocity: 0.6);

// Pattern flowing2
var flowing2 = song.Pattern(bars: 4);
flowing2.Play(right, 0, 4, "F#5");
flowing2.Play(right, 4, 4, "F#5");
flowing2.Play(right, 8, 4, "G5");
flowing2.Play(right, 12, 4, "A5");
// flowing2, bar 2
flowing2.Play(right, 16, 4, "A5");
flowing2.Play(right, 20, 4, "G5");
flowing2.Play(right, 24, 4, "F#5");
flowing2.Play(right, 28, 4, "E5");
// flowing2, bar 3
flowing2.Play(right, 32, 4, "D5");
flowing2.Play(right, 36, 4, "D5");
flowing2.Play(right, 40, 4, "E5");
flowing2.Play(right, 44, 4, "F#5");
// flowing2, bar 4
flowing2.Play(right, 48, 6, "E5");
flowing2.Play(right, 54, 2, "D5");
flowing2.Play(right, 56, 8, "D5");
flowing2.Play(left, 0, 2, "D2", velocity: 0.6);
flowing2.Play(left, 2, 2, "F#3", velocity: 0.6);
flowing2.Play(left, 4, 2, "A3", velocity: 0.6);
flowing2.Play(left, 6, 2, "F#3", velocity: 0.6);
flowing2.Play(left, 8, 2, "D2", velocity: 0.6);
flowing2.Play(left, 10, 2, "F#3", velocity: 0.6);
flowing2.Play(left, 12, 2, "A3", velocity: 0.6);
flowing2.Play(left, 14, 2, "F#3", velocity: 0.6);
// flowing2, bar 2
flowing2.Play(left, 16, 2, "A2", velocity: 0.6);
flowing2.Play(left, 18, 2, "E3", velocity: 0.6);
flowing2.Play(left, 20, 2, "A3", velocity: 0.6);
flowing2.Play(left, 22, 2, "E3", velocity: 0.6);
flowing2.Play(left, 24, 2, "A2", velocity: 0.6);
flowing2.Play(left, 26, 2, "E3", velocity: 0.6);
flowing2.Play(left, 28, 2, "A3", velocity: 0.6);
flowing2.Play(left, 30, 2, "E3", velocity: 0.6);
// flowing2, bar 3
flowing2.Play(left, 32, 2, "D2", velocity: 0.6);
flowing2.Play(left, 34, 2, "F#3", velocity: 0.6);
flowing2.Play(left, 36, 2, "A3", velocity: 0.6);
flowing2.Play(left, 38, 2, "F#3", velocity: 0.6);
flowing2.Play(left, 40, 2, "D2", velocity: 0.6);
flowing2.Play(left, 42, 2, "F#3", velocity: 0.6);
flowing2.Play(left, 44, 2, "A3", velocity: 0.6);
flowing2.Play(left, 46, 2, "F#3", velocity: 0.6);
// flowing2, bar 4
flowing2.Play(left, 48, 2, "D2", velocity: 0.6);
flowing2.Play(left, 50, 2, "F#3", velocity: 0.6);
flowing2.Play(left, 52, 2, "A3", velocity: 0.6);
flowing2.Play(left, 54, 2, "F#3", velocity: 0.6);
flowing2.Play(left, 56, 2, "D2", velocity: 0.6);
flowing2.Play(left, 58, 2, "F#3", velocity: 0.6);
flowing2.Play(left, 60, 2, "A3", velocity: 0.6);
flowing2.Play(left, 62, 2, "F#3", velocity: 0.6);

// Pattern flowing3
var flowing3 = song.Pattern(bars: 4);
flowing3.Play(right, 0, 4, "E5");
flowing3.Play(right, 4, 4, "E5");
flowing3.Play(right, 8, 4, "F#5");
flowing3.Play(right, 12, 4, "D5");
// flowing3, bar 2
flowing3.Play(right, 16, 4, "E5");
flowing3.Play(right, 20, 2, "F#5");
flowing3.Play(right, 22, 2, "G5");
flowing3.Play(right, 24, 4, "F#5");
flowing3.Play(right, 28, 4, "D5");
// flowing3, bar 3
flowing3.Play(right, 32, 4, "E5");
flowing3.Play(right, 36, 2, "F#5");
flowing3.Play(right, 38, 2, "G5");
flowing3.Play(right, 40, 4, "F#5");
flowing3.Play(right, 44, 4, "E5");
// flowing3, bar 4
flowing3.Play(right, 48, 4, "D5");
flowing3.Play(right, 52, 4, "E5");
flowing3.Play(right, 56, 8, "A4");
flowing3.Play(left, 0, 2, "A2", velocity: 0.6);
flowing3.Play(left, 2, 2, "E3", velocity: 0.6);
flowing3.Play(left, 4, 2, "A3", velocity: 0.6);
flowing3.Play(left, 6, 2, "E3", velocity: 0.6);
flowing3.Play(left, 8, 2, "A2", velocity: 0.6);
flowing3.Play(left, 10, 2, "E3", velocity: 0.6);
flowing3.Play(left, 12, 2, "A3", velocity: 0.6);
flowing3.Play(left, 14, 2, "E3", velocity: 0.6);
// flowing3, bar 2
flowing3.Play(left, 16, 2, "D2", velocity: 0.6);
flowing3.Play(left, 18, 2, "F#3", velocity: 0.6);
flowing3.Play(left, 20, 2, "A3", velocity: 0.6);
flowing3.Play(left, 22, 2, "F#3", velocity: 0.6);
flowing3.Play(left, 24, 2, "D2", velocity: 0.6);
flowing3.Play(left, 26, 2, "F#3", velocity: 0.6);
flowing3.Play(left, 28, 2, "A3", velocity: 0.6);
flowing3.Play(left, 30, 2, "F#3", velocity: 0.6);
// flowing3, bar 3
flowing3.Play(left, 32, 2, "A2", velocity: 0.6);
flowing3.Play(left, 34, 2, "E3", velocity: 0.6);
flowing3.Play(left, 36, 2, "A3", velocity: 0.6);
flowing3.Play(left, 38, 2, "E3", velocity: 0.6);
flowing3.Play(left, 40, 2, "A2", velocity: 0.6);
flowing3.Play(left, 42, 2, "E3", velocity: 0.6);
flowing3.Play(left, 44, 2, "A3", velocity: 0.6);
flowing3.Play(left, 46, 2, "E3", velocity: 0.6);
// flowing3, bar 4
flowing3.Play(left, 48, 2, "A2", velocity: 0.6);
flowing3.Play(left, 50, 2, "E3", velocity: 0.6);
flowing3.Play(left, 52, 2, "A3", velocity: 0.6);
flowing3.Play(left, 54, 2, "E3", velocity: 0.6);
flowing3.Play(left, 56, 2, "A2", velocity: 0.6);
flowing3.Play(left, 58, 2, "E3", velocity: 0.6);
flowing3.Play(left, 60, 2, "A3", velocity: 0.6);
flowing3.Play(left, 62, 2, "E3", velocity: 0.6);

// Pattern flowing4
var flowing4 = song.Pattern(bars: 4);
flowing4.Play(right, 0, 4, "F#5");
flowing4.Play(right, 4, 4, "F#5");
flowing4.Play(right, 8, 4, "G5");
flowing4.Play(right, 12, 4, "A5");
// flowing4, bar 2
flowing4.Play(right, 16, 4, "A5");
flowing4.Play(right, 20, 4, "G5");
flowing4.Play(right, 24, 4, "F#5");
flowing4.Play(right, 28, 4, "E5");
// flowing4, bar 3
flowing4.Play(right, 32, 4, "D5");
flowing4.Play(right, 36, 4, "D5");
flowing4.Play(right, 40, 4, "E5");
flowing4.Play(right, 44, 4, "F#5");
// flowing4, bar 4
flowing4.Play(right, 48, 6, "E5");
flowing4.Play(right, 54, 2, "D5");
flowing4.Play(right, 56, 8, "D5");
flowing4.Play(left, 0, 2, "D2", velocity: 0.6);
flowing4.Play(left, 2, 2, "F#3", velocity: 0.6);
flowing4.Play(left, 4, 2, "A3", velocity: 0.6);
flowing4.Play(left, 6, 2, "F#3", velocity: 0.6);
flowing4.Play(left, 8, 2, "D2", velocity: 0.6);
flowing4.Play(left, 10, 2, "F#3", velocity: 0.6);
flowing4.Play(left, 12, 2, "A3", velocity: 0.6);
flowing4.Play(left, 14, 2, "F#3", velocity: 0.6);
// flowing4, bar 2
flowing4.Play(left, 16, 2, "A2", velocity: 0.6);
flowing4.Play(left, 18, 2, "E3", velocity: 0.6);
flowing4.Play(left, 20, 2, "A3", velocity: 0.6);
flowing4.Play(left, 22, 2, "E3", velocity: 0.6);
flowing4.Play(left, 24, 2, "A2", velocity: 0.6);
flowing4.Play(left, 26, 2, "E3", velocity: 0.6);
flowing4.Play(left, 28, 2, "A3", velocity: 0.6);
flowing4.Play(left, 30, 2, "E3", velocity: 0.6);
// flowing4, bar 3
flowing4.Play(left, 32, 2, "D2", velocity: 0.6);
flowing4.Play(left, 34, 2, "F#3", velocity: 0.6);
flowing4.Play(left, 36, 2, "A3", velocity: 0.6);
flowing4.Play(left, 38, 2, "F#3", velocity: 0.6);
flowing4.Play(left, 40, 2, "D2", velocity: 0.6);
flowing4.Play(left, 42, 2, "F#3", velocity: 0.6);
flowing4.Play(left, 44, 2, "A3", velocity: 0.6);
flowing4.Play(left, 46, 2, "F#3", velocity: 0.6);
// flowing4, bar 4
flowing4.Play(left, 48, 2, "D2", velocity: 0.6);
flowing4.Play(left, 50, 2, "F#3", velocity: 0.6);
flowing4.Play(left, 52, 2, "A3", velocity: 0.6);
flowing4.Play(left, 54, 2, "F#3", velocity: 0.6);
flowing4.Play(left, 56, 2, "D2", velocity: 0.6);
flowing4.Play(left, 58, 2, "F#3", velocity: 0.6);
flowing4.Play(left, 60, 2, "A3", velocity: 0.6);
flowing4.Play(left, 62, 2, "F#3", velocity: 0.6);

// Pattern full1
var full1 = song.Pattern(bars: 4);
full1.Play(right, 0, 4, "F#4 F#5");
full1.Play(right, 4, 4, "F#4 F#5");
full1.Play(right, 8, 4, "G4 G5");
full1.Play(right, 12, 4, "A4 A5");
// full1, bar 2
full1.Play(right, 16, 4, "A4 A5");
full1.Play(right, 20, 4, "G4 G5");
full1.Play(right, 24, 4, "F#4 F#5");
full1.Play(right, 28, 4, "E4 E5");
// full1, bar 3
full1.Play(right, 32, 4, "D4 D5");
full1.Play(right, 36, 4, "D4 D5");
full1.Play(right, 40, 4, "E4 E5");
full1.Play(right, 44, 4, "F#4 F#5");
// full1, bar 4
full1.Play(right, 48, 6, "F#4 F#5");
full1.Play(right, 54, 2, "E4 E5");
full1.Play(right, 56, 8, "E4 E5");
full1.Play(left, 0, 8, "F#3", velocity: 0.6);
full1.Play(left, 0, 16, "D2 D3", velocity: 0.6);
full1.Play(left, 8, 8, "A3", velocity: 0.6);
// full1, bar 2
full1.Play(left, 16, 8, "E3", velocity: 0.6);
full1.Play(left, 16, 16, "A2 A3", velocity: 0.6);
full1.Play(left, 24, 8, "A3", velocity: 0.6);
// full1, bar 3
full1.Play(left, 32, 8, "F#3", velocity: 0.6);
full1.Play(left, 32, 16, "D2 D3", velocity: 0.6);
full1.Play(left, 40, 8, "A3", velocity: 0.6);
// full1, bar 4
full1.Play(left, 48, 8, "E3", velocity: 0.6);
full1.Play(left, 48, 16, "A2 A3", velocity: 0.6);
full1.Play(left, 56, 8, "A3", velocity: 0.6);

// Pattern full2
var full2 = song.Pattern(bars: 4);
full2.Play(right, 0, 4, "F#4 F#5");
full2.Play(right, 4, 4, "F#4 F#5");
full2.Play(right, 8, 4, "G4 G5");
full2.Play(right, 12, 4, "A4 A5");
// full2, bar 2
full2.Play(right, 16, 4, "A4 A5");
full2.Play(right, 20, 4, "G4 G5");
full2.Play(right, 24, 4, "F#4 F#5");
full2.Play(right, 28, 4, "E4 E5");
// full2, bar 3
full2.Play(right, 32, 4, "D4 D5");
full2.Play(right, 36, 4, "D4 D5");
full2.Play(right, 40, 4, "E4 E5");
full2.Play(right, 44, 4, "F#4 F#5");
// full2, bar 4
full2.Play(right, 48, 6, "E4 E5");
full2.Play(right, 54, 2, "D4 D5");
full2.Play(right, 56, 8, "D4 D5");
full2.Play(left, 0, 8, "F#3", velocity: 0.6);
full2.Play(left, 0, 16, "D2 D3", velocity: 0.6);
full2.Play(left, 8, 8, "A3", velocity: 0.6);
// full2, bar 2
full2.Play(left, 16, 8, "E3", velocity: 0.6);
full2.Play(left, 16, 16, "A2 A3", velocity: 0.6);
full2.Play(left, 24, 8, "A3", velocity: 0.6);
// full2, bar 3
full2.Play(left, 32, 8, "F#3", velocity: 0.6);
full2.Play(left, 32, 16, "D2 D3", velocity: 0.6);
full2.Play(left, 40, 8, "A3", velocity: 0.6);
// full2, bar 4
full2.Play(left, 48, 8, "F#3", velocity: 0.6);
full2.Play(left, 48, 16, "D2 D3", velocity: 0.6);
full2.Play(left, 56, 8, "A3", velocity: 0.6);

// Pattern full3
var full3 = song.Pattern(bars: 4);
full3.Play(right, 0, 4, "E4 E5");
full3.Play(right, 4, 4, "E4 E5");
full3.Play(right, 8, 4, "F#4 F#5");
full3.Play(right, 12, 4, "D4 D5");
// full3, bar 2
full3.Play(right, 16, 4, "E4 E5");
full3.Play(right, 20, 2, "F#4 F#5");
full3.Play(right, 22, 2, "G4 G5");
full3.Play(right, 24, 4, "F#4 F#5");
full3.Play(right, 28, 4, "D4 D5");
// full3, bar 3
full3.Play(right, 32, 4, "E4 E5");
full3.Play(right, 36, 2, "F#4 F#5");
full3.Play(right, 38, 2, "G4 G5");
full3.Play(right, 40, 4, "F#4 F#5");
full3.Play(right, 44, 4, "E4 E5");
// full3, bar 4
full3.Play(right, 48, 4, "D4 D5");
full3.Play(right, 52, 4, "E4 E5");
full3.Play(right, 56, 8, "A3 A4");
full3.Play(left, 0, 8, "E3", velocity: 0.6);
full3.Play(left, 0, 16, "A2 A3", velocity: 0.6);
full3.Play(left, 8, 8, "A3", velocity: 0.6);
// full3, bar 2
full3.Play(left, 16, 8, "F#3", velocity: 0.6);
full3.Play(left, 16, 16, "D2 D3", velocity: 0.6);
full3.Play(left, 24, 8, "A3", velocity: 0.6);
// full3, bar 3
full3.Play(left, 32, 8, "E3", velocity: 0.6);
full3.Play(left, 32, 16, "A2 A3", velocity: 0.6);
full3.Play(left, 40, 8, "A3", velocity: 0.6);
// full3, bar 4
full3.Play(left, 48, 8, "E3", velocity: 0.6);
full3.Play(left, 48, 16, "A2 A3", velocity: 0.6);
full3.Play(left, 56, 8, "A3", velocity: 0.6);

// Pattern full4
var full4 = song.Pattern(bars: 4);
full4.Play(right, 0, 4, "F#4 F#5");
full4.Play(right, 4, 4, "F#4 F#5");
full4.Play(right, 8, 4, "G4 G5");
full4.Play(right, 12, 4, "A4 A5");
// full4, bar 2
full4.Play(right, 16, 4, "A4 A5");
full4.Play(right, 20, 4, "G4 G5");
full4.Play(right, 24, 4, "F#4 F#5");
full4.Play(right, 28, 4, "E4 E5");
// full4, bar 3
full4.Play(right, 32, 4, "D4 D5");
full4.Play(right, 36, 4, "D4 D5");
full4.Play(right, 40, 4, "E4 E5");
full4.Play(right, 44, 4, "F#4 F#5");
// full4, bar 4
full4.Play(right, 48, 6, "E4 E5");
full4.Play(right, 54, 2, "D4 D5");
full4.Play(right, 56, 8, "D4 D5");
full4.Play(left, 0, 8, "F#3", velocity: 0.6);
full4.Play(left, 0, 16, "D2 D3", velocity: 0.6);
full4.Play(left, 8, 8, "A3", velocity: 0.6);
// full4, bar 2
full4.Play(left, 16, 8, "E3", velocity: 0.6);
full4.Play(left, 16, 16, "A2 A3", velocity: 0.6);
full4.Play(left, 24, 8, "A3", velocity: 0.6);
// full4, bar 3
full4.Play(left, 32, 8, "F#3", velocity: 0.6);
full4.Play(left, 32, 16, "D2 D3", velocity: 0.6);
full4.Play(left, 40, 8, "A3", velocity: 0.6);
// full4, bar 4
full4.Play(left, 48, 8, "F#3", velocity: 0.6);
full4.Play(left, 48, 16, "D2 D3", velocity: 0.6);
full4.Play(left, 56, 8, "A3", velocity: 0.6);

// The arrangement: the patterns in the order they play (48 bars, 1:51)
song.Arrange(simple1, simple2, simple3, simple4, flowing1, flowing2, flowing3, flowing4,
    full1, full2, full3, full4);

// The master: volume, and how much reverb and delay come back
song.Volume = 1;
song.Reverb = 0.9;

song.Play();
