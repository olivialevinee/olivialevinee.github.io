// GLOBAL VARIABLES

// fft = sound analyzer (breaks music into frequency bands)
//song = audio file
//soundSpectrum stores raw frequency data each frame
var canvas, bgColor, fft, song, soundSpectrum;

let neuron; //object that holds all branches (like the ball object from OOP lecture)

let pulseHeads = []; // array that holds the orbs that travel along each neuron (like xPos[] from lecture)

let font;

// angle set at 0 for now > makes neuron spin when it grows
let neuronAngle   = 0;

//color values that slowly move towards eachother
let currentHue    = 240; //current color
let targetHue     = 240; //target color due to music

//smooth version  of frequency bands (bass, mid, highmid, treble, kick)  - used bc raw data jumps and jitters too much - averages to hold calmer versions for smooth
let smoothBass    = 0;
let smoothMid     = 0;
let smoothHighMid = 0;
let smoothTreble  = 0;
let smoothKick    = 0;

//raw data that detects the bass and highmid values from previous frame - used to detect when the music suddently gets louder (will determine pulsing neuron)
let prevBass      = 0;
let prevHighMid   = 0;

// DRAWING THE BRANCHES OF THE NEURON

// drawing neuron branches (dendrites) that spawn from the center (soma) - custom function i'm defining - a list of points that build each branch

//defines start position, direction, length, number of sub-branches, and amount of bend
function createWanderingPath(startX, startY, dirX, dirY, length, segments, jitter) {
  
  //array of point object (one point at start, each point is an object with x and y, here we are defining each point)
  let pts = [{x: startX, y: startY}];
  
  //curent x and y position as branch is created, segment by segment
  let cx = startX, cy = startY;
  
  //current direction brach is travling as the branch is created, convert to x and y component
  let dx = dirX, dy = dirY;
  
  let mag = Math.sqrt(dx*dx + dy*dy); //length of the direction vector
  
  dx /= mag; dy /= mag; // pythagorean theorem sqt(dx^2 + dy^2), divide by mag to normalize
  
  // divide the total branch length by the total # segements in that branch > each "step"
  // jitter = jaggedness of branch
  let segLen = length / segments;
  
  // for loop runs for each segment, builds branches segment by segment
  for (let i = 0; i < segments; i++) {
    //Math.random() - 0.5 gives a number between -0.5 and 0.5
    //multiply by jitter to make line jagged, not straight - higher jitter gives it more bends - we are doing this for both x and y directions
    dx += (Math.random() - 0.5) * jitter;
    dy += (Math.random() - 0.5) * jitter;
    
    //normalize branch direction back to length 1 after nudging it - use pythagorean theorem to get magnitude then divide both components by it
    mag = Math.sqrt(dx*dx + dy*dy);
    if (mag < 0.001) mag = 0.001;
    dx /= mag; dy /= mag;
    
    //move forward 1 segment in the current direction
    cx += dx * segLen;
    cy += dy * segLen;
    
    //after each "step", add a new position to the array > list of points tracing the whole jaggered path
    pts.push({x: cx, y: cy});
  }
  //return completed list of points so we can build branch
  return pts;
}

//ASSEMBLING THE NEURON

//creating the buildBranches() function > assembles them for neuron, runs once when sketch starts, returns the completed branches array

