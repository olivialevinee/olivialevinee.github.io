/*
  ARTG2262: Prototyping with Code
  Olivia Levine
  levine.ol@northeastern.edu
  Assignment 6: Galaxy Drawing App
  Instructions:
    - Click and drag to draw stars
    - Press 1-6 to change color
    - Press S to save your drawing
*/

let drawStars = false;
let currentColor;
let colorOptions;
let backgroundStars = []; //array for background stars

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(10, 15, 40); //dark navy
  noStroke();

  palette = [
    color('white'),    // white
    color('skyblue'),    // sky blue
    color('purple'),    // magenta
    color('royalblue'),    // blue
    color('orchid'),    // pink
    color('mediumpurple'), // purple
  ];

  currentColor = palette[0];

  for (let i = 0; i < 200; i++) {
    backgroundStars.push({
      x: random(width),
      y: random(height),
      sz: random(1, 3),
      brightness: random(100, 255),
    });
  }

  for (let s of backgroundStars) {
    fill(s.brightness, s.brightness, s.brightness + 40);
    ellipse(s.x, s.y, s.sz, s.sz);
  }

  drawInstructions();
}

function draw() {
  if (drawStars) {
    let spread = 50;
    let sx = mouseX + random(-spread, spread);
    let sy = mouseY + random(-spread, spread);
    let sz = random(3, 12);
    let opacity = random(80, 255);
    let c = currentColor;

    fill(red(c), green(c), blue(c), opacity);
    drawStar(sx, sy, sz * 0.4, sz, 5);

    drawInstructions();
  }
}

function drawStar(cx, cy, r1, r2, pts) {
  beginShape();
  for (let i = 0; i < pts * 2; i++) {
    let r = (i % 2 === 0) ? r2 : r1;
    let angle = (PI / pts) * i - HALF_PI;
    vertex(cx + cos(angle) * r, cy + sin(angle) * r);
  }
  endShape(CLOSE);
}

function drawInstructions() {
  fill(10, 15, 40, 200);
  noStroke();
  rect(10, 10, 230, 130, 8);

  fill('white');
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("GALAXY DRAWING APP", 20, 20);

  fill(180, 200, 255);
  textSize(11);
  textStyle(NORMAL);
  text("Click & drag to draw stars", 20, 42);
  text("1  White   2  Sky Blue   3  Magenta", 20, 58);
  text("4  Blue    5  Pink  6  Purple", 20, 74);
  text("Mouse X → star size", 20, 90);
  text("S → save", 20, 106);
}

function mousePressed() {
  drawStars = true;
}

function mouseReleased() {
  drawStars = false;
}

function keyPressed() {
  if (key === '1') { currentColor = palette[0]; }
  if (key === '2') { currentColor = palette[1]; }
  if (key === '3') { currentColor = palette[2]; }
  if (key === '4') { currentColor = palette[3]; }
  if (key === '5') { currentColor = palette[4]; }
  if (key === '6') { currentColor = palette[5]; }
  if (key === 's' || key === 'S') { saveCanvas('galaxy-drawing', 'png'); }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}