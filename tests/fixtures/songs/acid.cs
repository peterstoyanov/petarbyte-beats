// PetarByte Beats: this beat, written as C# code.
// Draw on the grid or edit this code: they stay in sync.
var song = new Song(bpm: 128, bars: 2, swing: 0, key: "A minor");

// Drums: one character per step. x = hit, X = loud hit, . = rest, | = new bar
var kick    = song.Drum(Drums.Kick909,    "x...x...x...x...|x...x...x...x...");
var clap    = song.Drum(Drums.Clap,       "....x.......x...|....x.......x...");
var hat     = song.Drum(Drums.Hat909,     "x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.");
var openhat = song.Drum(Drums.OpenHat909, "..x...x...x...x.|..x...x...x...x.");
kick.Volume = 0.9;
clap.Volume = 0.5;
hat.Volume = 0.3;
openhat.Volume = 0.35;

// Instruments: Play(step, length in steps, notes). Notes in one string make a chord.
var acid = song.Instrument(Instruments.Acid303);
acid.Volume = 0.7;
acid.Delay = 0.15;
acid.Resonance = 0.5;
acid.Sidechain = 0.3;
acid.Play(0, 1, "A1", velocity: 1);
acid.Play(1, 1, "A1", velocity: 0.5);
acid.Play(2, 1, "A2", velocity: 0.9);
acid.Play(3, 1, "A1", velocity: 0.5);
acid.Play(4, 1, "C2", velocity: 0.6);
acid.Play(5, 1, "A1", velocity: 0.5);
acid.Play(6, 2, "D#2", velocity: 1);
acid.Play(8, 1, "A1", velocity: 0.6);
acid.Play(9, 1, "A2", velocity: 1);
acid.Play(10, 1, "G1", velocity: 0.5);
acid.Play(11, 1, "A1", velocity: 0.7);
acid.Play(12, 1, "C2", velocity: 0.5);
acid.Play(13, 1, "A1", velocity: 0.9);
acid.Play(14, 1, "E2", velocity: 0.6);
acid.Play(15, 1, "G2", velocity: 1);
// bar 2
acid.Play(16, 1, "A1", velocity: 1);
acid.Play(17, 1, "A1", velocity: 0.5);
acid.Play(18, 1, "A2", velocity: 0.9);
acid.Play(19, 1, "A1", velocity: 0.5);
acid.Play(20, 1, "C2", velocity: 0.6);
acid.Play(21, 1, "A1", velocity: 0.5);
acid.Play(22, 2, "D#2", velocity: 1);
acid.Play(24, 1, "A1", velocity: 0.6);
acid.Play(25, 1, "A2", velocity: 1);
acid.Play(26, 1, "G1", velocity: 0.5);
acid.Play(27, 1, "A1", velocity: 0.7);
acid.Play(28, 1, "C3", velocity: 0.9);
acid.Play(29, 1, "A2", velocity: 0.6);
acid.Play(30, 1, "G2");
acid.Play(31, 1, "E2", velocity: 1);

song.Play();
