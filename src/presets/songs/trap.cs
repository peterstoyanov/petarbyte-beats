// PetarByte Beats: this beat, written as C# code.
// Draw on the grid or edit this code: they stay in sync.
var song = new Song(bpm: 140, bars: 2, swing: 0, key: "C minor");

// Drums: one character per step. x = hit, X = loud hit, . = rest, | = new bar
var kick  = song.Drum(Drums.Kick808,  "x.........x.....|x.....x...x....x");
var snare = song.Drum(Drums.Snare808, "........x.......|........x.......");
var clap  = song.Drum(Drums.Clap,     "........x.......|........x.......");
var hat   = song.Drum(Drums.Hat808,   "x.x.x.x.x.xxx.x.|x.x.x.xxx.x.xXxx");
var zap   = song.Drum(Drums.Zap,      "...............x|................");
kick.Volume = 0.85;
snare.Volume = 0.7;
clap.Volume = 0.5;
hat.Volume = 0.45;
zap.Volume = 0.3;

// Instruments: Play(step, length in steps, notes). Notes in one string make a chord.
var bell = song.Instrument(Instruments.Bell);
bell.Volume = 0.5;
bell.Reverb = 0.35;
bell.Delay = 0.25;
bell.Play(0, 2, "C5");
bell.Play(2, 2, "D#5");
bell.Play(4, 2, "G5");
bell.Play(6, 2, "D#5");
bell.Play(8, 2, "C5");
bell.Play(10, 2, "G4");
bell.Play(12, 4, "G#4");
// bar 2
bell.Play(16, 2, "C5");
bell.Play(18, 2, "D#5");
bell.Play(20, 2, "G5");
bell.Play(22, 2, "A#5");
bell.Play(24, 4, "G5");
bell.Play(28, 4, "D#5");

// Warm Pad
var pad = song.Instrument(Instruments.WarmPad);
pad.Volume = 0.35;
pad.Reverb = 0.4;
pad.Play(0, 16, "C3 D#3 G3");
// bar 2
pad.Play(16, 16, "G#2 C3 D#3");

// 808 Bass
var bass = song.Instrument(Instruments.Bass808);
bass.Volume = 0.85;
bass.Play(0, 10, "C2");
bass.Play(10, 6, "C2");
// bar 2
bass.Play(16, 6, "D#2");
bass.Play(22, 4, "C2");
bass.Play(26, 6, "G1");

song.Play();
