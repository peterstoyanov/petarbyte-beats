// PetarByte Beats: this song, written as C# code.
// Channels are the sounds, patterns are a few bars each, the arrangement plays them in order.
var song = new Song(bpm: 96, swing: 0, key: "A minor");

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
intro.Play(right, 44, 4, "A4");
// intro, bar 3
intro.Play(left, 36, 12, "A2 E3", velocity: 0.6);

// Pattern plain1
var plain1 = song.Pattern(bars: 3);
plain1.Play(right, 0, 4, "C5");
plain1.Play(right, 4, 2, "D5");
plain1.Play(right, 6, 3, "E5");
plain1.Play(right, 9, 1, "F5");
plain1.Play(right, 10, 2, "E5");
plain1.Play(right, 12, 4, "D5");
// plain1, bar 2
plain1.Play(right, 16, 2, "B4");
plain1.Play(right, 18, 3, "G4");
plain1.Play(right, 21, 1, "A4");
plain1.Play(right, 22, 2, "B4");
plain1.Play(right, 24, 4, "C5");
plain1.Play(right, 28, 2, "A4");
plain1.Play(right, 30, 3, "A4");
// plain1, bar 3
plain1.Play(right, 33, 1, "G#4");
plain1.Play(right, 34, 2, "A4");
plain1.Play(right, 36, 4, "B4");
plain1.Play(right, 40, 2, "G#4");
plain1.Play(right, 42, 4, "E4");
plain1.Play(right, 46, 2, "A4");
plain1.Play(left, 0, 12, "A2 E3 A3", velocity: 0.6);
plain1.Play(left, 12, 12, "G2 D3 G3", velocity: 0.6);
// plain1, bar 2
plain1.Play(left, 24, 12, "A2 E3 A3", velocity: 0.6);
// plain1, bar 3
plain1.Play(left, 36, 12, "E2 B2 E3", velocity: 0.6);

// Pattern plain2
var plain2 = song.Pattern(bars: 3);
plain2.Play(right, 0, 4, "C5");
plain2.Play(right, 4, 2, "D5");
plain2.Play(right, 6, 3, "E5");
plain2.Play(right, 9, 1, "F5");
plain2.Play(right, 10, 2, "E5");
plain2.Play(right, 12, 4, "D5");
// plain2, bar 2
plain2.Play(right, 16, 2, "B4");
plain2.Play(right, 18, 3, "G4");
plain2.Play(right, 21, 1, "A4");
plain2.Play(right, 22, 2, "B4");
plain2.Play(right, 24, 3, "C5");
plain2.Play(right, 27, 1, "B4");
plain2.Play(right, 28, 2, "A4");
plain2.Play(right, 30, 3, "G#4");
// plain2, bar 3
plain2.Play(right, 33, 1, "F#4");
plain2.Play(right, 34, 2, "G#4");
plain2.Play(right, 36, 12, "A4");
plain2.Play(left, 0, 12, "A2 E3 A3", velocity: 0.6);
plain2.Play(left, 12, 12, "G2 D3 G3", velocity: 0.6);
// plain2, bar 2
plain2.Play(left, 24, 12, "A2 E3 A3", velocity: 0.6);
// plain2, bar 3
plain2.Play(left, 36, 12, "A2 E3 A3", velocity: 0.6);

// Pattern plain3
var plain3 = song.Pattern(bars: 3);
plain3.Play(right, 0, 6, "G5");
plain3.Play(right, 6, 3, "G5");
plain3.Play(right, 9, 1, "F#5");
plain3.Play(right, 10, 2, "E5");
plain3.Play(right, 12, 4, "D5");
// plain3, bar 2
plain3.Play(right, 16, 2, "B4");
plain3.Play(right, 18, 3, "G4");
plain3.Play(right, 21, 1, "A4");
plain3.Play(right, 22, 2, "B4");
plain3.Play(right, 24, 4, "C5");
plain3.Play(right, 28, 2, "A4");
plain3.Play(right, 30, 3, "A4");
// plain3, bar 3
plain3.Play(right, 33, 1, "G#4");
plain3.Play(right, 34, 2, "A4");
plain3.Play(right, 36, 4, "B4");
plain3.Play(right, 40, 2, "G#4");
plain3.Play(right, 42, 6, "E4");
plain3.Play(left, 0, 12, "C3 G3 C4", velocity: 0.6);
plain3.Play(left, 12, 12, "G2 D3 G3", velocity: 0.6);
// plain3, bar 2
plain3.Play(left, 24, 12, "A2 E3 A3", velocity: 0.6);
// plain3, bar 3
plain3.Play(left, 36, 12, "E2 B2 E3", velocity: 0.6);

