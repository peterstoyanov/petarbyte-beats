// PetarByte Beats: this song, written as C# code.
// Channels are the sounds, patterns are a few bars each, the arrangement plays them in order.
var song = new Song(bpm: 82, swing: 40, key: "F major");

// Channels: one sound each, with its mixer settings below it
var kick = song.Drum(Drums.LofiKick);
kick.Volume = 0.9;
var snare = song.Drum(Drums.Snare808);
snare.Volume = 0.55;
snare.Reverb = 0.35;
snare.Cutoff = 0.65;
var hat = song.Drum(Drums.Hat808);
hat.Volume = 0.3;
hat.Cutoff = 0.7;
var shaker = song.Drum(Drums.Shaker);
shaker.Volume = 0.3;
var keys = song.Instrument(Instruments.ElectricPiano);
keys.Volume = 0.75;
keys.Reverb = 0.3;
keys.Cutoff = 0.6;
var bell = song.Instrument(Instruments.Bell);
bell.Volume = 0.45;
bell.Reverb = 0.45;
bell.Delay = 0.2;
var sub = song.Instrument(Instruments.SubBass);
sub.Volume = 0.7;

// Pattern intro: Hits(drum, steps) with x = hit, X = loud, . = rest. Play(instrument, step, length, notes).
var intro = song.Pattern(bars: 4);
intro.Hits(shaker, "..x...x...x...x.|..x...x...x...x.|..x...x...x...x.|..x...x...x...x.");
intro.Play(keys, 0, 14, "F3 A3 C4 E4", velocity: 0.55);
// intro, bar 2
intro.Play(keys, 16, 14, "E3 G3 B3 D4", velocity: 0.55);
// intro, bar 3
intro.Play(keys, 32, 14, "D3 F3 A3 C4", velocity: 0.55);
// intro, bar 4
intro.Play(keys, 48, 14, "C3 E3 G3 B3", velocity: 0.55);

// Pattern a
var a = song.Pattern(bars: 4);
a.Hits(kick,  "x......x..x.....|x.......x.x.....|x......x..x.....|x.......x.x.....");
a.Hits(snare, "....x.......x...|....x.......x...|....x.......x...|....x.......x...");
a.Hits(hat,   "x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.");
a.Play(keys, 0, 6, "F3 A3 C4 E4", velocity: 0.55);
a.Play(keys, 10, 6, "F3 A3 C4 E4", velocity: 0.55);
// a, bar 2
a.Play(keys, 16, 6, "E3 G3 B3 D4", velocity: 0.55);
a.Play(keys, 26, 6, "E3 G3 B3 D4", velocity: 0.55);
// a, bar 3
a.Play(keys, 32, 6, "D3 F3 A3 C4", velocity: 0.55);
a.Play(keys, 42, 6, "D3 F3 A3 C4", velocity: 0.55);
// a, bar 4
a.Play(keys, 48, 6, "C3 E3 G3 B3", velocity: 0.55);
a.Play(keys, 58, 6, "C3 E3 G3 B3", velocity: 0.55);
a.Play(sub, 0, 6, "F1", velocity: 0.85);
a.Play(sub, 10, 4, "F1", velocity: 0.85);
// a, bar 2
a.Play(sub, 16, 6, "E2", velocity: 0.85);
a.Play(sub, 26, 4, "E2", velocity: 0.85);
// a, bar 3
a.Play(sub, 32, 6, "D2", velocity: 0.85);
a.Play(sub, 42, 4, "D2", velocity: 0.85);
// a, bar 4
a.Play(sub, 48, 6, "C2", velocity: 0.85);
a.Play(sub, 58, 4, "C2", velocity: 0.85);

