/*
  ARTG 2262 – Prototyping with Code
  Olivia Levine
  levine.ol@northeastern.edu
  Assignment 5: Screensaver
  "Drifting Galaxy"
  Description: An animated galaxy scene with shimmering stars and large, partially
  transparent clouds in the background that slowly pulse and shift hues over time.
  Each run creates a different star layout. Current time displayed in the corner.
*/

let numStars = 300;
let stars = []; // array of Star objects (hacker: collection of objects managed as array)

// HACKER: Star class bundles each star's properties and draw behavior together
class Star {
  constructor() {
    this.x = random(width);      // random position across the canvas
    this.y = random(height);
    this.size = random(2, 8);    // random diameter between 2 and 8 pixels
    this.offset = random(360);   // random starting phase so stars twinkle at different times
  }

  draw() {
    // sin() smoothly oscillates between -1 and 1 each cycle
    // frameCount * 0.05 controls the speed, this.offset staggers each star
    // map() stretches the -1 to 1 range into useful brightness/size values
    let alpha = map(sin(frameCount * 0.05 + this.offset), -1, 1, 10, 100);
    let glow  = map(sin(frameCount * 0.05 + this.offset), -1, 1, this.size, this.size * 3);

    // soft outer glow ring at 30% opacity
    fill(210, 20, 100, alpha * 0.3);
    ellipse(this.x, this.y, glow);

    // bright solid core
    fill(200, 10, 100, alpha);
    ellipse(this.x, this.y, this.size);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100); // hue, saturation, brightness, opacity all 0-100 (except hue, 0-360)
  noStroke();

  // populate the stars array with Star objects
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }
}

function draw() {
  background(240, 60, 6); // deep dark navy
  drawClouds();
  drawStars();
  drawClock(); // HACKER: display current time
}

function drawClouds() {
  for (let i = 0; i < 8; i++) {
    // hue slowly drifts as frameCount increases, offset per cloud by i * 25
    // % 360 wraps it back around when it completes a full hue rotation
    let h = (200 + i * 25 + frameCount * 0.05) % 360;

    // spread 8 clouds evenly across the width
    let x = width * (i / 7);

    // sin() makes a gentle wave so clouds sit at different heights
    let y = height * 0.5 + height * 0.3 * sin(i * 45);

    // draw 4 ellipse layers per cloud, each bigger and more transparent
    for (let layer = 4; layer > 0; layer--) {
      fill(h, 55, 65, layer * 5); // layer * 5 means inner layers are slightly more opaque
      ellipse(x, y, width * 0.6 * layer * 0.4, height * 0.7 * layer * 0.4);
    }
  }
}

function drawStars() {
  // call draw() on each Star object in the array
  for (let i = 0; i < stars.length; i++) {
    stars[i].draw();
  }
}

// HACKER: current time using p5's built-in time functions
function drawClock() {
  // hour(), minute(), and second() return the time as integers
  // nf() pads single digits with a leading zero (e.g. 9 becomes "09")
  // convert 24-hour to 12-hour: % 12 wraps it, || 12 handles midnight/noon showing 12 not 00
  let rawHour = hour() % 12 || 12;
  let h = nf(rawHour, 2);
  let m = nf(minute(), 2);
  let s = nf(second(), 2);
  let ampm = hour() < 12 ? "AM" : "PM"; // before noon is AM, noon and after is PM

  // position in bottom right corner, scaled to canvas size
  let x = width - width * 0.12;
  let y = height - height * 0.04;

  textSize(width * 0.02); // scales with canvas so it looks right at any resolution
  textAlign(RIGHT);

  fill(200, 20, 100, 80);
  text(h + ":" + m + ":" + s + " " + ampm, x, y);
}

// resize canvas and reinitialize stars so they fill the new dimensions
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  stars = []; // clear old stars whose positions were based on the old canvas size
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star()); // create fresh stars using the new width/height
  }
}

// click to go fullscreen
function mousePressed() {
  fullscreen(true);
}
