// PetarByte Beats: this song, written as C# code.
// Channels are the sounds, patterns are a few bars each, the arrangement plays them in order.
var song = new Song(bpm: 150, swing: 0, key: "C major");

// Channels: one sound each, with its mixer settings below it
var kick = song.Drum(Drums.Kick909);
kick.Volume = 0.75;
var snare = song.Drum(Drums.Snare909);
snare.Volume = 0.55;
var hat = song.Drum(Drums.Hat909);
hat.Volume = 0.35;
var lead = song.Instrument(Instruments.ChipLead);
lead.Volume = 0.7;
lead.Delay = 0.12;
var harm = song.Instrument(Instruments.ChipLead);
harm.Volume = 0.35;
harm.Pan = 0.3;
var bass = song.Instrument(Instruments.SynthBass);
bass.Volume = 0.7;

// Pattern intro: Hits(drum, steps) with x = hit, X = loud, . = rest. Play(instrument, step, length, notes).
var intro = song.Pattern(bars: 4);
intro.Play(harm, 0, 2, "C4", velocity: 0.5);
intro.Play(harm, 2, 2, "E4", velocity: 0.5);
intro.Play(harm, 4, 2, "G4", velocity: 0.5);
intro.Play(harm, 6, 2, "E4", velocity: 0.5);
intro.Play(harm, 8, 2, "C4", velocity: 0.5);
intro.Play(harm, 10, 2, "E4", velocity: 0.5);
intro.Play(harm, 12, 2, "G4", velocity: 0.5);
intro.Play(harm, 14, 2, "E4", velocity: 0.5);
// intro, bar 2
intro.Play(harm, 16, 2, "F4", velocity: 0.5);
intro.Play(harm, 18, 2, "A4", velocity: 0.5);
intro.Play(harm, 20, 2, "C5", velocity: 0.5);
intro.Play(harm, 22, 2, "A4", velocity: 0.5);
intro.Play(harm, 24, 2, "F4", velocity: 0.5);
intro.Play(harm, 26, 2, "A4", velocity: 0.5);
intro.Play(harm, 28, 2, "C5", velocity: 0.5);
intro.Play(harm, 30, 2, "A4", velocity: 0.5);
// intro, bar 3
intro.Play(harm, 32, 2, "C4", velocity: 0.5);
intro.Play(harm, 34, 2, "E4", velocity: 0.5);
intro.Play(harm, 36, 2, "G4", velocity: 0.5);
intro.Play(harm, 38, 2, "E4", velocity: 0.5);
intro.Play(harm, 40, 2, "C4", velocity: 0.5);
intro.Play(harm, 42, 2, "E4", velocity: 0.5);
intro.Play(harm, 44, 2, "G4", velocity: 0.5);
intro.Play(harm, 46, 2, "E4", velocity: 0.5);
// intro, bar 4
intro.Play(harm, 48, 2, "G4", velocity: 0.5);
intro.Play(harm, 50, 2, "B4", velocity: 0.5);
intro.Play(harm, 52, 2, "D5", velocity: 0.5);
intro.Play(harm, 54, 2, "B4", velocity: 0.5);
intro.Play(harm, 56, 2, "G4", velocity: 0.5);
intro.Play(harm, 58, 2, "B4", velocity: 0.5);
intro.Play(harm, 60, 2, "D5", velocity: 0.5);
intro.Play(harm, 62, 2, "B4", velocity: 0.5);
intro.Play(bass, 0, 2, "C2", velocity: 0.85);
intro.Play(bass, 4, 2, "C2", velocity: 0.85);
intro.Play(bass, 8, 2, "C2", velocity: 0.85);
intro.Play(bass, 12, 2, "C2", velocity: 0.85);
// intro, bar 2
intro.Play(bass, 16, 2, "F2", velocity: 0.85);
intro.Play(bass, 20, 2, "F2", velocity: 0.85);
intro.Play(bass, 24, 2, "F2", velocity: 0.85);
intro.Play(bass, 28, 2, "F2", velocity: 0.85);
// intro, bar 3
intro.Play(bass, 32, 2, "C2", velocity: 0.85);
intro.Play(bass, 36, 2, "C2", velocity: 0.85);
intro.Play(bass, 40, 2, "C2", velocity: 0.85);
intro.Play(bass, 44, 2, "C2", velocity: 0.85);
// intro, bar 4
intro.Play(bass, 48, 2, "G1", velocity: 0.85);
intro.Play(bass, 52, 2, "G1", velocity: 0.85);
intro.Play(bass, 56, 2, "G1", velocity: 0.85);
intro.Play(bass, 60, 2, "G1", velocity: 0.85);

