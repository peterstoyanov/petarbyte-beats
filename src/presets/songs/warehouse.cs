// PetarByte Beats: this song, written as C# code.
// Channels are the sounds, patterns are a few bars each, the arrangement plays them in order.
var song = new Song(bpm: 124, swing: 0, key: "F minor");

// Channels: one sound each, with its mixer settings below it
var kick = song.Drum(Drums.Kick909);
kick.Volume = 0.9;
var clap = song.Drum(Drums.Clap);
clap.Volume = 0.6;
clap.Reverb = 0.2;
var hat = song.Drum(Drums.Hat909);
hat.Volume = 0.3;
var openhat = song.Drum(Drums.OpenHat909);
openhat.Volume = 0.4;
var ride = song.Drum(Drums.Ride);
ride.Volume = 0.25;
var crash = song.Drum(Drums.Crash);
crash.Volume = 0.35;
var piano = song.Instrument(Instruments.GrandPiano);
piano.Volume = 0.75;
piano.Reverb = 0.25;
piano.Sidechain = 0.25;
var pad = song.Instrument(Instruments.WarmPad);
pad.Volume = 0.45;
pad.Reverb = 0.35;
pad.Sidechain = 0.75;
var sub = song.Instrument(Instruments.SubBass);
sub.Volume = 0.75;
sub.Sidechain = 0.6;

// Pattern intro: Hits(drum, steps) with x = hit, X = loud, . = rest. Play(instrument, step, length, notes).
var intro = song.Pattern(bars: 4);
intro.Hits(kick, "x...x...x...x...|x...x...x...x...|x...x...x...x...|x...x...x...x...");
intro.Hits(hat,  "xx.xxx.xxx.xxx.x|xx.xxx.xxx.xxx.x|xx.xxx.xxx.xxx.x|xx.xxx.xxx.xxx.x");
intro.Play(pad, 0, 16, "F3 G#3 C4 D#4", velocity: 0.4);
// intro, bar 2
intro.Play(pad, 16, 16, "F3 G#3 C4 D#4", velocity: 0.4);
// intro, bar 3
intro.Play(pad, 32, 16, "C#3 F3 G#3 C4", velocity: 0.4);
// intro, bar 4
intro.Play(pad, 48, 16, "D#3 G3 A#3 D4", velocity: 0.4);

// Pattern groove
var groove = song.Pattern(bars: 4);
groove.Hits(kick,    "x...x...x...x...|x...x...x...x...|x...x...x...x...|x...x...x...x...");
groove.Hits(clap,    "....x.......x...|....x.......x...|....x.......x...|....x.......x...");
groove.Hits(hat,     "xx.xxx.xxx.xxx.x|xx.xxx.xxx.xxx.x|xx.xxx.xxx.xxx.x|xx.xxx.xxx.xxx.x");
groove.Hits(openhat, "..x...x...x...x.|..x...x...x...x.|..x...x...x...x.|..x...x...x...x.");
groove.Play(pad, 0, 16, "F3 G#3 C4 D#4", velocity: 0.45);
// groove, bar 2
groove.Play(pad, 16, 16, "F3 G#3 C4 D#4", velocity: 0.45);
// groove, bar 3
groove.Play(pad, 32, 16, "C#3 F3 G#3 C4", velocity: 0.45);
// groove, bar 4
groove.Play(pad, 48, 16, "D#3 G3 A#3 D4", velocity: 0.45);
groove.Play(sub, 2, 2, "F1", velocity: 0.85);
groove.Play(sub, 6, 2, "F1", velocity: 0.85);
groove.Play(sub, 10, 2, "F1", velocity: 0.85);
groove.Play(sub, 14, 2, "F1", velocity: 0.85);
// groove, bar 2
groove.Play(sub, 18, 2, "F1", velocity: 0.85);
groove.Play(sub, 22, 2, "F1", velocity: 0.85);
groove.Play(sub, 26, 2, "F1", velocity: 0.85);
groove.Play(sub, 30, 2, "F1", velocity: 0.85);
// groove, bar 3
groove.Play(sub, 34, 2, "C#1", velocity: 0.85);
groove.Play(sub, 38, 2, "C#1", velocity: 0.85);
groove.Play(sub, 42, 2, "C#1", velocity: 0.85);
groove.Play(sub, 46, 2, "C#1", velocity: 0.85);
// groove, bar 4
groove.Play(sub, 50, 2, "D#1", velocity: 0.85);
groove.Play(sub, 54, 2, "D#1", velocity: 0.85);
groove.Play(sub, 58, 2, "D#1", velocity: 0.85);
groove.Play(sub, 62, 2, "D#1", velocity: 0.85);

