// PetarByte Beats: this song, written as C# code.
// Channels are the sounds, patterns are a few bars each, the arrangement plays them in order.
var song = new Song(bpm: 66, swing: 0, key: "C major");

// Channels: one sound each, with its mixer settings below it
var right = song.Instrument(Instruments.GrandPiano);
right.Volume = 1;
right.Reverb = 0.35;
var left = song.Instrument(Instruments.GrandPiano);
left.Volume = 0.9;
left.Reverb = 0.35;

// Pattern prelude1: Hits(drum, steps) with x = hit, X = loud, . = rest. Play(instrument, step, length, notes).
var prelude1 = song.Pattern(bars: 4);
prelude1.Play(right, 2, 1, "G4");
prelude1.Play(right, 3, 1, "C5");
prelude1.Play(right, 4, 1, "E5");
prelude1.Play(right, 5, 1, "G4");
prelude1.Play(right, 6, 1, "C5");
prelude1.Play(right, 7, 1, "E5");
prelude1.Play(right, 10, 1, "G4");
prelude1.Play(right, 11, 1, "C5");
prelude1.Play(right, 12, 1, "E5");
prelude1.Play(right, 13, 1, "G4");
prelude1.Play(right, 14, 1, "C5");
prelude1.Play(right, 15, 1, "E5");
// prelude1, bar 2
prelude1.Play(right, 18, 1, "A4");
prelude1.Play(right, 19, 1, "D5");
prelude1.Play(right, 20, 1, "F5");
prelude1.Play(right, 21, 1, "A4");
prelude1.Play(right, 22, 1, "D5");
prelude1.Play(right, 23, 1, "F5");
prelude1.Play(right, 26, 1, "A4");
prelude1.Play(right, 27, 1, "D5");
prelude1.Play(right, 28, 1, "F5");
prelude1.Play(right, 29, 1, "A4");
prelude1.Play(right, 30, 1, "D5");
prelude1.Play(right, 31, 1, "F5");
// prelude1, bar 3
prelude1.Play(right, 34, 1, "G4");
prelude1.Play(right, 35, 1, "D5");
prelude1.Play(right, 36, 1, "F5");
prelude1.Play(right, 37, 1, "G4");
prelude1.Play(right, 38, 1, "D5");
prelude1.Play(right, 39, 1, "F5");
prelude1.Play(right, 42, 1, "G4");
prelude1.Play(right, 43, 1, "D5");
prelude1.Play(right, 44, 1, "F5");
prelude1.Play(right, 45, 1, "G4");
prelude1.Play(right, 46, 1, "D5");
prelude1.Play(right, 47, 1, "F5");
// prelude1, bar 4
prelude1.Play(right, 50, 1, "G4");
prelude1.Play(right, 51, 1, "C5");
prelude1.Play(right, 52, 1, "E5");
prelude1.Play(right, 53, 1, "G4");
prelude1.Play(right, 54, 1, "C5");
prelude1.Play(right, 55, 1, "E5");
prelude1.Play(right, 58, 1, "G4");
prelude1.Play(right, 59, 1, "C5");
prelude1.Play(right, 60, 1, "E5");
prelude1.Play(right, 61, 1, "G4");
prelude1.Play(right, 62, 1, "C5");
prelude1.Play(right, 63, 1, "E5");
prelude1.Play(left, 0, 8, "C4", velocity: 0.6);
prelude1.Play(left, 1, 7, "E4", velocity: 0.6);
prelude1.Play(left, 8, 8, "C4", velocity: 0.6);
prelude1.Play(left, 9, 7, "E4", velocity: 0.6);
// prelude1, bar 2
prelude1.Play(left, 16, 8, "C4", velocity: 0.6);
prelude1.Play(left, 17, 7, "D4", velocity: 0.6);
prelude1.Play(left, 24, 8, "C4", velocity: 0.6);
prelude1.Play(left, 25, 7, "D4", velocity: 0.6);
// prelude1, bar 3
prelude1.Play(left, 32, 8, "B3", velocity: 0.6);
prelude1.Play(left, 33, 7, "D4", velocity: 0.6);
prelude1.Play(left, 40, 8, "B3", velocity: 0.6);
prelude1.Play(left, 41, 7, "D4", velocity: 0.6);
// prelude1, bar 4
prelude1.Play(left, 48, 8, "C4", velocity: 0.6);
prelude1.Play(left, 49, 7, "E4", velocity: 0.6);
prelude1.Play(left, 56, 8, "C4", velocity: 0.6);
prelude1.Play(left, 57, 7, "E4", velocity: 0.6);