// Pattern a
var a = song.Pattern(bars: 4);
a.Hits(kick,  "x.......x.x.....|x.......x.x.....|x.......x.x.....|x.......x.x.....");
a.Hits(snare, "....x.......x...|....x.......x...|....x.......x...|....x.......x...");
a.Hits(hat,   "x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.");
a.Play(lead, 0, 2, "E5");
a.Play(lead, 2, 2, "G5");
a.Play(lead, 4, 4, "C6");
a.Play(lead, 8, 2, "B5");
a.Play(lead, 10, 2, "G5");
a.Play(lead, 12, 4, "E5");
// a, bar 2
a.Play(lead, 16, 2, "F5");
a.Play(lead, 18, 2, "A5");
a.Play(lead, 20, 4, "D6");
a.Play(lead, 24, 2, "C6");
a.Play(lead, 26, 2, "A5");
a.Play(lead, 28, 4, "F5");
// a, bar 3
a.Play(lead, 32, 2, "E5");
a.Play(lead, 34, 2, "G5");
a.Play(lead, 36, 2, "C6");
a.Play(lead, 38, 2, "E6");
a.Play(lead, 40, 4, "D6");
a.Play(lead, 44, 4, "C6");
// a, bar 4
a.Play(lead, 48, 4, "B5");
a.Play(lead, 52, 4, "G5");
a.Play(lead, 56, 8, "D5");
a.Play(harm, 0, 2, "C4", velocity: 0.45);
a.Play(harm, 2, 2, "E4", velocity: 0.45);
a.Play(harm, 4, 2, "G4", velocity: 0.45);
a.Play(harm, 6, 2, "E4", velocity: 0.45);
a.Play(harm, 8, 2, "C4", velocity: 0.45);
a.Play(harm, 10, 2, "E4", velocity: 0.45);
a.Play(harm, 12, 2, "G4", velocity: 0.45);
a.Play(harm, 14, 2, "E4", velocity: 0.45);
// a, bar 2
a.Play(harm, 16, 2, "F4", velocity: 0.45);
a.Play(harm, 18, 2, "A4", velocity: 0.45);
a.Play(harm, 20, 2, "C5", velocity: 0.45);
a.Play(harm, 22, 2, "A4", velocity: 0.45);
a.Play(harm, 24, 2, "F4", velocity: 0.45);
a.Play(harm, 26, 2, "A4", velocity: 0.45);
a.Play(harm, 28, 2, "C5", velocity: 0.45);
a.Play(harm, 30, 2, "A4", velocity: 0.45);
// a, bar 3
a.Play(harm, 32, 2, "C4", velocity: 0.45);
a.Play(harm, 34, 2, "E4", velocity: 0.45);
a.Play(harm, 36, 2, "G4", velocity: 0.45);
a.Play(harm, 38, 2, "E4", velocity: 0.45);
a.Play(harm, 40, 2, "C4", velocity: 0.45);
a.Play(harm, 42, 2, "E4", velocity: 0.45);
a.Play(harm, 44, 2, "G4", velocity: 0.45);
a.Play(harm, 46, 2, "E4", velocity: 0.45);
// a, bar 4
a.Play(harm, 48, 2, "G4", velocity: 0.45);
a.Play(harm, 50, 2, "B4", velocity: 0.45);
a.Play(harm, 52, 2, "D5", velocity: 0.45);
a.Play(harm, 54, 2, "B4", velocity: 0.45);
a.Play(harm, 56, 2, "G4", velocity: 0.45);
a.Play(harm, 58, 2, "B4", velocity: 0.45);
a.Play(harm, 60, 2, "D5", velocity: 0.45);
a.Play(harm, 62, 2, "B4", velocity: 0.45);
a.Play(bass, 0, 2, "C2", velocity: 0.85);
a.Play(bass, 4, 2, "C3", velocity: 0.85);
a.Play(bass, 8, 2, "C2", velocity: 0.85);
a.Play(bass, 12, 2, "C3", velocity: 0.85);
// a, bar 2
a.Play(bass, 16, 2, "F2", velocity: 0.85);
a.Play(bass, 20, 2, "F3", velocity: 0.85);
a.Play(bass, 24, 2, "F2", velocity: 0.85);
a.Play(bass, 28, 2, "F3", velocity: 0.85);
// a, bar 3
a.Play(bass, 32, 2, "C2", velocity: 0.85);
a.Play(bass, 36, 2, "C3", velocity: 0.85);
a.Play(bass, 40, 2, "C2", velocity: 0.85);
a.Play(bass, 44, 2, "C3", velocity: 0.85);
// a, bar 4
a.Play(bass, 48, 2, "G1", velocity: 0.85);
a.Play(bass, 52, 2, "G2", velocity: 0.85);
a.Play(bass, 56, 2, "G1", velocity: 0.85);
a.Play(bass, 60, 2, "G2", velocity: 0.85);

