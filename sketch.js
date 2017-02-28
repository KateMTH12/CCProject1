var red;
var orange;
var yellow;
var green;
var blue;
var purple;
var brushColor;
var fancyBrush = [];
var angle = 0;
var x;
var y;
var counter;

function setup() {
  background(255);
  frameRate(30);
  createCanvas(600, 600);
  red = color(255, 0, 0, 80);
  orange = color(255, 128, 32, 80);
  yellow = color(255, 221, 84, 80);
  green = color(0, 127, 37, 80);
  blue = color(0, 66, 255, 80);
  purple = color(157, 0, 255, 80);
}

function draw() {
  bubbles(50);
  depth();
}

function bubbles(a) {
  background(255);

  var coords = {
    x: mouseX,
    y: random(height)
  }
  fancyBrush.push(coords);
  if (fancyBrush.length > 80) {
    fancyBrush.splice(0, 1);
  }
  for (var i = 0; i < (fancyBrush.length); i++) {
    // Draw an ellipse for each element in the arrays. 
    // Color and size are tied to the loop's counter: i.
    //while (fancyBrush[i].y > 0) {
    noStroke();
    fancyBrush[i].y -= 50;
    ellipse(fancyBrush[i].x, fancyBrush[i].y, a - i, a - i);
    // }
  }
  if (mouseX <= 100) {
    brushColor = red;
  } else if (mouseX <= 200) {
    brushColor = orange;
  } else if (mouseX <= 300) {
    brushColor = yellow;
  } else if (mouseX <= 400) {
    brushColor = green;
  } else if (mouseX <= 500) {
    brushColor = blue;
  } else {
    brushColor = purple;
  }
  noStroke();
  fill(brushColor);
}

function depth(){
  rectMode(CENTER);
  push();
  translate(width/2,height/2);
  rotate(angle);
  rect(0,50, 100,30);
  pop();
  angle+= 0.05;
  counter ++;
}
  

function keyPressed() {
}