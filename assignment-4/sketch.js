/*
Prototyping with Code
Olivia Levine
levine.ol@northeastern.edu
Assignment 4
"Electric Shapes"
*/
function setup() {
  createCanvas(1024, 1024);
}

let gridSize = 50
function draw() {
  background('skyblue');

  // for (start at left edge; keep going till you reach right side of canvas; each time, jump forward by "gridSize" # of pixels)
  for(let x = 0; x < width; x += gridSize)
    //same thing for y axis in nexted loop - start at top, keep going till bottom, each time, jump forward by "gridsize" # pixels)
  {for(let y = 0; y < height; y += gridSize) 
  // draw a rectangle at the start of each grid (jumps forward each time) with and height of grid
    // (remainder of (column # + row #)/2), if = 0...
  { if ((x/gridSize + y/gridSize) % 2 ==0){
    // grid starts (top left) at x,y
    //so, x + gridSize adds the width and = top right, y + gridSize adds the height (going down) and = bottom left, and x + gridSize, y + gridSize = bottom right
    //triangle (bottom left, middle of top, bottom right)
    fill("magenta");
    noStroke();
    triangle(x,y + gridSize, x + gridSize/2, y, x + gridSize, y +  gridSize)
  }else{
    fill(170,0,255);
    stroke('magenta');
    strokeWeight(3);
    rect(x,y,gridSize,gridSize)}
  }
}
}
function mousePressed() {
console.log("X:" + mouseX + ", Y:" + mouseY);
}
function keyPressed() {  
    if (key == 'S' || key == 's') {       saveCanvas("assignment[3]_pattern_Levine_Olivia.png"); } } 