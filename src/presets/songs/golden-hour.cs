// PetarByte Beats: this song, written as C# code.
// Channels are the sounds, patterns are a few bars each, the arrangement plays them in order.
var song = new Song(bpm: 116, swing: 0, key: "G major");

// Channels: one sound each, with its mixer settings below it
var kick = song.Drum(Drums.Kick909);
kick.Volume = 0.85;
var clap = song.Drum(Drums.Clap);
clap.Volume = 0.55;
clap.Reverb = 0.2;
var snap = song.Drum(Drums.Snap);
snap.Volume = 0.4;
snap.Reverb = 0.3;
var hat = song.Drum(Drums.Hat909);
hat.Volume = 0.3;
var openhat = song.Drum(Drums.OpenHat909);
openhat.Volume = 0.3;
var crash = song.Drum(Drums.Crash);
crash.Volume = 0.35;
var piano = song.Instrument(Instruments.GrandPiano);
piano.Reverb = 0.3;
var saw = song.Instrument(Instruments.SuperSaw);
saw.Volume = 0.38;
saw.Reverb = 0.25;
saw.Sidechain = 0.65;
var lead = song.Instrument(Instruments.Pluck);
lead.Volume = 0.55;
lead.Reverb = 0.2;
lead.Delay = 0.25;
var sub = song.Instrument(Instruments.SubBass);
sub.Volume = 0.75;
sub.Sidechain = 0.45;

// Pattern intro: Hits(drum, steps) with x = hit, X = loud, . = rest. Play(instrument, step, length, notes).
var intro = song.Pattern(bars: 4);
intro.Play(piano, 0, 6, "G3 B3 D4", velocity: 0.6);
intro.Play(piano, 4, 2, "D5", velocity: 0.55);
intro.Play(piano, 6, 2, "B4", velocity: 0.55);
intro.Play(piano, 6, 4, "G3 B3 D4", velocity: 0.6);
intro.Play(piano, 8, 4, "D5", velocity: 0.55);
intro.Play(piano, 10, 6, "G3 B3 D4", velocity: 0.6);
intro.Play(piano, 12, 2, "E5", velocity: 0.55);
intro.Play(piano, 14, 2, "D5", velocity: 0.55);
// intro, bar 2
intro.Play(piano, 16, 6, "F#3 A3 D4", velocity: 0.6);
intro.Play(piano, 16, 6, "A4", velocity: 0.55);
intro.Play(piano, 22, 4, "F#3 A3 D4", velocity: 0.6);
intro.Play(piano, 24, 2, "F#4", velocity: 0.55);
intro.Play(piano, 26, 2, "A4", velocity: 0.55);
intro.Play(piano, 26, 6, "F#3 A3 D4", velocity: 0.6);
intro.Play(piano, 28, 4, "D5", velocity: 0.55);
// intro, bar 3
intro.Play(piano, 32, 6, "G3 B3 E4", velocity: 0.6);
intro.Play(piano, 36, 2, "B4", velocity: 0.55);
intro.Play(piano, 38, 2, "D5", velocity: 0.55);
intro.Play(piano, 38, 4, "G3 B3 E4", velocity: 0.6);
intro.Play(piano, 40, 4, "E5", velocity: 0.55);
intro.Play(piano, 42, 6, "G3 B3 E4", velocity: 0.6);
intro.Play(piano, 44, 2, "G5", velocity: 0.55);
intro.Play(piano, 46, 2, "E5", velocity: 0.55);
// intro, bar 4
intro.Play(piano, 48, 6, "G3 C4 E4", velocity: 0.6);
intro.Play(piano, 48, 8, "D5", velocity: 0.55);
intro.Play(piano, 54, 4, "G3 C4 E4", velocity: 0.6);
intro.Play(piano, 56, 4, "C5", velocity: 0.55);
intro.Play(piano, 58, 6, "G3 C4 E4", velocity: 0.6);
intro.Play(piano, 60, 4, "B4", velocity: 0.55);