//branches array: holds every branch of the neuron
function buildBranches() {
  let branches = [];
  
  // base length set relative to screen size - so you can see the full branches on any screen
  let baseArm = min(width, height) * 0.22;
  // array of arrays - each inner array holds 3 RGB color values, one for each branch (from 0-255) - there are 16 arrays in this one for the 16 branches in the soma
  let cols = [
    [0,   255, 200], [180, 255, 80],  [255, 80,  200],
    [80,  180, 255], [255, 200, 50],  [180, 80,  255],
    [80,  255, 180], [255, 120, 80],  [120, 255, 120],
    [255, 80,  80],  [80,  200, 255], [255, 180, 120],
    [200, 100, 255], [255, 255, 80],  [0,   200, 180],
    [255, 150, 150],
  ];
  
  //for loop that runs 16 times, 1 for each branch
  for (let i = 0; i < 16; i++) {
    //circular pattern: TWO_PI = full circle in radians > so divide by 16 and multiply by TWO_PI so the branches are spread around 360 degrees about evenly
    let baseAng = (i / 16) * TWO_PI + 0.1; // the angle this branch points in (radians), divide i by 16 to get 0, 0.0625, 0.125...etc
    let col     = cols[i % cols.length];
    // random multiplier so each arm slightly varies in length > organic look/feel
    let armLen  = baseArm * random(0.7, 1.35);
    let pts = createWanderingPath(0, 0, cos(baseAng), sin(baseAng), armLen, 18, 0.30);
    branches.push({pts, col, w: 2.8, delay: 0});
    let sp1  = pts[floor(pts.length * 0.35)];
    let ca1  = baseAng - 0.55 + random(-0.2, 0.2);
    let len1 = armLen * random(0.45, 0.70);
    let c1   = createWanderingPath(sp1.x, sp1.y, cos(ca1), sin(ca1), len1, 12, 0.42);
    
    // each branch is stored as an object with point path, color, width, and delay - delay staggers when orbs travel on sub-branches so they don't all fire at the same time
    branches.push({pts: c1, col: cols[(i+2) % cols.length], w: 1.6, delay: 5});
    let sp2  = pts[floor(pts.length * 0.55)];
    let ca2  = baseAng + 0.55 + random(-0.2, 0.2);
    let len2 = armLen * random(0.40, 0.65);
    let c2   = createWanderingPath(sp2.x, sp2.y, cos(ca2), sin(ca2), len2, 11, 0.45);
    //sub-branch > wandering path from a point on the main branch
    branches.push({pts: c2, col: cols[(i+4) % cols.length], w: 1.3, delay: 7});
    let sp4  = pts[floor(pts.length * 0.70)];
    let ca4  = baseAng - 0.3 + random(-0.3, 0.3);
    let len4 = armLen * random(0.30, 0.50);
    let c4   = createWanderingPath(sp4.x, sp4.y, cos(ca4), sin(ca4), len4, 9, 0.48);
    //sub-branch
    branches.push({pts: c4, col: cols[(i+8) % cols.length], w: 1.0, delay: 9});
    let sp3  = c1[floor(c1.length * 0.45)];
    let ca3  = ca1 + random(-0.65, 0.65);
    let len3 = len1 * random(0.35, 0.55);
    let c3   = createWanderingPath(sp3.x, sp3.y, cos(ca3), sin(ca3), len3, 8, 0.52);
    //sub-branch
    branches.push({pts: c3, col: cols[(i+6) % cols.length], w: 0.9, delay: 11});
    let sp5  = c2[floor(c2.length * 0.50)];
    let ca5  = ca2 + random(-0.65, 0.65);
    let len5 = len2 * random(0.30, 0.50);
    let c5   = createWanderingPath(sp5.x, sp5.y, cos(ca5), sin(ca5), len5, 7, 0.55);
    //sub-branch
    branches.push({pts: c5, col: cols[(i+10) % cols.length], w: 0.7, delay: 13});
    let tp = pts[floor(pts.length * 0.75)];
    for (let t = 0; t < 4; t++) {
      let ta   = baseAng + random(-1.0, 1.0);
      let tLen = armLen * random(0.15, 0.30);
      let tp2  = createWanderingPath(tp.x, tp.y, cos(ta), sin(ta), tLen, 7, 0.62);
      branches.push({pts: tp2, col, w: 0.5, delay: 15 + t * 3});
    }
  }
  return branches;
}

// THE TRAVELING ORBS (action potentials)