// Pattern b
var b = song.Pattern(bars: 4);
b.Hits(kick,   "x......x..x.....|x.......x.x.....|x......x..x.....|x.......x.x.....");
b.Hits(snare,  "....x.......x...|....x.......x...|....x.......x...|....x.......x...");
b.Hits(hat,    "x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.");
b.Hits(shaker, "..x...x...x...x.|..x...x...x...x.|..x...x...x...x.|..x...x...x...x.");
b.Play(keys, 0, 6, "F3 A3 C4 E4", velocity: 0.5);
b.Play(keys, 10, 6, "F3 A3 C4 E4", velocity: 0.5);
// b, bar 2
b.Play(keys, 16, 6, "E3 G3 B3 D4", velocity: 0.5);
b.Play(keys, 26, 6, "E3 G3 B3 D4", velocity: 0.5);
// b, bar 3
b.Play(keys, 32, 6, "D3 F3 A3 C4", velocity: 0.5);
b.Play(keys, 42, 6, "D3 F3 A3 C4", velocity: 0.5);
// b, bar 4
b.Play(keys, 48, 6, "C3 E3 G3 B3", velocity: 0.5);
b.Play(keys, 58, 6, "C3 E3 G3 B3", velocity: 0.5);
b.Play(bell, 0, 2, "C6");
b.Play(bell, 2, 2, "A5");
b.Play(bell, 4, 4, "G5");
b.Play(bell, 8, 4, "E5");
b.Play(bell, 12, 4, "F5");
// b, bar 2
b.Play(bell, 16, 6, "G5");
b.Play(bell, 24, 2, "E5");
b.Play(bell, 26, 2, "D5");
b.Play(bell, 28, 4, "B4");
// b, bar 3
b.Play(bell, 32, 2, "A5");
b.Play(bell, 34, 2, "C6");
b.Play(bell, 36, 4, "A5");
b.Play(bell, 40, 2, "G5");
b.Play(bell, 42, 2, "F5");
b.Play(bell, 44, 4, "D5");
// b, bar 4
b.Play(bell, 48, 8, "E5");
b.Play(bell, 56, 8, "C5");
b.Play(sub, 0, 6, "F1", velocity: 0.85);
b.Play(sub, 10, 4, "F1", velocity: 0.85);
// b, bar 2
b.Play(sub, 16, 6, "E2", velocity: 0.85);
b.Play(sub, 26, 4, "E2", velocity: 0.85);
// b, bar 3
b.Play(sub, 32, 6, "D2", velocity: 0.85);
b.Play(sub, 42, 4, "D2", velocity: 0.85);
// b, bar 4
b.Play(sub, 48, 6, "C2", velocity: 0.85);
b.Play(sub, 58, 4, "C2", velocity: 0.85);

// Pattern brk
var brk = song.Pattern(bars: 4);
brk.Play(keys, 0, 16, "F3 A3 C4 E4", velocity: 0.45);
// brk, bar 2
brk.Play(keys, 16, 16, "E3 G3 B3 D4", velocity: 0.45);
// brk, bar 3
brk.Play(keys, 32, 16, "D3 F3 A3 C4", velocity: 0.45);
// brk, bar 4
brk.Play(keys, 48, 16, "C3 E3 G3 B3", velocity: 0.45);
brk.Play(bell, 0, 8, "C6");
// brk, bar 2
brk.Play(bell, 16, 8, "B5");
// brk, bar 3
brk.Play(bell, 32, 8, "A5");
// brk, bar 4
brk.Play(bell, 48, 16, "G5");

// Pattern outro
var outro = song.Pattern(bars: 4);
outro.Play(keys, 0, 16, "F3 A3 C4 E4", velocity: 0.4);
// outro, bar 2
outro.Play(keys, 16, 16, "E3 G3 B3 D4", velocity: 0.4);
// outro, bar 3
outro.Play(keys, 32, 16, "D3 F3 A3 C4", velocity: 0.4);
// outro, bar 4
outro.Play(keys, 48, 16, "C3 E3 G3 B3", velocity: 0.4);
outro.Play(bell, 0, 2, "C6", velocity: 0.4);
outro.Play(bell, 2, 2, "A5", velocity: 0.4);
outro.Play(bell, 4, 4, "G5", velocity: 0.4);
outro.Play(bell, 8, 4, "E5", velocity: 0.4);
outro.Play(bell, 12, 4, "F5", velocity: 0.4);
// outro, bar 2
outro.Play(bell, 16, 6, "G5", velocity: 0.4);
outro.Play(bell, 24, 2, "E5", velocity: 0.4);
outro.Play(bell, 26, 2, "D5", velocity: 0.4);
outro.Play(bell, 28, 4, "B4", velocity: 0.4);
// outro, bar 3
outro.Play(bell, 32, 2, "A5", velocity: 0.4);
outro.Play(bell, 34, 2, "C6", velocity: 0.4);
outro.Play(bell, 36, 4, "A5", velocity: 0.4);
outro.Play(bell, 40, 2, "G5", velocity: 0.4);
outro.Play(bell, 42, 2, "F5", velocity: 0.4);
outro.Play(bell, 44, 4, "D5", velocity: 0.4);
// outro, bar 4
outro.Play(bell, 48, 8, "E5", velocity: 0.4);
outro.Play(bell, 56, 8, "C5", velocity: 0.4);

// The arrangement: the patterns in the order they play (36 bars, 1:45)
song.Arrange(intro, a, a, b, b, brk, a, b,
    outro);

// The master: volume, and how much reverb and delay come back
song.Reverb = 0.9;

song.Play();