// Pattern prelude2
var prelude2 = song.Pattern(bars: 4);
prelude2.Play(right, 2, 1, "A4");
prelude2.Play(right, 3, 1, "E5");
prelude2.Play(right, 4, 1, "A5");
prelude2.Play(right, 5, 1, "A4");
prelude2.Play(right, 6, 1, "E5");
prelude2.Play(right, 7, 1, "A5");
prelude2.Play(right, 10, 1, "A4");
prelude2.Play(right, 11, 1, "E5");
prelude2.Play(right, 12, 1, "A5");
prelude2.Play(right, 13, 1, "A4");
prelude2.Play(right, 14, 1, "E5");
prelude2.Play(right, 15, 1, "A5");
// prelude2, bar 2
prelude2.Play(right, 18, 1, "F#4");
prelude2.Play(right, 19, 1, "A4");
prelude2.Play(right, 20, 1, "D5");
prelude2.Play(right, 21, 1, "F#4");
prelude2.Play(right, 22, 1, "A4");
prelude2.Play(right, 23, 1, "D5");
prelude2.Play(right, 26, 1, "F#4");
prelude2.Play(right, 27, 1, "A4");
prelude2.Play(right, 28, 1, "D5");
prelude2.Play(right, 29, 1, "F#4");
prelude2.Play(right, 30, 1, "A4");
prelude2.Play(right, 31, 1, "D5");
// prelude2, bar 3
prelude2.Play(right, 34, 1, "G4");
prelude2.Play(right, 35, 1, "D5");
prelude2.Play(right, 36, 1, "G5");
prelude2.Play(right, 37, 1, "G4");
prelude2.Play(right, 38, 1, "D5");
prelude2.Play(right, 39, 1, "G5");
prelude2.Play(right, 42, 1, "G4");
prelude2.Play(right, 43, 1, "D5");
prelude2.Play(right, 44, 1, "G5");
prelude2.Play(right, 45, 1, "G4");
prelude2.Play(right, 46, 1, "D5");
prelude2.Play(right, 47, 1, "G5");
// prelude2, bar 4
prelude2.Play(right, 50, 1, "E4");
prelude2.Play(right, 51, 1, "G4");
prelude2.Play(right, 52, 1, "C5");
prelude2.Play(right, 53, 1, "E4");
prelude2.Play(right, 54, 1, "G4");
prelude2.Play(right, 55, 1, "C5");
prelude2.Play(right, 58, 1, "E4");
prelude2.Play(right, 59, 1, "G4");
prelude2.Play(right, 60, 1, "C5");
prelude2.Play(right, 61, 1, "E4");
prelude2.Play(right, 62, 1, "G4");
prelude2.Play(right, 63, 1, "C5");
prelude2.Play(left, 0, 8, "C4", velocity: 0.6);
prelude2.Play(left, 1, 7, "E4", velocity: 0.6);
prelude2.Play(left, 8, 8, "C4", velocity: 0.6);
prelude2.Play(left, 9, 7, "E4", velocity: 0.6);
// prelude2, bar 2
prelude2.Play(left, 16, 8, "C4", velocity: 0.6);
prelude2.Play(left, 17, 7, "D4", velocity: 0.6);
prelude2.Play(left, 24, 8, "C4", velocity: 0.6);
prelude2.Play(left, 25, 7, "D4", velocity: 0.6);
// prelude2, bar 3
prelude2.Play(left, 32, 8, "B3", velocity: 0.6);
prelude2.Play(left, 33, 7, "D4", velocity: 0.6);
prelude2.Play(left, 40, 8, "B3", velocity: 0.6);
prelude2.Play(left, 41, 7, "D4", velocity: 0.6);
// prelude2, bar 4
prelude2.Play(left, 48, 8, "B3", velocity: 0.6);
prelude2.Play(left, 49, 7, "C4", velocity: 0.6);
prelude2.Play(left, 56, 8, "B3", velocity: 0.6);
prelude2.Play(left, 57, 7, "C4", velocity: 0.6);