// Pattern plain4
var plain4 = song.Pattern(bars: 3);
plain4.Play(right, 0, 6, "G5");
plain4.Play(right, 6, 3, "G5");
plain4.Play(right, 9, 1, "F#5");
plain4.Play(right, 10, 2, "E5");
plain4.Play(right, 12, 4, "D5");
// plain4, bar 2
plain4.Play(right, 16, 2, "B4");
plain4.Play(right, 18, 3, "G4");
plain4.Play(right, 21, 1, "A4");
plain4.Play(right, 22, 2, "B4");
plain4.Play(right, 24, 3, "C5");
plain4.Play(right, 27, 1, "B4");
plain4.Play(right, 28, 2, "A4");
plain4.Play(right, 30, 3, "G#4");
// plain4, bar 3
plain4.Play(right, 33, 1, "F#4");
plain4.Play(right, 34, 2, "G#4");
plain4.Play(right, 36, 12, "A4");
plain4.Play(left, 0, 12, "C3 G3 C4", velocity: 0.6);
plain4.Play(left, 12, 12, "G2 D3 G3", velocity: 0.6);
// plain4, bar 2
plain4.Play(left, 24, 12, "E2 B2 E3", velocity: 0.6);
// plain4, bar 3
plain4.Play(left, 36, 12, "A2 E3 A3", velocity: 0.6);

// Pattern walk1
var walk1 = song.Pattern(bars: 3);
walk1.Play(right, 0, 4, "C5");
walk1.Play(right, 4, 2, "D5");
walk1.Play(right, 6, 3, "E5");
walk1.Play(right, 9, 1, "F5");
walk1.Play(right, 10, 2, "E5");
walk1.Play(right, 12, 4, "D5");
// walk1, bar 2
walk1.Play(right, 16, 2, "B4");
walk1.Play(right, 18, 3, "G4");
walk1.Play(right, 21, 1, "A4");
walk1.Play(right, 22, 2, "B4");
walk1.Play(right, 24, 4, "C5");
walk1.Play(right, 28, 2, "A4");
walk1.Play(right, 30, 3, "A4");
// walk1, bar 3
walk1.Play(right, 33, 1, "G#4");
walk1.Play(right, 34, 2, "A4");
walk1.Play(right, 36, 4, "B4");
walk1.Play(right, 40, 2, "G#4");
walk1.Play(right, 42, 4, "E4");
walk1.Play(right, 46, 2, "A4");
walk1.Play(left, 0, 4, "A2", velocity: 0.6);
walk1.Play(left, 4, 4, "E3", velocity: 0.6);
walk1.Play(left, 8, 4, "A3", velocity: 0.6);
walk1.Play(left, 12, 4, "G2", velocity: 0.6);
// walk1, bar 2
walk1.Play(left, 16, 4, "D3", velocity: 0.6);
walk1.Play(left, 20, 4, "G3", velocity: 0.6);
walk1.Play(left, 24, 4, "A2", velocity: 0.6);
walk1.Play(left, 28, 4, "E3", velocity: 0.6);
// walk1, bar 3
walk1.Play(left, 32, 4, "A3", velocity: 0.6);
walk1.Play(left, 36, 4, "E2", velocity: 0.6);
walk1.Play(left, 40, 4, "B2", velocity: 0.6);
walk1.Play(left, 44, 4, "E3", velocity: 0.6);

