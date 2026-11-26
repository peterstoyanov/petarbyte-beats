// PetarByte Beats: this song, written as C# code.
// Channels are the sounds, patterns are a few bars each, the arrangement plays them in order.
var song = new Song(bpm: 52, swing: 0, key: "C major");

// Channels: one sound each, with its mixer settings below it
var right = song.Instrument(Instruments.GrandPiano);
right.Volume = 1;
right.Reverb = 0.35;
var left = song.Instrument(Instruments.GrandPiano);
left.Volume = 0.9;
left.Reverb = 0.35;

// Pattern chorale: Hits(drum, steps) with x = hit, X = loud, . = rest. Play(instrument, step, length, notes).
var chorale = song.Pattern(bars: 4);
chorale.Play(right, 0, 16, "E4 G4 C5");
// chorale, bar 2
chorale.Play(right, 16, 16, "F4 A4 C5");
// chorale, bar 3
chorale.Play(right, 32, 16, "D4 G4 B4");
// chorale, bar 4
chorale.Play(right, 48, 16, "E4 G4 C5");
chorale.Play(left, 0, 16, "C3 G3", velocity: 0.6);
// chorale, bar 2
chorale.Play(left, 16, 16, "F2 F3", velocity: 0.6);
// chorale, bar 3
chorale.Play(left, 32, 16, "G2 G3", velocity: 0.6);
// chorale, bar 4
chorale.Play(left, 48, 16, "C3 G3", velocity: 0.6);

// Pattern tune1
var tune1 = song.Pattern(bars: 4);
tune1.Play(right, 0, 6, "E4");
tune1.Play(right, 6, 2, "G4");
tune1.Play(right, 8, 8, "G4");
// tune1, bar 2
tune1.Play(right, 16, 6, "E4");
tune1.Play(right, 22, 2, "D4");
tune1.Play(right, 24, 8, "C4");
// tune1, bar 3
tune1.Play(right, 32, 4, "D4");
tune1.Play(right, 36, 4, "E4");
tune1.Play(right, 40, 4, "G4");
tune1.Play(right, 44, 4, "E4");
// tune1, bar 4
tune1.Play(right, 48, 16, "D4");
tune1.Play(left, 0, 8, "G3", velocity: 0.6);
tune1.Play(left, 0, 16, "C3", velocity: 0.6);
tune1.Play(left, 8, 8, "E3", velocity: 0.6);
// tune1, bar 2
tune1.Play(left, 16, 8, "A3", velocity: 0.6);
tune1.Play(left, 16, 16, "C3", velocity: 0.6);
tune1.Play(left, 24, 8, "G3", velocity: 0.6);
// tune1, bar 3
tune1.Play(left, 32, 8, "B3", velocity: 0.6);
tune1.Play(left, 32, 16, "G2", velocity: 0.6);
tune1.Play(left, 40, 8, "G3", velocity: 0.6);
// tune1, bar 4
tune1.Play(left, 48, 16, "G2 D3 G3", velocity: 0.6);

// Pattern tune2
var tune2 = song.Pattern(bars: 4);
tune2.Play(right, 0, 6, "E4");
tune2.Play(right, 6, 2, "G4");
tune2.Play(right, 8, 8, "G4");
// tune2, bar 2
tune2.Play(right, 16, 6, "E4");
tune2.Play(right, 22, 2, "D4");
tune2.Play(right, 24, 8, "C4");
// tune2, bar 3
tune2.Play(right, 32, 4, "D4");
tune2.Play(right, 36, 4, "E4");
tune2.Play(right, 40, 8, "D4");
// tune2, bar 4
tune2.Play(right, 48, 16, "C4");
tune2.Play(left, 0, 8, "G3", velocity: 0.6);
tune2.Play(left, 0, 16, "C3", velocity: 0.6);
tune2.Play(left, 8, 8, "E3", velocity: 0.6);
// tune2, bar 2
tune2.Play(left, 16, 8, "A3", velocity: 0.6);
tune2.Play(left, 16, 16, "F2", velocity: 0.6);
tune2.Play(left, 24, 8, "C3", velocity: 0.6);
// tune2, bar 3
tune2.Play(left, 32, 8, "B3", velocity: 0.6);
tune2.Play(left, 32, 16, "G2", velocity: 0.6);
tune2.Play(left, 40, 8, "F3", velocity: 0.6);
// tune2, bar 4
tune2.Play(left, 48, 16, "C3 E3 G3", velocity: 0.6);

