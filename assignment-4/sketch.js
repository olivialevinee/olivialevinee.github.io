/*
  ARTG-2262: Prototyping with Code
  Olivia Levine
  levine.ol@northeastern.edu
  Assignment 4
  "Electric Shapes"
*/

// countX and countY define how many columns and rows the grid has (mega-hacker: programmatic generation)
let countX = 20;
let countY = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop(); // pattern is static, no need to redraw every frame
}

function draw() {
  background('skyblue');

  // cell size is derived from canvas dimensions and count variables
  // so if you change countX/countY or the canvas size, the whole grid adapts automatically
  let cellW = width / countX;   // width of each grid cell
  let cellH = height / countY;  // height of each grid cell

  // outer loop steps through each column
  for (let i = 0; i < countX; i++) {
    // inner loop steps through each row
    for (let j = 0; j < countY; j++) {

      // convert grid index to pixel position
      let x = i * cellW;
      let y = j * cellH;

      // checkerboard condition: if column + row index is even, draw triangle; otherwise draw rect
      if ((i + j) % 2 == 0) {
        fill("magenta");
        noStroke();
        // triangle points: bottom-left, top-middle, bottom-right of the cell
        triangle(x, y + cellH, x + cellW / 2, y, x + cellW, y + cellH);
      } else {
        fill(170, 0, 255);
        stroke('magenta');
        strokeWeight(3);
        // rect fills the whole cell
        rect(x, y, cellW, cellH);
      }
    }
  }
}

function mousePressed() {
  // logs mouse position to console for debugging
  console.log("X:" + mouseX + ", Y:" + mouseY);
}

function keyPressed() {
  // press S to save the canvas as a PNG
  if (key == 'S' || key == 's') {
    saveCanvas("assignment[3]_pattern_Levine_Olivia.png");
  }
}

// redraw the pattern whenever the window is resized so it always fills the screen
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}