// Pattern walk2
var walk2 = song.Pattern(bars: 3);
walk2.Play(right, 0, 4, "C5");
walk2.Play(right, 4, 2, "D5");
walk2.Play(right, 6, 3, "E5");
walk2.Play(right, 9, 1, "F5");
walk2.Play(right, 10, 2, "E5");
walk2.Play(right, 12, 4, "D5");
// walk2, bar 2
walk2.Play(right, 16, 2, "B4");
walk2.Play(right, 18, 3, "G4");
walk2.Play(right, 21, 1, "A4");
walk2.Play(right, 22, 2, "B4");
walk2.Play(right, 24, 3, "C5");
walk2.Play(right, 27, 1, "B4");
walk2.Play(right, 28, 2, "A4");
walk2.Play(right, 30, 3, "G#4");
// walk2, bar 3
walk2.Play(right, 33, 1, "F#4");
walk2.Play(right, 34, 2, "G#4");
walk2.Play(right, 36, 12, "A4");
walk2.Play(left, 0, 4, "A2", velocity: 0.6);
walk2.Play(left, 4, 4, "E3", velocity: 0.6);
walk2.Play(left, 8, 4, "A3", velocity: 0.6);
walk2.Play(left, 12, 4, "G2", velocity: 0.6);
// walk2, bar 2
walk2.Play(left, 16, 4, "D3", velocity: 0.6);
walk2.Play(left, 20, 4, "G3", velocity: 0.6);
walk2.Play(left, 24, 4, "A2", velocity: 0.6);
walk2.Play(left, 28, 4, "E3", velocity: 0.6);
// walk2, bar 3
walk2.Play(left, 32, 4, "A3", velocity: 0.6);
walk2.Play(left, 36, 4, "A2", velocity: 0.6);
walk2.Play(left, 40, 4, "E3", velocity: 0.6);
walk2.Play(left, 44, 4, "A3", velocity: 0.6);

// Pattern walk3
var walk3 = song.Pattern(bars: 3);
walk3.Play(right, 0, 6, "G5");
walk3.Play(right, 6, 3, "G5");
walk3.Play(right, 9, 1, "F#5");
walk3.Play(right, 10, 2, "E5");
walk3.Play(right, 12, 4, "D5");
// walk3, bar 2
walk3.Play(right, 16, 2, "B4");
walk3.Play(right, 18, 3, "G4");
walk3.Play(right, 21, 1, "A4");
walk3.Play(right, 22, 2, "B4");
walk3.Play(right, 24, 4, "C5");
walk3.Play(right, 28, 2, "A4");
walk3.Play(right, 30, 3, "A4");
// walk3, bar 3
walk3.Play(right, 33, 1, "G#4");
walk3.Play(right, 34, 2, "A4");
walk3.Play(right, 36, 4, "B4");
walk3.Play(right, 40, 2, "G#4");
walk3.Play(right, 42, 6, "E4");
walk3.Play(left, 0, 4, "C3", velocity: 0.6);
walk3.Play(left, 4, 4, "G3", velocity: 0.6);
walk3.Play(left, 8, 4, "C4", velocity: 0.6);
walk3.Play(left, 12, 4, "G2", velocity: 0.6);
// walk3, bar 2
walk3.Play(left, 16, 4, "D3", velocity: 0.6);
walk3.Play(left, 20, 4, "G3", velocity: 0.6);
walk3.Play(left, 24, 4, "A2", velocity: 0.6);
walk3.Play(left, 28, 4, "E3", velocity: 0.6);
// walk3, bar 3
walk3.Play(left, 32, 4, "A3", velocity: 0.6);
walk3.Play(left, 36, 4, "E2", velocity: 0.6);
walk3.Play(left, 40, 4, "B2", velocity: 0.6);
walk3.Play(left, 44, 4, "E3", velocity: 0.6);

// Pattern walk4
var walk4 = song.Pattern(bars: 3);
walk4.Play(right, 0, 6, "G5");
walk4.Play(right, 6, 3, "G5");
walk4.Play(right, 9, 1, "F#5");
walk4.Play(right, 10, 2, "E5");
walk4.Play(right, 12, 4, "D5");
// walk4, bar 2
walk4.Play(right, 16, 2, "B4");
walk4.Play(right, 18, 3, "G4");
walk4.Play(right, 21, 1, "A4");
walk4.Play(right, 22, 2, "B4");
walk4.Play(right, 24, 3, "C5");
walk4.Play(right, 27, 1, "B4");
walk4.Play(right, 28, 2, "A4");
walk4.Play(right, 30, 3, "G#4");
// walk4, bar 3
walk4.Play(right, 33, 1, "F#4");
walk4.Play(right, 34, 2, "G#4");
walk4.Play(right, 36, 12, "A4");
walk4.Play(left, 0, 4, "C3", velocity: 0.6);
walk4.Play(left, 4, 4, "G3", velocity: 0.6);
walk4.Play(left, 8, 4, "C4", velocity: 0.6);
walk4.Play(left, 12, 4, "G2", velocity: 0.6);
// walk4, bar 2
walk4.Play(left, 16, 4, "D3", velocity: 0.6);
walk4.Play(left, 20, 4, "G3", velocity: 0.6);
walk4.Play(left, 24, 4, "E2", velocity: 0.6);
walk4.Play(left, 28, 4, "B2", velocity: 0.6);
// walk4, bar 3
walk4.Play(left, 32, 4, "E3", velocity: 0.6);
walk4.Play(left, 36, 4, "A2", velocity: 0.6);
walk4.Play(left, 40, 4, "E3", velocity: 0.6);
walk4.Play(left, 44, 4, "A3", velocity: 0.6);

