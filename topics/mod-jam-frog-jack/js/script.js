/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

//defines gamestate variable and asset images
let gameState;
let score = 0;

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 240,
        size: 80
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: undefined,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

//gamestate constant
const gamePlaying = 1;
const gameOver = 2;


let pushCounter = 0;

// Our fly
// Has a position, size, and speed of horizontal movement
class fly{
    constructor(speed,size){
        this.x = 0;
        this.y = 600;
        this.speed = speed;
        this.size = size;
    }
}

let flies = [] 

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    gameState = gamePlaying;
    createCanvas(640, 480);
    pushFly();
    // Give the fly its first random position
    resetFly(fly);
}

function draw() {
    
    switch (gameState){
    case gamePlaying:
        background("#87ceeb");
    scorePoints();
    push();
    text("Score:" + score, 100,100);
    pop();
    moveFly();
    pushFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
    checkFrogCollision();
    
    break;
    case gameOver:
    push();
    text("you lost custody",320,240);
    text("presss space to restart",320,340);
    pop();
    break;
    }
}


/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    flies.forEach(fly => {
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly(fly);
    }
})
}

function pushFly(){
    if (pushCounter <= 10){
    flies.push(new fly(random(1,5),random(10, 40)));
    pushCounter += 1;
    }

}
/**
 * Draws the fly as a black circle
 */
function drawFly() {
    flies.forEach(fly => {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
    })
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly(fly) {
    fly.x = 0;
    fly.y = random(0, 480);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    if (keyIsDown(UP_ARROW)){
        frog.body.y = frog.body.y  - 5;
    } 

    if (keyIsDown(DOWN_ARROW)){
        frog.body.y  = frog.body.y  + 5;
    } 

    if (keyIsDown(LEFT_ARROW)){
        frog.body.x= frog.body.x - 5;
    } 

    if (keyIsDown(RIGHT_ARROW)){
        frog.body.x= frog.body.x + 5;
    } 
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = mouseX;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        frog.tongue.x = frog.body.x;
        frog.tongue.y = frog.body.y;
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y = mouseY;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inboud";
        }
    }
    
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.state = "idle";
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
       
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    flies.forEach(fly => {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < 20);
    if (eaten) {
        // Reset the fly
        resetFly(fly);
        score = score + 250
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
})
}

function scorePoints(){
    score += 1;
}

//makeshift collision function for frog bassed on  overlap function
function checkFrogCollision() {
    flies.forEach(fly =>{
        //get distance from frog body position
        const frogD = dist(frog.body.x, frog.body.y, fly.x, fly.y);
        //check if touching fly
        const dead = (frogD<50);
        if (dead) {
            //game over
            gameState = gameOver;
        }

    })
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}