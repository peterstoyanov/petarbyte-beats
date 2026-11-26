// PetarByte Beats: this song, written as C# code.
// Channels are the sounds, patterns are a few bars each, the arrangement plays them in order.
var song = new Song(bpm: 104, swing: 0, key: "A minor");

// Channels: one sound each, with its mixer settings below it
var kick = song.Drum(Drums.Kick909);
kick.Volume = 0.9;
var snare = song.Drum(Drums.Snare909);
snare.Volume = 0.7;
snare.Reverb = 0.5;
var hat = song.Drum(Drums.Hat909);
hat.Volume = 0.4;
var crash = song.Drum(Drums.Crash);
crash.Volume = 0.4;
var tom = song.Drum(Drums.LowTom);
tom.Volume = 0.5;
var pad = song.Instrument(Instruments.WarmPad);
pad.Volume = 0.55;
pad.Reverb = 0.4;
pad.Sidechain = 0.6;
var arp = song.Instrument(Instruments.Pluck);
arp.Volume = 0.42;
arp.Pan = -0.25;
arp.Delay = 0.3;
arp.Sidechain = 0.4;
var lead = song.Instrument(Instruments.SuperSaw);
lead.Volume = 0.5;
lead.Pan = 0.15;
lead.Reverb = 0.3;
lead.Delay = 0.3;
var bass = song.Instrument(Instruments.SynthBass);
bass.Volume = 0.75;
bass.Sidechain = 0.5;

// Pattern intro: Hits(drum, steps) with x = hit, X = loud, . = rest. Play(instrument, step, length, notes).
var intro = song.Pattern(bars: 4);
intro.Play(pad, 0, 16, "A3 C4 E4", velocity: 0.6);
// intro, bar 2
intro.Play(pad, 16, 16, "F3 A3 C4", velocity: 0.6);
// intro, bar 3
intro.Play(pad, 32, 16, "C4 E4 G4", velocity: 0.6);
// intro, bar 4
intro.Play(pad, 48, 16, "G3 B3 D4", velocity: 0.6);
intro.Play(arp, 0, 1, "A3", velocity: 0.5);
intro.Play(arp, 1, 1, "C4", velocity: 0.5);
intro.Play(arp, 2, 1, "E4", velocity: 0.5);
intro.Play(arp, 3, 1, "A4", velocity: 0.5);
intro.Play(arp, 4, 1, "A3", velocity: 0.5);
intro.Play(arp, 5, 1, "C4", velocity: 0.5);
intro.Play(arp, 6, 1, "E4", velocity: 0.5);
intro.Play(arp, 7, 1, "A4", velocity: 0.5);
intro.Play(arp, 8, 1, "A3", velocity: 0.5);
intro.Play(arp, 9, 1, "C4", velocity: 0.5);
intro.Play(arp, 10, 1, "E4", velocity: 0.5);
intro.Play(arp, 11, 1, "A4", velocity: 0.5);
intro.Play(arp, 12, 1, "A3", velocity: 0.5);
intro.Play(arp, 13, 1, "C4", velocity: 0.5);
intro.Play(arp, 14, 1, "E4", velocity: 0.5);
intro.Play(arp, 15, 1, "A4", velocity: 0.5);
// intro, bar 2
intro.Play(arp, 16, 1, "F3", velocity: 0.5);
intro.Play(arp, 17, 1, "A3", velocity: 0.5);
intro.Play(arp, 18, 1, "C4", velocity: 0.5);
intro.Play(arp, 19, 1, "F4", velocity: 0.5);
intro.Play(arp, 20, 1, "F3", velocity: 0.5);
intro.Play(arp, 21, 1, "A3", velocity: 0.5);
intro.Play(arp, 22, 1, "C4", velocity: 0.5);
intro.Play(arp, 23, 1, "F4", velocity: 0.5);
intro.Play(arp, 24, 1, "F3", velocity: 0.5);
intro.Play(arp, 25, 1, "A3", velocity: 0.5);
intro.Play(arp, 26, 1, "C4", velocity: 0.5);
intro.Play(arp, 27, 1, "F4", velocity: 0.5);
intro.Play(arp, 28, 1, "F3", velocity: 0.5);
intro.Play(arp, 29, 1, "A3", velocity: 0.5);
intro.Play(arp, 30, 1, "C4", velocity: 0.5);
intro.Play(arp, 31, 1, "F4", velocity: 0.5);
// intro, bar 3
intro.Play(arp, 32, 1, "C4", velocity: 0.5);
intro.Play(arp, 33, 1, "E4", velocity: 0.5);
intro.Play(arp, 34, 1, "G4", velocity: 0.5);
intro.Play(arp, 35, 1, "C5", velocity: 0.5);
intro.Play(arp, 36, 1, "C4", velocity: 0.5);
intro.Play(arp, 37, 1, "E4", velocity: 0.5);
intro.Play(arp, 38, 1, "G4", velocity: 0.5);
intro.Play(arp, 39, 1, "C5", velocity: 0.5);
intro.Play(arp, 40, 1, "C4", velocity: 0.5);
intro.Play(arp, 41, 1, "E4", velocity: 0.5);
intro.Play(arp, 42, 1, "G4", velocity: 0.5);
intro.Play(arp, 43, 1, "C5", velocity: 0.5);
intro.Play(arp, 44, 1, "C4", velocity: 0.5);
intro.Play(arp, 45, 1, "E4", velocity: 0.5);
intro.Play(arp, 46, 1, "G4", velocity: 0.5);
intro.Play(arp, 47, 1, "C5", velocity: 0.5);
// intro, bar 4
intro.Play(arp, 48, 1, "G3", velocity: 0.5);
intro.Play(arp, 49, 1, "B3", velocity: 0.5);
intro.Play(arp, 50, 1, "D4", velocity: 0.5);
intro.Play(arp, 51, 1, "G4", velocity: 0.5);
intro.Play(arp, 52, 1, "G3", velocity: 0.5);
intro.Play(arp, 53, 1, "B3", velocity: 0.5);
intro.Play(arp, 54, 1, "D4", velocity: 0.5);
intro.Play(arp, 55, 1, "G4", velocity: 0.5);
intro.Play(arp, 56, 1, "G3", velocity: 0.5);
intro.Play(arp, 57, 1, "B3", velocity: 0.5);
intro.Play(arp, 58, 1, "D4", velocity: 0.5);
intro.Play(arp, 59, 1, "G4", velocity: 0.5);
intro.Play(arp, 60, 1, "G3", velocity: 0.5);
intro.Play(arp, 61, 1, "B3", velocity: 0.5);
intro.Play(arp, 62, 1, "D4", velocity: 0.5);
intro.Play(arp, 63, 1, "G4", velocity: 0.5);

