// PetarByte Beats: this beat, written as C# code.
// Draw on the grid or edit this code: they stay in sync.
var song = new Song(bpm: 104, bars: 4, swing: 0, key: "A minor");

// Drums: one character per step. x = hit, X = loud hit, . = rest, | = new bar
var kick  = song.Drum(Drums.Kick909,  "x.......x.......|x.......x.......|x.......x.......|x.......x.......");
var snare = song.Drum(Drums.Snare909, "....x.......x...|....x.......x...|....x.......x...|....x.......x...");
var hat   = song.Drum(Drums.Hat909,   "..x...x...x...x.|..x...x...x...x.|..x...x...x...x.|..x...x...x...x.");
var crash = song.Drum(Drums.Crash,    "x...............|................|................|................");
kick.Volume = 0.9;
snare.Volume = 0.7;
snare.Reverb = 0.45;
hat.Volume = 0.4;
crash.Volume = 0.4;

// Instruments: Play(step, length in steps, notes). Notes in one string make a chord.
var pad = song.Instrument(Instruments.WarmPad);
pad.Volume = 0.6;
pad.Reverb = 0.4;
pad.Sidechain = 0.6;
pad.Play(0, 16, "A3 C4 E4");
// bar 2
pad.Play(16, 16, "F3 A3 C4");
// bar 3
pad.Play(32, 16, "C4 E4 G4");
// bar 4
pad.Play(48, 16, "G3 B3 D4");

// Pluck
var arp = song.Instrument(Instruments.Pluck);
arp.Volume = 0.45;
arp.Pan = -0.25;
arp.Delay = 0.3;
arp.Sidechain = 0.4;
arp.Play(0, 1, "A3", velocity: 0.6);
arp.Play(1, 1, "C4", velocity: 0.6);
arp.Play(2, 1, "E4", velocity: 0.6);
arp.Play(3, 1, "A4", velocity: 0.6);
arp.Play(4, 1, "A3", velocity: 0.6);
arp.Play(5, 1, "C4", velocity: 0.6);
arp.Play(6, 1, "E4", velocity: 0.6);
arp.Play(7, 1, "A4", velocity: 0.6);
arp.Play(8, 1, "A3", velocity: 0.6);
arp.Play(9, 1, "C4", velocity: 0.6);
arp.Play(10, 1, "E4", velocity: 0.6);
arp.Play(11, 1, "A4", velocity: 0.6);
arp.Play(12, 1, "A3", velocity: 0.6);
arp.Play(13, 1, "C4", velocity: 0.6);
arp.Play(14, 1, "E4", velocity: 0.6);
arp.Play(15, 1, "A4", velocity: 0.6);
// bar 2
arp.Play(16, 1, "F3", velocity: 0.6);
arp.Play(17, 1, "A3", velocity: 0.6);
arp.Play(18, 1, "C4", velocity: 0.6);
arp.Play(19, 1, "F4", velocity: 0.6);
arp.Play(20, 1, "F3", velocity: 0.6);
arp.Play(21, 1, "A3", velocity: 0.6);
arp.Play(22, 1, "C4", velocity: 0.6);
arp.Play(23, 1, "F4", velocity: 0.6);
arp.Play(24, 1, "F3", velocity: 0.6);
arp.Play(25, 1, "A3", velocity: 0.6);
arp.Play(26, 1, "C4", velocity: 0.6);
arp.Play(27, 1, "F4", velocity: 0.6);
arp.Play(28, 1, "F3", velocity: 0.6);
arp.Play(29, 1, "A3", velocity: 0.6);
arp.Play(30, 1, "C4", velocity: 0.6);
arp.Play(31, 1, "F4", velocity: 0.6);
// bar 3
arp.Play(32, 1, "C4", velocity: 0.6);
arp.Play(33, 1, "E4", velocity: 0.6);
arp.Play(34, 1, "G4", velocity: 0.6);
arp.Play(35, 1, "C5", velocity: 0.6);
arp.Play(36, 1, "C4", velocity: 0.6);
arp.Play(37, 1, "E4", velocity: 0.6);
arp.Play(38, 1, "G4", velocity: 0.6);
arp.Play(39, 1, "C5", velocity: 0.6);
arp.Play(40, 1, "C4", velocity: 0.6);
arp.Play(41, 1, "E4", velocity: 0.6);
arp.Play(42, 1, "G4", velocity: 0.6);
arp.Play(43, 1, "C5", velocity: 0.6);
arp.Play(44, 1, "C4", velocity: 0.6);
arp.Play(45, 1, "E4", velocity: 0.6);
arp.Play(46, 1, "G4", velocity: 0.6);
arp.Play(47, 1, "C5", velocity: 0.6);
// bar 4
arp.Play(48, 1, "G3", velocity: 0.6);
arp.Play(49, 1, "B3", velocity: 0.6);
arp.Play(50, 1, "D4", velocity: 0.6);
arp.Play(51, 1, "G4", velocity: 0.6);
arp.Play(52, 1, "G3", velocity: 0.6);
arp.Play(53, 1, "B3", velocity: 0.6);
arp.Play(54, 1, "D4", velocity: 0.6);
arp.Play(55, 1, "G4", velocity: 0.6);
arp.Play(56, 1, "G3", velocity: 0.6);
arp.Play(57, 1, "B3", velocity: 0.6);
arp.Play(58, 1, "D4", velocity: 0.6);
arp.Play(59, 1, "G4", velocity: 0.6);
arp.Play(60, 1, "G3", velocity: 0.6);
arp.Play(61, 1, "B3", velocity: 0.6);
arp.Play(62, 1, "D4", velocity: 0.6);
arp.Play(63, 1, "G4", velocity: 0.6);

