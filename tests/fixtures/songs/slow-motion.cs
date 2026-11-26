// PetarByte Beats: this song, written as C# code.
// Channels are the sounds, patterns are a few bars each, the arrangement plays them in order.
var song = new Song(bpm: 72, swing: 20, key: "Eb major");

// Channels: one sound each, with its mixer settings below it
var kick = song.Drum(Drums.Kick808);
kick.Volume = 0.85;
kick.Decay = 0.8;
var snap = song.Drum(Drums.Snap);
snap.Volume = 0.5;
snap.Reverb = 0.4;
var hat = song.Drum(Drums.Hat808);
hat.Volume = 0.3;
var keys = song.Instrument(Instruments.ElectricPiano);
keys.Volume = 0.75;
keys.Reverb = 0.35;
var strings = song.Instrument(Instruments.Strings);
strings.Volume = 0.35;
strings.Reverb = 0.5;
var bass = song.Instrument(Instruments.Bass808);
var bell = song.Instrument(Instruments.Bell);
bell.Volume = 0.35;
bell.Reverb = 0.5;
bell.Delay = 0.3;

// Pattern intro: Hits(drum, steps) with x = hit, X = loud, . = rest. Play(instrument, step, length, notes).
var intro = song.Pattern(bars: 4);
intro.Play(keys, 0, 16, "D#3 G3 A#3 D4", velocity: 0.55);
// intro, bar 2
intro.Play(keys, 16, 16, "C3 D#3 G3 A#3", velocity: 0.55);
// intro, bar 3
intro.Play(keys, 32, 16, "G#2 C3 D#3 G3", velocity: 0.55);
// intro, bar 4
intro.Play(keys, 48, 16, "A#2 D3 F3 G#3", velocity: 0.55);
intro.Play(strings, 0, 16, "D#3 G3 A#3 D4", velocity: 0.3);
// intro, bar 2
intro.Play(strings, 16, 16, "C3 D#3 G3 A#3", velocity: 0.3);
// intro, bar 3
intro.Play(strings, 32, 16, "G#2 C3 D#3 G3", velocity: 0.3);
// intro, bar 4
intro.Play(strings, 48, 16, "A#2 D3 F3 G#3", velocity: 0.3);

// Pattern verse
var verse = song.Pattern(bars: 4);
verse.Hits(kick, "x.........x.....|x......x..x.....|x.........x.....|x......x..x.....");
verse.Hits(snap, "....x.......x...|....x.......x...|....x.......x...|....x.......x...");
verse.Hits(hat,  "x.x.x.xxx.x.x.x.|x.x.x.xxx.x.x.x.|x.x.x.xxx.x.x.x.|x.x.x.xxx.x.x.x.");
verse.Play(keys, 0, 7, "D#3 G3 A#3 D4", velocity: 0.55);
verse.Play(keys, 8, 8, "D#3 G3 A#3 D4", velocity: 0.55);
// verse, bar 2
verse.Play(keys, 16, 7, "C3 D#3 G3 A#3", velocity: 0.55);
verse.Play(keys, 24, 8, "C3 D#3 G3 A#3", velocity: 0.55);
// verse, bar 3
verse.Play(keys, 32, 7, "G#2 C3 D#3 G3", velocity: 0.55);
verse.Play(keys, 40, 8, "G#2 C3 D#3 G3", velocity: 0.55);
// verse, bar 4
verse.Play(keys, 48, 7, "A#2 D3 F3 G#3", velocity: 0.55);
verse.Play(keys, 56, 8, "A#2 D3 F3 G#3", velocity: 0.55);
verse.Play(bass, 0, 10, "D#2");
verse.Play(bass, 10, 6, "A#1");
// verse, bar 2
verse.Play(bass, 16, 10, "C2");
verse.Play(bass, 26, 6, "G1");
// verse, bar 3
verse.Play(bass, 32, 10, "G#1");
verse.Play(bass, 42, 6, "D#2");
// verse, bar 4
verse.Play(bass, 48, 8, "A#1");
verse.Play(bass, 56, 8, "D2");

// Pattern hook
var hook = song.Pattern(bars: 4);
hook.Hits(kick, "x.........x.....|x......x..x.....|x.........x.....|x......x..x.....");
hook.Hits(snap, "....x.......x...|....x.......x...|....x.......x...|....x.......x...");
hook.Hits(hat,  "x.x.x.xxx.x.x.x.|x.x.x.xxx.x.x.x.|x.x.x.xxx.x.x.x.|x.x.x.xxx.x.x.x.");
hook.Play(keys, 0, 7, "D#3 G3 A#3 D4", velocity: 0.5);
hook.Play(keys, 8, 8, "D#3 G3 A#3 D4", velocity: 0.5);
// hook, bar 2
hook.Play(keys, 16, 7, "C3 D#3 G3 A#3", velocity: 0.5);
hook.Play(keys, 24, 8, "C3 D#3 G3 A#3", velocity: 0.5);
// hook, bar 3
hook.Play(keys, 32, 7, "G#2 C3 D#3 G3", velocity: 0.5);
hook.Play(keys, 40, 8, "G#2 C3 D#3 G3", velocity: 0.5);
// hook, bar 4
hook.Play(keys, 48, 7, "A#2 D3 F3 G#3", velocity: 0.5);
hook.Play(keys, 56, 8, "A#2 D3 F3 G#3", velocity: 0.5);
hook.Play(strings, 0, 16, "D#3 G3 A#3 D4", velocity: 0.4);
// hook, bar 2
hook.Play(strings, 16, 16, "C3 D#3 G3 A#3", velocity: 0.4);
// hook, bar 3
hook.Play(strings, 32, 16, "G#2 C3 D#3 G3", velocity: 0.4);
// hook, bar 4
hook.Play(strings, 48, 16, "A#2 D3 F3 G#3", velocity: 0.4);
hook.Play(bass, 0, 10, "D#2");
hook.Play(bass, 10, 6, "A#1");
// hook, bar 2
hook.Play(bass, 16, 10, "C2");
hook.Play(bass, 26, 6, "G1");
// hook, bar 3
hook.Play(bass, 32, 10, "G#1");
hook.Play(bass, 42, 6, "D#2");
// hook, bar 4
hook.Play(bass, 48, 8, "A#1");
hook.Play(bass, 56, 8, "D2");
hook.Play(bell, 0, 4, "G5");
hook.Play(bell, 4, 4, "A#5");
hook.Play(bell, 8, 8, "G5");
// hook, bar 2
hook.Play(bell, 16, 4, "F5");
hook.Play(bell, 20, 4, "D#5");
hook.Play(bell, 24, 8, "C5");
// hook, bar 3
hook.Play(bell, 32, 4, "D#5");
hook.Play(bell, 36, 4, "F5");
hook.Play(bell, 40, 4, "G5");
hook.Play(bell, 44, 4, "A#5");
// hook, bar 4
hook.Play(bell, 48, 16, "G#5");

// The arrangement: the patterns in the order they play (28 bars, 1:33)
song.Arrange(intro, verse, verse, hook, verse, hook, intro);

// The master: volume, and how much reverb and delay come back
song.Reverb = 0.9;

song.Play();
