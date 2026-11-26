// PetarByte Beats: this song, written as C# code.
// Channels are the sounds, patterns are a few bars each, the arrangement plays them in order.
var song = new Song(bpm: 80, swing: 0, key: "C major");

// Channels: one sound each, with its mixer settings below it
var right = song.Instrument(Instruments.GrandPiano);
right.Volume = 1;
right.Reverb = 0.35;
var left = song.Instrument(Instruments.GrandPiano);
left.Volume = 0.9;
left.Reverb = 0.35;

// Pattern intro: Hits(drum, steps) with x = hit, X = loud, . = rest. Play(instrument, step, length, notes).
var intro = song.Pattern(bars: 3);
// intro, bar 3
intro.Play(right, 44, 2, "E4");
intro.Play(right, 46, 2, "E4");
// intro, bar 3
intro.Play(left, 36, 12, "C3 G3", velocity: 0.6);

// Pattern first1
var first1 = song.Pattern(bars: 3);
first1.Play(right, 0, 8, "G4");
first1.Play(right, 8, 2, "E4");
first1.Play(right, 10, 2, "E4");
first1.Play(right, 12, 8, "G4");
// first1, bar 2
first1.Play(right, 20, 2, "E4");
first1.Play(right, 22, 2, "G4");
first1.Play(right, 24, 4, "C5");
first1.Play(right, 28, 4, "B4");
// first1, bar 3
first1.Play(right, 32, 4, "A4");
first1.Play(right, 36, 4, "A4");
first1.Play(right, 40, 4, "G4");
first1.Play(right, 44, 2, "D4");
first1.Play(right, 46, 2, "E4");
first1.Play(left, 0, 12, "C3", velocity: 0.6);
first1.Play(left, 4, 8, "G3 E4", velocity: 0.6);
first1.Play(left, 12, 12, "C3", velocity: 0.6);
// first1, bar 2
first1.Play(left, 16, 8, "G3 E4", velocity: 0.6);
first1.Play(left, 24, 12, "F2", velocity: 0.6);
first1.Play(left, 28, 8, "C3 A3", velocity: 0.6);
// first1, bar 3
first1.Play(left, 36, 12, "C3", velocity: 0.6);
first1.Play(left, 40, 8, "G3 E4", velocity: 0.6);

// Pattern first2
var first2 = song.Pattern(bars: 3);
first2.Play(right, 0, 4, "F4");
first2.Play(right, 4, 4, "D4");
first2.Play(right, 8, 2, "D4");
first2.Play(right, 10, 2, "E4");
first2.Play(right, 12, 8, "F4");
// first2, bar 2
first2.Play(right, 20, 2, "D4");
first2.Play(right, 22, 2, "F4");
first2.Play(right, 24, 2, "B4");
first2.Play(right, 26, 2, "A4");
first2.Play(right, 28, 4, "G4");
// first2, bar 3
first2.Play(right, 32, 4, "B4");
first2.Play(right, 36, 8, "C5");
first2.Play(right, 44, 2, "C4");
first2.Play(right, 46, 2, "C4");
first2.Play(left, 0, 12, "G2", velocity: 0.6);
first2.Play(left, 4, 8, "D3 B3", velocity: 0.6);
first2.Play(left, 12, 12, "G2", velocity: 0.6);
// first2, bar 2
first2.Play(left, 16, 8, "D3 B3", velocity: 0.6);
first2.Play(left, 24, 12, "G2", velocity: 0.6);
first2.Play(left, 28, 8, "D3 B3", velocity: 0.6);
// first2, bar 3
first2.Play(left, 36, 12, "C3", velocity: 0.6);
first2.Play(left, 40, 8, "G3 E4", velocity: 0.6);