// Pattern verse
var verse = song.Pattern(bars: 4);
verse.Hits(kick, "x.......x.x.....|x.......x.x.....|x.......x.x.....|x.......x.x.....");
verse.Hits(snap, "....x.......x...|....x.......x...|....x.......x...|....x.......x...");
verse.Hits(hat,  "x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.");
verse.Play(piano, 0, 6, "G3 B3 D4", velocity: 0.55);
verse.Play(piano, 4, 2, "D5");
verse.Play(piano, 6, 2, "B4");
verse.Play(piano, 6, 4, "G3 B3 D4", velocity: 0.55);
verse.Play(piano, 8, 4, "D5");
verse.Play(piano, 10, 6, "G3 B3 D4", velocity: 0.55);
verse.Play(piano, 12, 2, "E5");
verse.Play(piano, 14, 2, "D5");
// verse, bar 2
verse.Play(piano, 16, 6, "F#3 A3 D4", velocity: 0.55);
verse.Play(piano, 16, 6, "A4");
verse.Play(piano, 22, 4, "F#3 A3 D4", velocity: 0.55);
verse.Play(piano, 24, 2, "F#4");
verse.Play(piano, 26, 2, "A4");
verse.Play(piano, 26, 6, "F#3 A3 D4", velocity: 0.55);
verse.Play(piano, 28, 4, "D5");
// verse, bar 3
verse.Play(piano, 32, 6, "G3 B3 E4", velocity: 0.55);
verse.Play(piano, 36, 2, "B4");
verse.Play(piano, 38, 2, "D5");
verse.Play(piano, 38, 4, "G3 B3 E4", velocity: 0.55);
verse.Play(piano, 40, 4, "E5");
verse.Play(piano, 42, 6, "G3 B3 E4", velocity: 0.55);
verse.Play(piano, 44, 2, "G5");
verse.Play(piano, 46, 2, "E5");
// verse, bar 4
verse.Play(piano, 48, 6, "G3 C4 E4", velocity: 0.55);
verse.Play(piano, 48, 8, "D5");
verse.Play(piano, 54, 4, "G3 C4 E4", velocity: 0.55);
verse.Play(piano, 56, 4, "C5");
verse.Play(piano, 58, 6, "G3 C4 E4", velocity: 0.55);
verse.Play(piano, 60, 4, "B4");
verse.Play(sub, 0, 6, "G1", velocity: 0.85);
verse.Play(sub, 6, 2, "G1", velocity: 0.85);
verse.Play(sub, 10, 6, "G1", velocity: 0.85);
// verse, bar 2
verse.Play(sub, 16, 6, "D2", velocity: 0.85);
verse.Play(sub, 22, 2, "D2", velocity: 0.85);
verse.Play(sub, 26, 6, "D2", velocity: 0.85);
// verse, bar 3
verse.Play(sub, 32, 6, "E2", velocity: 0.85);
verse.Play(sub, 38, 2, "E2", velocity: 0.85);
verse.Play(sub, 42, 6, "E2", velocity: 0.85);
// verse, bar 4
verse.Play(sub, 48, 6, "C2", velocity: 0.85);
verse.Play(sub, 54, 2, "C2", velocity: 0.85);
verse.Play(sub, 58, 6, "C2", velocity: 0.85);