// Pattern b
var b = song.Pattern(bars: 4);
b.Hits(kick,  "x.......x.x.....|x.......x.x.....|x.......x.x.....|x.......x.x.....");
b.Hits(snare, "....x.......x...|....x.......x...|....x.......x...|....x...x.x.xxxx");
b.Hits(hat,   "x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.");
b.Play(lead, 0, 4, "A5");
b.Play(lead, 4, 2, "G5");
b.Play(lead, 6, 2, "E5");
b.Play(lead, 8, 4, "F5");
b.Play(lead, 12, 4, "D5");
// b, bar 2
b.Play(lead, 16, 4, "G5");
b.Play(lead, 20, 2, "E5");
b.Play(lead, 22, 2, "C5");
b.Play(lead, 24, 8, "D5");
// b, bar 3
b.Play(lead, 32, 4, "A5");
b.Play(lead, 36, 2, "B5");
b.Play(lead, 38, 2, "C6");
b.Play(lead, 40, 4, "D6");
b.Play(lead, 44, 4, "B5");
// b, bar 4
b.Play(lead, 48, 12, "C6");
b.Play(lead, 60, 4, "G5");
b.Play(harm, 0, 2, "A4", velocity: 0.45);
b.Play(harm, 2, 2, "C5", velocity: 0.45);
b.Play(harm, 4, 2, "E5", velocity: 0.45);
b.Play(harm, 6, 2, "C5", velocity: 0.45);
b.Play(harm, 8, 2, "A4", velocity: 0.45);
b.Play(harm, 10, 2, "C5", velocity: 0.45);
b.Play(harm, 12, 2, "E5", velocity: 0.45);
b.Play(harm, 14, 2, "C5", velocity: 0.45);
// b, bar 2
b.Play(harm, 16, 2, "E4", velocity: 0.45);
b.Play(harm, 18, 2, "G4", velocity: 0.45);
b.Play(harm, 20, 2, "C5", velocity: 0.45);
b.Play(harm, 22, 2, "G4", velocity: 0.45);
b.Play(harm, 24, 2, "E4", velocity: 0.45);
b.Play(harm, 26, 2, "G4", velocity: 0.45);
b.Play(harm, 28, 2, "C5", velocity: 0.45);
b.Play(harm, 30, 2, "G4", velocity: 0.45);
// b, bar 3
b.Play(harm, 32, 2, "F4", velocity: 0.45);
b.Play(harm, 34, 2, "A4", velocity: 0.45);
b.Play(harm, 36, 2, "D5", velocity: 0.45);
b.Play(harm, 38, 2, "A4", velocity: 0.45);
b.Play(harm, 40, 2, "F4", velocity: 0.45);
b.Play(harm, 42, 2, "A4", velocity: 0.45);
b.Play(harm, 44, 2, "D5", velocity: 0.45);
b.Play(harm, 46, 2, "A4", velocity: 0.45);
// b, bar 4
b.Play(harm, 48, 2, "C4", velocity: 0.45);
b.Play(harm, 50, 2, "E4", velocity: 0.45);
b.Play(harm, 52, 2, "G4", velocity: 0.45);
b.Play(harm, 54, 2, "E4", velocity: 0.45);
b.Play(harm, 56, 2, "C4", velocity: 0.45);
b.Play(harm, 58, 2, "E4", velocity: 0.45);
b.Play(harm, 60, 2, "G4", velocity: 0.45);
b.Play(harm, 62, 2, "E4", velocity: 0.45);
b.Play(bass, 0, 2, "A1", velocity: 0.85);
b.Play(bass, 4, 2, "A2", velocity: 0.85);
b.Play(bass, 8, 2, "A1", velocity: 0.85);
b.Play(bass, 12, 2, "A2", velocity: 0.85);
// b, bar 2
b.Play(bass, 16, 2, "E2", velocity: 0.85);
b.Play(bass, 20, 2, "E3", velocity: 0.85);
b.Play(bass, 24, 2, "E2", velocity: 0.85);
b.Play(bass, 28, 2, "E3", velocity: 0.85);
// b, bar 3
b.Play(bass, 32, 2, "F2", velocity: 0.85);
b.Play(bass, 36, 2, "F3", velocity: 0.85);
b.Play(bass, 40, 2, "F2", velocity: 0.85);
b.Play(bass, 44, 2, "F3", velocity: 0.85);
// b, bar 4
b.Play(bass, 48, 2, "C2", velocity: 0.85);
b.Play(bass, 52, 2, "C3", velocity: 0.85);
b.Play(bass, 56, 2, "C2", velocity: 0.85);
b.Play(bass, 60, 2, "C3", velocity: 0.85);