// Pattern high1
var high1 = song.Pattern(bars: 3);
high1.Play(right, 0, 4, "C5", velocity: 0.45);
high1.Play(right, 0, 4, "C6");
high1.Play(right, 4, 2, "D5", velocity: 0.45);
high1.Play(right, 4, 2, "D6");
high1.Play(right, 6, 3, "E5", velocity: 0.45);
high1.Play(right, 6, 3, "E6");
high1.Play(right, 9, 1, "F5", velocity: 0.45);
high1.Play(right, 9, 1, "F6");
high1.Play(right, 10, 2, "E5", velocity: 0.45);
high1.Play(right, 10, 2, "E6");
high1.Play(right, 12, 4, "D5", velocity: 0.45);
high1.Play(right, 12, 4, "D6");
// high1, bar 2
high1.Play(right, 16, 2, "B4", velocity: 0.45);
high1.Play(right, 16, 2, "B5");
high1.Play(right, 18, 3, "G4", velocity: 0.45);
high1.Play(right, 18, 3, "G5");
high1.Play(right, 21, 1, "A4", velocity: 0.45);
high1.Play(right, 21, 1, "A5");
high1.Play(right, 22, 2, "B4", velocity: 0.45);
high1.Play(right, 22, 2, "B5");
high1.Play(right, 24, 4, "C5", velocity: 0.45);
high1.Play(right, 24, 4, "C6");
high1.Play(right, 28, 2, "A4", velocity: 0.45);
high1.Play(right, 28, 2, "A5");
high1.Play(right, 30, 3, "A4", velocity: 0.45);
high1.Play(right, 30, 3, "A5");
// high1, bar 3
high1.Play(right, 33, 1, "G#4", velocity: 0.45);
high1.Play(right, 33, 1, "G#5");
high1.Play(right, 34, 2, "A4", velocity: 0.45);
high1.Play(right, 34, 2, "A5");
high1.Play(right, 36, 4, "B4", velocity: 0.45);
high1.Play(right, 36, 4, "B5");
high1.Play(right, 40, 2, "G#4", velocity: 0.45);
high1.Play(right, 40, 2, "G#5");
high1.Play(right, 42, 4, "E4", velocity: 0.45);
high1.Play(right, 42, 4, "E5");
high1.Play(right, 46, 2, "A4", velocity: 0.45);
high1.Play(right, 46, 2, "A5");
high1.Play(left, 0, 4, "A2", velocity: 0.6);
high1.Play(left, 4, 4, "E3", velocity: 0.6);
high1.Play(left, 8, 4, "A3", velocity: 0.6);
high1.Play(left, 12, 4, "G2", velocity: 0.6);
// high1, bar 2
high1.Play(left, 16, 4, "D3", velocity: 0.6);
high1.Play(left, 20, 4, "G3", velocity: 0.6);
high1.Play(left, 24, 4, "A2", velocity: 0.6);
high1.Play(left, 28, 4, "E3", velocity: 0.6);
// high1, bar 3
high1.Play(left, 32, 4, "A3", velocity: 0.6);
high1.Play(left, 36, 4, "E2", velocity: 0.6);
high1.Play(left, 40, 4, "B2", velocity: 0.6);
high1.Play(left, 44, 4, "E3", velocity: 0.6);