// Pattern first3
var first3 = song.Pattern(bars: 3);
first3.Play(right, 0, 8, "C5");
first3.Play(right, 8, 2, "A4");
first3.Play(right, 10, 2, "F4");
first3.Play(right, 12, 8, "G4");
// first3, bar 2
first3.Play(right, 20, 2, "E4");
first3.Play(right, 22, 2, "C4");
first3.Play(right, 24, 4, "F4");
first3.Play(right, 28, 4, "G4");
// first3, bar 3
first3.Play(right, 32, 4, "A4");
first3.Play(right, 36, 8, "G4");
first3.Play(right, 44, 2, "C4");
first3.Play(right, 46, 2, "C4");
first3.Play(left, 0, 12, "F2", velocity: 0.6);
first3.Play(left, 4, 8, "C3 A3", velocity: 0.6);
first3.Play(left, 12, 12, "C3", velocity: 0.6);
// first3, bar 2
first3.Play(left, 16, 8, "G3 E4", velocity: 0.6);
first3.Play(left, 24, 12, "F2", velocity: 0.6);
first3.Play(left, 28, 8, "C3 A3", velocity: 0.6);
// first3, bar 3
first3.Play(left, 36, 12, "C3", velocity: 0.6);
first3.Play(left, 40, 8, "G3 E4", velocity: 0.6);

// Pattern first4
var first4 = song.Pattern(bars: 3);
first4.Play(right, 0, 8, "C5");
first4.Play(right, 8, 2, "A4");
first4.Play(right, 10, 2, "F4");
first4.Play(right, 12, 8, "G4");
// first4, bar 2
first4.Play(right, 20, 2, "E4");
first4.Play(right, 22, 2, "C4");
first4.Play(right, 24, 4, "F4");
first4.Play(right, 28, 4, "E4");
// first4, bar 3
first4.Play(right, 32, 4, "D4");
first4.Play(right, 36, 12, "C4");
first4.Play(left, 0, 12, "F2", velocity: 0.6);
first4.Play(left, 4, 8, "C3 A3", velocity: 0.6);
first4.Play(left, 12, 12, "C3", velocity: 0.6);
// first4, bar 2
first4.Play(left, 16, 8, "G3 E4", velocity: 0.6);
first4.Play(left, 24, 12, "G2", velocity: 0.6);
first4.Play(left, 28, 8, "D3 B3", velocity: 0.6);
// first4, bar 3
first4.Play(left, 36, 12, "C3", velocity: 0.6);
first4.Play(left, 40, 8, "G3 E4", velocity: 0.6);

// Pattern second1
var second1 = song.Pattern(bars: 3);
second1.Play(right, 0, 8, "G5");
second1.Play(right, 8, 2, "E5");
second1.Play(right, 10, 2, "E5");
second1.Play(right, 12, 8, "G5");
// second1, bar 2
second1.Play(right, 20, 2, "E5");
second1.Play(right, 22, 2, "G5");
second1.Play(right, 24, 4, "C6");
second1.Play(right, 28, 4, "B5");
// second1, bar 3
second1.Play(right, 32, 4, "A5");
second1.Play(right, 36, 4, "A5");
second1.Play(right, 40, 4, "G5");
second1.Play(right, 44, 2, "D5");
second1.Play(right, 46, 2, "E5");
second1.Play(left, 0, 2, "C3", velocity: 0.6);
second1.Play(left, 2, 2, "G3", velocity: 0.6);
second1.Play(left, 4, 2, "E4", velocity: 0.6);
second1.Play(left, 6, 2, "G3", velocity: 0.6);
second1.Play(left, 8, 2, "E4", velocity: 0.6);
second1.Play(left, 10, 2, "G3", velocity: 0.6);
second1.Play(left, 12, 2, "C3", velocity: 0.6);
second1.Play(left, 14, 2, "G3", velocity: 0.6);
// second1, bar 2
second1.Play(left, 16, 2, "E4", velocity: 0.6);
second1.Play(left, 18, 2, "G3", velocity: 0.6);
second1.Play(left, 20, 2, "E4", velocity: 0.6);
second1.Play(left, 22, 2, "G3", velocity: 0.6);
second1.Play(left, 24, 2, "F2", velocity: 0.6);
second1.Play(left, 26, 2, "C3", velocity: 0.6);
second1.Play(left, 28, 2, "A3", velocity: 0.6);
second1.Play(left, 30, 2, "C3", velocity: 0.6);
// second1, bar 3
second1.Play(left, 32, 2, "A3", velocity: 0.6);
second1.Play(left, 34, 2, "C3", velocity: 0.6);
second1.Play(left, 36, 2, "C3", velocity: 0.6);
second1.Play(left, 38, 2, "G3", velocity: 0.6);
second1.Play(left, 40, 2, "E4", velocity: 0.6);
second1.Play(left, 42, 2, "G3", velocity: 0.6);
second1.Play(left, 44, 2, "E4", velocity: 0.6);
second1.Play(left, 46, 2, "G3", velocity: 0.6);

