//colors for class bubbles
var red;
var orange;
var yellow;
var green;
var blue;
var purple;

//variable to switch out color
var brushColor;

//makes the long line of bubbles, and allows it to change the bubble size
var air = [];

//array for x1,y1 of discrete line
var shape = [];
//array for x2,y2 of discrete line
var shapeEnd = [];
//array for x1,y1,x2,y2 of continuos line
var continuedShape = [];

//angle for rect to rotate at
var angle = 0;
//changing the angle
var angleChange = 0.05;

//x and y coordinates of shapes
var x = 0;
var y = 0;

//coordinates for the boxes in stacking
var boxX;
var boxY;

//width and height of boxes in stacking
var boxW = 30;
var boxH = 30;

//counter to move the vortex
var counter = 0;

//booleans to switch between "modes"
var main = true;
var bubble = false;
var vortex = false;
var box = false;
var stacks = false;
var dots = false;

//color of instruction text
var textColor;
var textColor2;
//controls opacity
var o = 0;
//on/off switch
var counter2 = 0;

//the colors are in here as they won't change, but the background isn't so the bubbles can float
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

//calls each function depending on which mode it is on
function draw() {

  //textColor changes so it has to be in draw instead of setup
  //starts as transparent clicking i turns it opaque
  textColor = color(0, 0, 0, o);
  textColor2 = color(255,255,255,o);

  //main screen only shows up when turning program on
  if (main === true) {
    noStroke();
    fill(0);
    textSize(16);
    text("Press i at any time to turn on instructions.", 150, 175);
    text("Pressing i again will turn them off, if the background is white", 150, 200);
    text("you will need to refresh the page by hitting the same number", 150, 225);
    text("to get rid of the instructions.", 150, 250);
    text("To begin press 1,2,3,4, or 5.", 150, 275);
    
    //title whimsical
    //color changes with mouse position
    fill(mouseX%255,255-mouseY%255,187);
    stroke(0);
    textSize(100);
    text("w",150,500);
    text("h",205,500);
    text("i",240,500);
    text("m",240,500);
    text("s",305,500);
    text("i",335,500);
    text("c",338,500);
    text("a",372,500);
    text("l",407,500);
    
  }
  
  //related to the switch case to switch between modes
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

//floating bubbles
function bubbles(a) {
  background(255);

  //generates the coordinates
  var coords = {
    //range of -50 to 50 from the mouseX
    x: mouseX + random(-50, 50),
    //anywhere on the mouseY line, vertical line
    y: random(height)
  }
  air.push(coords);

  //after 80 sets of coordinates restarts the coordinates at points 0,1
  if (air.length > 80) {
    air.splice(0, 1);
  }
  //adjusted from in class demo code
  for (var i = 0; i < (air.length); i++) {
    noStroke();
    air[i].y -= 50;
    ellipse(air[i].x, air[i].y, a - i, a - i);
  }


  //changes the color depending on the mouseX position
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
  
  //instructions
  noStroke();
  fill(textColor);
  text("Move the mouse around to change the color.", 50, 50);
  fill(brushColor);
}

//spins a rectangle that can change spinning direction
function depth() {


  var xCoord = width / 2;
  var yCoord = height / 2;
  rectMode(CENTER);
  stroke(0);
  fill(107, 130, random(250), 50);

  //push pop combo allow it to translate and rotate and reset itself to not affect other parts of the code
  push();
  translate(xCoord + x, yCoord + y);
  rotate(angle);
  rect(0, 50, 100, 30);

  angle += angleChange;
  pop();

  //ever 100 rectangles drawn the rectangle moves
  counter++;
  if (counter % 100 === 0) {
    x += random(-50, 50);
    y += random(-50, 50);
  }

  //makes sure it stays on screen
  if (abs(x) >> 300) {
    x = 0;
  }
  if (abs(y) >> 300) {
    y = 0;
  }
  noStroke();
  fill(textColor);
  text("Click to change the direction it is spinning.", 50, 50);
}




//makes a grid of rainbow boxes
function boxes() {
  rectMode(CORNER);

  //array of different colored boxes
  for (var i = 0; i <= width - 20; i += 20) {
    for (var j = 0; j <= height - 20; j += 20) {
      stroke(0);
      fill(i * 0.50, j * 0.50, 180, 90);
      rect(i, j, 20, 20);
    }
  }

  noStroke();
  fill(textColor2);
  text("Move the mouse to make the white box move.", 50, 50);

}

//code to make the rectangles
function stacking() {
  //fill color is time dependent
  fill(40, 70 + millis() % 40, 90 + millis() % 75);
  stroke(0);
  rect(boxX, boxY, boxW, boxH)

  //instructions
  noStroke();
  fill(textColor);
  text("Click to begin the stack.", 50, 50);
  text("Then use the arrrows to add to the stack in different directions.", 50, 75);
  text("If you want to change the size of the boxes use 'w','a','s', or 'd'.", 50, 100);
}

//draws lines
function drawing() {
  stroke(0);
  //line from two different arrays but makes sure the coordinates match by making it reference the same spot in the different arrays
  line(continuedShape[continuedShape.length - 4], continuedShape[continuedShape.length - 3], continuedShape[continuedShape.length - 2], continuedShape[continuedShape.length - 1]);
  //line that continues where it left off so x2,y2, becomes x1,y1 for the next segment of the line/shape
  line(shape[shape.length - 2], shape[shape.length - 1], shapeEnd[shape.length - 2], shapeEnd[shape.length - 1]);
  
  //instructions
  fill(textColor);
  noStroke();
  text("Press 's' to start a point and 'e' to end it.", 50, 50);
  text("Or press 'd' to make a continuos shape.", 50, 75);
  text("Press the space bar, then 6 to clear the screen.", 50, 100);
}

function keyPressed() {
  
  //pressing i turns the instructions "on" pressing again turns them off
  //the counter sort of keeps track of the last state
  if (keyCode === 73) {
    counter2++;
    if (counter2 % 2 === 1) {
      o = 100;
    }
    if (counter2 % 2 === 0) {
      o = 0;
    }
  }
  
  //when in stacking use arrows and wasd to control movement and dimensions of the boxes
  //keyCode is ASCII and it takes the upper case but works for under
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
    if (keyCode == 87) {
      if (boxH == 100) {
        boxH = 10;
      } else {
        boxH += 10;
      }
    }
    if (keyCode == 83) {
      if (boxH == 10) {
        boxH = 100;
      } else {
        boxH -= 10;
      }
    }
    if (keyCode == 65) {
      if (boxW == 10) {
        boxW = 100;
      } else {
        boxW -= 10;
      }
    }
    if (keyCode == 68) {
      if (boxW == 100) {
        boxW = 10;
      } else {
        boxW += 10;
      }
    }
  }
  
  //for drawing it appends the mouse coordinates to their respective arrays;
  //it activates at a keyPress instead of a mouseClick because I wanted more options
  if (dots === true) {
    if (keyCode == 83) {
      append(shape, mouseX);
      append(shape, mouseY);
    }
    if (keyCode == 69) {
      append(shapeEnd, mouseX);
      append(shapeEnd, mouseY);
    }
    if (keyCode == 68) {
      append(continuedShape, mouseX);
      append(continuedShape, mouseY);
    }
    
    //if the space bar is pressed the arrays will be cleared
    //unless the page is refreshed it will just mean that the starting points will be reset
    //the lines will remain on the screen
    if (keyCode == 32) {
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
  
  //this is how you switch between the different interactive modes
  //it uses booleans and turns them on and off
  //and starts each one by resetting the background
  switch (key) {
    case '1':
      background(255, 255, 255, 80);
      main = false;
      bubble = true;
      vortex = false;
      box = false;
      stacks = false;
      dots = false;
      break;
    case '2':
      background(255);
      main = false;
      bubble = false;
      vortex = true;
      box = false;
      stacks = false;
      dots = false;
      break;
    case '3':
      background(255);
      main = false;
      bubble = false;
      vortex = false;
      box = true;
      stacks = false;
      dots = false;
      break;
    case '4':
      background(255);
      main = false;
      bubble = false;
      vortex = false;
      box = false;
      stacks = true;
      dots = false;
      break;
    case '5':
      background(255);
      main = false;
      bubble = false;
      vortex = false;
      box = false;
      stacks = false;
      dots = true;
      break;
    case '6':
      background(255);
  }
}

//when the mouse is moved a white box will appear
function mouseMoved() {
  if (box == true) {
    var xBox;
    var yBox;
    fill(255);
    
    //this math makes it so the box lines up with that of the grid
    xBox = mouseX - mouseX % 20;
    yBox = mouseY - mouseY % 20;

    rect(xBox, yBox, 20, 20);
  }
}

function mouseReleased() {
  //changes the positive/negative angle to switch the spin direction
  if (vortex == true) {
    if (angleChange == 0.05) {
      angleChange = -0.05;
    } else {
      angleChange = 0.05;
    }
  }
  
  //drops the box to start the stack at the bottom of the page
  if (stacks == true) {
    boxX = mouseX;
    boxY = height - 30;
  }
}