/**
 * Mr. Furious
 * Pippin Barr
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 100,
  // Colour
  fill: {
    r: 255,
    g: 225,
    b: 225
  }
};

let randomShake = {
    x1: 199,
    x2: 201
}

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
  background(160, 180, 200);

  // Mr Furious gets redder (constrained)
  mrFurious.fill.g -=1;
  //mrFurious.fill.g = constrain[mrFurious.fill.g,0,255];
  mrFurious.fill.b -=1;
  //mrFurious.fill.b = constrain[mrFurious.fill.b,0,255];
  
  randomShake.x1 +=1;
  randomShake.x1 = constrain[randomShake.x1,199,190]
  randomShake.x2 +=1;
  randomShake.x2 = constrain[randomShake.x2,201,210]
  mrFurious.x = random(randomShake.x1,randomShake.x2)
  // Draw Mr. Furious as a coloured circle
  push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
  pop();
}