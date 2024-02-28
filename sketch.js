// Define synthesizer and reverb effect
let synth;
let reverb;
let reverbControl;

function setup() {
  createCanvas(600, 300); // Larger canvas for better layout
  background(255);

  // Start Audio Context
  Tone.start();

  // Initialize synthesizer
  synth = new Tone.Synth().toDestination();

  // Initialize reverb effect with 3 seconds decay
  reverb = new Tone.Reverb(3).toDestination();
  synth.connect(reverb); // Connect the synth to the reverb

  // Positioning variables
  let startX = 20, startY = 40, buttonWidth = 100, buttonHeight = 40, gap = 20;

  // Creating buttons
  for (let i = 0; i < 4; i++) {
    let noteButton = createButton(`Tone ${i + 1}`);
    noteButton.position(startX + (buttonWidth + gap) * i, startY);
    noteButton.size(buttonWidth, buttonHeight);
    noteButton.mousePressed(() => playTone(['C4', 'E4', 'G4', 'B4'][i]));
  }

  // Reverb control slider
  reverbControl = createSlider(0, 100, 50);
  reverbControl.position(startX, startY + 60);
  reverbControl.size(400, 20);
  reverbControl.input(() => {
    const wetValue = reverbControl.value() / 100;
    reverb.wet.value = wetValue;
  });
}

function playTone(note) {
  synth.triggerAttackRelease(note, '8n');
}

function draw() {
  // Clear canvas and redraw background
  clear();
  background(220);

  // Text instructions
  fill(0);
  textSize(16);
  text('Click a button to play a tone:', 20, 30);

  // Dynamic text for reverb level
  text(`Reverb Level: ${reverbControl.value()}%`, 20, 160);
}