// Pattern drive
var drive = song.Pattern(bars: 4);
drive.Hits(kick,  "x.......x.......|x.......x.......|x.......x.......|x.......x.......");
drive.Hits(snare, "....x.......x...|....x.......x...|....x.......x...|....x.......x...");
drive.Hits(hat,   "..x...x...x...x.|..x...x...x...x.|..x...x...x...x.|..x...x...x...x.");
drive.Hits(crash, "x...............|................|................|................");
drive.Play(pad, 0, 16, "A3 C4 E4", velocity: 0.5);
// drive, bar 2
drive.Play(pad, 16, 16, "F3 A3 C4", velocity: 0.5);
// drive, bar 3
drive.Play(pad, 32, 16, "C4 E4 G4", velocity: 0.5);
// drive, bar 4
drive.Play(pad, 48, 16, "G3 B3 D4", velocity: 0.5);
drive.Play(arp, 0, 1, "A3", velocity: 0.55);
drive.Play(arp, 1, 1, "C4", velocity: 0.55);
drive.Play(arp, 2, 1, "E4", velocity: 0.55);
drive.Play(arp, 3, 1, "A4", velocity: 0.55);
drive.Play(arp, 4, 1, "A3", velocity: 0.55);
drive.Play(arp, 5, 1, "C4", velocity: 0.55);
drive.Play(arp, 6, 1, "E4", velocity: 0.55);
drive.Play(arp, 7, 1, "A4", velocity: 0.55);
drive.Play(arp, 8, 1, "A3", velocity: 0.55);
drive.Play(arp, 9, 1, "C4", velocity: 0.55);
drive.Play(arp, 10, 1, "E4", velocity: 0.55);
drive.Play(arp, 11, 1, "A4", velocity: 0.55);
drive.Play(arp, 12, 1, "A3", velocity: 0.55);
drive.Play(arp, 13, 1, "C4", velocity: 0.55);
drive.Play(arp, 14, 1, "E4", velocity: 0.55);
drive.Play(arp, 15, 1, "A4", velocity: 0.55);
// drive, bar 2
drive.Play(arp, 16, 1, "F3", velocity: 0.55);
drive.Play(arp, 17, 1, "A3", velocity: 0.55);
drive.Play(arp, 18, 1, "C4", velocity: 0.55);
drive.Play(arp, 19, 1, "F4", velocity: 0.55);
drive.Play(arp, 20, 1, "F3", velocity: 0.55);
drive.Play(arp, 21, 1, "A3", velocity: 0.55);
drive.Play(arp, 22, 1, "C4", velocity: 0.55);
drive.Play(arp, 23, 1, "F4", velocity: 0.55);
drive.Play(arp, 24, 1, "F3", velocity: 0.55);
drive.Play(arp, 25, 1, "A3", velocity: 0.55);
drive.Play(arp, 26, 1, "C4", velocity: 0.55);
drive.Play(arp, 27, 1, "F4", velocity: 0.55);
drive.Play(arp, 28, 1, "F3", velocity: 0.55);
drive.Play(arp, 29, 1, "A3", velocity: 0.55);
drive.Play(arp, 30, 1, "C4", velocity: 0.55);
drive.Play(arp, 31, 1, "F4", velocity: 0.55);
// drive, bar 3
drive.Play(arp, 32, 1, "C4", velocity: 0.55);
drive.Play(arp, 33, 1, "E4", velocity: 0.55);
drive.Play(arp, 34, 1, "G4", velocity: 0.55);
drive.Play(arp, 35, 1, "C5", velocity: 0.55);
drive.Play(arp, 36, 1, "C4", velocity: 0.55);
drive.Play(arp, 37, 1, "E4", velocity: 0.55);
drive.Play(arp, 38, 1, "G4", velocity: 0.55);
drive.Play(arp, 39, 1, "C5", velocity: 0.55);
drive.Play(arp, 40, 1, "C4", velocity: 0.55);
drive.Play(arp, 41, 1, "E4", velocity: 0.55);
drive.Play(arp, 42, 1, "G4", velocity: 0.55);
drive.Play(arp, 43, 1, "C5", velocity: 0.55);
drive.Play(arp, 44, 1, "C4", velocity: 0.55);
drive.Play(arp, 45, 1, "E4", velocity: 0.55);
drive.Play(arp, 46, 1, "G4", velocity: 0.55);
drive.Play(arp, 47, 1, "C5", velocity: 0.55);
// drive, bar 4
drive.Play(arp, 48, 1, "G3", velocity: 0.55);
drive.Play(arp, 49, 1, "B3", velocity: 0.55);
drive.Play(arp, 50, 1, "D4", velocity: 0.55);
drive.Play(arp, 51, 1, "G4", velocity: 0.55);
drive.Play(arp, 52, 1, "G3", velocity: 0.55);
drive.Play(arp, 53, 1, "B3", velocity: 0.55);
drive.Play(arp, 54, 1, "D4", velocity: 0.55);
drive.Play(arp, 55, 1, "G4", velocity: 0.55);
drive.Play(arp, 56, 1, "G3", velocity: 0.55);
drive.Play(arp, 57, 1, "B3", velocity: 0.55);
drive.Play(arp, 58, 1, "D4", velocity: 0.55);
drive.Play(arp, 59, 1, "G4", velocity: 0.55);
drive.Play(arp, 60, 1, "G3", velocity: 0.55);
drive.Play(arp, 61, 1, "B3", velocity: 0.55);
drive.Play(arp, 62, 1, "D4", velocity: 0.55);
drive.Play(arp, 63, 1, "G4", velocity: 0.55);
drive.Play(bass, 0, 2, "A1", velocity: 0.85);
drive.Play(bass, 2, 2, "A1", velocity: 0.85);
drive.Play(bass, 4, 2, "A1", velocity: 0.85);
drive.Play(bass, 6, 2, "A1", velocity: 0.85);
drive.Play(bass, 8, 2, "A1", velocity: 0.85);
drive.Play(bass, 10, 2, "A1", velocity: 0.85);
drive.Play(bass, 12, 2, "A1", velocity: 0.85);
drive.Play(bass, 14, 2, "A1", velocity: 0.85);
// drive, bar 2
drive.Play(bass, 16, 2, "F1", velocity: 0.85);
drive.Play(bass, 18, 2, "F1", velocity: 0.85);
drive.Play(bass, 20, 2, "F1", velocity: 0.85);
drive.Play(bass, 22, 2, "F1", velocity: 0.85);
drive.Play(bass, 24, 2, "F1", velocity: 0.85);
drive.Play(bass, 26, 2, "F1", velocity: 0.85);
drive.Play(bass, 28, 2, "F1", velocity: 0.85);
drive.Play(bass, 30, 2, "F1", velocity: 0.85);
// drive, bar 3
drive.Play(bass, 32, 2, "C2", velocity: 0.85);
drive.Play(bass, 34, 2, "C2", velocity: 0.85);
drive.Play(bass, 36, 2, "C2", velocity: 0.85);
drive.Play(bass, 38, 2, "C2", velocity: 0.85);
drive.Play(bass, 40, 2, "C2", velocity: 0.85);
drive.Play(bass, 42, 2, "C2", velocity: 0.85);
drive.Play(bass, 44, 2, "C2", velocity: 0.85);
drive.Play(bass, 46, 2, "C2", velocity: 0.85);
// drive, bar 4
drive.Play(bass, 48, 2, "G1", velocity: 0.85);
drive.Play(bass, 50, 2, "G1", velocity: 0.85);
drive.Play(bass, 52, 2, "G1", velocity: 0.85);
drive.Play(bass, 54, 2, "G1", velocity: 0.85);
drive.Play(bass, 56, 2, "G1", velocity: 0.85);
drive.Play(bass, 58, 2, "G1", velocity: 0.85);
drive.Play(bass, 60, 2, "G1", velocity: 0.85);
drive.Play(bass, 62, 2, "G1", velocity: 0.85);

