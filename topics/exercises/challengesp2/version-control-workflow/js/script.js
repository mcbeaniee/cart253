/**
 * Jack's version control project
 * Jack McDonald
 * 
 * 
 * Testing out version control and stuff in p5.js
 */

"use strict";

/**
 * Sets up rules before running draw function.
*/
function setup() {
    createCanvas(500,500);
}


/**
 * draws pixels on the screen according to the code in the function.
 * #1 is the italian flag, draws background and draws flag function.
 * #2 is the black chain and yellow background

function draw() {
    //draws blue background
    background("#5873e0");
    //flag
    drawFlag();
}

function drawFlag() {
    push(); 
    noStroke();
    fill("#2e7d38"); 
    rect(60,125,125,[250]);
    fill("#ff0000")
    rect(310,125,125,[250]);
    fill("#ffffff")
    rect(185,125,125,[250]);
    pop();
}
*/
function drawChain(){
    push();
    strokeWeight(20);
    stroke("#000000");
    noFill();
    ellipse(250,0,50,[100]);
    ellipse(250,70,50,[100]);
    ellipse(250,140,50,[100]);
    ellipse(250,220,50,[100]);
    ellipse(250,290,50,[100]);
    ellipse(250,360,50,[100]);
    ellipse(250,430,50,[100]);
    ellipse(250,500,50,[100]);
    pop();
}

function draw(){
    //draws yellow background
    background("#ffff00");
    //ellipse chains
    drawChain();
}
