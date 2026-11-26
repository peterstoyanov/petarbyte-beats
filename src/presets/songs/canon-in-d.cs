// PetarByte Beats: this song, written as C# code.
// Channels are the sounds, patterns are a few bars each, the arrangement plays them in order.
var song = new Song(bpm: 72, swing: 0, key: "D major");

// Channels: one sound each, with its mixer settings below it
var right = song.Instrument(Instruments.GrandPiano);
right.Volume = 1;
right.Reverb = 0.35;
var left = song.Instrument(Instruments.GrandPiano);
left.Volume = 0.9;
left.Reverb = 0.35;

// Pattern ground: Hits(drum, steps) with x = hit, X = loud, . = rest. Play(instrument, step, length, notes).
var ground = song.Pattern(bars: 4);
ground.Play(left, 0, 8, "D3 A3", velocity: 0.6);
ground.Play(left, 8, 8, "A2 E3", velocity: 0.6);
// ground, bar 2
ground.Play(left, 16, 8, "B2 F#3", velocity: 0.6);
ground.Play(left, 24, 8, "F#2 C#3", velocity: 0.6);
// ground, bar 3
ground.Play(left, 32, 8, "G2 D3", velocity: 0.6);
ground.Play(left, 40, 8, "D2 A2", velocity: 0.6);
// ground, bar 4
ground.Play(left, 48, 8, "G2 D3", velocity: 0.6);
ground.Play(left, 56, 8, "A2 E3", velocity: 0.6);

// Pattern one
var one = song.Pattern(bars: 4);
one.Play(right, 0, 8, "F#5");
one.Play(right, 8, 8, "E5");
// one, bar 2
one.Play(right, 16, 8, "D5");
one.Play(right, 24, 8, "C#5");
// one, bar 3
one.Play(right, 32, 8, "B4");
one.Play(right, 40, 8, "A4");
// one, bar 4
one.Play(right, 48, 8, "B4");
one.Play(right, 56, 8, "C#5");
one.Play(left, 0, 8, "D3 A3", velocity: 0.6);
one.Play(left, 8, 8, "A2 E3", velocity: 0.6);
// one, bar 2
one.Play(left, 16, 8, "B2 F#3", velocity: 0.6);
one.Play(left, 24, 8, "F#2 C#3", velocity: 0.6);
// one, bar 3
one.Play(left, 32, 8, "G2 D3", velocity: 0.6);
one.Play(left, 40, 8, "D2 A2", velocity: 0.6);
// one, bar 4
one.Play(left, 48, 8, "G2 D3", velocity: 0.6);
one.Play(left, 56, 8, "A2 E3", velocity: 0.6);

// Pattern two
var two = song.Pattern(bars: 4);
two.Play(right, 0, 8, "D5 F#5");
two.Play(right, 8, 8, "C#5 E5");
// two, bar 2
two.Play(right, 16, 8, "B4 D5");
two.Play(right, 24, 8, "A4 C#5");
// two, bar 3
two.Play(right, 32, 8, "G4 B4");
two.Play(right, 40, 8, "F#4 A4");
// two, bar 4
two.Play(right, 48, 8, "G4 B4");
two.Play(right, 56, 8, "E4 C#5");
two.Play(left, 0, 8, "D3 A3", velocity: 0.6);
two.Play(left, 8, 8, "A2 E3", velocity: 0.6);
// two, bar 2
two.Play(left, 16, 8, "B2 F#3", velocity: 0.6);
two.Play(left, 24, 8, "F#2 C#3", velocity: 0.6);
// two, bar 3
two.Play(left, 32, 8, "G2 D3", velocity: 0.6);
two.Play(left, 40, 8, "D2 A2", velocity: 0.6);
// two, bar 4
two.Play(left, 48, 8, "G2 D3", velocity: 0.6);
two.Play(left, 56, 8, "A2 E3", velocity: 0.6);

// Pattern three
var three = song.Pattern(bars: 4);
three.Play(right, 0, 4, "D4");
three.Play(right, 4, 4, "F#4");
three.Play(right, 8, 4, "A4");
three.Play(right, 12, 4, "G4");
// three, bar 2
three.Play(right, 16, 4, "F#4");
three.Play(right, 20, 4, "D4");
three.Play(right, 24, 4, "F#4");
three.Play(right, 28, 4, "E4");
// three, bar 3
three.Play(right, 32, 4, "D4");
three.Play(right, 36, 4, "B3");
three.Play(right, 40, 4, "D4");
three.Play(right, 44, 4, "A4");
// three, bar 4
three.Play(right, 48, 4, "G4");
three.Play(right, 52, 4, "B4");
three.Play(right, 56, 4, "A4");
three.Play(right, 60, 4, "G4");
three.Play(left, 0, 8, "D3 A3", velocity: 0.6);
three.Play(left, 8, 8, "A2 E3", velocity: 0.6);
// three, bar 2
three.Play(left, 16, 8, "B2 F#3", velocity: 0.6);
three.Play(left, 24, 8, "F#2 C#3", velocity: 0.6);
// three, bar 3
three.Play(left, 32, 8, "G2 D3", velocity: 0.6);
three.Play(left, 40, 8, "D2 A2", velocity: 0.6);
// three, bar 4
three.Play(left, 48, 8, "G2 D3", velocity: 0.6);
three.Play(left, 56, 8, "A2 E3", velocity: 0.6);