// Pattern prelude3
var prelude3 = song.Pattern(bars: 4);
prelude3.Play(right, 2, 1, "E4");
prelude3.Play(right, 3, 1, "G4");
prelude3.Play(right, 4, 1, "C5");
prelude3.Play(right, 5, 1, "E4");
prelude3.Play(right, 6, 1, "G4");
prelude3.Play(right, 7, 1, "C5");
prelude3.Play(right, 10, 1, "E4");
prelude3.Play(right, 11, 1, "G4");
prelude3.Play(right, 12, 1, "C5");
prelude3.Play(right, 13, 1, "E4");
prelude3.Play(right, 14, 1, "G4");
prelude3.Play(right, 15, 1, "C5");
// prelude3, bar 2
prelude3.Play(right, 18, 1, "D4");
prelude3.Play(right, 19, 1, "F#4");
prelude3.Play(right, 20, 1, "C5");
prelude3.Play(right, 21, 1, "D4");
prelude3.Play(right, 22, 1, "F#4");
prelude3.Play(right, 23, 1, "C5");
prelude3.Play(right, 26, 1, "D4");
prelude3.Play(right, 27, 1, "F#4");
prelude3.Play(right, 28, 1, "C5");
prelude3.Play(right, 29, 1, "D4");
prelude3.Play(right, 30, 1, "F#4");
prelude3.Play(right, 31, 1, "C5");
// prelude3, bar 3
prelude3.Play(right, 34, 1, "D4");
prelude3.Play(right, 35, 1, "G4");
prelude3.Play(right, 36, 1, "B4");
prelude3.Play(right, 37, 1, "D4");
prelude3.Play(right, 38, 1, "G4");
prelude3.Play(right, 39, 1, "B4");
prelude3.Play(right, 42, 1, "D4");
prelude3.Play(right, 43, 1, "G4");
prelude3.Play(right, 44, 1, "B4");
prelude3.Play(right, 45, 1, "D4");
prelude3.Play(right, 46, 1, "G4");
prelude3.Play(right, 47, 1, "B4");
// prelude3, bar 4
prelude3.Play(right, 50, 1, "E4");
prelude3.Play(right, 51, 1, "G4");
prelude3.Play(right, 52, 1, "C#5");
prelude3.Play(right, 53, 1, "E4");
prelude3.Play(right, 54, 1, "G4");
prelude3.Play(right, 55, 1, "C#5");
prelude3.Play(right, 58, 1, "E4");
prelude3.Play(right, 59, 1, "G4");
prelude3.Play(right, 60, 1, "C#5");
prelude3.Play(right, 61, 1, "E4");
prelude3.Play(right, 62, 1, "G4");
prelude3.Play(right, 63, 1, "C#5");
prelude3.Play(left, 0, 8, "A3", velocity: 0.6);
prelude3.Play(left, 1, 7, "C4", velocity: 0.6);
prelude3.Play(left, 8, 8, "A3", velocity: 0.6);
prelude3.Play(left, 9, 7, "C4", velocity: 0.6);
// prelude3, bar 2
prelude3.Play(left, 16, 8, "D3", velocity: 0.6);
prelude3.Play(left, 17, 7, "A3", velocity: 0.6);
prelude3.Play(left, 24, 8, "D3", velocity: 0.6);
prelude3.Play(left, 25, 7, "A3", velocity: 0.6);
// prelude3, bar 3
prelude3.Play(left, 32, 8, "G3", velocity: 0.6);
prelude3.Play(left, 33, 7, "B3", velocity: 0.6);
prelude3.Play(left, 40, 8, "G3", velocity: 0.6);
prelude3.Play(left, 41, 7, "B3", velocity: 0.6);
// prelude3, bar 4
prelude3.Play(left, 48, 8, "G3", velocity: 0.6);
prelude3.Play(left, 49, 7, "A#3", velocity: 0.6);
prelude3.Play(left, 56, 8, "G3", velocity: 0.6);
prelude3.Play(left, 57, 7, "A#3", velocity: 0.6);

