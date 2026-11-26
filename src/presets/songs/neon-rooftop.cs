// PetarByte Beats: this song, written as C# code.
// Channels are the sounds, patterns are a few bars each, the arrangement plays them in order.
var song = new Song(bpm: 140, swing: 0, key: "C minor");

// Channels: one sound each, with its mixer settings below it
var kick = song.Drum(Drums.Kick808);
kick.Volume = 0.85;
kick.Decay = 0.6;
var snare = song.Drum(Drums.Snare808);
snare.Volume = 0.7;
snare.Reverb = 0.15;
var clap = song.Drum(Drums.Clap);
clap.Volume = 0.45;
var hat = song.Drum(Drums.Hat808);
hat.Volume = 0.42;
var openhat = song.Drum(Drums.OpenHat808);
openhat.Volume = 0.3;
var crash = song.Drum(Drums.Crash);
crash.Volume = 0.3;
var bass = song.Instrument(Instruments.Bass808);
bass.Volume = 0.85;
var pad = song.Instrument(Instruments.WarmPad);
pad.Volume = 0.45;
pad.Reverb = 0.35;
pad.Sidechain = 0.5;
var bell = song.Instrument(Instruments.Bell);
bell.Volume = 0.5;
bell.Reverb = 0.35;
bell.Delay = 0.25;
var pluck = song.Instrument(Instruments.Pluck);
pluck.Volume = 0.35;
pluck.Pan = -0.3;
pluck.Delay = 0.3;
pluck.Sidechain = 0.3;

// Pattern intro: Hits(drum, steps) with x = hit, X = loud, . = rest. Play(instrument, step, length, notes).
var intro = song.Pattern(bars: 4);
intro.Hits(hat, "................|................|................|........x.x.xxxx");
intro.Play(pad, 0, 16, "C3 D#3 G3", velocity: 0.6);
// intro, bar 2
intro.Play(pad, 16, 16, "G#2 C3 D#3", velocity: 0.6);
// intro, bar 3
intro.Play(pad, 32, 16, "D#3 G3 A#3", velocity: 0.6);
// intro, bar 4
intro.Play(pad, 48, 16, "A#2 D3 F3", velocity: 0.6);
intro.Play(bell, 0, 2, "G5", velocity: 0.45);
intro.Play(bell, 2, 2, "D#5", velocity: 0.45);
intro.Play(bell, 4, 2, "C5", velocity: 0.45);
intro.Play(bell, 6, 2, "D#5", velocity: 0.45);
intro.Play(bell, 8, 4, "G5", velocity: 0.45);
intro.Play(bell, 12, 2, "A#5", velocity: 0.45);
intro.Play(bell, 14, 2, "G5", velocity: 0.45);
// intro, bar 2
intro.Play(bell, 16, 2, "G#5", velocity: 0.45);
intro.Play(bell, 18, 2, "G5", velocity: 0.45);
intro.Play(bell, 20, 2, "D#5", velocity: 0.45);
intro.Play(bell, 22, 2, "C5", velocity: 0.45);
intro.Play(bell, 24, 8, "D#5", velocity: 0.45);
// intro, bar 3
intro.Play(bell, 32, 2, "G5", velocity: 0.45);
intro.Play(bell, 34, 2, "D#5", velocity: 0.45);
intro.Play(bell, 36, 2, "A#4", velocity: 0.45);
intro.Play(bell, 38, 2, "D#5", velocity: 0.45);
intro.Play(bell, 40, 4, "G5", velocity: 0.45);
intro.Play(bell, 44, 4, "A#5", velocity: 0.45);
// intro, bar 4
intro.Play(bell, 48, 3, "C6", velocity: 0.45);
intro.Play(bell, 51, 3, "A#5", velocity: 0.45);
intro.Play(bell, 54, 2, "G5", velocity: 0.45);
intro.Play(bell, 56, 8, "F5", velocity: 0.45);

