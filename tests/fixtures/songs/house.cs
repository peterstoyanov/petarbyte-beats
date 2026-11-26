// PetarByte Beats: this beat, written as C# code.
// Draw on the grid or edit this code: they stay in sync.
var song = new Song(bpm: 124, bars: 2, swing: 0, key: "F minor");

// Drums: one character per step. x = hit, X = loud hit, . = rest, | = new bar
var kick    = song.Drum(Drums.Kick909,    "x...x...x...x...|x...x...x...x...");
var clap    = song.Drum(Drums.Clap,       "....x.......x...|....x.......x...");
var hat     = song.Drum(Drums.Hat909,     "xx.xxx.xxx.xxx.x|xx.xxx.xxx.xxx.x");
var openhat = song.Drum(Drums.OpenHat909, "..x...x...x...x.|..x...x...x...x.");
kick.Volume = 0.9;
clap.Volume = 0.6;
clap.Reverb = 0.2;
hat.Volume = 0.3;
openhat.Volume = 0.4;

// Instruments: Play(step, length in steps, notes). Notes in one string make a chord.
var piano = song.Instrument(Instruments.GrandPiano);
piano.Volume = 0.75;
piano.Reverb = 0.2;
piano.Sidechain = 0.3;
piano.Play(2, 2, "F3 G#3 C4 D#4");
piano.Play(6, 1, "F3 G#3 C4 D#4");
piano.Play(7, 2, "F3 G#3 C4 D#4");
piano.Play(11, 1, "F3 G#3 C4 D#4");
piano.Play(13, 2, "D#3 G3 A#3 D4");
// bar 2
piano.Play(18, 2, "F3 G#3 C4 D#4");
piano.Play(22, 1, "F3 G#3 C4 D#4");
piano.Play(23, 2, "F3 G#3 C4 D#4");
piano.Play(27, 1, "C#3 F3 G#3 C4");
piano.Play(29, 2, "D#3 G3 A#3 D4");

// Warm Pad
var pad = song.Instrument(Instruments.WarmPad);
pad.Volume = 0.45;
pad.Reverb = 0.3;
pad.Sidechain = 0.7;
pad.Play(0, 16, "F3 G#3 C4");
// bar 2
pad.Play(16, 16, "C#3 F3 G#3");

// Sub Bass
var sub = song.Instrument(Instruments.SubBass);
sub.Volume = 0.75;
sub.Sidechain = 0.6;
sub.Play(2, 2, "F1");
sub.Play(6, 2, "F1");
sub.Play(10, 2, "F1");
sub.Play(14, 2, "D#1");
// bar 2
sub.Play(18, 2, "F1");
sub.Play(22, 2, "F1");
sub.Play(26, 2, "C#1");
sub.Play(30, 2, "D#1");

song.Play();