// Pattern prelude4
var prelude4 = song.Pattern(bars: 4);
prelude4.Play(right, 2, 1, "D4");
prelude4.Play(right, 3, 1, "A4");
prelude4.Play(right, 4, 1, "D5");
prelude4.Play(right, 5, 1, "D4");
prelude4.Play(right, 6, 1, "A4");
prelude4.Play(right, 7, 1, "D5");
prelude4.Play(right, 10, 1, "D4");
prelude4.Play(right, 11, 1, "A4");
prelude4.Play(right, 12, 1, "D5");
prelude4.Play(right, 13, 1, "D4");
prelude4.Play(right, 14, 1, "A4");
prelude4.Play(right, 15, 1, "D5");
// prelude4, bar 2
prelude4.Play(right, 18, 1, "D4");
prelude4.Play(right, 19, 1, "F4");
prelude4.Play(right, 20, 1, "B4");
prelude4.Play(right, 21, 1, "D4");
prelude4.Play(right, 22, 1, "F4");
prelude4.Play(right, 23, 1, "B4");
prelude4.Play(right, 26, 1, "D4");
prelude4.Play(right, 27, 1, "F4");
prelude4.Play(right, 28, 1, "B4");
prelude4.Play(right, 29, 1, "D4");
prelude4.Play(right, 30, 1, "F4");
prelude4.Play(right, 31, 1, "B4");
// prelude4, bar 3
prelude4.Play(right, 34, 1, "C4");
prelude4.Play(right, 35, 1, "G4");
prelude4.Play(right, 36, 1, "C5");
prelude4.Play(right, 37, 1, "C4");
prelude4.Play(right, 38, 1, "G4");
prelude4.Play(right, 39, 1, "C5");
prelude4.Play(right, 42, 1, "C4");
prelude4.Play(right, 43, 1, "G4");
prelude4.Play(right, 44, 1, "C5");
prelude4.Play(right, 45, 1, "C4");
prelude4.Play(right, 46, 1, "G4");
prelude4.Play(right, 47, 1, "C5");
// prelude4, bar 4
prelude4.Play(right, 50, 1, "A3");
prelude4.Play(right, 51, 1, "C4");
prelude4.Play(right, 52, 1, "F4");
prelude4.Play(right, 53, 1, "A3");
prelude4.Play(right, 54, 1, "C4");
prelude4.Play(right, 55, 1, "F4");
prelude4.Play(right, 58, 1, "A3");
prelude4.Play(right, 59, 1, "C4");
prelude4.Play(right, 60, 1, "F4");
prelude4.Play(right, 61, 1, "A3");
prelude4.Play(right, 62, 1, "C4");
prelude4.Play(right, 63, 1, "F4");
prelude4.Play(left, 0, 8, "F3", velocity: 0.6);
prelude4.Play(left, 1, 7, "A3", velocity: 0.6);
prelude4.Play(left, 8, 8, "F3", velocity: 0.6);
prelude4.Play(left, 9, 7, "A3", velocity: 0.6);
// prelude4, bar 2
prelude4.Play(left, 16, 8, "F3", velocity: 0.6);
prelude4.Play(left, 17, 7, "G#3", velocity: 0.6);
prelude4.Play(left, 24, 8, "F3", velocity: 0.6);
prelude4.Play(left, 25, 7, "G#3", velocity: 0.6);
// prelude4, bar 3
prelude4.Play(left, 32, 8, "E3", velocity: 0.6);
prelude4.Play(left, 33, 7, "G3", velocity: 0.6);
prelude4.Play(left, 40, 8, "E3", velocity: 0.6);
prelude4.Play(left, 41, 7, "G3", velocity: 0.6);
// prelude4, bar 4
prelude4.Play(left, 48, 8, "E3", velocity: 0.6);
prelude4.Play(left, 49, 7, "F3", velocity: 0.6);
prelude4.Play(left, 56, 8, "E3", velocity: 0.6);
prelude4.Play(left, 57, 7, "F3", velocity: 0.6);