//wrap build branches in an object > when called it';; give back the complete neuron (like newBall examples)
function makeNeuron() { return { branches: buildBranches() }; }

//setting up a class (like Person class from OOP lecture)
class PulseHead {
  //constructor runs to create a new orb
  constructor(branch) {
    this.branch   = branch;
    //starts negative because of delay - negative progress means its waiting to start
    this.progress = -branch.delay;
    // how fast the orb travels
    this.speed    = 0.4;
    //flag when orb has reached the end of branch > should be cleared
    this.done     = false;
  }
  
  // orb's behavior function (like move() from the ball class)
  update() {
    
    // every frame, advance progress > when it reaches end of the point array > orb is done > cleared
    this.progress += this.speed;
    if (this.progress >= this.branch.pts.length) this.done = true;
  }
  
  //figure out exactly where the orb is right now
  getPos() {
    //what segement we are on
    if (this.progress < 0 || this.branch.pts.length < 2) return null;
    let idx = constrain(floor(this.progress), 0, this.branch.pts.length - 2);
    
    //how far between that segment's 2 end points
    let t   = this.progress - idx; 
    let a   = this.branch.pts[idx]; 
    
    // blends the 2 values (interactivity lecture ex) > smooth position
    let b   = this.branch.pts[idx + 1];
    return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
  }
  // how bright i given segment of the branch should be (based on proximity to orb)
  getLit(segT) { //normalized 0-1 - if orb isn't there yet, brightness = 0, if its there, brightness is 1
    if (this.progress < 0) return 0;
    let headT = this.progress / (this.branch.pts.length - 1); // normalized 0-1
    let dist  = headT - segT;
    if (dist < 0)    return 0;
    if (dist < 0.05) return 1.0;
    return max(0, 1.0 - dist / 1.4); // glowing trail effect - brightness fades out over a distance of 1.4
  }

  //how far the orb is along the branch - returned as a 0-1 value - used to grow orb size as it goes (0 at soma, full size at tip of branch)
  getProgress() {
    if (this.branch.pts.length < 2) return 0;
    return constrain(this.progress / (this.branch.pts.length - 1), 0, 1);
  }
}

//spawn single orb (action potential) 
function spawnSingleOrb() {
  //array method that filters for branches with no delay (main ones)
  let trunks = neuron.branches.filter(b => b.delay === 0);
  //pick a random branch from that mix
  let b = trunks[floor(random(trunks.length))];
  //push orb into the pulseHeads array (like newBall() from lecture) > creates no orb on that branch
  pulseHeads.push(new PulseHead(b));
}

//spawn all orbs (action potentials)
// for-of loop - go through every branch and create an orb on each one
function spawnFullWave() {
  //push an orb on all branches
  for (let b of neuron.branches) pulseHeads.push(new PulseHead(b));
}

// SOUND FUNCTIONS

function getNewSoundDataValue(freqType) {
  return map(fft.getEnergy(freqType), 0, 255, 0, 1); // return the loudness of a frequency band as a number from 0-255, map rescales it as a number from 0-1 (from media lecture)
}

//FFT analyzer - listens to the music and breaks it into frequency bands (ex spectrum visualizer) 
function initSound() {
  fft = new p5.FFT(0.0, 1024); // 0.0 smoothing means raw instant response, 1024 frequency bins
  song.amp(0.7); // 70% volume
}

//pause if playing, play if paused
function togglePlay() { song.isPlaying() ? song.pause() : song.loop(); }
// capture current frame of audio data - call this every frame before reading any fft values
function analyseSound() { soundSpectrum = fft.analyze(); }

//TITLE PAGE

//preload runs before everything else font is fully downloaded before setup and draw
function preload() {
  font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
}

