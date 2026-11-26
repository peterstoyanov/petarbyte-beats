// PetarByte Beats: this song, written as C# code.
// Channels are the sounds, patterns are a few bars each, the arrangement plays them in order.
var song = new Song(bpm: 104, swing: 15, key: "A minor");

// Channels: one sound each, with its mixer settings below it
var kick = song.Drum(Drums.Kick909);
kick.Volume = 0.85;
var rim = song.Drum(Drums.Rimshot);
rim.Volume = 0.5;
var clap = song.Drum(Drums.Clap);
clap.Volume = 0.4;
clap.Reverb = 0.2;
var shaker = song.Drum(Drums.Shaker);
shaker.Volume = 0.4;
var conga = song.Drum(Drums.Conga);
conga.Volume = 0.55;
var bass = song.Instrument(Instruments.Bass808);
bass.Volume = 0.75;
var keys = song.Instrument(Instruments.ElectricPiano);
keys.Volume = 0.6;
keys.Reverb = 0.25;
var pluck = song.Instrument(Instruments.Pluck);
pluck.Volume = 0.55;
pluck.Reverb = 0.2;
pluck.Delay = 0.2;

// Pattern intro: Hits(drum, steps) with x = hit, X = loud, . = rest. Play(instrument, step, length, notes).
var intro = song.Pattern(bars: 4);
intro.Hits(shaker, "x.xxx.xxx.xxx.xx|x.xxx.xxx.xxx.xx|x.xxx.xxx.xxx.xx|x.xxx.xxx.xxx.xx");
intro.Hits(conga,  "...x..x....x.x..|...x..x....x.x..|...x..x....x.x..|...x..x....x.x..");
intro.Play(keys, 0, 3, "A3 C4 E4", velocity: 0.55);
intro.Play(keys, 6, 3, "A3 C4 E4", velocity: 0.55);
intro.Play(keys, 10, 3, "A3 C4 E4", velocity: 0.55);
// intro, bar 2
intro.Play(keys, 16, 3, "F3 A3 C4", velocity: 0.55);
intro.Play(keys, 22, 3, "F3 A3 C4", velocity: 0.55);
intro.Play(keys, 26, 3, "F3 A3 C4", velocity: 0.55);
// intro, bar 3
intro.Play(keys, 32, 3, "C4 E4 G4", velocity: 0.55);
intro.Play(keys, 38, 3, "C4 E4 G4", velocity: 0.55);
intro.Play(keys, 42, 3, "C4 E4 G4", velocity: 0.55);
// intro, bar 4
intro.Play(keys, 48, 3, "G3 B3 D4", velocity: 0.55);
intro.Play(keys, 54, 3, "G3 B3 D4", velocity: 0.55);
intro.Play(keys, 58, 3, "G3 B3 D4", velocity: 0.55);

// Pattern verse
var verse = song.Pattern(bars: 4);
verse.Hits(kick,   "x......x..x.....|x......x..x.....|x......x..x.....|x......x..x.....");
verse.Hits(rim,    "....x..x....x...|....x..x....x...|....x..x....x...|....x..x....x...");
verse.Hits(shaker, "x.xxx.xxx.xxx.xx|x.xxx.xxx.xxx.xx|x.xxx.xxx.xxx.xx|x.xxx.xxx.xxx.xx");
verse.Hits(conga,  "...x..x....x.x..|...x..x...xx.x..|...x..x....x.x..|...x..x...xx.x..");
verse.Play(bass, 0, 3, "A1", velocity: 0.85);
verse.Play(bass, 7, 2, "A1", velocity: 0.85);
verse.Play(bass, 10, 3, "A2", velocity: 0.85);
// verse, bar 2
verse.Play(bass, 16, 3, "F1", velocity: 0.85);
verse.Play(bass, 23, 2, "F1", velocity: 0.85);
verse.Play(bass, 26, 3, "F2", velocity: 0.85);
// verse, bar 3
verse.Play(bass, 32, 3, "C2", velocity: 0.85);
verse.Play(bass, 39, 2, "C2", velocity: 0.85);
verse.Play(bass, 42, 3, "C3", velocity: 0.85);
// verse, bar 4
verse.Play(bass, 48, 3, "G1", velocity: 0.85);
verse.Play(bass, 55, 2, "G1", velocity: 0.85);
verse.Play(bass, 58, 3, "G2", velocity: 0.85);
verse.Play(keys, 0, 3, "A3 C4 E4", velocity: 0.5);
verse.Play(keys, 6, 3, "A3 C4 E4", velocity: 0.5);
verse.Play(keys, 10, 3, "A3 C4 E4", velocity: 0.5);
// verse, bar 2
verse.Play(keys, 16, 3, "F3 A3 C4", velocity: 0.5);
verse.Play(keys, 22, 3, "F3 A3 C4", velocity: 0.5);
verse.Play(keys, 26, 3, "F3 A3 C4", velocity: 0.5);
// verse, bar 3
verse.Play(keys, 32, 3, "C4 E4 G4", velocity: 0.5);
verse.Play(keys, 38, 3, "C4 E4 G4", velocity: 0.5);
verse.Play(keys, 42, 3, "C4 E4 G4", velocity: 0.5);
// verse, bar 4
verse.Play(keys, 48, 3, "G3 B3 D4", velocity: 0.5);
verse.Play(keys, 54, 3, "G3 B3 D4", velocity: 0.5);
verse.Play(keys, 58, 3, "G3 B3 D4", velocity: 0.5);

