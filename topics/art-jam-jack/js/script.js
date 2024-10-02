/**
 * Cat Clocks
 * Jack McDonald
 * Pendulum code example used: 
 * https://editor.p5js.org/aferriss/sketches/S1IygsgyQ
 * help for clock:
 * https://p5js.org/examples/calculating-values-clock/ 
 * 
 * Some cute cat clocks! Definitely normal ones!
 */

"use strict";

let gif;
let img;

function preload() {
    gif = loadImage('assets/images/Unattended.gif');
  }

//Iris var
let irisPosition = {
    x: 170,
    y: 230
}

//clock vars
const clock = {
minutesRadius:0,
hoursRadius:0,
diameter:0,

x: 300,
y: 465
};

//pendulum swing vars
let pendulumX = 0;
let pendulumY = 0;


/**
 * Creates Canvas and sets up clock radius on cat's chest
*/
function setup() {
    createCanvas(1000,1000);
    
    let radius = 100;
    clock.minutesRadius = radius * 0.71;
    clock.hoursRadius = radius * 0.5;
    clock.diameter = radius * 1.7;
}

/**
 * Draws the cats and their features
*/
function draw() {
    
    
    noStroke();
    background("#382b52");
    push();
    //cat bodies
    fill(0);
    rect(200,300,200,300);
    rect(600,300,200,300);
    pop();
    //cat heads
    push();
    fill(0);
    ellipse(300,250,370,250);
    ellipse(700,250,370,250);
    pop();
    //ears
    push();
    fill(0);
    triangle(150, 40, 172, 180, 292, 120);
    triangle(425, 40, 411, 180, 292, 120);
    triangle(550, 40, 572, 180, 692, 120);
    triangle(825, 40, 811, 180, 692, 120);
    pop();
    //iris loop
    push();
    drawIrises();
    drawIrises2();
    pop();
    //calls function to draw pendulums
    push();
    drawPendulums();
    pop();
    //calls clock function to draw clocks
    push();
    drawClocks();
    pop();

}

//draws first pair of eyes
function drawIrises(){
let eyeX = constrain(mouseX, irisPosition.x, irisPosition.y);
let eyeY = constrain(mouseY, irisPosition.x, irisPosition.y);
push();
fill(255);
noStroke();
//whites
circle(irisPosition.x+35,irisPosition.y-25,120);
circle(irisPosition.x+125,irisPosition.y-25,120);
//pupils/irises
fill(255,0,0);
circle(eyeX,eyeY,50);
circle(eyeX+100,eyeY,50);
pop();
}

/***
 * second iris function. (yes i know there was probably a way to do this without
 * having to make a second function but I could not figure it out)
*/
function drawIrises2(){
    let eyeX2 = constrain(mouseX-400, irisPosition.x, irisPosition.y);
    let eyeY2 = constrain(mouseY, irisPosition.x, irisPosition.y);
    push();
    fill(255);
    noStroke();
    //whites
    circle(irisPosition.x+435,irisPosition.y-25,120);
    circle(irisPosition.x+525,irisPosition.y-25,120);
    //pupils/irises
    fill(255,0,0);
    circle(eyeX2+400,eyeY2,50);
    circle(eyeX2+500,eyeY2,50);
    pop();
}

//draws clocks on chests of cats
function drawClocks(){
    
    angleMode(DEGREES);
    //draws clock background
    noStroke();
    fill(255);
    ellipse(300,465,clock.diameter,clock.diameter);
    ellipse(700,465,clock.diameter,clock.diameter);


    //angle for hands
    let minuteAngle=map(minute(),0,60,0,360);
    let hourAngle=map(hour(),0,12,0,360);
    stroke(0);
    

    //minute hand1
    push();
    translate(clock.x,clock.y);
    strokeWeight(2);
    rotate(minuteAngle);
    line(0, 0, 0, -clock.minutesRadius);
    pop();

    //hour hand1
    push();
    translate(clock.x,clock.y);
    strokeWeight(4);
    rotate(hourAngle);
    line(0, 0, 0, -clock.hoursRadius);
    pop();


    //minute hand1
    push();
    translate(700,465);
    strokeWeight(2);
    rotate(minuteAngle);
    line(0, 0, 0, -clock.minutesRadius);
    pop();

    //hour hand1
    push();
    translate(700,465);
    strokeWeight(4);
    rotate(hourAngle);
    line(0, 0, 0, -clock.hoursRadius);
    pop();

}

function drawPendulums(){
    angleMode(RADIANS);
    pendulumX = sin(frameCount/50)*100;
    pendulumY = cos(frameCount/250)*10;
    push();
    strokeWeight(20);
    fill(0);
    stroke(0);
    line(300,400, 250 + pendulumX, 700 + pendulumY);
    line(700,400, 650 + pendulumX, 700 + pendulumY);
    ellipse(250 + pendulumX, 700 + pendulumY, 30,30);
    ellipse(650 + pendulumX, 700 + pendulumY, 30,30);
    pop();
}
