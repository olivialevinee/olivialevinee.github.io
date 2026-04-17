/*
  ARTG2262: Prototyping with Code
  Olivia Levine
  levine.ol@northeastern.edu
  Assignment 6: Galaxy Drawing App
  Instructions:
    - Click and drag to draw stars
    - Hold E and drag to erase
    - Press 1-6 to change color
    - Press C to clear the canvas
    - Press S to save your drawing
*/

let isDrawing = false;
let currentColor;
let palette;
let backgroundStars = []; // array of background star objects

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(10, 15, 40); // dark navy
  noStroke();

  // color palette, indexed by keys 1-6
  palette = [
    color('white'),
    color('skyblue'),
    color('purple'),
    color('royalblue'),
    color('orchid'),
    color('mediumpurple'),
  ];
  currentColor = palette[0];

  // create 200 faint background stars and draw them once into the background
  for (let i = 0; i < 200; i++) {
    backgroundStars.push({
      x: random(width),
      y: random(height),
      sz: random(1, 3),
    });
  }
  for (let s of backgroundStars) {
    fill(255); // plain white
    ellipse(s.x, s.y, s.sz, s.sz);
  }

  drawInstructions();
}

function draw() {
  if (isDrawing) {
  if (keyIsDown(69)) { //if E is pressed (keycode for E is 69)
      // HACKER: selective erasing - erase drawn stars but keep background stars
      noStroke();
      // first paint navy to erase drawn stars
      fill(10, 15, 40);
      ellipse(mouseX, mouseY, 40, 40);
      // then redraw any background stars that fall within the eraser radius
      for (let s of backgroundStars) {
        if (dist(mouseX, mouseY, s.x, s.y) < 20) { // 20 is half the eraser diameter
          fill(255);
          ellipse(s.x, s.y, s.sz, s.sz);
        }
    }
    } else {
      // scatter stars randomly around the mouse position
      let spread = 50; // how far stars can appear from the cursor

      let sx = mouseX + random(-spread, spread);
      let sy = mouseY + random(-spread, spread);

      // star size scales with mouseX position (hacker: automatic behavior not controlled by user)
      // map() converts mouseX (0 to width) into a size range (4 to 16)
      let sz = map(mouseX, 0, width, 4, 16);
      let opacity = random(80, 255); // random transparency between 80 and 255 of drawn stars for a sparkle effect
      let c = currentColor;

      fill(red(c), green(c), blue(c), opacity);
      drawStar(sx, sy, sz * 0.4, sz, 5); // inner radius is 40% of outer
    }
    drawInstructions(); // redraw on top so they don't get painted over
  }
}

// draws a 5-pointed star shape using vertices
// cx, cy = center; r1 = inner radius; r2 = outer radius; pts = number of points
function drawStar(cx, cy, r1, r2, pts) {
  beginShape();
  for (let i = 0; i < pts * 2; i++) {
    // alternate between outer and inner radius to create the spike pattern
    let r = (i % 2 === 0) ? r2 : r1;
   let angle = (PI / pts) * i - HALF_PI; // HALF_PI rotates the star so it points up no matter what
    vertex(cx + cos(angle) * r, cy + sin(angle) * r);
  }
  endShape(CLOSE);
}

function drawInstructions() { // text on top left
  fill('white');
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("GALAXY DRAWING APP", 20, 20);
  fill(180, 200, 255);
  textSize(11);
  textStyle(NORMAL);
  text("Click & drag to draw stars", 20, 42);
  text("Hold E + drag to erase", 20, 58);
  text("1  White   2  Sky Blue   3  Purple", 20, 74);
  text("4  Blue    5  Pink       6  Lavender", 20, 90);
  text("X position on canvas changes star size", 20, 106);
  text("C → clear    S → save", 20, 122);
}

function mousePressed() {
  isDrawing = true;
}

function mouseReleased() {
  isDrawing = false;
}

function keyPressed() {
  // number keys 1-6 switch the drawing color
  if (key === '1') currentColor = palette[0];
  if (key === '2') currentColor = palette[1];
  if (key === '3') currentColor = palette[2];
  if (key === '4') currentColor = palette[3];
  if (key === '5') currentColor = palette[4];
  if (key === '6') currentColor = palette[5];

  // HACKER: C clears the canvas by repainting the background and redrawing bg stars
  if (key === 'c' || key === 'C') {
    background(10, 15, 40);
    for (let s of backgroundStars) {
      fill(255);
      ellipse(s.x, s.y, s.sz, s.sz);
    }
    drawInstructions();
  }

  // S saves the canvas as a PNG
  if (key === 's' || key === 'S') {
    saveCanvas('galaxy-drawing', 'png');
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