// Pattern brk
var brk = song.Pattern(bars: 4);
brk.Play(lead, 0, 8, "E6");
// brk, bar 2
brk.Play(lead, 16, 8, "C6");
// brk, bar 3
brk.Play(lead, 32, 8, "D6");
// brk, bar 4
brk.Play(lead, 48, 16, "G5");
brk.Play(harm, 0, 2, "E5", velocity: 0.45);
brk.Play(harm, 2, 2, "C5", velocity: 0.45);
brk.Play(harm, 4, 2, "A4", velocity: 0.45);
brk.Play(harm, 6, 2, "C5", velocity: 0.45);
brk.Play(harm, 8, 2, "E5", velocity: 0.45);
brk.Play(harm, 10, 2, "C5", velocity: 0.45);
brk.Play(harm, 12, 2, "A4", velocity: 0.45);
brk.Play(harm, 14, 2, "C5", velocity: 0.45);
// brk, bar 2
brk.Play(harm, 16, 2, "C5", velocity: 0.45);
brk.Play(harm, 18, 2, "G4", velocity: 0.45);
brk.Play(harm, 20, 2, "E4", velocity: 0.45);
brk.Play(harm, 22, 2, "G4", velocity: 0.45);
brk.Play(harm, 24, 2, "C5", velocity: 0.45);
brk.Play(harm, 26, 2, "G4", velocity: 0.45);
brk.Play(harm, 28, 2, "E4", velocity: 0.45);
brk.Play(harm, 30, 2, "G4", velocity: 0.45);
// brk, bar 3
brk.Play(harm, 32, 2, "D5", velocity: 0.45);
brk.Play(harm, 34, 2, "A4", velocity: 0.45);
brk.Play(harm, 36, 2, "F4", velocity: 0.45);
brk.Play(harm, 38, 2, "A4", velocity: 0.45);
brk.Play(harm, 40, 2, "D5", velocity: 0.45);
brk.Play(harm, 42, 2, "A4", velocity: 0.45);
brk.Play(harm, 44, 2, "F4", velocity: 0.45);
brk.Play(harm, 46, 2, "A4", velocity: 0.45);
// brk, bar 4
brk.Play(harm, 48, 2, "G4", velocity: 0.45);
brk.Play(harm, 50, 2, "E4", velocity: 0.45);
brk.Play(harm, 52, 2, "C4", velocity: 0.45);
brk.Play(harm, 54, 2, "E4", velocity: 0.45);
brk.Play(harm, 56, 2, "G4", velocity: 0.45);
brk.Play(harm, 58, 2, "E4", velocity: 0.45);
brk.Play(harm, 60, 2, "C4", velocity: 0.45);
brk.Play(harm, 62, 2, "E4", velocity: 0.45);

// The arrangement: the patterns in the order they play (56 bars, 1:30)
song.Arrange(intro, a, a, b, a, b, brk, a,
    a, b, b, a, b, intro);

// The master: volume, and how much reverb and delay come back
song.Reverb = 0.6;

song.Play();