// Super Saw
var lead = song.Instrument(Instruments.SuperSaw);
lead.Volume = 0.5;
lead.Pan = 0.15;
lead.Reverb = 0.3;
lead.Delay = 0.3;
lead.Play(0, 6, "E5");
lead.Play(6, 2, "D5");
lead.Play(8, 4, "C5");
lead.Play(12, 2, "B4");
lead.Play(14, 2, "C5");
// bar 2
lead.Play(16, 8, "A4");
lead.Play(24, 4, "C5");
lead.Play(28, 4, "A4");
// bar 3
lead.Play(32, 6, "G4");
lead.Play(38, 2, "A4");
lead.Play(40, 4, "C5");
lead.Play(44, 4, "E5");
// bar 4
lead.Play(48, 8, "D5");
lead.Play(56, 4, "B4");
lead.Play(60, 4, "G4");

// Synth Bass
var bass = song.Instrument(Instruments.SynthBass);
bass.Volume = 0.75;
bass.Sidechain = 0.5;
bass.Play(0, 2, "A1");
bass.Play(2, 2, "A1");
bass.Play(4, 2, "A1");
bass.Play(6, 2, "A1");
bass.Play(8, 2, "A1");
bass.Play(10, 2, "A1");
bass.Play(12, 2, "A1");
bass.Play(14, 2, "A1");
// bar 2
bass.Play(16, 2, "F1");
bass.Play(18, 2, "F1");
bass.Play(20, 2, "F1");
bass.Play(22, 2, "F1");
bass.Play(24, 2, "F1");
bass.Play(26, 2, "F1");
bass.Play(28, 2, "F1");
bass.Play(30, 2, "F1");
// bar 3
bass.Play(32, 2, "C2");
bass.Play(34, 2, "C2");
bass.Play(36, 2, "C2");
bass.Play(38, 2, "C2");
bass.Play(40, 2, "C2");
bass.Play(42, 2, "C2");
bass.Play(44, 2, "C2");
bass.Play(46, 2, "C2");
// bar 4
bass.Play(48, 2, "G1");
bass.Play(50, 2, "G1");
bass.Play(52, 2, "G1");
bass.Play(54, 2, "G1");
bass.Play(56, 2, "G1");
bass.Play(58, 2, "G1");
bass.Play(60, 2, "G1");
bass.Play(62, 2, "G1");

song.Play();