// Pattern prelude5
var prelude5 = song.Pattern(bars: 4);
prelude5.Play(right, 2, 1, "A3");
prelude5.Play(right, 3, 1, "C4");
prelude5.Play(right, 4, 1, "F4");
prelude5.Play(right, 5, 1, "A3");
prelude5.Play(right, 6, 1, "C4");
prelude5.Play(right, 7, 1, "F4");
prelude5.Play(right, 10, 1, "A3");
prelude5.Play(right, 11, 1, "C4");
prelude5.Play(right, 12, 1, "F4");
prelude5.Play(right, 13, 1, "A3");
prelude5.Play(right, 14, 1, "C4");
prelude5.Play(right, 15, 1, "F4");
// prelude5, bar 2
prelude5.Play(right, 18, 1, "G3");
prelude5.Play(right, 19, 1, "B3");
prelude5.Play(right, 20, 1, "F4");
prelude5.Play(right, 21, 1, "G3");
prelude5.Play(right, 22, 1, "B3");
prelude5.Play(right, 23, 1, "F4");
prelude5.Play(right, 26, 1, "G3");
prelude5.Play(right, 27, 1, "B3");
prelude5.Play(right, 28, 1, "F4");
prelude5.Play(right, 29, 1, "G3");
prelude5.Play(right, 30, 1, "B3");
prelude5.Play(right, 31, 1, "F4");
// prelude5, bar 3
prelude5.Play(right, 34, 1, "G3");
prelude5.Play(right, 35, 1, "C4");
prelude5.Play(right, 36, 1, "E4");
prelude5.Play(right, 37, 1, "G3");
prelude5.Play(right, 38, 1, "C4");
prelude5.Play(right, 39, 1, "E4");
prelude5.Play(right, 42, 1, "G3");
prelude5.Play(right, 43, 1, "C4");
prelude5.Play(right, 44, 1, "E4");
prelude5.Play(right, 45, 1, "G3");
prelude5.Play(right, 46, 1, "C4");
prelude5.Play(right, 47, 1, "E4");
// prelude5, bar 4
prelude5.Play(right, 50, 1, "A#3");
prelude5.Play(right, 51, 1, "C4");
prelude5.Play(right, 52, 1, "E4");
prelude5.Play(right, 53, 1, "A#3");
prelude5.Play(right, 54, 1, "C4");
prelude5.Play(right, 55, 1, "E4");
prelude5.Play(right, 58, 1, "A#3");
prelude5.Play(right, 59, 1, "C4");
prelude5.Play(right, 60, 1, "E4");
prelude5.Play(right, 61, 1, "A#3");
prelude5.Play(right, 62, 1, "C4");
prelude5.Play(right, 63, 1, "E4");
prelude5.Play(left, 0, 8, "D3", velocity: 0.6);
prelude5.Play(left, 1, 7, "F3", velocity: 0.6);
prelude5.Play(left, 8, 8, "D3", velocity: 0.6);
prelude5.Play(left, 9, 7, "F3", velocity: 0.6);
// prelude5, bar 2
prelude5.Play(left, 16, 8, "G2", velocity: 0.6);
prelude5.Play(left, 17, 7, "D3", velocity: 0.6);
prelude5.Play(left, 24, 8, "G2", velocity: 0.6);
prelude5.Play(left, 25, 7, "D3", velocity: 0.6);
// prelude5, bar 3
prelude5.Play(left, 32, 8, "C3", velocity: 0.6);
prelude5.Play(left, 33, 7, "E3", velocity: 0.6);
prelude5.Play(left, 40, 8, "C3", velocity: 0.6);
prelude5.Play(left, 41, 7, "E3", velocity: 0.6);
// prelude5, bar 4
prelude5.Play(left, 48, 8, "C3", velocity: 0.6);
prelude5.Play(left, 49, 7, "G3", velocity: 0.6);
prelude5.Play(left, 56, 8, "C3", velocity: 0.6);
prelude5.Play(left, 57, 7, "G3", velocity: 0.6);

