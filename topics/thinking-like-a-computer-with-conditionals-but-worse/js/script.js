/**
 * Thinking Like a computer with conditionals
 * Jack McDonald
 * 
 * 
 */

"use strict";

/**
 * sets up stuff
*/
function setup() {
    createCanvas(600,400);
}


/**
 * draws square/circle based on mouseX
*/
function draw() {
    background("#000000");

    //draw square if muouse is in left 3rd
    if (mousex < width *0.33) {
        drawSquare();
    }

    else if (mouseX> width * 0.66) {
        drawCircle();
    }

    else {
        background("ff0000");
    }

}

//function to draw square on left side
function drawSquare() {
    push();
    fill("ff0000");
    noStroke();
    rect(100,100);
    pop();
}

//function to draw circle on right side
function drawCircle(){
    push();
    fill("ff0000");
    noStroke();
    ellipse(100,100);
    pop();
}