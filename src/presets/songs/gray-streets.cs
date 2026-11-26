// PetarByte Beats: this song, written as C# code.
// Channels are the sounds, patterns are a few bars each, the arrangement plays them in order.
var song = new Song(bpm: 142, swing: 0, key: "F# minor");

// Channels: one sound each, with its mixer settings below it
var kick = song.Drum(Drums.Kick808);
kick.Volume = 0.85;
kick.Decay = 0.5;
var snare = song.Drum(Drums.Snare909);
snare.Volume = 0.65;
var rim = song.Drum(Drums.Rimshot);
rim.Volume = 0.4;
var hat = song.Drum(Drums.Hat808);
hat.Volume = 0.4;
var bass = song.Instrument(Instruments.Bass808);
bass.Volume = 0.9;
bass.Cutoff = 0.85;
var piano = song.Instrument(Instruments.GrandPiano);
piano.Volume = 0.7;
piano.Reverb = 0.35;
var strings = song.Instrument(Instruments.Strings);
strings.Volume = 0.4;
strings.Reverb = 0.4;

// Pattern intro: Hits(drum, steps) with x = hit, X = loud, . = rest. Play(instrument, step, length, notes).
var intro = song.Pattern(bars: 4);
intro.Play(piano, 0, 2, "C#5");
intro.Play(piano, 3, 2, "A4");
intro.Play(piano, 6, 2, "F#4");
intro.Play(piano, 8, 2, "G#4");
intro.Play(piano, 11, 2, "A4");
intro.Play(piano, 14, 2, "C#5");
// intro, bar 2
intro.Play(piano, 16, 2, "D5");
intro.Play(piano, 19, 2, "C#5");
intro.Play(piano, 22, 4, "A4");
intro.Play(piano, 28, 4, "F#4");
// intro, bar 3
intro.Play(piano, 32, 2, "F#5");
intro.Play(piano, 35, 2, "D5");
intro.Play(piano, 38, 2, "A4");
intro.Play(piano, 40, 2, "D5");
intro.Play(piano, 43, 2, "F#5");
intro.Play(piano, 46, 2, "A5");
// intro, bar 4
intro.Play(piano, 48, 4, "G#5");
intro.Play(piano, 52, 4, "F5");
intro.Play(piano, 56, 8, "C#5");
intro.Play(strings, 0, 16, "F#3 A3 C#4", velocity: 0.45);
// intro, bar 2
intro.Play(strings, 16, 16, "F#3 A3 C#4", velocity: 0.45);
// intro, bar 3
intro.Play(strings, 32, 16, "D3 F#3 A3", velocity: 0.45);
// intro, bar 4
intro.Play(strings, 48, 16, "C#3 F3 G#3", velocity: 0.45);

// Pattern verse
var verse = song.Pattern(bars: 4);
verse.Hits(kick,  "x.........x.....|......x...x.....|x.........x.....|......x...x.....");
verse.Hits(snare, "....x.......x...|....x......x....|....x.......x...|....x......x....");
verse.Hits(rim,   "..........x....x|..........x....x|..........x....x|..........x....x");
verse.Hits(hat,   "x..x..x.x..x.x..|x..x..x.x..xx.x.|x..x..x.x..x.x..|x..x..x.x..xx.x.");
verse.Play(bass, 0, 6, "F#1");
verse.Play(bass, 6, 4, "F#1");
verse.Play(bass, 10, 6, "A1");
// verse, bar 2
verse.Play(bass, 16, 10, "F#1");
verse.Play(bass, 26, 6, "C#2");
// verse, bar 3
verse.Play(bass, 32, 6, "D2");
verse.Play(bass, 38, 4, "D2");
verse.Play(bass, 42, 6, "F#1");
// verse, bar 4
verse.Play(bass, 48, 8, "C#2");
verse.Play(bass, 56, 8, "G#1");
verse.Play(strings, 0, 16, "F#3 A3 C#4", velocity: 0.35);
// verse, bar 2
verse.Play(strings, 16, 16, "F#3 A3 C#4", velocity: 0.35);
// verse, bar 3
verse.Play(strings, 32, 16, "D3 F#3 A3", velocity: 0.35);
// verse, bar 4
verse.Play(strings, 48, 16, "C#3 F3 G#3", velocity: 0.35);