// Pattern four
var four = song.Pattern(bars: 4);
four.Play(right, 0, 4, "D5");
four.Play(right, 4, 4, "F#5");
four.Play(right, 8, 4, "A5");
four.Play(right, 12, 4, "G5");
// four, bar 2
four.Play(right, 16, 4, "F#5");
four.Play(right, 20, 4, "D5");
four.Play(right, 24, 4, "F#5");
four.Play(right, 28, 4, "E5");
// four, bar 3
four.Play(right, 32, 4, "D5");
four.Play(right, 36, 4, "B4");
four.Play(right, 40, 4, "D5");
four.Play(right, 44, 4, "A5");
// four, bar 4
four.Play(right, 48, 4, "G5");
four.Play(right, 52, 4, "B5");
four.Play(right, 56, 4, "A5");
four.Play(right, 60, 4, "G5");
four.Play(left, 0, 8, "D3 A3", velocity: 0.6);
four.Play(left, 8, 8, "A2 E3", velocity: 0.6);
// four, bar 2
four.Play(left, 16, 8, "B2 F#3", velocity: 0.6);
four.Play(left, 24, 8, "F#2 C#3", velocity: 0.6);
// four, bar 3
four.Play(left, 32, 8, "G2 D3", velocity: 0.6);
four.Play(left, 40, 8, "D2 A2", velocity: 0.6);
// four, bar 4
four.Play(left, 48, 8, "G2 D3", velocity: 0.6);
four.Play(left, 56, 8, "A2 E3", velocity: 0.6);

// Pattern five
var five = song.Pattern(bars: 4);
five.Play(right, 0, 2, "D5");
five.Play(right, 2, 2, "F#5");
five.Play(right, 4, 2, "A5");
five.Play(right, 6, 2, "F#5");
five.Play(right, 8, 2, "C#5");
five.Play(right, 10, 2, "E5");
five.Play(right, 12, 2, "A5");
five.Play(right, 14, 2, "E5");
// five, bar 2
five.Play(right, 16, 2, "B4");
five.Play(right, 18, 2, "D5");
five.Play(right, 20, 2, "F#5");
five.Play(right, 22, 2, "D5");
five.Play(right, 24, 2, "C#5");
five.Play(right, 26, 2, "F#5");
five.Play(right, 28, 2, "A5");
five.Play(right, 30, 2, "F#5");
// five, bar 3
five.Play(right, 32, 2, "B4");
five.Play(right, 34, 2, "D5");
five.Play(right, 36, 2, "G5");
five.Play(right, 38, 2, "D5");
five.Play(right, 40, 2, "A4");
five.Play(right, 42, 2, "D5");
five.Play(right, 44, 2, "F#5");
five.Play(right, 46, 2, "D5");
// five, bar 4
five.Play(right, 48, 2, "B4");
five.Play(right, 50, 2, "D5");
five.Play(right, 52, 2, "G5");
five.Play(right, 54, 2, "D5");
five.Play(right, 56, 2, "C#5");
five.Play(right, 58, 2, "E5");
five.Play(right, 60, 2, "A5");
five.Play(right, 62, 2, "E5");
five.Play(left, 0, 8, "D3 A3", velocity: 0.6);
five.Play(left, 8, 8, "A2 E3", velocity: 0.6);
// five, bar 2
five.Play(left, 16, 8, "B2 F#3", velocity: 0.6);
five.Play(left, 24, 8, "F#2 C#3", velocity: 0.6);
// five, bar 3
five.Play(left, 32, 8, "G2 D3", velocity: 0.6);
five.Play(left, 40, 8, "D2 A2", velocity: 0.6);
// five, bar 4
five.Play(left, 48, 8, "G2 D3", velocity: 0.6);
five.Play(left, 56, 8, "A2 E3", velocity: 0.6);

// Pattern six
var six = song.Pattern(bars: 4);
six.Play(right, 0, 8, "D5 F#6");
six.Play(right, 8, 8, "C#5 E6");
// six, bar 2
six.Play(right, 16, 8, "B4 D6");
six.Play(right, 24, 8, "A4 C#6");
// six, bar 3
six.Play(right, 32, 8, "G4 B5");
six.Play(right, 40, 8, "F#4 A5");
// six, bar 4
six.Play(right, 48, 8, "G4 B5");
six.Play(right, 56, 8, "E4 C#6");
six.Play(left, 0, 8, "D3 A3", velocity: 0.6);
six.Play(left, 8, 8, "A2 E3", velocity: 0.6);
// six, bar 2
six.Play(left, 16, 8, "B2 F#3", velocity: 0.6);
six.Play(left, 24, 8, "F#2 C#3", velocity: 0.6);
// six, bar 3
six.Play(left, 32, 8, "G2 D3", velocity: 0.6);
six.Play(left, 40, 8, "D2 A2", velocity: 0.6);
// six, bar 4
six.Play(left, 48, 8, "G2 D3", velocity: 0.6);
six.Play(left, 56, 8, "A2 E3", velocity: 0.6);

// Pattern end
var end = song.Pattern(bars: 4);
end.Play(right, 0, 16, "D4 F#4 A4 D5");
end.Play(left, 0, 16, "D2 A2 D3", velocity: 0.6);

// The arrangement: the patterns in the order they play (32 bars, 1:47)
song.Arrange(ground, one, two, three, four, five, six, end);

// The master: volume, and how much reverb and delay come back
song.Volume = 1;
song.Reverb = 0.9;

song.Play();
