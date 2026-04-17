/*
  ARTG-2262: Prototyping with Code
  Olivia Levine
  levine.ol@northeastern.edu
  Lab #1 - Assignment 3
  "Olivia Levine Self portrait"
*/

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);
  noStroke();

  // BACKGROUND GRADIENT
  // nested loops tile the canvas with colored squares
  // color shifts from dark to teal as x and y increase
  for (let y = 5; y < height; y += 10) {
    for (let x = 5; x < width; x += 10) {
      fill(0, 128 * y / height, 128);
      square(x, y, 10);
    }
  }

  // cx/cy are the face center, derived from canvas size so the portrait scales
  let cx = width / 2;
  let cy = height / 2;

  // name label in lower right corner
  textSize(20);
  fill("pink");
  noStroke();
  text('Olivia Levine', width - 130, height - 20);

  // head drawn first so hair sits on top of it
  noStroke();
  fill(255, 220, 177);
  ellipse(cx, cy, 200, 225);

  // bezier softens the chin edge, control points pull the curve outward
  noFill();
  stroke(255, 220, 177);
  strokeWeight(6);
  bezier(cx - 60, cy + 80, cx - 40, cy + 120, cx + 40, cy + 120, cx + 60, cy + 80);
  strokeWeight(1);

  // hair drawn after head so it overlaps the face
  noStroke();
  fill("brown");
  ellipse(cx + 30, cy - 80, 100, 70);
  ellipse(cx - 30, cy - 80, 100, 70);
  arc(cx, cy - 80, 150, 100, PI, TWO_PI);

  // right hair panel as a vertex shape (hacker: composite shape)
  beginShape();
  vertex(cx + 80, cy - 80);
  vertex(cx + 60, cy - 53);
  vertex(cx + 70, cy + 130);
  vertex(cx + 150, cy + 130);
  endShape(CLOSE);

  // left hair panel as a vertex shape
  beginShape();
  vertex(cx - 80, cy - 80);
  vertex(cx - 60, cy - 53);
  vertex(cx - 70, cy + 130);
  vertex(cx - 150, cy + 130);
  endShape(CLOSE);

  // left eye
  stroke("black");
  fill("white");
  ellipse(cx - 40, cy - 25, 40, 25);
  noStroke();
  fill(108, 165, 128);
  ellipse(cx - 40, cy - 25, 20, 25);
  fill("black");
  circle(cx - 40, cy - 25, 10);

  // right eye
  stroke("black");
  fill("white");
  ellipse(cx + 30, cy - 25, 40, 25);
  noStroke();
  fill(108, 165, 128);
  ellipse(cx + 30, cy - 25, 20, 25);
  fill("black");
  circle(cx + 30, cy - 25, 10);

  // nose: two lines forming a simple bridge
  stroke("black");
  noFill();
  line(cx, cy + 5, cx - 5, cy + 20);
  line(cx - 5, cy + 20, cx + 5, cy + 20);

  // lips: two arcs for upper lip (PI to TWO_PI = flat bottom, curved top)
  // one arc for lower lip (0 to PI = flat top, curved bottom)
  noStroke();
  fill(200, 100, 120);
  arc(cx - 10, cy + 58, 43, 24, PI, TWO_PI);
  arc(cx + 10, cy + 58, 43, 24, PI, TWO_PI);
  arc(cx, cy + 55, 63, 29, 0, PI);

  // mouth center line
  noFill();
  stroke(128, 0, 0);
  arc(cx, cy + 56, 61, 5, 0, PI);

  // shoulders/body
  fill("pink");
  quad(cx - 70, cy + 110, cx + 70, cy + 110, cx + 150, height, cx - 150, height);
}

function mousePressed() {
  // logs mouse position to console, useful for placing shapes
  console.log("X:" + mouseX + ", Y:" + mouseY);
}
