// PetarByte Beats: this song, written as C# code.
// Channels are the sounds, patterns are a few bars each, the arrangement plays them in order.
var song = new Song(bpm: 70, swing: 0, key: "D major");

// Channels: one sound each, with its mixer settings below it
var right = song.Instrument(Instruments.GrandPiano);
right.Volume = 1;
right.Reverb = 0.35;
var left = song.Instrument(Instruments.GrandPiano);
left.Volume = 0.9;
left.Reverb = 0.35;

// Pattern rock: Hits(drum, steps) with x = hit, X = loud, . = rest. Play(instrument, step, length, notes).
var rock = song.Pattern(bars: 3);
rock.Play(left, 0, 12, "G2", velocity: 0.6);
rock.Play(left, 4, 8, "B3 D4 F#4", velocity: 0.6);
rock.Play(left, 12, 12, "D2", velocity: 0.6);
// rock, bar 2
rock.Play(left, 16, 8, "A3 C#4 F#4", velocity: 0.6);
rock.Play(left, 24, 12, "G2", velocity: 0.6);
rock.Play(left, 28, 8, "B3 D4 F#4", velocity: 0.6);
// rock, bar 3
rock.Play(left, 36, 12, "D2", velocity: 0.6);
rock.Play(left, 40, 8, "A3 C#4 F#4", velocity: 0.6);

// Pattern tune1
var tune1 = song.Pattern(bars: 3);
tune1.Play(right, 0, 4, "F#5");
tune1.Play(right, 4, 4, "A5");
tune1.Play(right, 8, 4, "G5");
tune1.Play(right, 12, 4, "F#5");
// tune1, bar 2
tune1.Play(right, 16, 4, "C#5");
tune1.Play(right, 20, 4, "B4");
tune1.Play(right, 24, 4, "C#5");
tune1.Play(right, 28, 4, "D5");
// tune1, bar 3
tune1.Play(right, 32, 4, "A4");
tune1.Play(right, 36, 12, "F#4");
tune1.Play(left, 0, 12, "G2", velocity: 0.6);
tune1.Play(left, 4, 8, "B3 D4 F#4", velocity: 0.6);
tune1.Play(left, 12, 12, "D2", velocity: 0.6);
// tune1, bar 2
tune1.Play(left, 16, 8, "A3 C#4 F#4", velocity: 0.6);
tune1.Play(left, 24, 12, "G2", velocity: 0.6);
tune1.Play(left, 28, 8, "B3 D4 F#4", velocity: 0.6);
// tune1, bar 3
tune1.Play(left, 36, 12, "D2", velocity: 0.6);
tune1.Play(left, 40, 8, "A3 C#4 F#4", velocity: 0.6);

// Pattern tune2
var tune2 = song.Pattern(bars: 3);
tune2.Play(right, 0, 12, "F#4");
tune2.Play(right, 12, 12, "F#4");
tune2.Play(left, 0, 12, "G2", velocity: 0.6);
tune2.Play(left, 4, 8, "B3 D4 F#4", velocity: 0.6);
tune2.Play(left, 12, 12, "D2", velocity: 0.6);
// tune2, bar 2
tune2.Play(left, 16, 8, "A3 C#4 F#4", velocity: 0.6);
tune2.Play(left, 24, 12, "G2", velocity: 0.6);
tune2.Play(left, 28, 8, "B3 D4 F#4", velocity: 0.6);
// tune2, bar 3
tune2.Play(left, 36, 12, "D2", velocity: 0.6);
tune2.Play(left, 40, 8, "A3 C#4 F#4", velocity: 0.6);

// Pattern tune3
var tune3 = song.Pattern(bars: 3);
tune3.Play(right, 0, 4, "F#5");
tune3.Play(right, 4, 4, "A5");
tune3.Play(right, 8, 4, "G5");
tune3.Play(right, 12, 4, "F#5");
// tune3, bar 2
tune3.Play(right, 16, 4, "C#5");
tune3.Play(right, 20, 4, "B4");
tune3.Play(right, 24, 4, "C#5");
tune3.Play(right, 28, 4, "D5");
// tune3, bar 3
tune3.Play(right, 32, 4, "A4");
tune3.Play(right, 36, 12, "C#5");
tune3.Play(left, 0, 12, "G2", velocity: 0.6);
tune3.Play(left, 4, 8, "B3 D4 F#4", velocity: 0.6);
tune3.Play(left, 12, 12, "D2", velocity: 0.6);
// tune3, bar 2
tune3.Play(left, 16, 8, "A3 C#4 F#4", velocity: 0.6);
tune3.Play(left, 24, 12, "G2", velocity: 0.6);
tune3.Play(left, 28, 8, "B3 D4 F#4", velocity: 0.6);
// tune3, bar 3
tune3.Play(left, 36, 12, "D2", velocity: 0.6);
tune3.Play(left, 40, 8, "A3 C#4 F#4", velocity: 0.6);

// Pattern tune4
var tune4 = song.Pattern(bars: 3);
tune4.Play(right, 0, 12, "F#5");
tune4.Play(right, 12, 12, "E5");
tune4.Play(left, 0, 12, "G2", velocity: 0.6);
tune4.Play(left, 4, 8, "B3 D4 F#4", velocity: 0.6);
tune4.Play(left, 12, 12, "D2", velocity: 0.6);
// tune4, bar 2
tune4.Play(left, 16, 8, "A3 C#4 F#4", velocity: 0.6);
tune4.Play(left, 24, 12, "G2", velocity: 0.6);
tune4.Play(left, 28, 8, "B3 D4 F#4", velocity: 0.6);
// tune4, bar 3
tune4.Play(left, 36, 12, "D2", velocity: 0.6);
tune4.Play(left, 40, 8, "A3 C#4 F#4", velocity: 0.6);

// Pattern end
var end = song.Pattern(bars: 3);
end.Play(right, 0, 12, "F#5");
end.Play(right, 12, 12, "D5");
// end, bar 3
end.Play(right, 36, 12, "D4 F#4 A4");
end.Play(left, 0, 12, "G2", velocity: 0.6);
end.Play(left, 4, 8, "B3 D4 F#4", velocity: 0.6);
end.Play(left, 12, 12, "D2", velocity: 0.6);
// end, bar 2
end.Play(left, 16, 8, "A3 C#4 F#4", velocity: 0.6);
// end, bar 3
end.Play(left, 36, 12, "D2 A2", velocity: 0.6);

// The arrangement: the patterns in the order they play (33 bars, 1:53)
song.Arrange(rock, tune1, tune2, tune3, tune4, rock, tune1, tune2,
    tune3, tune4, end);

// The master: volume, and how much reverb and delay come back
song.Volume = 1;
song.Reverb = 0.9;

song.Play();