// Pattern hook
var hook = song.Pattern(bars: 4);
hook.Hits(kick,   "x......x..x.....|x......x..x.....|x......x..x.....|x......x..x.....");
hook.Hits(rim,    "....x..x....x...|....x..x....x...|....x..x....x...|....x..x....x...");
hook.Hits(clap,   "....x.......x...|....x.......x...|....x.......x...|....x.......x...");
hook.Hits(shaker, "x.xxx.xxx.xxx.xx|x.xxx.xxx.xxx.xx|x.xxx.xxx.xxx.xx|x.xxx.xxx.xxx.xx");
hook.Hits(conga,  "...x..x....x.x..|...x..x...xx.x..|...x..x....x.x..|...x..x...xx.x..");
hook.Play(bass, 0, 3, "A1", velocity: 0.85);
hook.Play(bass, 7, 2, "A1", velocity: 0.85);
hook.Play(bass, 10, 3, "A2", velocity: 0.85);
// hook, bar 2
hook.Play(bass, 16, 3, "F1", velocity: 0.85);
hook.Play(bass, 23, 2, "F1", velocity: 0.85);
hook.Play(bass, 26, 3, "F2", velocity: 0.85);
// hook, bar 3
hook.Play(bass, 32, 3, "C2", velocity: 0.85);
hook.Play(bass, 39, 2, "C2", velocity: 0.85);
hook.Play(bass, 42, 3, "C3", velocity: 0.85);
// hook, bar 4
hook.Play(bass, 48, 3, "G1", velocity: 0.85);
hook.Play(bass, 55, 2, "G1", velocity: 0.85);
hook.Play(bass, 58, 3, "G2", velocity: 0.85);
hook.Play(keys, 0, 3, "A3 C4 E4", velocity: 0.45);
hook.Play(keys, 6, 3, "A3 C4 E4", velocity: 0.45);
hook.Play(keys, 10, 3, "A3 C4 E4", velocity: 0.45);
// hook, bar 2
hook.Play(keys, 16, 3, "F3 A3 C4", velocity: 0.45);
hook.Play(keys, 22, 3, "F3 A3 C4", velocity: 0.45);
hook.Play(keys, 26, 3, "F3 A3 C4", velocity: 0.45);
// hook, bar 3
hook.Play(keys, 32, 3, "C4 E4 G4", velocity: 0.45);
hook.Play(keys, 38, 3, "C4 E4 G4", velocity: 0.45);
hook.Play(keys, 42, 3, "C4 E4 G4", velocity: 0.45);
// hook, bar 4
hook.Play(keys, 48, 3, "G3 B3 D4", velocity: 0.45);
hook.Play(keys, 54, 3, "G3 B3 D4", velocity: 0.45);
hook.Play(keys, 58, 3, "G3 B3 D4", velocity: 0.45);
hook.Play(pluck, 0, 2, "E5");
hook.Play(pluck, 2, 2, "G5");
hook.Play(pluck, 4, 2, "E5");
hook.Play(pluck, 6, 4, "D5");
hook.Play(pluck, 10, 2, "C5");
hook.Play(pluck, 12, 4, "A4");
// hook, bar 2
hook.Play(pluck, 16, 2, "C5");
hook.Play(pluck, 18, 2, "D5");
hook.Play(pluck, 20, 4, "C5");
hook.Play(pluck, 24, 2, "A4");
hook.Play(pluck, 26, 2, "G4");
hook.Play(pluck, 28, 4, "A4");
// hook, bar 3
hook.Play(pluck, 32, 2, "E5");
hook.Play(pluck, 34, 2, "G5");
hook.Play(pluck, 36, 2, "A5");
hook.Play(pluck, 38, 4, "G5");
hook.Play(pluck, 42, 2, "E5");
hook.Play(pluck, 44, 4, "G5");
// hook, bar 4
hook.Play(pluck, 48, 4, "D5");
hook.Play(pluck, 52, 2, "E5");
hook.Play(pluck, 54, 2, "D5");
hook.Play(pluck, 56, 8, "B4");