// Pattern prelude6
var prelude6 = song.Pattern(bars: 4);
prelude6.Play(right, 2, 1, "A3");
prelude6.Play(right, 3, 1, "C4");
prelude6.Play(right, 4, 1, "E4");
prelude6.Play(right, 5, 1, "A3");
prelude6.Play(right, 6, 1, "C4");
prelude6.Play(right, 7, 1, "E4");
prelude6.Play(right, 10, 1, "A3");
prelude6.Play(right, 11, 1, "C4");
prelude6.Play(right, 12, 1, "E4");
prelude6.Play(right, 13, 1, "A3");
prelude6.Play(right, 14, 1, "C4");
prelude6.Play(right, 15, 1, "E4");
// prelude6, bar 2
prelude6.Play(right, 18, 1, "A3");
prelude6.Play(right, 19, 1, "C4");
prelude6.Play(right, 20, 1, "D#4");
prelude6.Play(right, 21, 1, "A3");
prelude6.Play(right, 22, 1, "C4");
prelude6.Play(right, 23, 1, "D#4");
prelude6.Play(right, 26, 1, "A3");
prelude6.Play(right, 27, 1, "C4");
prelude6.Play(right, 28, 1, "D#4");
prelude6.Play(right, 29, 1, "A3");
prelude6.Play(right, 30, 1, "C4");
prelude6.Play(right, 31, 1, "D#4");
// prelude6, bar 3
prelude6.Play(right, 34, 1, "B3");
prelude6.Play(right, 35, 1, "C4");
prelude6.Play(right, 36, 1, "D4");
prelude6.Play(right, 37, 1, "B3");
prelude6.Play(right, 38, 1, "C4");
prelude6.Play(right, 39, 1, "D4");
prelude6.Play(right, 42, 1, "B3");
prelude6.Play(right, 43, 1, "C4");
prelude6.Play(right, 44, 1, "D4");
prelude6.Play(right, 45, 1, "B3");
prelude6.Play(right, 46, 1, "C4");
prelude6.Play(right, 47, 1, "D4");
// prelude6, bar 4
prelude6.Play(right, 50, 1, "G3");
prelude6.Play(right, 51, 1, "B3");
prelude6.Play(right, 52, 1, "D4");
prelude6.Play(right, 53, 1, "G3");
prelude6.Play(right, 54, 1, "B3");
prelude6.Play(right, 55, 1, "D4");
prelude6.Play(right, 58, 1, "G3");
prelude6.Play(right, 59, 1, "B3");
prelude6.Play(right, 60, 1, "D4");
prelude6.Play(right, 61, 1, "G3");
prelude6.Play(right, 62, 1, "B3");
prelude6.Play(right, 63, 1, "D4");
prelude6.Play(left, 0, 8, "F2", velocity: 0.6);
prelude6.Play(left, 1, 7, "F3", velocity: 0.6);
prelude6.Play(left, 8, 8, "F2", velocity: 0.6);
prelude6.Play(left, 9, 7, "F3", velocity: 0.6);
// prelude6, bar 2
prelude6.Play(left, 16, 8, "F#2", velocity: 0.6);
prelude6.Play(left, 17, 7, "C3", velocity: 0.6);
prelude6.Play(left, 24, 8, "F#2", velocity: 0.6);
prelude6.Play(left, 25, 7, "C3", velocity: 0.6);
// prelude6, bar 3
prelude6.Play(left, 32, 8, "G#2", velocity: 0.6);
prelude6.Play(left, 33, 7, "F3", velocity: 0.6);
prelude6.Play(left, 40, 8, "G#2", velocity: 0.6);
prelude6.Play(left, 41, 7, "F3", velocity: 0.6);
// prelude6, bar 4
prelude6.Play(left, 48, 8, "G2", velocity: 0.6);
prelude6.Play(left, 49, 7, "F3", velocity: 0.6);
prelude6.Play(left, 56, 8, "G2", velocity: 0.6);
prelude6.Play(left, 57, 7, "F3", velocity: 0.6);

