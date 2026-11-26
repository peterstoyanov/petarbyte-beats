// PetarByte Beats: this song, written as C# code.
// Channels are the sounds, patterns are a few bars each, the arrangement plays them in order.
var song = new Song(bpm: 128, swing: 0, key: "A minor");

// Channels: one sound each, with its mixer settings below it
var kick = song.Drum(Drums.Kick909);
kick.Volume = 0.9;
var clap = song.Drum(Drums.Clap);
clap.Volume = 0.5;
var hat = song.Drum(Drums.Hat909);
hat.Volume = 0.3;
var openhat = song.Drum(Drums.OpenHat909);
openhat.Volume = 0.38;
var ride = song.Drum(Drums.Ride);
ride.Volume = 0.22;
var acid = song.Instrument(Instruments.Acid303);
acid.Volume = 0.7;
acid.Delay = 0.15;
acid.Resonance = 0.5;
acid.Sidechain = 0.3;
var pad = song.Instrument(Instruments.WarmPad);
pad.Volume = 0.35;
pad.Reverb = 0.4;
pad.Sidechain = 0.7;

// Pattern intro: Hits(drum, steps) with x = hit, X = loud, . = rest. Play(instrument, step, length, notes).
var intro = song.Pattern(bars: 4);
intro.Hits(kick, "x...x...x...x...|x...x...x...x...|x...x...x...x...|x...x...x...x...");
intro.Hits(hat,  "x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.");
intro.Play(acid, 0, 1, "A1", velocity: 0.7);
intro.Play(acid, 1, 1, "A1", velocity: 0.5);
intro.Play(acid, 2, 1, "A2", velocity: 0.9);
intro.Play(acid, 3, 1, "A1", velocity: 0.5);
intro.Play(acid, 4, 1, "C2", velocity: 0.6);
intro.Play(acid, 5, 1, "A1", velocity: 0.5);
intro.Play(acid, 6, 2, "D#2", velocity: 0.7);
intro.Play(acid, 8, 1, "A1", velocity: 0.6);
intro.Play(acid, 9, 1, "A2", velocity: 0.7);
intro.Play(acid, 10, 1, "G1", velocity: 0.5);
intro.Play(acid, 11, 1, "A1", velocity: 0.7);
intro.Play(acid, 12, 1, "C2", velocity: 0.5);
intro.Play(acid, 13, 1, "A1", velocity: 0.9);
intro.Play(acid, 14, 1, "E2", velocity: 0.6);
intro.Play(acid, 15, 1, "G2", velocity: 0.7);
// intro, bar 2
intro.Play(acid, 16, 1, "A1", velocity: 0.7);
intro.Play(acid, 17, 1, "A1", velocity: 0.5);
intro.Play(acid, 18, 1, "A2", velocity: 0.9);
intro.Play(acid, 19, 1, "A1", velocity: 0.5);
intro.Play(acid, 20, 1, "C2", velocity: 0.6);
intro.Play(acid, 21, 1, "A1", velocity: 0.5);
intro.Play(acid, 22, 2, "D#2", velocity: 0.7);
intro.Play(acid, 24, 1, "A1", velocity: 0.6);
intro.Play(acid, 25, 1, "A2", velocity: 0.7);
intro.Play(acid, 26, 1, "G1", velocity: 0.5);
intro.Play(acid, 27, 1, "A1", velocity: 0.7);
intro.Play(acid, 28, 1, "C2", velocity: 0.5);
intro.Play(acid, 29, 1, "A1", velocity: 0.9);
intro.Play(acid, 30, 1, "E2", velocity: 0.6);
intro.Play(acid, 31, 1, "G2", velocity: 0.7);
// intro, bar 3
intro.Play(acid, 32, 1, "A1", velocity: 0.7);
intro.Play(acid, 33, 1, "A1", velocity: 0.5);
intro.Play(acid, 34, 1, "A2", velocity: 0.9);
intro.Play(acid, 35, 1, "A1", velocity: 0.5);
intro.Play(acid, 36, 1, "C2", velocity: 0.6);
intro.Play(acid, 37, 1, "A1", velocity: 0.5);
intro.Play(acid, 38, 2, "D#2", velocity: 0.7);
intro.Play(acid, 40, 1, "A1", velocity: 0.6);
intro.Play(acid, 41, 1, "A2", velocity: 0.7);
intro.Play(acid, 42, 1, "G1", velocity: 0.5);
intro.Play(acid, 43, 1, "A1", velocity: 0.7);
intro.Play(acid, 44, 1, "C2", velocity: 0.5);
intro.Play(acid, 45, 1, "A1", velocity: 0.9);
intro.Play(acid, 46, 1, "E2", velocity: 0.6);
intro.Play(acid, 47, 1, "G2", velocity: 0.7);
// intro, bar 4
intro.Play(acid, 48, 1, "A1", velocity: 0.7);
intro.Play(acid, 49, 1, "A1", velocity: 0.5);
intro.Play(acid, 50, 1, "A2", velocity: 0.9);
intro.Play(acid, 51, 1, "A1", velocity: 0.5);
intro.Play(acid, 52, 1, "C2", velocity: 0.6);
intro.Play(acid, 53, 1, "A1", velocity: 0.5);
intro.Play(acid, 54, 2, "D#2", velocity: 0.7);
intro.Play(acid, 56, 1, "A1", velocity: 0.6);
intro.Play(acid, 57, 1, "A2", velocity: 0.7);
intro.Play(acid, 58, 1, "G1", velocity: 0.5);
intro.Play(acid, 59, 1, "A1", velocity: 0.7);
intro.Play(acid, 60, 1, "C3", velocity: 0.9);
intro.Play(acid, 61, 1, "A2", velocity: 0.6);
intro.Play(acid, 62, 1, "G2");
intro.Play(acid, 63, 1, "E2", velocity: 0.7);