// Pattern second2
var second2 = song.Pattern(bars: 3);
second2.Play(right, 0, 4, "F5");
second2.Play(right, 4, 4, "D5");
second2.Play(right, 8, 2, "D5");
second2.Play(right, 10, 2, "E5");
second2.Play(right, 12, 8, "F5");
// second2, bar 2
second2.Play(right, 20, 2, "D5");
second2.Play(right, 22, 2, "F5");
second2.Play(right, 24, 2, "B5");
second2.Play(right, 26, 2, "A5");
second2.Play(right, 28, 4, "G5");
// second2, bar 3
second2.Play(right, 32, 4, "B5");
second2.Play(right, 36, 8, "C6");
second2.Play(right, 44, 2, "C5");
second2.Play(right, 46, 2, "C5");
second2.Play(left, 0, 2, "G2", velocity: 0.6);
second2.Play(left, 2, 2, "D3", velocity: 0.6);
second2.Play(left, 4, 2, "B3", velocity: 0.6);
second2.Play(left, 6, 2, "D3", velocity: 0.6);
second2.Play(left, 8, 2, "B3", velocity: 0.6);
second2.Play(left, 10, 2, "D3", velocity: 0.6);
second2.Play(left, 12, 2, "G2", velocity: 0.6);
second2.Play(left, 14, 2, "D3", velocity: 0.6);
// second2, bar 2
second2.Play(left, 16, 2, "B3", velocity: 0.6);
second2.Play(left, 18, 2, "D3", velocity: 0.6);
second2.Play(left, 20, 2, "B3", velocity: 0.6);
second2.Play(left, 22, 2, "D3", velocity: 0.6);
second2.Play(left, 24, 2, "G2", velocity: 0.6);
second2.Play(left, 26, 2, "D3", velocity: 0.6);
second2.Play(left, 28, 2, "B3", velocity: 0.6);
second2.Play(left, 30, 2, "D3", velocity: 0.6);
// second2, bar 3
second2.Play(left, 32, 2, "B3", velocity: 0.6);
second2.Play(left, 34, 2, "D3", velocity: 0.6);
second2.Play(left, 36, 2, "C3", velocity: 0.6);
second2.Play(left, 38, 2, "G3", velocity: 0.6);
second2.Play(left, 40, 2, "E4", velocity: 0.6);
second2.Play(left, 42, 2, "G3", velocity: 0.6);
second2.Play(left, 44, 2, "E4", velocity: 0.6);
second2.Play(left, 46, 2, "G3", velocity: 0.6);

