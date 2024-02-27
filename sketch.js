let sampler;
let reverb;
let buttons = [];
let effectControl;

function preload() {
    // Initialize the sampler with audio files
    sampler = new Tone.Sampler({
        urls: {
            A1: "samples/sample1.wav",
            A2: "samples/sample2.wav",
            A3: "samples/sample3.wav",
            A4: "samples/sample4.wav",
        },
        baseUrl: "./",
        onload: () => console.log("Samples loaded"),
    }).toDestination();

    // Add an effect
    reverb = new Tone.Reverb(3).toDestination();
    sampler.connect(reverb);
}

function setup() {
    createCanvas(800, 400); // Increased canvas size
    textAlign(CENTER, CENTER);

    // Improved layout for sample playback buttons
    let buttonWidth = 100;
    let buttonHeight = 40;
    let startX = width / 2 - (buttonWidth * 4 + 15 * 3) / 2; // Centering buttons
    let startY = height / 2 - buttonHeight / 2 - 50; // Adjust vertical position

    for (let i = 0; i < 4; i++) {
        buttons[i] = createButton(`Play Sample ${i+1}`);
        buttons[i].position(startX + i * (buttonWidth + 15), startY); // Adjusted for spacing
        buttons[i].size(buttonWidth, buttonHeight);
        buttons[i].mousePressed(() => playSample(`A${i+1}`));
    }

    // Effect control slider, positioned for better organization
    effectControl = createSlider(0, 100, 50);
    effectControl.position(width / 2 - 150, height - 75); // Centered below the buttons
    effectControl.size(300, 40); // Increased size for easier control
    effectControl.input(() => {
        const value = effectControl.value();
        reverb.decay = value / 100 * 10; // Control reverb decay
    });
}

function draw() {
    background(220);
    textSize(16); // Adjust text size for the effect label
    text('Reverb Decay Control', effectControl.x + effectControl.width / 2, height - 100);
}

function playSample(note) {
    sampler.triggerAttackRelease(note, '8n');
}