// Pattern chorus
var chorus = song.Pattern(bars: 4);
chorus.Hits(kick,  "x.......x.......|x.......x.......|x.......x.......|x.......x.......");
chorus.Hits(snare, "....x.......x...|....x.......x...|....x.......x...|....x.......x.xx");
chorus.Hits(hat,   "..x...x...x...x.|..x...x...x...x.|..x...x...x...x.|..x...x...x...x.");
chorus.Hits(crash, "x...............|................|................|................");
chorus.Hits(tom,   "................|................|................|............x.x.");
chorus.Play(pad, 0, 16, "A3 C4 E4", velocity: 0.5);
// chorus, bar 2
chorus.Play(pad, 16, 16, "F3 A3 C4", velocity: 0.5);
// chorus, bar 3
chorus.Play(pad, 32, 16, "C4 E4 G4", velocity: 0.5);
// chorus, bar 4
chorus.Play(pad, 48, 16, "G3 B3 D4", velocity: 0.5);
chorus.Play(arp, 0, 1, "A3", velocity: 0.5);
chorus.Play(arp, 1, 1, "C4", velocity: 0.5);
chorus.Play(arp, 2, 1, "E4", velocity: 0.5);
chorus.Play(arp, 3, 1, "A4", velocity: 0.5);
chorus.Play(arp, 4, 1, "A3", velocity: 0.5);
chorus.Play(arp, 5, 1, "C4", velocity: 0.5);
chorus.Play(arp, 6, 1, "E4", velocity: 0.5);
chorus.Play(arp, 7, 1, "A4", velocity: 0.5);
chorus.Play(arp, 8, 1, "A3", velocity: 0.5);
chorus.Play(arp, 9, 1, "C4", velocity: 0.5);
chorus.Play(arp, 10, 1, "E4", velocity: 0.5);
chorus.Play(arp, 11, 1, "A4", velocity: 0.5);
chorus.Play(arp, 12, 1, "A3", velocity: 0.5);
chorus.Play(arp, 13, 1, "C4", velocity: 0.5);
chorus.Play(arp, 14, 1, "E4", velocity: 0.5);
chorus.Play(arp, 15, 1, "A4", velocity: 0.5);
// chorus, bar 2
chorus.Play(arp, 16, 1, "F3", velocity: 0.5);
chorus.Play(arp, 17, 1, "A3", velocity: 0.5);
chorus.Play(arp, 18, 1, "C4", velocity: 0.5);
chorus.Play(arp, 19, 1, "F4", velocity: 0.5);
chorus.Play(arp, 20, 1, "F3", velocity: 0.5);
chorus.Play(arp, 21, 1, "A3", velocity: 0.5);
chorus.Play(arp, 22, 1, "C4", velocity: 0.5);
chorus.Play(arp, 23, 1, "F4", velocity: 0.5);
chorus.Play(arp, 24, 1, "F3", velocity: 0.5);
chorus.Play(arp, 25, 1, "A3", velocity: 0.5);
chorus.Play(arp, 26, 1, "C4", velocity: 0.5);
chorus.Play(arp, 27, 1, "F4", velocity: 0.5);
chorus.Play(arp, 28, 1, "F3", velocity: 0.5);
chorus.Play(arp, 29, 1, "A3", velocity: 0.5);
chorus.Play(arp, 30, 1, "C4", velocity: 0.5);
chorus.Play(arp, 31, 1, "F4", velocity: 0.5);
// chorus, bar 3
chorus.Play(arp, 32, 1, "C4", velocity: 0.5);
chorus.Play(arp, 33, 1, "E4", velocity: 0.5);
chorus.Play(arp, 34, 1, "G4", velocity: 0.5);
chorus.Play(arp, 35, 1, "C5", velocity: 0.5);
chorus.Play(arp, 36, 1, "C4", velocity: 0.5);
chorus.Play(arp, 37, 1, "E4", velocity: 0.5);
chorus.Play(arp, 38, 1, "G4", velocity: 0.5);
chorus.Play(arp, 39, 1, "C5", velocity: 0.5);
chorus.Play(arp, 40, 1, "C4", velocity: 0.5);
chorus.Play(arp, 41, 1, "E4", velocity: 0.5);
chorus.Play(arp, 42, 1, "G4", velocity: 0.5);
chorus.Play(arp, 43, 1, "C5", velocity: 0.5);
chorus.Play(arp, 44, 1, "C4", velocity: 0.5);
chorus.Play(arp, 45, 1, "E4", velocity: 0.5);
chorus.Play(arp, 46, 1, "G4", velocity: 0.5);
chorus.Play(arp, 47, 1, "C5", velocity: 0.5);
// chorus, bar 4
chorus.Play(arp, 48, 1, "G3", velocity: 0.5);
chorus.Play(arp, 49, 1, "B3", velocity: 0.5);
chorus.Play(arp, 50, 1, "D4", velocity: 0.5);
chorus.Play(arp, 51, 1, "G4", velocity: 0.5);
chorus.Play(arp, 52, 1, "G3", velocity: 0.5);
chorus.Play(arp, 53, 1, "B3", velocity: 0.5);
chorus.Play(arp, 54, 1, "D4", velocity: 0.5);
chorus.Play(arp, 55, 1, "G4", velocity: 0.5);
chorus.Play(arp, 56, 1, "G3", velocity: 0.5);
chorus.Play(arp, 57, 1, "B3", velocity: 0.5);
chorus.Play(arp, 58, 1, "D4", velocity: 0.5);
chorus.Play(arp, 59, 1, "G4", velocity: 0.5);
chorus.Play(arp, 60, 1, "G3", velocity: 0.5);
chorus.Play(arp, 61, 1, "B3", velocity: 0.5);
chorus.Play(arp, 62, 1, "D4", velocity: 0.5);
chorus.Play(arp, 63, 1, "G4", velocity: 0.5);
chorus.Play(lead, 0, 6, "E5");
chorus.Play(lead, 6, 2, "D5");
chorus.Play(lead, 8, 4, "C5");
chorus.Play(lead, 12, 2, "B4");
chorus.Play(lead, 14, 2, "C5");
// chorus, bar 2
chorus.Play(lead, 16, 8, "A4");
chorus.Play(lead, 24, 4, "C5");
chorus.Play(lead, 28, 4, "A4");
// chorus, bar 3
chorus.Play(lead, 32, 6, "G4");
chorus.Play(lead, 38, 2, "A4");
chorus.Play(lead, 40, 4, "C5");
chorus.Play(lead, 44, 4, "E5");
// chorus, bar 4
chorus.Play(lead, 48, 8, "D5");
chorus.Play(lead, 56, 4, "B4");
chorus.Play(lead, 60, 4, "G4");
chorus.Play(bass, 0, 2, "A1", velocity: 0.85);
chorus.Play(bass, 2, 2, "A1", velocity: 0.85);
chorus.Play(bass, 4, 2, "A1", velocity: 0.85);
chorus.Play(bass, 6, 2, "A1", velocity: 0.85);
chorus.Play(bass, 8, 2, "A1", velocity: 0.85);
chorus.Play(bass, 10, 2, "A1", velocity: 0.85);
chorus.Play(bass, 12, 2, "A1", velocity: 0.85);
chorus.Play(bass, 14, 2, "A1", velocity: 0.85);
// chorus, bar 2
chorus.Play(bass, 16, 2, "F1", velocity: 0.85);
chorus.Play(bass, 18, 2, "F1", velocity: 0.85);
chorus.Play(bass, 20, 2, "F1", velocity: 0.85);
chorus.Play(bass, 22, 2, "F1", velocity: 0.85);
chorus.Play(bass, 24, 2, "F1", velocity: 0.85);
chorus.Play(bass, 26, 2, "F1", velocity: 0.85);
chorus.Play(bass, 28, 2, "F1", velocity: 0.85);
chorus.Play(bass, 30, 2, "F1", velocity: 0.85);
// chorus, bar 3
chorus.Play(bass, 32, 2, "C2", velocity: 0.85);
chorus.Play(bass, 34, 2, "C2", velocity: 0.85);
chorus.Play(bass, 36, 2, "C2", velocity: 0.85);
chorus.Play(bass, 38, 2, "C2", velocity: 0.85);
chorus.Play(bass, 40, 2, "C2", velocity: 0.85);
chorus.Play(bass, 42, 2, "C2", velocity: 0.85);
chorus.Play(bass, 44, 2, "C2", velocity: 0.85);
chorus.Play(bass, 46, 2, "C2", velocity: 0.85);
// chorus, bar 4
chorus.Play(bass, 48, 2, "G1", velocity: 0.85);
chorus.Play(bass, 50, 2, "G1", velocity: 0.85);
chorus.Play(bass, 52, 2, "G1", velocity: 0.85);
chorus.Play(bass, 54, 2, "G1", velocity: 0.85);
chorus.Play(bass, 56, 2, "G1", velocity: 0.85);
chorus.Play(bass, 58, 2, "G1", velocity: 0.85);
chorus.Play(bass, 60, 2, "G1", velocity: 0.85);
chorus.Play(bass, 62, 2, "G1", velocity: 0.85);