// Pattern prelude7
var prelude7 = song.Pattern(bars: 4);
prelude7.Play(right, 2, 1, "G3");
prelude7.Play(right, 3, 1, "C4");
prelude7.Play(right, 4, 1, "E4");
prelude7.Play(right, 5, 1, "G3");
prelude7.Play(right, 6, 1, "C4");
prelude7.Play(right, 7, 1, "E4");
prelude7.Play(right, 10, 1, "G3");
prelude7.Play(right, 11, 1, "C4");
prelude7.Play(right, 12, 1, "E4");
prelude7.Play(right, 13, 1, "G3");
prelude7.Play(right, 14, 1, "C4");
prelude7.Play(right, 15, 1, "E4");
// prelude7, bar 2
prelude7.Play(right, 18, 1, "G3");
prelude7.Play(right, 19, 1, "C4");
prelude7.Play(right, 20, 1, "F4");
prelude7.Play(right, 21, 1, "G3");
prelude7.Play(right, 22, 1, "C4");
prelude7.Play(right, 23, 1, "F4");
prelude7.Play(right, 26, 1, "G3");
prelude7.Play(right, 27, 1, "C4");
prelude7.Play(right, 28, 1, "F4");
prelude7.Play(right, 29, 1, "G3");
prelude7.Play(right, 30, 1, "C4");
prelude7.Play(right, 31, 1, "F4");
// prelude7, bar 3
prelude7.Play(right, 34, 1, "G3");
prelude7.Play(right, 35, 1, "B3");
prelude7.Play(right, 36, 1, "F4");
prelude7.Play(right, 37, 1, "G3");
prelude7.Play(right, 38, 1, "B3");
prelude7.Play(right, 39, 1, "F4");
prelude7.Play(right, 42, 1, "G3");
prelude7.Play(right, 43, 1, "B3");
prelude7.Play(right, 44, 1, "F4");
prelude7.Play(right, 45, 1, "G3");
prelude7.Play(right, 46, 1, "B3");
prelude7.Play(right, 47, 1, "F4");
// prelude7, bar 4
prelude7.Play(right, 50, 1, "A3");
prelude7.Play(right, 51, 1, "C4");
prelude7.Play(right, 52, 1, "F#4");
prelude7.Play(right, 53, 1, "A3");
prelude7.Play(right, 54, 1, "C4");
prelude7.Play(right, 55, 1, "F#4");
prelude7.Play(right, 58, 1, "A3");
prelude7.Play(right, 59, 1, "C4");
prelude7.Play(right, 60, 1, "F#4");
prelude7.Play(right, 61, 1, "A3");
prelude7.Play(right, 62, 1, "C4");
prelude7.Play(right, 63, 1, "F#4");
prelude7.Play(left, 0, 8, "G2", velocity: 0.6);
prelude7.Play(left, 1, 7, "E3", velocity: 0.6);
prelude7.Play(left, 8, 8, "G2", velocity: 0.6);
prelude7.Play(left, 9, 7, "E3", velocity: 0.6);
// prelude7, bar 2
prelude7.Play(left, 16, 8, "G2", velocity: 0.6);
prelude7.Play(left, 17, 7, "D3", velocity: 0.6);
prelude7.Play(left, 24, 8, "G2", velocity: 0.6);
prelude7.Play(left, 25, 7, "D3", velocity: 0.6);
// prelude7, bar 3
prelude7.Play(left, 32, 8, "G2", velocity: 0.6);
prelude7.Play(left, 33, 7, "D3", velocity: 0.6);
prelude7.Play(left, 40, 8, "G2", velocity: 0.6);
prelude7.Play(left, 41, 7, "D3", velocity: 0.6);
// prelude7, bar 4
prelude7.Play(left, 48, 8, "G2", velocity: 0.6);
prelude7.Play(left, 49, 7, "D#3", velocity: 0.6);
prelude7.Play(left, 56, 8, "G2", velocity: 0.6);
prelude7.Play(left, 57, 7, "D#3", velocity: 0.6);

// Pattern prelude8
var prelude8 = song.Pattern(bars: 4);
prelude8.Play(right, 2, 1, "G3");
prelude8.Play(right, 3, 1, "C4");
prelude8.Play(right, 4, 1, "G4");
prelude8.Play(right, 5, 1, "G3");
prelude8.Play(right, 6, 1, "C4");
prelude8.Play(right, 7, 1, "G4");
prelude8.Play(right, 10, 1, "G3");
prelude8.Play(right, 11, 1, "C4");
prelude8.Play(right, 12, 1, "G4");
prelude8.Play(right, 13, 1, "G3");
prelude8.Play(right, 14, 1, "C4");
prelude8.Play(right, 15, 1, "G4");
// prelude8, bar 2
prelude8.Play(right, 18, 1, "G3");
prelude8.Play(right, 19, 1, "C4");
prelude8.Play(right, 20, 1, "F4");
prelude8.Play(right, 21, 1, "G3");
prelude8.Play(right, 22, 1, "C4");
prelude8.Play(right, 23, 1, "F4");
prelude8.Play(right, 26, 1, "G3");
prelude8.Play(right, 27, 1, "C4");
prelude8.Play(right, 28, 1, "F4");
prelude8.Play(right, 29, 1, "G3");
prelude8.Play(right, 30, 1, "C4");
prelude8.Play(right, 31, 1, "F4");
// prelude8, bar 3
prelude8.Play(right, 34, 1, "G3");
prelude8.Play(right, 35, 1, "B3");
prelude8.Play(right, 36, 1, "F4");
prelude8.Play(right, 37, 1, "G3");
prelude8.Play(right, 38, 1, "B3");
prelude8.Play(right, 39, 1, "F4");
prelude8.Play(right, 42, 1, "G3");
prelude8.Play(right, 43, 1, "B3");
prelude8.Play(right, 44, 1, "F4");
prelude8.Play(right, 45, 1, "G3");
prelude8.Play(right, 46, 1, "B3");
prelude8.Play(right, 47, 1, "F4");
// prelude8, bar 4
prelude8.Play(right, 50, 1, "G3");
prelude8.Play(right, 51, 1, "A#3");
prelude8.Play(right, 52, 1, "E4");
prelude8.Play(right, 53, 1, "G3");
prelude8.Play(right, 54, 1, "A#3");
prelude8.Play(right, 55, 1, "E4");
prelude8.Play(right, 58, 1, "G3");
prelude8.Play(right, 59, 1, "A#3");
prelude8.Play(right, 60, 1, "E4");
prelude8.Play(right, 61, 1, "G3");
prelude8.Play(right, 62, 1, "A#3");
prelude8.Play(right, 63, 1, "E4");
prelude8.Play(left, 0, 8, "G2", velocity: 0.6);
prelude8.Play(left, 1, 7, "E3", velocity: 0.6);
prelude8.Play(left, 8, 8, "G2", velocity: 0.6);
prelude8.Play(left, 9, 7, "E3", velocity: 0.6);
// prelude8, bar 2
prelude8.Play(left, 16, 8, "G2", velocity: 0.6);
prelude8.Play(left, 17, 7, "D3", velocity: 0.6);
prelude8.Play(left, 24, 8, "G2", velocity: 0.6);
prelude8.Play(left, 25, 7, "D3", velocity: 0.6);
// prelude8, bar 3
prelude8.Play(left, 32, 8, "G2", velocity: 0.6);
prelude8.Play(left, 33, 7, "D3", velocity: 0.6);
prelude8.Play(left, 40, 8, "G2", velocity: 0.6);
prelude8.Play(left, 41, 7, "D3", velocity: 0.6);
// prelude8, bar 4
prelude8.Play(left, 48, 8, "C2", velocity: 0.6);
prelude8.Play(left, 49, 7, "C3", velocity: 0.6);
prelude8.Play(left, 56, 8, "C2", velocity: 0.6);
prelude8.Play(left, 57, 7, "C3", velocity: 0.6);