// Pattern pre
var pre = song.Pattern(bars: 4);
pre.Hits(kick, "x...x...x...x...|x...x...x...x...|x...x...x...x...|x...x...x...x...");
pre.Hits(clap, "....x.......x...|....x.......x...|....x...x...x...|x.x.x.x.xxxxxxxx");
pre.Hits(hat,  "x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.");
pre.Play(piano, 0, 4, "G3 B3 D4", velocity: 0.6);
pre.Play(piano, 4, 4, "G3 B3 D4", velocity: 0.6);
pre.Play(piano, 8, 4, "G3 B3 D4", velocity: 0.6);
pre.Play(piano, 12, 4, "G3 B3 D4", velocity: 0.6);
// pre, bar 2
pre.Play(piano, 16, 4, "F#3 A3 D4", velocity: 0.6);
pre.Play(piano, 20, 4, "F#3 A3 D4", velocity: 0.6);
pre.Play(piano, 24, 4, "F#3 A3 D4", velocity: 0.6);
pre.Play(piano, 28, 4, "F#3 A3 D4", velocity: 0.6);
// pre, bar 3
pre.Play(piano, 32, 4, "G3 B3 E4", velocity: 0.6);
pre.Play(piano, 36, 4, "G3 B3 E4", velocity: 0.6);
pre.Play(piano, 40, 4, "G3 B3 E4", velocity: 0.6);
pre.Play(piano, 44, 4, "G3 B3 E4", velocity: 0.6);
// pre, bar 4
pre.Play(piano, 48, 4, "G3 C4 E4", velocity: 0.6);
pre.Play(piano, 52, 4, "G3 C4 E4", velocity: 0.6);
pre.Play(piano, 56, 4, "G3 C4 E4", velocity: 0.6);
pre.Play(piano, 60, 4, "G3 C4 E4", velocity: 0.6);
pre.Play(saw, 0, 16, "G3 B3 D4", velocity: 0.4);
// pre, bar 2
pre.Play(saw, 16, 16, "F#3 A3 D4", velocity: 0.4);
// pre, bar 3
pre.Play(saw, 32, 16, "G3 B3 E4", velocity: 0.4);
// pre, bar 4
pre.Play(saw, 48, 16, "G3 C4 E4", velocity: 0.4);
pre.Play(sub, 0, 4, "G1", velocity: 0.85);
pre.Play(sub, 4, 4, "G1", velocity: 0.85);
pre.Play(sub, 8, 4, "G1", velocity: 0.85);
pre.Play(sub, 12, 4, "G1", velocity: 0.85);
// pre, bar 2
pre.Play(sub, 16, 4, "D2", velocity: 0.85);
pre.Play(sub, 20, 4, "D2", velocity: 0.85);
pre.Play(sub, 24, 4, "D2", velocity: 0.85);
pre.Play(sub, 28, 4, "D2", velocity: 0.85);
// pre, bar 3
pre.Play(sub, 32, 4, "E2", velocity: 0.85);
pre.Play(sub, 36, 4, "E2", velocity: 0.85);
pre.Play(sub, 40, 4, "E2", velocity: 0.85);
pre.Play(sub, 44, 4, "E2", velocity: 0.85);
// pre, bar 4
pre.Play(sub, 48, 4, "C2", velocity: 0.85);
pre.Play(sub, 52, 4, "C2", velocity: 0.85);
pre.Play(sub, 56, 4, "C2", velocity: 0.85);
pre.Play(sub, 60, 4, "C2", velocity: 0.85);