//runs once at start, where everything is initialized
function setup() {
  //changes to Hue-Sat-Brightness mode (instead of rgb) - goes 0-360 degrees on color wheel
  colorMode(HSB, 360, 100, 100);
  //60 frames per second
  frameRate(60);
  //black background
  bgColor = color(0, 0, 0);
  background(bgColor);
  //WEBGL for 3D shapes
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  //listen for file being dropped
  canvas.drop(gotFile);
}

// when mp3 is dragged onto canvas
function gotFile(file) {
  if (!song && file.type === 'audio') {
    //callback - runs after the sound finishes loading 
    song = loadSound(file.data, () => {
      //required by browser before any audio can play
      userStartAudio(); initSound(); song.loop();
      //build neuron and set up click for pause
      neuron = makeNeuron(); canvas.mouseClicked(togglePlay);
    });
  }
}

//if no song is dropped, load default track on click
function mousePressed() {
  if (!song) {
    userStartAudio();
    song = loadSound('Amy!.mp3', () => {
      initSound(); song.loop();
      neuron = makeNeuron(); canvas.mouseClicked(togglePlay);
    });
  }
}

// DRAW (runs 60 times per second)

function draw() {
  //only runs once the song exists and is fully loaded, before that only title screen (like if(soundFile) example)
  if (song && song.isLoaded()) {
    analyseSound();

    //read the music from these 5 bands
    //bass, mid, highMid, and treble alr named from p5
    var bass    = getNewSoundDataValue('bass');
    var mid     = getNewSoundDataValue('mid');
    var highMid = getNewSoundDataValue('highMid');
    var treble  = getNewSoundDataValue('treble');
    //add kick by using 2 numbers that read custom frequency range (60 to 100hz) which is where the kick drum lives in the song
    var kick    = map(fft.getEnergy(60, 100), 0, 255, 0, 1);

    //SMOOTHING FACTORS
    
    //?: is a compact if/else - if the new value is higher than the current smooth value, lerp toward it fast (0,55), if its lower, lerp slowly (0.18) - fast attack, slow decay so it responds quick but stays a second
    smoothBass    = bass    > smoothBass    ? lerp(smoothBass,    bass,    0.55) : lerp(smoothBass,    bass,    0.18);
    // same if/else smoothing logic
    smoothMid     = mid     > smoothMid     ? lerp(smoothMid,     mid,     0.65) : lerp(smoothMid,     mid,     0.22);
    smoothHighMid = highMid > smoothHighMid ? lerp(smoothHighMid, highMid, 0.65) : lerp(smoothHighMid, highMid, 0.20);
    smoothTreble  = treble  > smoothTreble  ? lerp(smoothTreble,  treble,  0.60) : lerp(smoothTreble,  treble,  0.20);
    // Restored from document 7 — fast attack, fast decay for kick
    smoothKick    = kick    > smoothKick    ? lerp(smoothKick,    kick,    0.75) : lerp(smoothKick,    kick,    0.12);

    //rising edge detection - check if the value jumped up by more than our set threshold compared to the last frame
    //&& means both conditions must be true > store this frame's value in prevBass so we can compare the next frame with it
    let bassRising    = bass    > prevBass    + 0.08 && bass    > 0.25;
    let highMidRising = highMid > prevHighMid + 0.06 && highMid > 0.20;
    prevBass    = bass;
    prevHighMid = highMid;

    //COLORS
    
    //when a beat hits, advance the target color by *some* degrees on the color wheel
    //% 360 wraps it back around when it exceeds 360 - like a clock when it passes midnight
    if (bassRising)    targetHue = (targetHue + 25) % 360;
    if (highMidRising) targetHue = (targetHue + 15) % 360;
    //slowly lerp towards targetHue at 0.03 per frame so the color bends gently
    currentHue = lerp(currentHue, targetHue, 0.03);
//switch to HSB to create colors by hue
    colorMode(HSB, 360, 100, 100, 255);
    //current hue is opposite color for inner nucleus so it pops
    let somaCol  = color(currentHue % 360, 90, 100);
    let innerCol = color((currentHue + 180) % 360, 85, 100);
    // switch back to RGB to see individual red, green, blue numbers
    colorMode(RGB, 255, 255, 255, 255);
    let sr = red(somaCol),  sg = green(somaCol),  sb = blue(somaCol);
    let ir = red(innerCol), ig = green(innerCol), ib = blue(innerCol);

    // VISUALS AFFECTED BY FFT
    
    //add a small amount to neuronAngle every frame
    // map converts smoothBass from its 0-1 range to a range of rotation speeds (at silence the neuron barely moves, at full bass it spins quickly) - its cumulative so it rotates every frame
    neuronAngle += map(smoothBass, 0, 1, 0.002, 0.045);

    // scale converted directly from smoothKick - the louder the kick drum, the bigger the neuron
    // map converts 0-1 into the visual range 0.3-3.5
    //smoothBass gives a slight extra growth on top
    var neuronScale = map(smoothKick, 0, 1, 0.3, 3.5)
                    + map(smoothBass, 0, 1, 0.0, 0.8);

    // rescakes 0-1 mid value to a 0-10 range, easier to calculate threshold
    let midLevel = mid * 10;
    //below 5 nothing fires
    //above 5 both the count and probability of orbs spawning goes up (correlating to the music)
    if (midLevel >= 5) {
      let trunks = neuron.branches.filter(b => b.delay === 0);
      let count = floor(map(midLevel, 5, 10, 5, trunks.length));
      let spawnChance = map(midLevel, 5, 10, 0.02, 0.35);
      
      //probability check for orbs
      if (random() < spawnChance) {
        let shuffled = [...trunks].sort(() => random() - 0.5);
        for (let i = 0; i < count; i++) {
          pulseHeads.push(new PulseHead(shuffled[i]));
        }
      }
    }

    background(0);
    ambientLight(40);
    directionalLight(
      80  + floor(smoothBass   * 140),
      60  + floor(smoothMid    * 100),
      100 + floor(smoothTreble * 120),
      0, 0.2, -1
    );

    if (pulseHeads.length > 800) pulseHeads.splice(0, pulseHeads.length - 800);
    for (let i = pulseHeads.length - 1; i >= 0; i--) {
      pulseHeads[i].update();
      if (pulseHeads[i].done) pulseHeads.splice(i, 1);
    }

    let headsByBranch = new Map();
    for (let b of neuron.branches) headsByBranch.set(b, []);
    for (let ph of pulseHeads) {
      if (headsByBranch.has(ph.branch)) headsByBranch.get(ph.branch).push(ph);
    }

    // save current drawing state
    push();
    //make everything inside bigger or smaller
    scale(neuronScale);
    //spins everything around the Z axis - 3d one, so it spins flat like a wheel
    rotateZ(neuronAngle);
//everything after this uses both transformations
 
    //draw branches inside noLights so p5 lighting doesn't interfere with the stroke colors - i control them
    push();
    noLights();
   // for...of loop goes through all branches in the array
    for (let b of neuron.branches) {
      let pts   = b.pts;
      let heads = headsByBranch.get(b) || [];
      //for each segment of branch - check all orbs on that branch currently
      for (let i = 1; i < pts.length; i++) {
        let segT  = i / (pts.length - 1);
        let taper = 1.0 - segT * 0.45;
        let lit   = 0;
        //ask each orb, "how much should this segment glow"
        //take max so they don't cancel eachother out if multiple
        for (let ph of heads) lit = max(lit, ph.getLit(segT));
        let bHue = (currentHue + b.col[0] * 0.25) % 360;
        colorMode(HSB, 360, 100, 100, 255);
        let bc = color(bHue, 85, map(smoothBass, 0, 1, 50, 95));
        colorMode(RGB, 255, 255, 255, 255);
        let r = red(bc), g = green(bc), bl = blue(bc);
        let cr = floor(lerp(r  * 0.55, 255, lit * 0.85));
        let cg = floor(lerp(g  * 0.55, 255, lit * 0.85));
        let cb = floor(lerp(bl * 0.55, 255, lit * 0.85));
        //each segment drawn twice - first thick dark outer line (x .35 to darken)
        stroke(floor(cr * 0.35), floor(cg * 0.35), floor(cb * 0.35));
        strokeWeight(b.w * taper * 5.0 * (0.6 + lit * 0.4));
        line(pts[i-1].x, pts[i-1].y, 0, pts[i].x, pts[i].y, 0);
        //then drawn again with thin bright inner line > glow effect with both
        stroke(cr, cg, cb);
        // taper to reduce width at tip of each branch/sub-branch
        strokeWeight(max(0.5, b.w * taper * (1.0 + lit * 1.5)));
        line(pts[i-1].x, pts[i-1].y, 0, pts[i].x, pts[i].y, 0);
      }
    }
    pop();

    //SOMA SPHERE
    
    let baseSr = min(width, height) * 0.04;
    push();
    noStroke();
    //shine a cone of colored light from above
    spotLight(sr, sg, sb, 0, 0, baseSr * 5, 0, 0, -1, PI / 5);
    //make sphere glow its own color, even without the light
    emissiveMaterial(floor(sr * 0.6), floor(sg * 0.6), floor(sb * 0.6));
    //bright white highlight
    specularMaterial(255);
    shininess(160);
    //draw the sphere - set smoothness
    sphere(baseSr, 24, 24);
    pop();

    push();
    noStroke();
    ambientMaterial(ir, ig, ib);
    sphere(baseSr * 0.40, 16, 16);
    pop();

    push();
    ambientLight(80);
    for (let ph of pulseHeads) {
      let pos = ph.getPos();
      if (!pos) continue;
      colorMode(HSB, 360, 100, 100, 255);
      let oc = color(currentHue, 95, 100);
      colorMode(RGB, 255, 255, 255, 255);
      let or2 = lerp(red(oc),   sr, 0.4);
      let og  = lerp(green(oc), sg, 0.4);
      let ob  = lerp(blue(oc),  sb, 0.4);
      //orb size multiplies using getProgress - returns 0 at soma and 1 at tip of branch
      let orbSize = ph.branch.w * 4.5 * ph.getProgress();
      push();
      translate(pos.x, pos.y, 5);
      pointLight(or2, og, ob, 0, 0, 20);
      emissiveMaterial(or2, og, ob);
      specularMaterial(floor(lerp(or2,255,0.5)), floor(lerp(og,255,0.5)), floor(lerp(ob,255,0.5)));
      shininess(120);
      noStroke();
      sphere(orbSize, 6, 6);
      pop();
    }
    pop();

    pop();

    //TITLE SCREEN
    
  } else {
    background(0);
    push();
    noLights();
    textFont(font);
    colorMode(HSB, 360, 100, 100, 100);
    noStroke();
    fill(270, 60, 96, 92);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(64);
    text('BRAINWAVE', 0, -height * 0.1);
    textStyle(NORMAL);
    fill(270, 30, 85, 75);
    textSize(18);
    text('Your brain on music, rendered in real time.', 0, -height * 0.1 + 55);
    fill(270, 20, 70, 60);
    textSize(13);
    text('Olivia Levine  ·  ARTG-2262', 0, -height * 0.1 + 82);
    fill(0, 0, 95, 50 + 18 * sin(frameCount * 0.05));
    textSize(12);
    text('click anywhere to start', 0, -height * 0.1 + 118);
    fill(0, 0, 70, 60);
    textSize(12);
    text('or drop an mp3 here to use your own track', 0, -height * 0.1 + 140);
    colorMode(HSB, 360, 100, 100);
    pop();
  }
}

//resize browser window and canvas to match
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (neuron) neuron = makeNeuron();
  pulseHeads = [];
}