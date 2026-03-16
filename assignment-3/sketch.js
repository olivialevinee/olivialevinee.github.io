//Olivia Levine
//levine.ol@northeastern.edu
//Prototyping with Code
//Lab#1
//Assignment3
//Olivia Levine in Java

function setup() {
  createCanvas(600, 600);
  noStroke();
}
function draw() {
  background(220);
  noStroke();
    for (let y = 5; y < height; y += 10) {
      for (let x = 5; x < width; x += 10) {
          fill(0 * x / width, 128 * y/height,128);
        //or {let r = map (x, 0, width, 0, 255);
        //let g = map (y,0,height,0,255)
              square(x,y,10);
      }
  }
    textSize(20);
  fill("pink");
  noStroke();
  text('Olivia Levine',470,580);
  
  //head
  noStroke();
  //skin color fill
  fill(255,220,177);
  //(x,y,width,height)
  ellipse(300,200,200,225);
  
  //left eye
  stroke("black");
  fill("white");
  //(ellipse(same as before))
  ellipse(260,175,40,25);
  //eyeball
  noStroke();
  fill (108,165,128);
  ellipse(260,175,20,25);
  //pupil
  fill("black")
  circle(260,175,10);
  
  
    //right eye
  stroke("black");
  fill("white");
  //(ellipse(same as before))
  ellipse(330,175,40,25);
    //eyeball
  noStroke();
  fill (108,165,128);
  ellipse(330,175,20,25);
  //pupil
  fill("black")
  circle(330,175,10);
  
  //nose
  stroke("black");
  noFill();
  line(300,205,295,220);
  line (295,220,305,220);
  
  //lips
  noStroke();
  fill(200,100,120);
  //upper lips(2 connecting arcs)
  //arc(x,y,w,h) - x and y are arcs center
  //if filled section with flat bottom, add (PI,TWO_PI)
  arc(290,258,43,24,PI,TWO_PI);
  arc(310,258,43,24,PI,TWO_PI);
  
  //bottom arc (x,y,w,h,0,PI)
  //if flat top, (0,PI)
  arc(300,255,63,29,0,PI);
  
  //middle line arc(x,y,w,h)
  noFill();
  stroke(128,0,0);
  arc(300,256,61,5,0,PI);
  
  noStroke();
  fill("pink");
    triangle(370,280,320,310,370,310);
  triangle(230,280,280,310,230,310);
  
  //hair
  noStroke();
  fill("brown");
ellipse(330,120,100,70);
    noStroke();
  fill("brown");
ellipse(270,120,100,70);

  fill("brown");
  arc(300,120,150,100,PI,TWO_PI);
  
  quad(220,120, 240, 147, 230, 330, 150, 330);
  quad(380,120,360,147,370,330,450,330);
  fill("pink");
quad(230,310,370,310,150,600,450,600);
}
function mousePressed() {
console.log("X:" + mouseX + ", Y:" + mouseY);
}