// Pattern prelude9
var prelude9 = song.Pattern(bars: 4);
prelude9.Play(right, 2, 1, "F3");
prelude9.Play(right, 3, 1, "A3");
prelude9.Play(right, 4, 1, "C4");
prelude9.Play(right, 5, 1, "F4");
prelude9.Play(right, 6, 1, "C4");
prelude9.Play(right, 7, 1, "A3");
prelude9.Play(right, 8, 1, "C4");
prelude9.Play(right, 9, 1, "A3");
prelude9.Play(right, 10, 1, "F3");
prelude9.Play(right, 11, 1, "A3");
prelude9.Play(right, 12, 1, "F3");
prelude9.Play(right, 13, 1, "D3");
prelude9.Play(right, 14, 1, "F3");
prelude9.Play(right, 15, 1, "D3");
// prelude9, bar 2
prelude9.Play(right, 18, 1, "G4");
prelude9.Play(right, 19, 1, "B4");
prelude9.Play(right, 20, 1, "D5");
prelude9.Play(right, 21, 1, "F5");
prelude9.Play(right, 22, 1, "D5");
prelude9.Play(right, 23, 1, "B4");
prelude9.Play(right, 24, 1, "D5");
prelude9.Play(right, 25, 1, "B4");
prelude9.Play(right, 26, 1, "G4");
prelude9.Play(right, 27, 1, "B4");
prelude9.Play(right, 28, 1, "D4");
prelude9.Play(right, 29, 1, "F4");
prelude9.Play(right, 30, 1, "E4");
prelude9.Play(right, 31, 1, "D4");
// prelude9, bar 3
prelude9.Play(right, 32, 16, "E4 G4 C5");
prelude9.Play(left, 0, 16, "C2", velocity: 0.6);
prelude9.Play(left, 1, 15, "C3", velocity: 0.6);
// prelude9, bar 2
prelude9.Play(left, 16, 16, "C2", velocity: 0.6);
prelude9.Play(left, 17, 15, "B2", velocity: 0.6);
// prelude9, bar 3
prelude9.Play(left, 32, 16, "C2 C3", velocity: 0.6);

// The arrangement: the patterns in the order they play (36 bars, 2:11)
song.Arrange(prelude1, prelude2, prelude3, prelude4, prelude5, prelude6, prelude7, prelude8,
    prelude9);

// The master: volume, and how much reverb and delay come back
song.Volume = 1;
song.Reverb = 0.9;

song.Play();