// Pattern brk
var brk = song.Pattern(bars: 4);
brk.Play(pad, 0, 16, "A3 C4 E4", velocity: 0.55);
// brk, bar 2
brk.Play(pad, 16, 16, "F3 A3 C4", velocity: 0.55);
// brk, bar 3
brk.Play(pad, 32, 16, "C4 E4 G4", velocity: 0.55);
// brk, bar 4
brk.Play(pad, 48, 16, "G3 B3 D4", velocity: 0.55);
brk.Play(lead, 0, 16, "E5");
// brk, bar 2
brk.Play(lead, 16, 16, "C5");
// brk, bar 3
brk.Play(lead, 32, 16, "G5");
// brk, bar 4
brk.Play(lead, 48, 16, "D5");

// Pattern outro
var outro = song.Pattern(bars: 4);
outro.Play(pad, 0, 16, "A3 C4 E4", velocity: 0.45);
// outro, bar 2
outro.Play(pad, 16, 16, "F3 A3 C4", velocity: 0.45);
// outro, bar 3
outro.Play(pad, 32, 16, "C4 E4 G4", velocity: 0.45);
// outro, bar 4
outro.Play(pad, 48, 16, "G3 B3 D4", velocity: 0.45);
outro.Play(arp, 0, 1, "A4", velocity: 0.4);
outro.Play(arp, 1, 1, "E4", velocity: 0.4);
outro.Play(arp, 2, 1, "C4", velocity: 0.4);
outro.Play(arp, 3, 1, "A3", velocity: 0.4);
outro.Play(arp, 4, 1, "A4", velocity: 0.4);
outro.Play(arp, 5, 1, "E4", velocity: 0.4);
outro.Play(arp, 6, 1, "C4", velocity: 0.4);
outro.Play(arp, 7, 1, "A3", velocity: 0.4);
outro.Play(arp, 8, 1, "A4", velocity: 0.4);
outro.Play(arp, 9, 1, "E4", velocity: 0.4);
outro.Play(arp, 10, 1, "C4", velocity: 0.4);
outro.Play(arp, 11, 1, "A3", velocity: 0.4);
outro.Play(arp, 12, 1, "A4", velocity: 0.4);
outro.Play(arp, 13, 1, "E4", velocity: 0.4);
outro.Play(arp, 14, 1, "C4", velocity: 0.4);
outro.Play(arp, 15, 1, "A3", velocity: 0.4);
// outro, bar 2
outro.Play(arp, 16, 1, "F4", velocity: 0.4);
outro.Play(arp, 17, 1, "C4", velocity: 0.4);
outro.Play(arp, 18, 1, "A3", velocity: 0.4);
outro.Play(arp, 19, 1, "F3", velocity: 0.4);
outro.Play(arp, 20, 1, "F4", velocity: 0.4);
outro.Play(arp, 21, 1, "C4", velocity: 0.4);
outro.Play(arp, 22, 1, "A3", velocity: 0.4);
outro.Play(arp, 23, 1, "F3", velocity: 0.4);
outro.Play(arp, 24, 1, "F4", velocity: 0.4);
outro.Play(arp, 25, 1, "C4", velocity: 0.4);
outro.Play(arp, 26, 1, "A3", velocity: 0.4);
outro.Play(arp, 27, 1, "F3", velocity: 0.4);
outro.Play(arp, 28, 1, "F4", velocity: 0.4);
outro.Play(arp, 29, 1, "C4", velocity: 0.4);
outro.Play(arp, 30, 1, "A3", velocity: 0.4);
outro.Play(arp, 31, 1, "F3", velocity: 0.4);
// outro, bar 3
outro.Play(arp, 32, 1, "C5", velocity: 0.4);
outro.Play(arp, 33, 1, "G4", velocity: 0.4);
outro.Play(arp, 34, 1, "E4", velocity: 0.4);
outro.Play(arp, 35, 1, "C4", velocity: 0.4);
outro.Play(arp, 36, 1, "C5", velocity: 0.4);
outro.Play(arp, 37, 1, "G4", velocity: 0.4);
outro.Play(arp, 38, 1, "E4", velocity: 0.4);
outro.Play(arp, 39, 1, "C4", velocity: 0.4);
outro.Play(arp, 40, 1, "C5", velocity: 0.4);
outro.Play(arp, 41, 1, "G4", velocity: 0.4);
outro.Play(arp, 42, 1, "E4", velocity: 0.4);
outro.Play(arp, 43, 1, "C4", velocity: 0.4);
outro.Play(arp, 44, 1, "C5", velocity: 0.4);
outro.Play(arp, 45, 1, "G4", velocity: 0.4);
outro.Play(arp, 46, 1, "E4", velocity: 0.4);
outro.Play(arp, 47, 1, "C4", velocity: 0.4);
// outro, bar 4
outro.Play(arp, 48, 1, "G4", velocity: 0.4);
outro.Play(arp, 49, 1, "D4", velocity: 0.4);
outro.Play(arp, 50, 1, "B3", velocity: 0.4);
outro.Play(arp, 51, 1, "G3", velocity: 0.4);
outro.Play(arp, 52, 1, "G4", velocity: 0.4);
outro.Play(arp, 53, 1, "D4", velocity: 0.4);
outro.Play(arp, 54, 1, "B3", velocity: 0.4);
outro.Play(arp, 55, 1, "G3", velocity: 0.4);
outro.Play(arp, 56, 1, "G4", velocity: 0.4);
outro.Play(arp, 57, 1, "D4", velocity: 0.4);
outro.Play(arp, 58, 1, "B3", velocity: 0.4);
outro.Play(arp, 59, 1, "G3", velocity: 0.4);
outro.Play(arp, 60, 1, "G4", velocity: 0.4);
outro.Play(arp, 61, 1, "D4", velocity: 0.4);
outro.Play(arp, 62, 1, "B3", velocity: 0.4);
outro.Play(arp, 63, 1, "G3", velocity: 0.4);

// The arrangement: the patterns in the order they play (40 bars, 1:32)
song.Arrange(intro, drive, drive, chorus, chorus, brk, drive, chorus,
    chorus, outro);

song.Play();
