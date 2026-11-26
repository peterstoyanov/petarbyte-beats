// PetarByte Beats: this song, written as C# code.
// Channels are the sounds, patterns are a few bars each, the arrangement plays them in order.
var song = new Song(bpm: 90, swing: 30, key: "D minor");

// Channels: one sound each, with its mixer settings below it
var kick = song.Drum(Drums.Kick808);
kick.Volume = 0.9;
kick.Decay = 0.45;
var snare = song.Drum(Drums.Snare909);
snare.Volume = 0.7;
snare.Cutoff = 0.8;
var hat = song.Drum(Drums.Hat808);
hat.Volume = 0.38;
var openhat = song.Drum(Drums.OpenHat808);
openhat.Volume = 0.3;
var zap = song.Drum(Drums.Zap);
zap.Volume = 0.25;
var keys = song.Instrument(Instruments.ElectricPiano);
keys.Volume = 0.7;
keys.Reverb = 0.2;
var bass = song.Instrument(Instruments.Bass808);
var bell = song.Instrument(Instruments.Bell);
bell.Volume = 0.35;
bell.Reverb = 0.3;

// Pattern intro: Hits(drum, steps) with x = hit, X = loud, . = rest. Play(instrument, step, length, notes).
var intro = song.Pattern(bars: 4);
intro.Hits(zap, "................|................|................|............x.x.");
intro.Play(keys, 0, 10, "D3 F3 A3 C4", velocity: 0.6);
intro.Play(keys, 12, 4, "D3 F3 A3 C4", velocity: 0.6);
// intro, bar 2
intro.Play(keys, 16, 10, "D3 F3 A3 C4", velocity: 0.6);
intro.Play(keys, 28, 4, "D3 F3 A3 C4", velocity: 0.6);
// intro, bar 3
intro.Play(keys, 32, 10, "G3 A#3 D4 F4", velocity: 0.6);
intro.Play(keys, 44, 4, "G3 A#3 D4 F4", velocity: 0.6);
// intro, bar 4
intro.Play(keys, 48, 10, "A3 C#4 E4 G4", velocity: 0.6);
intro.Play(keys, 60, 4, "A3 C#4 E4 G4", velocity: 0.6);

// Pattern loop
var loop = song.Pattern(bars: 4);
loop.Hits(kick,    "x.......x.x.....|x.....x...x.....|x.......x.x.....|x.....x...x.....");
loop.Hits(snare,   "....x.......x...|....x.......x..x|....x.......x...|....x.......x..x");
loop.Hits(hat,     "x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.");
loop.Hits(openhat, "..............x.|..............x.|..............x.|..............x.");
loop.Play(keys, 0, 10, "D3 F3 A3 C4", velocity: 0.6);
loop.Play(keys, 12, 4, "D3 F3 A3 C4", velocity: 0.6);
// loop, bar 2
loop.Play(keys, 16, 10, "D3 F3 A3 C4", velocity: 0.6);
loop.Play(keys, 28, 4, "D3 F3 A3 C4", velocity: 0.6);
// loop, bar 3
loop.Play(keys, 32, 10, "G3 A#3 D4 F4", velocity: 0.6);
loop.Play(keys, 44, 4, "G3 A#3 D4 F4", velocity: 0.6);
// loop, bar 4
loop.Play(keys, 48, 10, "A3 C#4 E4 G4", velocity: 0.6);
loop.Play(keys, 60, 4, "A3 C#4 E4 G4", velocity: 0.6);
loop.Play(bass, 0, 6, "D2", velocity: 0.85);
loop.Play(bass, 7, 3, "D2", velocity: 0.85);
loop.Play(bass, 10, 4, "D2", velocity: 0.85);
// loop, bar 2
loop.Play(bass, 16, 6, "D2", velocity: 0.85);
loop.Play(bass, 23, 3, "D2", velocity: 0.85);
loop.Play(bass, 26, 4, "D2", velocity: 0.85);
// loop, bar 3
loop.Play(bass, 32, 6, "G1", velocity: 0.85);
loop.Play(bass, 39, 3, "G1", velocity: 0.85);
loop.Play(bass, 42, 4, "G1", velocity: 0.85);
// loop, bar 4
loop.Play(bass, 48, 6, "A1", velocity: 0.85);
loop.Play(bass, 55, 3, "A1", velocity: 0.85);
loop.Play(bass, 58, 4, "A1", velocity: 0.85);

// Pattern hook
var hook = song.Pattern(bars: 4);
hook.Hits(kick,    "x.......x.x.....|x.....x...x.....|x.......x.x.....|x.....x...x.....");
hook.Hits(snare,   "....x.......x...|....x.......x..x|....x.......x...|....x.......x..x");
hook.Hits(hat,     "x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.");
hook.Hits(openhat, "..............x.|..............x.|..............x.|..............x.");
hook.Hits(zap,     "................|............x.x.|................|............x.x.");
hook.Play(keys, 0, 10, "D3 F3 A3 C4", velocity: 0.55);
hook.Play(keys, 12, 4, "D3 F3 A3 C4", velocity: 0.55);
// hook, bar 2
hook.Play(keys, 16, 10, "D3 F3 A3 C4", velocity: 0.55);
hook.Play(keys, 28, 4, "D3 F3 A3 C4", velocity: 0.55);
// hook, bar 3
hook.Play(keys, 32, 10, "G3 A#3 D4 F4", velocity: 0.55);
hook.Play(keys, 44, 4, "G3 A#3 D4 F4", velocity: 0.55);
// hook, bar 4
hook.Play(keys, 48, 10, "A3 C#4 E4 G4", velocity: 0.55);
hook.Play(keys, 60, 4, "A3 C#4 E4 G4", velocity: 0.55);
hook.Play(bass, 0, 6, "D2", velocity: 0.85);
hook.Play(bass, 7, 3, "D2", velocity: 0.85);
hook.Play(bass, 10, 4, "D2", velocity: 0.85);
// hook, bar 2
hook.Play(bass, 16, 6, "D2", velocity: 0.85);
hook.Play(bass, 23, 3, "D2", velocity: 0.85);
hook.Play(bass, 26, 4, "D2", velocity: 0.85);
// hook, bar 3
hook.Play(bass, 32, 6, "G1", velocity: 0.85);
hook.Play(bass, 39, 3, "G1", velocity: 0.85);
hook.Play(bass, 42, 4, "G1", velocity: 0.85);
// hook, bar 4
hook.Play(bass, 48, 6, "A1", velocity: 0.85);
hook.Play(bass, 55, 3, "A1", velocity: 0.85);
hook.Play(bass, 58, 4, "A1", velocity: 0.85);
hook.Play(bell, 0, 4, "A5");
hook.Play(bell, 4, 4, "F5");
hook.Play(bell, 8, 4, "D5");
hook.Play(bell, 12, 4, "F5");
// hook, bar 2
hook.Play(bell, 16, 8, "E5");
hook.Play(bell, 24, 8, "C5");
// hook, bar 3
hook.Play(bell, 32, 4, "D5");
hook.Play(bell, 36, 4, "F5");
hook.Play(bell, 40, 4, "A5");
hook.Play(bell, 44, 4, "G5");
// hook, bar 4
hook.Play(bell, 48, 8, "E5");
hook.Play(bell, 56, 8, "C#5");

// The arrangement: the patterns in the order they play (36 bars, 1:36)
song.Arrange(intro, loop, loop, hook, loop, hook, loop, hook,
    intro);

// The master: volume, and how much reverb and delay come back
song.Reverb = 0.7;

song.Play();