// Pattern high2
var high2 = song.Pattern(bars: 3);
high2.Play(right, 0, 4, "C5", velocity: 0.45);
high2.Play(right, 0, 4, "C6");
high2.Play(right, 4, 2, "D5", velocity: 0.45);
high2.Play(right, 4, 2, "D6");
high2.Play(right, 6, 3, "E5", velocity: 0.45);
high2.Play(right, 6, 3, "E6");
high2.Play(right, 9, 1, "F5", velocity: 0.45);
high2.Play(right, 9, 1, "F6");
high2.Play(right, 10, 2, "E5", velocity: 0.45);
high2.Play(right, 10, 2, "E6");
high2.Play(right, 12, 4, "D5", velocity: 0.45);
high2.Play(right, 12, 4, "D6");
// high2, bar 2
high2.Play(right, 16, 2, "B4", velocity: 0.45);
high2.Play(right, 16, 2, "B5");
high2.Play(right, 18, 3, "G4", velocity: 0.45);
high2.Play(right, 18, 3, "G5");
high2.Play(right, 21, 1, "A4", velocity: 0.45);
high2.Play(right, 21, 1, "A5");
high2.Play(right, 22, 2, "B4", velocity: 0.45);
high2.Play(right, 22, 2, "B5");
high2.Play(right, 24, 3, "C5", velocity: 0.45);
high2.Play(right, 24, 3, "C6");
high2.Play(right, 27, 1, "B4", velocity: 0.45);
high2.Play(right, 27, 1, "B5");
high2.Play(right, 28, 2, "A4", velocity: 0.45);
high2.Play(right, 28, 2, "A5");
high2.Play(right, 30, 3, "G#4", velocity: 0.45);
high2.Play(right, 30, 3, "G#5");
// high2, bar 3
high2.Play(right, 33, 1, "F#4", velocity: 0.45);
high2.Play(right, 33, 1, "F#5");
high2.Play(right, 34, 2, "G#4", velocity: 0.45);
high2.Play(right, 34, 2, "G#5");
high2.Play(right, 36, 12, "A4", velocity: 0.45);
high2.Play(right, 36, 12, "A5");
high2.Play(left, 0, 4, "A2", velocity: 0.6);
high2.Play(left, 4, 4, "E3", velocity: 0.6);
high2.Play(left, 8, 4, "A3", velocity: 0.6);
high2.Play(left, 12, 4, "G2", velocity: 0.6);
// high2, bar 2
high2.Play(left, 16, 4, "D3", velocity: 0.6);
high2.Play(left, 20, 4, "G3", velocity: 0.6);
high2.Play(left, 24, 4, "A2", velocity: 0.6);
high2.Play(left, 28, 4, "E3", velocity: 0.6);
// high2, bar 3
high2.Play(left, 32, 4, "A3", velocity: 0.6);
high2.Play(left, 36, 4, "A2", velocity: 0.6);
high2.Play(left, 40, 4, "E3", velocity: 0.6);
high2.Play(left, 44, 4, "A3", velocity: 0.6);

// Pattern high3
var high3 = song.Pattern(bars: 3);
high3.Play(right, 0, 6, "G5", velocity: 0.45);
high3.Play(right, 0, 6, "G6");
high3.Play(right, 6, 3, "G5", velocity: 0.45);
high3.Play(right, 6, 3, "G6");
high3.Play(right, 9, 1, "F#5", velocity: 0.45);
high3.Play(right, 9, 1, "F#6");
high3.Play(right, 10, 2, "E5", velocity: 0.45);
high3.Play(right, 10, 2, "E6");
high3.Play(right, 12, 4, "D5", velocity: 0.45);
high3.Play(right, 12, 4, "D6");
// high3, bar 2
high3.Play(right, 16, 2, "B4", velocity: 0.45);
high3.Play(right, 16, 2, "B5");
high3.Play(right, 18, 3, "G4", velocity: 0.45);
high3.Play(right, 18, 3, "G5");
high3.Play(right, 21, 1, "A4", velocity: 0.45);
high3.Play(right, 21, 1, "A5");
high3.Play(right, 22, 2, "B4", velocity: 0.45);
high3.Play(right, 22, 2, "B5");
high3.Play(right, 24, 4, "C5", velocity: 0.45);
high3.Play(right, 24, 4, "C6");
high3.Play(right, 28, 2, "A4", velocity: 0.45);
high3.Play(right, 28, 2, "A5");
high3.Play(right, 30, 3, "A4", velocity: 0.45);
high3.Play(right, 30, 3, "A5");
// high3, bar 3
high3.Play(right, 33, 1, "G#4", velocity: 0.45);
high3.Play(right, 33, 1, "G#5");
high3.Play(right, 34, 2, "A4", velocity: 0.45);
high3.Play(right, 34, 2, "A5");
high3.Play(right, 36, 4, "B4", velocity: 0.45);
high3.Play(right, 36, 4, "B5");
high3.Play(right, 40, 2, "G#4", velocity: 0.45);
high3.Play(right, 40, 2, "G#5");
high3.Play(right, 42, 6, "E4", velocity: 0.45);
high3.Play(right, 42, 6, "E5");
high3.Play(left, 0, 4, "C3", velocity: 0.6);
high3.Play(left, 4, 4, "G3", velocity: 0.6);
high3.Play(left, 8, 4, "C4", velocity: 0.6);
high3.Play(left, 12, 4, "G2", velocity: 0.6);
// high3, bar 2
high3.Play(left, 16, 4, "D3", velocity: 0.6);
high3.Play(left, 20, 4, "G3", velocity: 0.6);
high3.Play(left, 24, 4, "A2", velocity: 0.6);
high3.Play(left, 28, 4, "E3", velocity: 0.6);
// high3, bar 3
high3.Play(left, 32, 4, "A3", velocity: 0.6);
high3.Play(left, 36, 4, "E2", velocity: 0.6);
high3.Play(left, 40, 4, "B2", velocity: 0.6);
high3.Play(left, 44, 4, "E3", velocity: 0.6);

