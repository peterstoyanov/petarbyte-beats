// PetarByte Beats: this beat, written as C# code.
// Draw on the grid or edit this code: they stay in sync.
var song = new Song(bpm: 120, bars: 1, swing: 0, key: "C major");

// Drums: one character per step. x = hit, X = loud hit, . = rest, | = new bar
var kick  = song.Drum(Drums.Kick909,  "................");
var snare = song.Drum(Drums.Snare909, "................");
var hat   = song.Drum(Drums.Hat909,   "................");

// Instruments: Play(step, length in steps, notes). Notes in one string make a chord.
var piano = song.Instrument(Instruments.GrandPiano);

// 808 Bass
var bass = song.Instrument(Instruments.Bass808);

song.Play();