// Pattern second3
var second3 = song.Pattern(bars: 3);
second3.Play(right, 0, 8, "C6");
second3.Play(right, 8, 2, "A5");
second3.Play(right, 10, 2, "F5");
second3.Play(right, 12, 8, "G5");
// second3, bar 2
second3.Play(right, 20, 2, "E5");
second3.Play(right, 22, 2, "C5");
second3.Play(right, 24, 4, "F5");
second3.Play(right, 28, 4, "G5");
// second3, bar 3
second3.Play(right, 32, 4, "A5");
second3.Play(right, 36, 8, "G5");
second3.Play(right, 44, 2, "C5");
second3.Play(right, 46, 2, "C5");
second3.Play(left, 0, 2, "F2", velocity: 0.6);
second3.Play(left, 2, 2, "C3", velocity: 0.6);
second3.Play(left, 4, 2, "A3", velocity: 0.6);
second3.Play(left, 6, 2, "C3", velocity: 0.6);
second3.Play(left, 8, 2, "A3", velocity: 0.6);
second3.Play(left, 10, 2, "C3", velocity: 0.6);
second3.Play(left, 12, 2, "C3", velocity: 0.6);
second3.Play(left, 14, 2, "G3", velocity: 0.6);
// second3, bar 2
second3.Play(left, 16, 2, "E4", velocity: 0.6);
second3.Play(left, 18, 2, "G3", velocity: 0.6);
second3.Play(left, 20, 2, "E4", velocity: 0.6);
second3.Play(left, 22, 2, "G3", velocity: 0.6);
second3.Play(left, 24, 2, "F2", velocity: 0.6);
second3.Play(left, 26, 2, "C3", velocity: 0.6);
second3.Play(left, 28, 2, "A3", velocity: 0.6);
second3.Play(left, 30, 2, "C3", velocity: 0.6);
// second3, bar 3
second3.Play(left, 32, 2, "A3", velocity: 0.6);
second3.Play(left, 34, 2, "C3", velocity: 0.6);
second3.Play(left, 36, 2, "C3", velocity: 0.6);
second3.Play(left, 38, 2, "G3", velocity: 0.6);
second3.Play(left, 40, 2, "E4", velocity: 0.6);
second3.Play(left, 42, 2, "G3", velocity: 0.6);
second3.Play(left, 44, 2, "E4", velocity: 0.6);
second3.Play(left, 46, 2, "G3", velocity: 0.6);

// Pattern second4
var second4 = song.Pattern(bars: 3);
second4.Play(right, 0, 8, "C6");
second4.Play(right, 8, 2, "A5");
second4.Play(right, 10, 2, "F5");
second4.Play(right, 12, 8, "G5");
// second4, bar 2
second4.Play(right, 20, 2, "E5");
second4.Play(right, 22, 2, "C5");
second4.Play(right, 24, 4, "F5");
second4.Play(right, 28, 4, "E5");
// second4, bar 3
second4.Play(right, 32, 4, "D5");
second4.Play(right, 36, 12, "C5");
second4.Play(left, 0, 2, "F2", velocity: 0.6);
second4.Play(left, 2, 2, "C3", velocity: 0.6);
second4.Play(left, 4, 2, "A3", velocity: 0.6);
second4.Play(left, 6, 2, "C3", velocity: 0.6);
second4.Play(left, 8, 2, "A3", velocity: 0.6);
second4.Play(left, 10, 2, "C3", velocity: 0.6);
second4.Play(left, 12, 2, "C3", velocity: 0.6);
second4.Play(left, 14, 2, "G3", velocity: 0.6);
// second4, bar 2
second4.Play(left, 16, 2, "E4", velocity: 0.6);
second4.Play(left, 18, 2, "G3", velocity: 0.6);
second4.Play(left, 20, 2, "E4", velocity: 0.6);
second4.Play(left, 22, 2, "G3", velocity: 0.6);
second4.Play(left, 24, 2, "G2", velocity: 0.6);
second4.Play(left, 26, 2, "D3", velocity: 0.6);
second4.Play(left, 28, 2, "B3", velocity: 0.6);
second4.Play(left, 30, 2, "D3", velocity: 0.6);
// second4, bar 3
second4.Play(left, 32, 2, "B3", velocity: 0.6);
second4.Play(left, 34, 2, "D3", velocity: 0.6);
second4.Play(left, 36, 2, "C3", velocity: 0.6);
second4.Play(left, 38, 2, "G3", velocity: 0.6);
second4.Play(left, 40, 2, "E4", velocity: 0.6);
second4.Play(left, 42, 2, "G3", velocity: 0.6);
second4.Play(left, 44, 2, "E4", velocity: 0.6);
second4.Play(left, 46, 2, "G3", velocity: 0.6);

// The arrangement: the patterns in the order they play (39 bars, 1:57)
song.Arrange(intro, first1, first2, first3, first4, second1, second2, second3,
    second4, first1, first2, first3, first4);

// The master: volume, and how much reverb and delay come back
song.Volume = 1;
song.Reverb = 0.9;

song.Play();