// Pattern chorus
var chorus = song.Pattern(bars: 4);
chorus.Hits(kick,    "x...x...x...x...|x...x...x...x...|x...x...x...x...|x...x...x...x...");
chorus.Hits(clap,    "....x.......x...|....x.......x...|....x.......x...|....x.......x...");
chorus.Hits(hat,     "xxx.xxx.xxx.xxx.|xxx.xxx.xxx.xxx.|xxx.xxx.xxx.xxx.|xxx.xxx.xxx.xxx.");
chorus.Hits(openhat, "..x...x...x...x.|..x...x...x...x.|..x...x...x...x.|..x...x...x...x.");
chorus.Hits(crash,   "x...............|................|................|................");
chorus.Play(piano, 0, 2, "G3 B3 D4", velocity: 0.45);
chorus.Play(piano, 4, 2, "G3 B3 D4", velocity: 0.45);
chorus.Play(piano, 8, 2, "G3 B3 D4", velocity: 0.45);
chorus.Play(piano, 12, 2, "G3 B3 D4", velocity: 0.45);
// chorus, bar 2
chorus.Play(piano, 16, 2, "F#3 A3 D4", velocity: 0.45);
chorus.Play(piano, 20, 2, "F#3 A3 D4", velocity: 0.45);
chorus.Play(piano, 24, 2, "F#3 A3 D4", velocity: 0.45);
chorus.Play(piano, 28, 2, "F#3 A3 D4", velocity: 0.45);
// chorus, bar 3
chorus.Play(piano, 32, 2, "G3 B3 E4", velocity: 0.45);
chorus.Play(piano, 36, 2, "G3 B3 E4", velocity: 0.45);
chorus.Play(piano, 40, 2, "G3 B3 E4", velocity: 0.45);
chorus.Play(piano, 44, 2, "G3 B3 E4", velocity: 0.45);
// chorus, bar 4
chorus.Play(piano, 48, 2, "G3 C4 E4", velocity: 0.45);
chorus.Play(piano, 52, 2, "G3 C4 E4", velocity: 0.45);
chorus.Play(piano, 56, 2, "G3 C4 E4", velocity: 0.45);
chorus.Play(piano, 60, 2, "G3 C4 E4", velocity: 0.45);
chorus.Play(saw, 0, 16, "G3 B3 D4", velocity: 0.7);
// chorus, bar 2
chorus.Play(saw, 16, 16, "F#3 A3 D4", velocity: 0.7);
// chorus, bar 3
chorus.Play(saw, 32, 16, "G3 B3 E4", velocity: 0.7);
// chorus, bar 4
chorus.Play(saw, 48, 16, "G3 C4 E4", velocity: 0.7);
chorus.Play(lead, 0, 2, "B4");
chorus.Play(lead, 2, 2, "D5");
chorus.Play(lead, 4, 4, "D5");
chorus.Play(lead, 8, 2, "B4");
chorus.Play(lead, 10, 2, "A4");
chorus.Play(lead, 12, 4, "G4");
// chorus, bar 2
chorus.Play(lead, 16, 2, "A4");
chorus.Play(lead, 18, 2, "B4");
chorus.Play(lead, 20, 4, "A4");
chorus.Play(lead, 24, 4, "F#4");
chorus.Play(lead, 28, 4, "D4");
// chorus, bar 3
chorus.Play(lead, 32, 2, "B4");
chorus.Play(lead, 34, 2, "D5");
chorus.Play(lead, 36, 4, "E5");
chorus.Play(lead, 40, 2, "D5");
chorus.Play(lead, 42, 2, "B4");
chorus.Play(lead, 44, 4, "G4");
// chorus, bar 4
chorus.Play(lead, 48, 2, "A4");
chorus.Play(lead, 50, 2, "G4");
chorus.Play(lead, 52, 6, "E4");
chorus.Play(lead, 58, 2, "G4");
chorus.Play(lead, 60, 4, "A4");
chorus.Play(sub, 2, 2, "G1", velocity: 0.85);
chorus.Play(sub, 6, 2, "G1", velocity: 0.85);
chorus.Play(sub, 10, 2, "G1", velocity: 0.85);
chorus.Play(sub, 14, 2, "G1", velocity: 0.85);
// chorus, bar 2
chorus.Play(sub, 18, 2, "D2", velocity: 0.85);
chorus.Play(sub, 22, 2, "D2", velocity: 0.85);
chorus.Play(sub, 26, 2, "D2", velocity: 0.85);
chorus.Play(sub, 30, 2, "D2", velocity: 0.85);
// chorus, bar 3
chorus.Play(sub, 34, 2, "E2", velocity: 0.85);
chorus.Play(sub, 38, 2, "E2", velocity: 0.85);
chorus.Play(sub, 42, 2, "E2", velocity: 0.85);
chorus.Play(sub, 46, 2, "E2", velocity: 0.85);
// chorus, bar 4
chorus.Play(sub, 50, 2, "C2", velocity: 0.85);
chorus.Play(sub, 54, 2, "C2", velocity: 0.85);
chorus.Play(sub, 58, 2, "C2", velocity: 0.85);
chorus.Play(sub, 62, 2, "C2", velocity: 0.85);

