// PetarByte Beats: this beat, written as C# code.
// Draw on the grid or edit this code: they stay in sync.
var song = new Song(bpm: 88, bars: 2, swing: 30, key: "A minor");

// Drums: one character per step. x = hit, X = loud hit, . = rest, | = new bar
var kick    = song.Drum(Drums.Kick808,    "x.......x.x.....|x.....x...x.....");
var snare   = song.Drum(Drums.Snare909,   "....x.......x...|....x.......x..x");
var hat     = song.Drum(Drums.Hat808,     "x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.");
var openhat = song.Drum(Drums.OpenHat808, "..............x.|................");
kick.Volume = 0.9;
kick.Decay = 0.45;
snare.Volume = 0.7;
snare.Cutoff = 0.8;
hat.Volume = 0.4;
openhat.Volume = 0.35;

// Instruments: Play(step, length in steps, notes). Notes in one string make a chord.
var keys = song.Instrument(Instruments.ElectricPiano);
keys.Volume = 0.7;
keys.Reverb = 0.2;
keys.Play(0, 12, "A3 C4 E4 G4", velocity: 0.7);
keys.Play(12, 4, "A3 C4 E4 G4", velocity: 0.5);
// bar 2
keys.Play(16, 12, "D3 F3 A3 C4 E4", velocity: 0.7);
keys.Play(28, 4, "E3 G#3 B3 D4", velocity: 0.6);

// 808 Bass
var bass = song.Instrument(Instruments.Bass808);
bass.Play(0, 6, "A1");
bass.Play(7, 3, "A1");
bass.Play(10, 4, "E1");
// bar 2
bass.Play(16, 6, "D2");
bass.Play(23, 3, "D2");
bass.Play(28, 4, "E1");

song.Play();