// Pattern high1
var high1 = song.Pattern(bars: 4);
high1.Play(right, 0, 6, "E4", velocity: 0.5);
high1.Play(right, 0, 6, "E5");
high1.Play(right, 6, 2, "G4", velocity: 0.5);
high1.Play(right, 6, 2, "G5");
high1.Play(right, 8, 8, "G4", velocity: 0.5);
high1.Play(right, 8, 8, "G5");
// high1, bar 2
high1.Play(right, 16, 6, "E4", velocity: 0.5);
high1.Play(right, 16, 6, "E5");
high1.Play(right, 22, 2, "D4", velocity: 0.5);
high1.Play(right, 22, 2, "D5");
high1.Play(right, 24, 8, "C4", velocity: 0.5);
high1.Play(right, 24, 8, "C5");
// high1, bar 3
high1.Play(right, 32, 4, "D4", velocity: 0.5);
high1.Play(right, 32, 4, "D5");
high1.Play(right, 36, 4, "E4", velocity: 0.5);
high1.Play(right, 36, 4, "E5");
high1.Play(right, 40, 4, "G4", velocity: 0.5);
high1.Play(right, 40, 4, "G5");
high1.Play(right, 44, 4, "E4", velocity: 0.5);
high1.Play(right, 44, 4, "E5");
// high1, bar 4
high1.Play(right, 48, 16, "D4", velocity: 0.5);
high1.Play(right, 48, 16, "D5");
high1.Play(left, 0, 8, "G3", velocity: 0.6);
high1.Play(left, 0, 16, "C3", velocity: 0.6);
high1.Play(left, 8, 8, "E3", velocity: 0.6);
// high1, bar 2
high1.Play(left, 16, 8, "A3", velocity: 0.6);
high1.Play(left, 16, 16, "C3", velocity: 0.6);
high1.Play(left, 24, 8, "G3", velocity: 0.6);
// high1, bar 3
high1.Play(left, 32, 8, "B3", velocity: 0.6);
high1.Play(left, 32, 16, "G2", velocity: 0.6);
high1.Play(left, 40, 8, "G3", velocity: 0.6);
// high1, bar 4
high1.Play(left, 48, 16, "G2 D3 G3", velocity: 0.6);

// Pattern high2
var high2 = song.Pattern(bars: 4);
high2.Play(right, 0, 6, "E4", velocity: 0.5);
high2.Play(right, 0, 6, "E5");
high2.Play(right, 6, 2, "G4", velocity: 0.5);
high2.Play(right, 6, 2, "G5");
high2.Play(right, 8, 8, "G4", velocity: 0.5);
high2.Play(right, 8, 8, "G5");
// high2, bar 2
high2.Play(right, 16, 6, "E4", velocity: 0.5);
high2.Play(right, 16, 6, "E5");
high2.Play(right, 22, 2, "D4", velocity: 0.5);
high2.Play(right, 22, 2, "D5");
high2.Play(right, 24, 8, "C4", velocity: 0.5);
high2.Play(right, 24, 8, "C5");
// high2, bar 3
high2.Play(right, 32, 4, "D4", velocity: 0.5);
high2.Play(right, 32, 4, "D5");
high2.Play(right, 36, 4, "E4", velocity: 0.5);
high2.Play(right, 36, 4, "E5");
high2.Play(right, 40, 8, "D4", velocity: 0.5);
high2.Play(right, 40, 8, "D5");
// high2, bar 4
high2.Play(right, 48, 16, "C4", velocity: 0.5);
high2.Play(right, 48, 16, "C5");
high2.Play(left, 0, 8, "G3", velocity: 0.6);
high2.Play(left, 0, 16, "C3", velocity: 0.6);
high2.Play(left, 8, 8, "E3", velocity: 0.6);
// high2, bar 2
high2.Play(left, 16, 8, "A3", velocity: 0.6);
high2.Play(left, 16, 16, "F2", velocity: 0.6);
high2.Play(left, 24, 8, "C3", velocity: 0.6);
// high2, bar 3
high2.Play(left, 32, 8, "B3", velocity: 0.6);
high2.Play(left, 32, 16, "G2", velocity: 0.6);
high2.Play(left, 40, 8, "F3", velocity: 0.6);
// high2, bar 4
high2.Play(left, 48, 16, "C3 E3 G3", velocity: 0.6);

// The arrangement: the patterns in the order they play (24 bars, 1:51)
song.Arrange(chorale, tune1, tune2, high1, high2, chorale);

// The master: volume, and how much reverb and delay come back
song.Volume = 1;
song.Reverb = 0.9;

song.Play();