// Pattern hook
var hook = song.Pattern(bars: 4);
hook.Hits(kick,  "x.........x.....|......x...x.....|x.........x.....|......x...x.....");
hook.Hits(snare, "....x.......x...|....x......x....|....x.......x...|....x......x....");
hook.Hits(rim,   "..x.......x....x|..x.......x....x|..x.......x....x|..x.......x....x");
hook.Hits(hat,   "x..x..x.x..x.x..|x..x..x.x..xxxx.|x..x..x.x..x.x..|x..x..x.x..xxxx.");
hook.Play(bass, 0, 6, "F#1");
hook.Play(bass, 6, 4, "F#1");
hook.Play(bass, 10, 6, "A1");
// hook, bar 2
hook.Play(bass, 16, 10, "F#1");
hook.Play(bass, 26, 6, "C#2");
// hook, bar 3
hook.Play(bass, 32, 6, "D2");
hook.Play(bass, 38, 4, "D2");
hook.Play(bass, 42, 6, "F#1");
// hook, bar 4
hook.Play(bass, 48, 8, "C#2");
hook.Play(bass, 56, 8, "G#1");
hook.Play(piano, 0, 2, "C#5");
hook.Play(piano, 3, 2, "A4");
hook.Play(piano, 6, 2, "F#4");
hook.Play(piano, 8, 2, "G#4");
hook.Play(piano, 11, 2, "A4");
hook.Play(piano, 14, 2, "C#5");
// hook, bar 2
hook.Play(piano, 16, 2, "D5");
hook.Play(piano, 19, 2, "C#5");
hook.Play(piano, 22, 4, "A4");
hook.Play(piano, 28, 4, "F#4");
// hook, bar 3
hook.Play(piano, 32, 2, "F#5");
hook.Play(piano, 35, 2, "D5");
hook.Play(piano, 38, 2, "A4");
hook.Play(piano, 40, 2, "D5");
hook.Play(piano, 43, 2, "F#5");
hook.Play(piano, 46, 2, "A5");
// hook, bar 4
hook.Play(piano, 48, 4, "G#5");
hook.Play(piano, 52, 4, "F5");
hook.Play(piano, 56, 8, "C#5");
hook.Play(strings, 0, 16, "F#3 A3 C#4", velocity: 0.45);
// hook, bar 2
hook.Play(strings, 16, 16, "F#3 A3 C#4", velocity: 0.45);
// hook, bar 3
hook.Play(strings, 32, 16, "D3 F#3 A3", velocity: 0.45);
// hook, bar 4
hook.Play(strings, 48, 16, "C#3 F3 G#3", velocity: 0.45);

// Pattern brk
var brk = song.Pattern(bars: 4);
brk.Hits(hat, "................|................|x..x..x.x..x.x..|x..x..x.xxxxxxxx");
brk.Play(piano, 0, 8, "C#5");
// brk, bar 2
brk.Play(piano, 16, 8, "A4");
// brk, bar 3
brk.Play(piano, 32, 8, "F#5");
// brk, bar 4
brk.Play(piano, 48, 16, "F5");
brk.Play(strings, 0, 16, "F#3 A3 C#4", velocity: 0.5);
// brk, bar 2
brk.Play(strings, 16, 16, "F#3 A3 C#4", velocity: 0.5);
// brk, bar 3
brk.Play(strings, 32, 16, "D3 F#3 A3", velocity: 0.5);
// brk, bar 4
brk.Play(strings, 48, 16, "C#3 F3 G#3", velocity: 0.5);

// Pattern outro
var outro = song.Pattern(bars: 4);
outro.Play(piano, 0, 2, "C#5", velocity: 0.5);
outro.Play(piano, 3, 2, "A4", velocity: 0.5);
outro.Play(piano, 6, 2, "F#4", velocity: 0.5);
outro.Play(piano, 8, 2, "G#4", velocity: 0.5);
outro.Play(piano, 11, 2, "A4", velocity: 0.5);
outro.Play(piano, 14, 2, "C#5", velocity: 0.5);
// outro, bar 2
outro.Play(piano, 16, 2, "D5", velocity: 0.5);
outro.Play(piano, 19, 2, "C#5", velocity: 0.5);
outro.Play(piano, 22, 4, "A4", velocity: 0.5);
outro.Play(piano, 28, 4, "F#4", velocity: 0.5);
// outro, bar 3
outro.Play(piano, 32, 2, "F#5", velocity: 0.5);
outro.Play(piano, 35, 2, "D5", velocity: 0.5);
outro.Play(piano, 38, 2, "A4", velocity: 0.5);
outro.Play(piano, 40, 2, "D5", velocity: 0.5);
outro.Play(piano, 43, 2, "F#5", velocity: 0.5);
outro.Play(piano, 46, 2, "A5", velocity: 0.5);
// outro, bar 4
outro.Play(piano, 48, 4, "G#5", velocity: 0.5);
outro.Play(piano, 52, 4, "F5", velocity: 0.5);
outro.Play(piano, 56, 8, "C#5", velocity: 0.5);
outro.Play(strings, 0, 16, "F#3 A3 C#4", velocity: 0.35);
// outro, bar 2
outro.Play(strings, 16, 16, "F#3 A3 C#4", velocity: 0.35);
// outro, bar 3
outro.Play(strings, 32, 16, "D3 F#3 A3", velocity: 0.35);
// outro, bar 4
outro.Play(strings, 48, 16, "C#3 F3 G#3", velocity: 0.35);

// The arrangement: the patterns in the order they play (52 bars, 1:28)
song.Arrange(intro, verse, verse, hook, hook, brk, verse, verse,
    hook, hook, brk, hook, outro);

// The master: volume, and how much reverb and delay come back
song.Reverb = 0.7;

song.Play();