// Pattern stabs
var stabs = song.Pattern(bars: 4);
stabs.Hits(kick,    "x...x...x...x...|x...x...x...x...|x...x...x...x...|x...x...x...x...");
stabs.Hits(clap,    "....x.......x...|....x.......x...|....x.......x...|....x.......x...");
stabs.Hits(hat,     "xx.xxx.xxx.xxx.x|xx.xxx.xxx.xxx.x|xx.xxx.xxx.xxx.x|xx.xxx.xxx.xxx.x");
stabs.Hits(openhat, "..x...x...x...x.|..x...x...x...x.|..x...x...x...x.|..x...x...x...x.");
stabs.Hits(ride,    "x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.");
stabs.Hits(crash,   "x...............|................|................|................");
stabs.Play(piano, 2, 2, "F3 G#3 C4 D#4", velocity: 0.75);
stabs.Play(piano, 6, 1, "F3 G#3 C4 D#4", velocity: 0.75);
stabs.Play(piano, 7, 2, "F3 G#3 C4 D#4", velocity: 0.75);
stabs.Play(piano, 11, 1, "F3 G#3 C4 D#4", velocity: 0.75);
stabs.Play(piano, 13, 2, "F3 G#3 C4 D#4", velocity: 0.75);
// stabs, bar 2
stabs.Play(piano, 18, 2, "F3 G#3 C4 D#4", velocity: 0.75);
stabs.Play(piano, 22, 1, "F3 G#3 C4 D#4", velocity: 0.75);
stabs.Play(piano, 23, 2, "F3 G#3 C4 D#4", velocity: 0.75);
stabs.Play(piano, 27, 1, "F3 G#3 C4 D#4", velocity: 0.75);
stabs.Play(piano, 29, 2, "F3 G#3 C4 D#4", velocity: 0.75);
// stabs, bar 3
stabs.Play(piano, 34, 2, "C#3 F3 G#3 C4", velocity: 0.75);
stabs.Play(piano, 38, 1, "C#3 F3 G#3 C4", velocity: 0.75);
stabs.Play(piano, 39, 2, "C#3 F3 G#3 C4", velocity: 0.75);
stabs.Play(piano, 43, 1, "C#3 F3 G#3 C4", velocity: 0.75);
stabs.Play(piano, 45, 2, "C#3 F3 G#3 C4", velocity: 0.75);
// stabs, bar 4
stabs.Play(piano, 50, 2, "D#3 G3 A#3 D4", velocity: 0.75);
stabs.Play(piano, 54, 1, "D#3 G3 A#3 D4", velocity: 0.75);
stabs.Play(piano, 55, 2, "D#3 G3 A#3 D4", velocity: 0.75);
stabs.Play(piano, 59, 1, "D#3 G3 A#3 D4", velocity: 0.75);
stabs.Play(piano, 61, 2, "D#3 G3 A#3 D4", velocity: 0.75);
stabs.Play(pad, 0, 16, "F3 G#3 C4 D#4", velocity: 0.5);
// stabs, bar 2
stabs.Play(pad, 16, 16, "F3 G#3 C4 D#4", velocity: 0.5);
// stabs, bar 3
stabs.Play(pad, 32, 16, "C#3 F3 G#3 C4", velocity: 0.5);
// stabs, bar 4
stabs.Play(pad, 48, 16, "D#3 G3 A#3 D4", velocity: 0.5);
stabs.Play(sub, 2, 2, "F1", velocity: 0.85);
stabs.Play(sub, 6, 2, "F1", velocity: 0.85);
stabs.Play(sub, 10, 2, "F1", velocity: 0.85);
stabs.Play(sub, 14, 2, "F1", velocity: 0.85);
// stabs, bar 2
stabs.Play(sub, 18, 2, "F1", velocity: 0.85);
stabs.Play(sub, 22, 2, "F1", velocity: 0.85);
stabs.Play(sub, 26, 2, "F1", velocity: 0.85);
stabs.Play(sub, 30, 2, "F1", velocity: 0.85);
// stabs, bar 3
stabs.Play(sub, 34, 2, "C#1", velocity: 0.85);
stabs.Play(sub, 38, 2, "C#1", velocity: 0.85);
stabs.Play(sub, 42, 2, "C#1", velocity: 0.85);
stabs.Play(sub, 46, 2, "C#1", velocity: 0.85);
// stabs, bar 4
stabs.Play(sub, 50, 2, "D#1", velocity: 0.85);
stabs.Play(sub, 54, 2, "D#1", velocity: 0.85);
stabs.Play(sub, 58, 2, "D#1", velocity: 0.85);
stabs.Play(sub, 62, 2, "D#1", velocity: 0.85);

