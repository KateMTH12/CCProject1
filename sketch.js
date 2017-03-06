var red;
var orange;
var yellow;
var green;
var blue;
var purple;
var brushColor;
var air = [];
var drop = [];
var shape = [];
var shapeEnd = [];
var continuedShape = [];
var angle = 0;
var x = 0;
var y = 0;
var x1 = 0;
var y1 = 0;
var boxX;
var boxY;
var boxW = 30;
var boxH = 30;
var counter = 0;
var bubble = false;
var vortex = false;
var box = false;
var stacks = false;
var dots = false;
var angleChange = 0.05;

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
  if (bubble === true) {
    bubbles(50);
  }
  if (vortex === true) {
    depth();
  }
  if (box === true) {
    boxes();
  }
  if (stacks === true) {
    stacking();
  }
  if (dots === true) {
    drawing();
  }
}

function depth() {
  var xCoord = width / 2;
  var yCoord = height / 2;
  rectMode(CENTER);
  stroke(0);

  fill(107, 130, random(250), 50);
  push();
  translate(xCoord + x, yCoord + y);
  rotate(angle);
  rect(0, 50, 100, 30);
  pop();
  angle += angleChange;
  counter++;
  if (counter % 100 === 0) {
    x += random(-50, 50);
    y += random(-50, 50);
  }
  if (abs(x) >> 300) {
    x = 0;
  }
  if (abs(y) >> 300) {
    y = 0;
  }
}

function bubbles(a) {
  background(255);

  var coords = {
    x: mouseX + random(-50, 50),
    y: random(height)
  }
  air.push(coords);
  if (air.length > 80) {
    air.splice(0, 1);
  }
  //adjusted from in class demo code
  for (var i = 0; i < (air.length); i++) {
    noStroke();
    air[i].y -= 50;
    ellipse(air[i].x, air[i].y, a - i, a - i);
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

function drawing() {
  line(continuedShape[continuedShape.length - 4], continuedShape[continuedShape.length - 3], continuedShape[continuedShape.length - 2], continuedShape[continuedShape.length - 1]);
  line(shape[shape.length - 2], shape[shape.length - 1], shapeEnd[shape.length - 2], shapeEnd[shape.length - 1]);
}

function boxes() {
  rectMode(CORNER);
  stroke(0);
  for (var i = 0; i <= width - 20; i += 20) {
    for (var j = 0; j <= height - 20; j += 20) {
      fill(i * 0.50, j * 0.50, 180, 90);
      rect(i, j, 20, 20);
    }
  }
}


function stacking() {
  fill(40, 70 + millis() % 40, 90 + millis() % 75);
  rect(boxX, boxY, boxW, boxH)
}


function keyPressed() {
  if (dots === true) {
    if (keyCode == '83') {
      append(shape, mouseX);
      append(shape, mouseY);
    }
    if (keyCode == '69') {
      append(shapeEnd, mouseX);
      append(shapeEnd, mouseY);
    }
    if (keyCode == '68') {
      append(continuedShape, mouseX);
      append(continuedShape, mouseY);
    }
    if (keyCode == '32') {
      for (var i = shape.length; i > 0; i--) {
        shorten(shape);
      }
      for (var j = shapeEnd.length; j > 0; j--) {
        shorten(shapeEnd);
      }
      for (var k = continuedShape.length; k > 0; k--) {
        shorten(continuedShape);
      }
    }
  }
  if (stacks === true) {
    if (keyCode == UP_ARROW) {
      if (boxY <= 0) {
        boxY = height - boxH;
      } else {
        boxY -= boxH;
      }
    }
    if (keyCode == DOWN_ARROW) {
      if (boxY >= height - boxH) {
        boxY = 0;
      } else {
        boxY += boxH;
      }
    }
    if (keyCode == LEFT_ARROW) {
      if (boxX <= 0) {
        boxX = width - boxW;
      } else {
        boxX -= boxW;
      }
    }
    if (keyCode == RIGHT_ARROW) {
      if (boxX >= width - boxW) {
        boxX = 0;
      } else {
        boxX += boxW;
      }
    }
    if (keyCode == '87') {
      if (boxH == 100) {
        boxH = 10;
      } else {
        boxH += 10;
      }
    }
    if (keyCode == '83') {
      if (boxH == 10) {
        boxH = 100;
      } else {
        boxH -= 10;
      }
    }
    if (keyCode == '65') {
      if (boxW == 10) {
        boxW = 100;
      } else {
        boxW -= 10;
      }
    }
    if (keyCode == '68') {
      if (boxW == 100) {
        boxW = 10;
      } else {
        boxW += 10;
      }
    }
  }
  switch (key) {
    case '1':
      background(255, 255, 255, 80);
      bubble = true;
      vortex = false;
      box = false;
      stacks = false;
      dots = false;
      break;
    case '2':
      background(255);
      vortex = true;
      bubble = false;
      box = false;
      stacks = false;
      dots = false;
      break;
    case '3':
      background(255);
      box = true;
      bubble = false;
      vortex = false;
      stacks = false;
      dots = false;
      break;
    case '4':
      background(255);
      stacks = true;
      box = false;
      bubble = false;
      vortex = false;
      dots = false
      break;
    case '5':
      background(255);
      stacks = false;
      box = false;
      bubble = false;
      vortex = false;
      dots = true;
      break;
    case '6':
      background(255);
  }
}

function mouseMoved() {
  if (box == true) {
    var xBox;
    var yBox;
    fill(255);
    xBox = mouseX - mouseX % 20;
    yBox = mouseY - mouseY % 20;

    rect(xBox, yBox, 20, 20);
  }
}

function mouseReleased() {
  if (vortex == true) {
    if (angleChange == 0.05) {
      angleChange = -0.05;
    } else {
      angleChange = 0.05;
    }
  }
  if (stacks == true) {
    boxX = mouseX;
    boxY = height - 30;
  }
}