// Pattern groove
var groove = song.Pattern(bars: 4);
groove.Hits(kick,    "x...x...x...x...|x...x...x...x...|x...x...x...x...|x...x...x...x...");
groove.Hits(clap,    "....x.......x...|....x.......x...|....x.......x...|....x.......x...");
groove.Hits(hat,     "x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.");
groove.Hits(openhat, "..x...x...x...x.|..x...x...x...x.|..x...x...x...x.|..x...x...x...x.");
groove.Play(acid, 0, 1, "A1", velocity: 1);
groove.Play(acid, 1, 1, "A1", velocity: 0.5);
groove.Play(acid, 2, 1, "A2", velocity: 0.9);
groove.Play(acid, 3, 1, "A1", velocity: 0.5);
groove.Play(acid, 4, 1, "C2", velocity: 0.6);
groove.Play(acid, 5, 1, "A1", velocity: 0.5);
groove.Play(acid, 6, 2, "D#2", velocity: 1);
groove.Play(acid, 8, 1, "A1", velocity: 0.6);
groove.Play(acid, 9, 1, "A2", velocity: 1);
groove.Play(acid, 10, 1, "G1", velocity: 0.5);
groove.Play(acid, 11, 1, "A1", velocity: 0.7);
groove.Play(acid, 12, 1, "C2", velocity: 0.5);
groove.Play(acid, 13, 1, "A1", velocity: 0.9);
groove.Play(acid, 14, 1, "E2", velocity: 0.6);
groove.Play(acid, 15, 1, "G2", velocity: 1);
// groove, bar 2
groove.Play(acid, 16, 1, "A1", velocity: 1);
groove.Play(acid, 17, 1, "A1", velocity: 0.5);
groove.Play(acid, 18, 1, "A2", velocity: 0.9);
groove.Play(acid, 19, 1, "A1", velocity: 0.5);
groove.Play(acid, 20, 1, "C2", velocity: 0.6);
groove.Play(acid, 21, 1, "A1", velocity: 0.5);
groove.Play(acid, 22, 2, "D#2", velocity: 1);
groove.Play(acid, 24, 1, "A1", velocity: 0.6);
groove.Play(acid, 25, 1, "A2", velocity: 1);
groove.Play(acid, 26, 1, "G1", velocity: 0.5);
groove.Play(acid, 27, 1, "A1", velocity: 0.7);
groove.Play(acid, 28, 1, "C2", velocity: 0.5);
groove.Play(acid, 29, 1, "A1", velocity: 0.9);
groove.Play(acid, 30, 1, "E2", velocity: 0.6);
groove.Play(acid, 31, 1, "G2", velocity: 1);
// groove, bar 3
groove.Play(acid, 32, 1, "A1", velocity: 1);
groove.Play(acid, 33, 1, "A1", velocity: 0.5);
groove.Play(acid, 34, 1, "A2", velocity: 0.9);
groove.Play(acid, 35, 1, "A1", velocity: 0.5);
groove.Play(acid, 36, 1, "C2", velocity: 0.6);
groove.Play(acid, 37, 1, "A1", velocity: 0.5);
groove.Play(acid, 38, 2, "D#2", velocity: 1);
groove.Play(acid, 40, 1, "A1", velocity: 0.6);
groove.Play(acid, 41, 1, "A2", velocity: 1);
groove.Play(acid, 42, 1, "G1", velocity: 0.5);
groove.Play(acid, 43, 1, "A1", velocity: 0.7);
groove.Play(acid, 44, 1, "C2", velocity: 0.5);
groove.Play(acid, 45, 1, "A1", velocity: 0.9);
groove.Play(acid, 46, 1, "E2", velocity: 0.6);
groove.Play(acid, 47, 1, "G2", velocity: 1);
// groove, bar 4
groove.Play(acid, 48, 1, "A1", velocity: 1);
groove.Play(acid, 49, 1, "A1", velocity: 0.5);
groove.Play(acid, 50, 1, "A2", velocity: 0.9);
groove.Play(acid, 51, 1, "A1", velocity: 0.5);
groove.Play(acid, 52, 1, "C2", velocity: 0.6);
groove.Play(acid, 53, 1, "A1", velocity: 0.5);
groove.Play(acid, 54, 2, "D#2", velocity: 1);
groove.Play(acid, 56, 1, "A1", velocity: 0.6);
groove.Play(acid, 57, 1, "A2", velocity: 1);
groove.Play(acid, 58, 1, "G1", velocity: 0.5);
groove.Play(acid, 59, 1, "A1", velocity: 0.7);
groove.Play(acid, 60, 1, "C3", velocity: 0.9);
groove.Play(acid, 61, 1, "A2", velocity: 0.6);
groove.Play(acid, 62, 1, "G2");
groove.Play(acid, 63, 1, "E2", velocity: 1);