// Pattern brk
var brk = song.Pattern(bars: 4);
brk.Hits(conga, "...x..x....x.x..|...x..x....x.x..|...x..x....x.x..|...x..x....x.x..");
brk.Play(keys, 0, 16, "A3 C4 E4", velocity: 0.45);
// brk, bar 2
brk.Play(keys, 16, 16, "F3 A3 C4", velocity: 0.45);
// brk, bar 3
brk.Play(keys, 32, 16, "C4 E4 G4", velocity: 0.45);
// brk, bar 4
brk.Play(keys, 48, 16, "G3 B3 D4", velocity: 0.45);
brk.Play(pluck, 0, 8, "E5");
// brk, bar 2
brk.Play(pluck, 16, 8, "C5");
// brk, bar 3
brk.Play(pluck, 32, 8, "G5");
// brk, bar 4
brk.Play(pluck, 48, 16, "B4");

// Pattern outro
var outro = song.Pattern(bars: 4);
outro.Hits(shaker, "x.xxx.xxx.xxx.xx|x.xxx.xxx.xxx.xx|x.xxx.xxx.xxx.xx|x.xxx.xxx.xxx.xx");
outro.Play(keys, 0, 3, "A3 C4 E4", velocity: 0.4);
outro.Play(keys, 6, 3, "A3 C4 E4", velocity: 0.4);
outro.Play(keys, 10, 3, "A3 C4 E4", velocity: 0.4);
// outro, bar 2
outro.Play(keys, 16, 3, "F3 A3 C4", velocity: 0.4);
outro.Play(keys, 22, 3, "F3 A3 C4", velocity: 0.4);
outro.Play(keys, 26, 3, "F3 A3 C4", velocity: 0.4);
// outro, bar 3
outro.Play(keys, 32, 3, "C4 E4 G4", velocity: 0.4);
outro.Play(keys, 38, 3, "C4 E4 G4", velocity: 0.4);
outro.Play(keys, 42, 3, "C4 E4 G4", velocity: 0.4);
// outro, bar 4
outro.Play(keys, 48, 3, "G3 B3 D4", velocity: 0.4);
outro.Play(keys, 54, 3, "G3 B3 D4", velocity: 0.4);
outro.Play(keys, 58, 3, "G3 B3 D4", velocity: 0.4);
outro.Play(pluck, 0, 2, "E5", velocity: 0.45);
outro.Play(pluck, 2, 2, "G5", velocity: 0.45);
outro.Play(pluck, 4, 2, "E5", velocity: 0.45);
outro.Play(pluck, 6, 4, "D5", velocity: 0.45);
outro.Play(pluck, 10, 2, "C5", velocity: 0.45);
outro.Play(pluck, 12, 4, "A4", velocity: 0.45);
// outro, bar 2
outro.Play(pluck, 16, 2, "C5", velocity: 0.45);
outro.Play(pluck, 18, 2, "D5", velocity: 0.45);
outro.Play(pluck, 20, 4, "C5", velocity: 0.45);
outro.Play(pluck, 24, 2, "A4", velocity: 0.45);
outro.Play(pluck, 26, 2, "G4", velocity: 0.45);
outro.Play(pluck, 28, 4, "A4", velocity: 0.45);
// outro, bar 3
outro.Play(pluck, 32, 2, "E5", velocity: 0.45);
outro.Play(pluck, 34, 2, "G5", velocity: 0.45);
outro.Play(pluck, 36, 2, "A5", velocity: 0.45);
outro.Play(pluck, 38, 4, "G5", velocity: 0.45);
outro.Play(pluck, 42, 2, "E5", velocity: 0.45);
outro.Play(pluck, 44, 4, "G5", velocity: 0.45);
// outro, bar 4
outro.Play(pluck, 48, 4, "D5", velocity: 0.45);
outro.Play(pluck, 52, 2, "E5", velocity: 0.45);
outro.Play(pluck, 54, 2, "D5", velocity: 0.45);
outro.Play(pluck, 56, 8, "B4", velocity: 0.45);

// The arrangement: the patterns in the order they play (40 bars, 1:32)
song.Arrange(intro, verse, verse, hook, hook, brk, verse, hook,
    hook, outro);

song.Play();