// Pattern verse
var verse = song.Pattern(bars: 4);
verse.Hits(kick,  "x.........x.....|x.....x...x....x|x.........x.....|x.....x...x....x");
verse.Hits(snare, "........x.......|........x.......|........x.......|........x.......");
verse.Hits(clap,  "........x.......|........x.......|........x.......|........x.......");
verse.Hits(hat,   "x.x.x.x.x.x.x.x.|x.x.x.xxx.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.xxxxXxXx");
verse.Play(bass, 0, 10, "C2");
verse.Play(bass, 10, 6, "C2");
// verse, bar 2
verse.Play(bass, 16, 6, "G#1");
verse.Play(bass, 22, 4, "G#1");
verse.Play(bass, 26, 6, "D#2");
// verse, bar 3
verse.Play(bass, 32, 10, "D#2");
verse.Play(bass, 42, 6, "D#2");
// verse, bar 4
verse.Play(bass, 48, 6, "A#1");
verse.Play(bass, 54, 4, "A#1");
verse.Play(bass, 60, 4, "D2");
verse.Play(pad, 0, 16, "C3 D#3 G3", velocity: 0.45);
// verse, bar 2
verse.Play(pad, 16, 16, "G#2 C3 D#3", velocity: 0.45);
// verse, bar 3
verse.Play(pad, 32, 16, "D#3 G3 A#3", velocity: 0.45);
// verse, bar 4
verse.Play(pad, 48, 16, "A#2 D3 F3", velocity: 0.45);
verse.Play(pluck, 0, 2, "C4", velocity: 0.5);
verse.Play(pluck, 4, 2, "D#4", velocity: 0.5);
verse.Play(pluck, 8, 2, "G4", velocity: 0.5);
verse.Play(pluck, 12, 2, "D#4", velocity: 0.5);
// verse, bar 2
verse.Play(pluck, 16, 2, "G#3", velocity: 0.5);
verse.Play(pluck, 20, 2, "C4", velocity: 0.5);
verse.Play(pluck, 24, 2, "D#4", velocity: 0.5);
verse.Play(pluck, 28, 2, "C4", velocity: 0.5);
// verse, bar 3
verse.Play(pluck, 32, 2, "D#4", velocity: 0.5);
verse.Play(pluck, 36, 2, "G4", velocity: 0.5);
verse.Play(pluck, 40, 2, "A#4", velocity: 0.5);
verse.Play(pluck, 44, 2, "G4", velocity: 0.5);
// verse, bar 4
verse.Play(pluck, 48, 2, "A#3", velocity: 0.5);
verse.Play(pluck, 52, 2, "D4", velocity: 0.5);
verse.Play(pluck, 56, 2, "F4", velocity: 0.5);
verse.Play(pluck, 60, 2, "D4", velocity: 0.5);

// Pattern hook
var hook = song.Pattern(bars: 4);
hook.Hits(kick,    "x.........x.....|x.....x...x....x|x.........x.....|x.....x...x....x");
hook.Hits(snare,   "........x.......|........x.......|........x.......|........x.......");
hook.Hits(clap,    "........x.......|........x.......|........x.......|........x.......");
hook.Hits(hat,     "x.xxx.x.x.xxx.x.|x.x.x.xxx.x.x.x.|x.xxx.x.x.xxx.x.|x.x.x.x.xxxxXxXx");
hook.Hits(openhat, "......x.......x.|......x.......x.|......x.......x.|......x.......x.");
hook.Hits(crash,   "x...............|................|................|................");
hook.Play(bass, 0, 10, "C2");
hook.Play(bass, 10, 6, "C2");
// hook, bar 2
hook.Play(bass, 16, 6, "G#1");
hook.Play(bass, 22, 4, "G#1");
hook.Play(bass, 26, 6, "D#2");
// hook, bar 3
hook.Play(bass, 32, 10, "D#2");
hook.Play(bass, 42, 6, "D#2");
// hook, bar 4
hook.Play(bass, 48, 6, "A#1");
hook.Play(bass, 54, 4, "A#1");
hook.Play(bass, 60, 4, "D2");
hook.Play(pad, 0, 16, "C3 D#3 G3", velocity: 0.55);
// hook, bar 2
hook.Play(pad, 16, 16, "G#2 C3 D#3", velocity: 0.55);
// hook, bar 3
hook.Play(pad, 32, 16, "D#3 G3 A#3", velocity: 0.55);
// hook, bar 4
hook.Play(pad, 48, 16, "A#2 D3 F3", velocity: 0.55);
hook.Play(bell, 0, 2, "G5");
hook.Play(bell, 2, 2, "D#5");
hook.Play(bell, 4, 2, "C5");
hook.Play(bell, 6, 2, "D#5");
hook.Play(bell, 8, 4, "G5");
hook.Play(bell, 12, 2, "A#5");
hook.Play(bell, 14, 2, "G5");
// hook, bar 2
hook.Play(bell, 16, 2, "G#5");
hook.Play(bell, 18, 2, "G5");
hook.Play(bell, 20, 2, "D#5");
hook.Play(bell, 22, 2, "C5");
hook.Play(bell, 24, 8, "D#5");
// hook, bar 3
hook.Play(bell, 32, 2, "G5");
hook.Play(bell, 34, 2, "D#5");
hook.Play(bell, 36, 2, "A#4");
hook.Play(bell, 38, 2, "D#5");
hook.Play(bell, 40, 4, "G5");
hook.Play(bell, 44, 4, "A#5");
// hook, bar 4
hook.Play(bell, 48, 3, "C6");
hook.Play(bell, 51, 3, "A#5");
hook.Play(bell, 54, 2, "G5");
hook.Play(bell, 56, 8, "F5");
hook.Play(pluck, 0, 2, "C4", velocity: 0.45);
hook.Play(pluck, 2, 2, "D#4", velocity: 0.45);
hook.Play(pluck, 4, 2, "G4", velocity: 0.45);
hook.Play(pluck, 6, 2, "C5", velocity: 0.45);
hook.Play(pluck, 8, 2, "G4", velocity: 0.45);
hook.Play(pluck, 10, 2, "D#4", velocity: 0.45);
hook.Play(pluck, 12, 2, "C4", velocity: 0.45);
hook.Play(pluck, 14, 2, "D#4", velocity: 0.45);
// hook, bar 2
hook.Play(pluck, 16, 2, "G#3", velocity: 0.45);
hook.Play(pluck, 18, 2, "C4", velocity: 0.45);
hook.Play(pluck, 20, 2, "D#4", velocity: 0.45);
hook.Play(pluck, 22, 2, "G#4", velocity: 0.45);
hook.Play(pluck, 24, 2, "D#4", velocity: 0.45);
hook.Play(pluck, 26, 2, "C4", velocity: 0.45);
hook.Play(pluck, 28, 2, "G#3", velocity: 0.45);
hook.Play(pluck, 30, 2, "C4", velocity: 0.45);
// hook, bar 3
hook.Play(pluck, 32, 2, "D#4", velocity: 0.45);
hook.Play(pluck, 34, 2, "G4", velocity: 0.45);
hook.Play(pluck, 36, 2, "A#4", velocity: 0.45);
hook.Play(pluck, 38, 2, "D#5", velocity: 0.45);
hook.Play(pluck, 40, 2, "A#4", velocity: 0.45);
hook.Play(pluck, 42, 2, "G4", velocity: 0.45);
hook.Play(pluck, 44, 2, "D#4", velocity: 0.45);
hook.Play(pluck, 46, 2, "G4", velocity: 0.45);
// hook, bar 4
hook.Play(pluck, 48, 2, "A#3", velocity: 0.45);
hook.Play(pluck, 50, 2, "D4", velocity: 0.45);
hook.Play(pluck, 52, 2, "F4", velocity: 0.45);
hook.Play(pluck, 54, 2, "A#4", velocity: 0.45);
hook.Play(pluck, 56, 2, "F4", velocity: 0.45);
hook.Play(pluck, 58, 2, "D4", velocity: 0.45);
hook.Play(pluck, 60, 2, "A#3", velocity: 0.45);
hook.Play(pluck, 62, 2, "D4", velocity: 0.45);