// Pattern brk
var brk = song.Pattern(bars: 4);
brk.Play(piano, 0, 8, "D5");
brk.Play(piano, 0, 16, "G3 B3 D4", velocity: 0.5);
// brk, bar 2
brk.Play(piano, 16, 8, "A4");
brk.Play(piano, 16, 16, "F#3 A3 D4", velocity: 0.5);
// brk, bar 3
brk.Play(piano, 32, 8, "B4");
brk.Play(piano, 32, 16, "G3 B3 E4", velocity: 0.5);
// brk, bar 4
brk.Play(piano, 48, 16, "G3 C4 E4", velocity: 0.5);
brk.Play(piano, 48, 16, "A4");
brk.Play(saw, 0, 16, "G3 B3 D4", velocity: 0.25);
// brk, bar 2
brk.Play(saw, 16, 16, "F#3 A3 D4", velocity: 0.25);
// brk, bar 3
brk.Play(saw, 32, 16, "G3 B3 E4", velocity: 0.25);
// brk, bar 4
brk.Play(saw, 48, 16, "G3 C4 E4", velocity: 0.25);

// Pattern outro
var outro = song.Pattern(bars: 4);
outro.Hits(kick, "x...............|................|................|................");
outro.Play(piano, 0, 2, "B4", velocity: 0.5);
outro.Play(piano, 0, 16, "G3 B3 D4", velocity: 0.5);
outro.Play(piano, 2, 2, "D5", velocity: 0.5);
outro.Play(piano, 4, 4, "D5", velocity: 0.5);
outro.Play(piano, 8, 2, "B4", velocity: 0.5);
outro.Play(piano, 10, 2, "A4", velocity: 0.5);
outro.Play(piano, 12, 4, "G4", velocity: 0.5);
// outro, bar 2
outro.Play(piano, 16, 2, "A4", velocity: 0.5);
outro.Play(piano, 16, 16, "F#3 A3 D4", velocity: 0.5);
outro.Play(piano, 18, 2, "B4", velocity: 0.5);
outro.Play(piano, 20, 4, "A4", velocity: 0.5);
outro.Play(piano, 24, 4, "F#4", velocity: 0.5);
outro.Play(piano, 28, 4, "D4", velocity: 0.5);
// outro, bar 3
outro.Play(piano, 32, 2, "B4", velocity: 0.5);
outro.Play(piano, 32, 16, "G3 B3 E4", velocity: 0.5);
outro.Play(piano, 34, 2, "D5", velocity: 0.5);
outro.Play(piano, 36, 4, "E5", velocity: 0.5);
outro.Play(piano, 40, 2, "D5", velocity: 0.5);
outro.Play(piano, 42, 2, "B4", velocity: 0.5);
outro.Play(piano, 44, 4, "G4", velocity: 0.5);
// outro, bar 4
outro.Play(piano, 48, 2, "A4", velocity: 0.5);
outro.Play(piano, 48, 16, "G3 C4 E4", velocity: 0.5);
outro.Play(piano, 50, 2, "G4", velocity: 0.5);
outro.Play(piano, 52, 6, "E4", velocity: 0.5);
outro.Play(piano, 58, 2, "G4", velocity: 0.5);
outro.Play(piano, 60, 4, "A4", velocity: 0.5);

// The arrangement: the patterns in the order they play (48 bars, 1:39)
song.Arrange(intro, verse, verse, pre, chorus, chorus, brk, verse,
    pre, chorus, chorus, outro);

song.Play();
