/*
ARTG 2262 – Prototyping with Code
Olivia Levine
levine.ol@northeastern.edu
Assignment 5: Screensaver
"Drifting Galaxy"
Description: An  animated galaxy scene with shimmering stars and mesh, partially transparent circles in the background that overlap to make a galaxy feel. They slowly pulse and shift hues over time. Each run creates a different color palette and star layout.
*/

//set variables
let numStars = 300;

// arrays - 4 empty "backpacks" for x position, y position, size, and when they twinkle (offset)
let starX = [];
let starY = [];
let starSize = [];
let starOffset = []; // each star's own twinkle timing

function setup() {
  createCanvas(windowWidth, windowHeight);
  // color mode: (HSB, hue, saturation, brightness, opacity)
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();

//arrays contain random valyes for each star
  for (let i = 0; i < numStars; i++) {
    starX.push(random(width));
    starY.push(random(height));
    starSize.push(random(2, 8));
    starOffset.push(random(360)); // random starting point in twinkle cycle
  }
}

function draw() {
  background(240, 60, 6); // deep dark navy

  drawClouds();
  drawStars();
}
//background ellipses (clouds)

function drawClouds() {
  // do forloop tells the code to do the next part 8 times, one for each "cloud"
  for (let i = 0; i < 8; i++) {
  // frameCount goes up by 1 every frame and we multiply it by a really small number (0.05) to make the color slowly drift over time - once it hits 360 (full roation) it starts over again
    let h = (200 + i * 25 + frameCount * 0.05) % 360;
  // each cloud sits at a different spot across the canvas
    let x = width * (i / 7);
  // puts each cloud at a slightly different height - sin helps make a wavy pattern of them
    let y = height * 0.5 + height * 0.3 * sin(i * 45);

// Draw 4 layers per cloud, each bigger and more transparent
    for (let layer = 4; layer > 0; layer--) {
      fill(h, 55, 65, layer * 5);
      ellipse(x, y, width * 0.6 * layer * 0.4, height * 0.7 * layer * 0.4);
    }
  }
}

//stars
//sin() to smoothly flash between dim and bright
function drawStars() {
  for (let i = 0; i < numStars; i++) {
//figure out how bright the star is right now (frameCount * 0.05)
// starOffset looks at what point the star is at in its cycle
// sin() returns -1 to 1
// map() stretches that into a brightness range
    let alpha = map(sin(frameCount * 0.05 + starOffset[i]), -1, 1, 10, 100);
    let glow  = map(sin(frameCount * 0.05 + starOffset[i]), -1, 1, starSize[i], starSize[i] * 3);

// Soft outer glow on each star
    fill(210, 20, 100, alpha * 0.3);
    ellipse(starX[i], starY[i], glow);

// Bright core
    fill(200, 10, 100, alpha);
    ellipse(starX[i], starY[i], starSize[i]);
  }
}
//fullscreen on click
function mousePressed() {
  fullscreen(true);
}