// Pattern high4
var high4 = song.Pattern(bars: 3);
high4.Play(right, 0, 6, "G5", velocity: 0.45);
high4.Play(right, 0, 6, "G6");
high4.Play(right, 6, 3, "G5", velocity: 0.45);
high4.Play(right, 6, 3, "G6");
high4.Play(right, 9, 1, "F#5", velocity: 0.45);
high4.Play(right, 9, 1, "F#6");
high4.Play(right, 10, 2, "E5", velocity: 0.45);
high4.Play(right, 10, 2, "E6");
high4.Play(right, 12, 4, "D5", velocity: 0.45);
high4.Play(right, 12, 4, "D6");
// high4, bar 2
high4.Play(right, 16, 2, "B4", velocity: 0.45);
high4.Play(right, 16, 2, "B5");
high4.Play(right, 18, 3, "G4", velocity: 0.45);
high4.Play(right, 18, 3, "G5");
high4.Play(right, 21, 1, "A4", velocity: 0.45);
high4.Play(right, 21, 1, "A5");
high4.Play(right, 22, 2, "B4", velocity: 0.45);
high4.Play(right, 22, 2, "B5");
high4.Play(right, 24, 3, "C5", velocity: 0.45);
high4.Play(right, 24, 3, "C6");
high4.Play(right, 27, 1, "B4", velocity: 0.45);
high4.Play(right, 27, 1, "B5");
high4.Play(right, 28, 2, "A4", velocity: 0.45);
high4.Play(right, 28, 2, "A5");
high4.Play(right, 30, 3, "G#4", velocity: 0.45);
high4.Play(right, 30, 3, "G#5");
// high4, bar 3
high4.Play(right, 33, 1, "F#4", velocity: 0.45);
high4.Play(right, 33, 1, "F#5");
high4.Play(right, 34, 2, "G#4", velocity: 0.45);
high4.Play(right, 34, 2, "G#5");
high4.Play(right, 36, 12, "A4", velocity: 0.45);
high4.Play(right, 36, 12, "A5");
high4.Play(left, 0, 4, "C3", velocity: 0.6);
high4.Play(left, 4, 4, "G3", velocity: 0.6);
high4.Play(left, 8, 4, "C4", velocity: 0.6);
high4.Play(left, 12, 4, "G2", velocity: 0.6);
// high4, bar 2
high4.Play(left, 16, 4, "D3", velocity: 0.6);
high4.Play(left, 20, 4, "G3", velocity: 0.6);
high4.Play(left, 24, 4, "E2", velocity: 0.6);
high4.Play(left, 28, 4, "B2", velocity: 0.6);
// high4, bar 3
high4.Play(left, 32, 4, "E3", velocity: 0.6);
high4.Play(left, 36, 4, "A2", velocity: 0.6);
high4.Play(left, 40, 4, "E3", velocity: 0.6);
high4.Play(left, 44, 4, "A3", velocity: 0.6);

// The arrangement: the patterns in the order they play (39 bars, 1:38)
song.Arrange(intro, plain1, plain2, plain3, plain4, walk1, walk2, walk3,
    walk4, high1, high2, high3, high4);

// The master: volume, and how much reverb and delay come back
song.Volume = 1;
song.Reverb = 0.9;

song.Play();