// Pattern build
var build = song.Pattern(bars: 4);
build.Hits(clap, "....x.......x...|..x...x...x...x.|x.x.x.x.x.x.x.x.|xxxxxxxxxxxxxxxx");
build.Hits(hat,  "xx.xxx.xxx.xxx.x|xx.xxx.xxx.xxx.x|xx.xxx.xxx.xxx.x|xx.xxx.xxx.xxx.x");
build.Play(piano, 0, 4, "F3 G#3 C4 D#4", velocity: 0.5);
build.Play(piano, 4, 4, "F3 G#3 C4 D#4", velocity: 0.5);
build.Play(piano, 8, 4, "F3 G#3 C4 D#4", velocity: 0.5);
build.Play(piano, 12, 4, "F3 G#3 C4 D#4", velocity: 0.5);
// build, bar 2
build.Play(piano, 16, 4, "F3 G#3 C4 D#4", velocity: 0.5);
build.Play(piano, 20, 4, "F3 G#3 C4 D#4", velocity: 0.5);
build.Play(piano, 24, 4, "F3 G#3 C4 D#4", velocity: 0.5);
build.Play(piano, 28, 4, "F3 G#3 C4 D#4", velocity: 0.5);
// build, bar 3
build.Play(piano, 32, 4, "C#3 F3 G#3 C4", velocity: 0.5);
build.Play(piano, 36, 4, "C#3 F3 G#3 C4", velocity: 0.5);
build.Play(piano, 40, 4, "C#3 F3 G#3 C4", velocity: 0.5);
build.Play(piano, 44, 4, "C#3 F3 G#3 C4", velocity: 0.5);
// build, bar 4
build.Play(piano, 48, 4, "D#3 G3 A#3 D4", velocity: 0.5);
build.Play(piano, 52, 4, "D#3 G3 A#3 D4", velocity: 0.5);
build.Play(piano, 56, 4, "D#3 G3 A#3 D4", velocity: 0.5);
build.Play(piano, 60, 4, "D#3 G3 A#3 D4", velocity: 0.5);
build.Play(pad, 0, 16, "F3 G#3 C4 D#4", velocity: 0.55);
// build, bar 2
build.Play(pad, 16, 16, "F3 G#3 C4 D#4", velocity: 0.55);
// build, bar 3
build.Play(pad, 32, 16, "C#3 F3 G#3 C4", velocity: 0.55);
// build, bar 4
build.Play(pad, 48, 16, "D#3 G3 A#3 D4", velocity: 0.55);

// The arrangement: the patterns in the order they play (48 bars, 1:33)
song.Arrange(intro, groove, groove, stabs, stabs, build, stabs, stabs,
    groove, stabs, stabs, intro);

song.Play();