// Pattern peak
var peak = song.Pattern(bars: 4);
peak.Hits(kick,    "x...x...x...x...|x...x...x...x...|x...x...x...x...|x...x...x...x...");
peak.Hits(clap,    "....x.......x...|....x.......x...|....x.......x...|....x.......x...");
peak.Hits(hat,     "xxxxxxxxxxxxxxxx|xxxxxxxxxxxxxxxx|xxxxxxxxxxxxxxxx|xxxxxxxxxxxxxxxx");
peak.Hits(openhat, "..x...x...x...x.|..x...x...x...x.|..x...x...x...x.|..x...x...x...x.");
peak.Hits(ride,    "x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.");
peak.Play(acid, 0, 1, "A1", velocity: 1);
peak.Play(acid, 1, 1, "A1", velocity: 0.5);
peak.Play(acid, 2, 1, "A2", velocity: 0.9);
peak.Play(acid, 3, 1, "A1", velocity: 0.5);
peak.Play(acid, 4, 1, "C2", velocity: 0.6);
peak.Play(acid, 5, 1, "A1", velocity: 0.5);
peak.Play(acid, 6, 2, "D#2", velocity: 1);
peak.Play(acid, 8, 1, "A1", velocity: 0.6);
peak.Play(acid, 9, 1, "A2", velocity: 1);
peak.Play(acid, 10, 1, "G1", velocity: 0.5);
peak.Play(acid, 11, 1, "A1", velocity: 0.7);
peak.Play(acid, 12, 1, "C3", velocity: 0.9);
peak.Play(acid, 13, 1, "A2", velocity: 0.6);
peak.Play(acid, 14, 1, "G2");
peak.Play(acid, 15, 1, "E2", velocity: 1);
// peak, bar 2
peak.Play(acid, 16, 1, "A1", velocity: 1);
peak.Play(acid, 17, 1, "A1", velocity: 0.5);
peak.Play(acid, 18, 1, "A2", velocity: 0.9);
peak.Play(acid, 19, 1, "A1", velocity: 0.5);
peak.Play(acid, 20, 1, "C2", velocity: 0.6);
peak.Play(acid, 21, 1, "A1", velocity: 0.5);
peak.Play(acid, 22, 2, "D#2", velocity: 1);
peak.Play(acid, 24, 1, "A1", velocity: 0.6);
peak.Play(acid, 25, 1, "A2", velocity: 1);
peak.Play(acid, 26, 1, "G1", velocity: 0.5);
peak.Play(acid, 27, 1, "A1", velocity: 0.7);
peak.Play(acid, 28, 1, "C2", velocity: 0.5);
peak.Play(acid, 29, 1, "A1", velocity: 0.9);
peak.Play(acid, 30, 1, "E2", velocity: 0.6);
peak.Play(acid, 31, 1, "G2", velocity: 1);
// peak, bar 3
peak.Play(acid, 32, 1, "A1", velocity: 1);
peak.Play(acid, 33, 1, "A1", velocity: 0.5);
peak.Play(acid, 34, 1, "A2", velocity: 0.9);
peak.Play(acid, 35, 1, "A1", velocity: 0.5);
peak.Play(acid, 36, 1, "C2", velocity: 0.6);
peak.Play(acid, 37, 1, "A1", velocity: 0.5);
peak.Play(acid, 38, 2, "D#2", velocity: 1);
peak.Play(acid, 40, 1, "A1", velocity: 0.6);
peak.Play(acid, 41, 1, "A2", velocity: 1);
peak.Play(acid, 42, 1, "G1", velocity: 0.5);
peak.Play(acid, 43, 1, "A1", velocity: 0.7);
peak.Play(acid, 44, 1, "C3", velocity: 0.9);
peak.Play(acid, 45, 1, "A2", velocity: 0.6);
peak.Play(acid, 46, 1, "G2");
peak.Play(acid, 47, 1, "E2", velocity: 1);
// peak, bar 4
peak.Play(acid, 48, 1, "A1", velocity: 1);
peak.Play(acid, 49, 1, "A1", velocity: 0.5);
peak.Play(acid, 50, 1, "A2", velocity: 0.9);
peak.Play(acid, 51, 1, "A1", velocity: 0.5);
peak.Play(acid, 52, 1, "C2", velocity: 0.6);
peak.Play(acid, 53, 1, "A1", velocity: 0.5);
peak.Play(acid, 54, 2, "D#2", velocity: 1);
peak.Play(acid, 56, 1, "A1", velocity: 0.6);
peak.Play(acid, 57, 1, "A2", velocity: 1);
peak.Play(acid, 58, 1, "G1", velocity: 0.5);
peak.Play(acid, 59, 1, "A1", velocity: 0.7);
peak.Play(acid, 60, 1, "C3", velocity: 0.9);
peak.Play(acid, 61, 1, "A2", velocity: 0.6);
peak.Play(acid, 62, 1, "G2");
peak.Play(acid, 63, 1, "E2", velocity: 1);
peak.Play(pad, 0, 16, "A3 C4 E4", velocity: 0.5);
// peak, bar 2
peak.Play(pad, 16, 16, "A3 C4 E4", velocity: 0.5);
// peak, bar 3
peak.Play(pad, 32, 16, "F3 A3 C4", velocity: 0.5);
// peak, bar 4
peak.Play(pad, 48, 16, "G3 B3 D4", velocity: 0.5);