// Pattern brk
var brk = song.Pattern(bars: 4);
brk.Hits(snare, "................|................|................|x.x.x.x.xxxxXXXX");
brk.Play(pad, 0, 8, "C3 D#3 G3", velocity: 0.5);
brk.Play(pad, 8, 8, "C3 D#3 G3", velocity: 0.5);
// brk, bar 2
brk.Play(pad, 16, 8, "G#2 C3 D#3", velocity: 0.5);
brk.Play(pad, 24, 8, "G#2 C3 D#3", velocity: 0.5);
// brk, bar 3
brk.Play(pad, 32, 8, "D#3 G3 A#3", velocity: 0.5);
brk.Play(pad, 40, 8, "D#3 G3 A#3", velocity: 0.5);
// brk, bar 4
brk.Play(pad, 48, 8, "A#2 D3 F3", velocity: 0.5);
brk.Play(pad, 56, 8, "A#2 D3 F3", velocity: 0.5);
brk.Play(bell, 0, 4, "G5");
brk.Play(bell, 8, 4, "D#5");
// brk, bar 2
brk.Play(bell, 16, 8, "C5");
// brk, bar 3
brk.Play(bell, 32, 4, "G5");
brk.Play(bell, 40, 4, "A#5");
// brk, bar 4
brk.Play(bell, 48, 16, "F5");

// Pattern outro
var outro = song.Pattern(bars: 4);
outro.Hits(kick, "x...............|................|................|................");
outro.Play(pad, 0, 16, "C3 D#3 G3", velocity: 0.4);
// outro, bar 2
outro.Play(pad, 16, 16, "G#2 C3 D#3", velocity: 0.4);
// outro, bar 3
outro.Play(pad, 32, 16, "D#3 G3 A#3", velocity: 0.4);
// outro, bar 4
outro.Play(pad, 48, 16, "A#2 D3 F3", velocity: 0.4);
outro.Play(bell, 0, 16, "G5");
// outro, bar 2
outro.Play(bell, 16, 16, "D#5");
// outro, bar 3
outro.Play(bell, 32, 16, "A#4");
// outro, bar 4
outro.Play(bell, 48, 16, "C5");

// The arrangement: the patterns in the order they play (52 bars, 1:29)
song.Arrange(intro, verse, verse, hook, hook, brk, verse, verse,
    hook, hook, brk, hook, outro);

song.Play();