// Pattern brk
var brk = song.Pattern(bars: 4);
// brk, bar 3
brk.Play(acid, 32, 1, "A1", velocity: 0.6);
brk.Play(acid, 33, 1, "A1", velocity: 0.5);
brk.Play(acid, 34, 1, "A2", velocity: 0.9);
brk.Play(acid, 35, 1, "A1", velocity: 0.5);
brk.Play(acid, 36, 1, "C2", velocity: 0.6);
brk.Play(acid, 37, 1, "A1", velocity: 0.5);
brk.Play(acid, 38, 2, "D#2", velocity: 0.6);
brk.Play(acid, 40, 1, "A1", velocity: 0.6);
brk.Play(acid, 41, 1, "A2", velocity: 0.6);
brk.Play(acid, 42, 1, "G1", velocity: 0.5);
brk.Play(acid, 43, 1, "A1", velocity: 0.7);
brk.Play(acid, 44, 1, "C2", velocity: 0.5);
brk.Play(acid, 45, 1, "A1", velocity: 0.9);
brk.Play(acid, 46, 1, "E2", velocity: 0.6);
brk.Play(acid, 47, 1, "G2", velocity: 0.6);
// brk, bar 4
brk.Play(acid, 48, 1, "A1", velocity: 0.6);
brk.Play(acid, 49, 1, "A1", velocity: 0.5);
brk.Play(acid, 50, 1, "A2", velocity: 0.9);
brk.Play(acid, 51, 1, "A1", velocity: 0.5);
brk.Play(acid, 52, 1, "C2", velocity: 0.6);
brk.Play(acid, 53, 1, "A1", velocity: 0.5);
brk.Play(acid, 54, 2, "D#2", velocity: 0.6);
brk.Play(acid, 56, 1, "A1", velocity: 0.6);
brk.Play(acid, 57, 1, "A2", velocity: 0.6);
brk.Play(acid, 58, 1, "G1", velocity: 0.5);
brk.Play(acid, 59, 1, "A1", velocity: 0.7);
brk.Play(acid, 60, 1, "C3", velocity: 0.9);
brk.Play(acid, 61, 1, "A2", velocity: 0.6);
brk.Play(acid, 62, 1, "G2");
brk.Play(acid, 63, 1, "E2", velocity: 0.6);
brk.Play(pad, 0, 16, "A3 C4 E4", velocity: 0.55);
// brk, bar 2
brk.Play(pad, 16, 16, "A3 C4 E4", velocity: 0.55);
// brk, bar 3
brk.Play(pad, 32, 16, "F3 A3 C4", velocity: 0.55);
// brk, bar 4
brk.Play(pad, 48, 16, "G3 B3 D4", velocity: 0.55);

// The arrangement: the patterns in the order they play (48 bars, 1:30)
song.Arrange(intro, groove, groove, peak, peak, brk, groove, peak,
    peak, peak, groove, intro);

// The master: volume, and how much reverb and delay come back
song.Reverb = 0.7;

song.Play();
