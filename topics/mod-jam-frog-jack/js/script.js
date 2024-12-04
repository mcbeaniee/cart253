/**
 * Frogspawn
 * Jack McDonald
 * 
 * A game about avoiding your squabbling frog/fly children.
 * 
 * Instructions:
 *  - WASD to move
 *  - click to shoot tongue towards mouse location
 *  - survive as long as possible
 *  - get bonus for not eating your children!
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

//defines gamestate variable
let gameState = "gameStart";
//score and highscore
let score = 0;
let highScore = 0;
//lowkey doesnt do anything anymore
let timer;
let gameHasStarted = false;
//checks if frog has eaten his children
let hasEaten = false;
//captures frame for the game over screen
let endFrame;

//text variables for game over screen
let gameOverCongrats = "Congratulations! you did not abandon your kids!";
let gameOverCustody = "Unfortunately, you lost custody. presss Z to restart";
let gameOverScore = "YOUR SCORE: ";
let gameOverBonus = " x2 BONUS for not eating your children!";

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

//let pushCounter = 0; a long forgotten variable

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

// Our  evil poison fly
// Has a position, size, and speed of horizontal movement
const poisonFly = {
    x: 0,
    y: 200, // Will be random
    size: 40,
    speed: .7
};

// all important fly array 
// "do not touch the gnome he is holding together the fabric of reality" looking ass array
let flies = [] 

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
    pushFly();
    // Give the fly its first random position
    flies.forEach(fly => {
        resetFly(fly);
    });
    //resetFly but for the poison guy
    resetPoisonFly();
}

//draws the game based on the gamestate, playing or gameover
function draw() {
    switch (gameState){
    //start screen, plays only the first time you open the website.
    case "gameStart":
        background("#87ceeb");
        push();
        fill("#00ff00");
        noStroke();
        //illusory frog.
        ellipse(frog.body.x, frog.body.y, frog.body.size);
        pop();
        gameStart();
        break;
    //gamestate while actually playing
    case "gamePlaying":
        gameplay();
        break;
    //you have died, this gamestate deals with it
    case "gameOver":
        image(endFrame,0,0);
        text(gameOverCongrats,190,160);
        text(gameOverCustody,190,210);
        text(gameOverScore + score + gameOverBonus,255,260);
    break;
    }
}

//nested function for all gameplay-related functions called in the gamePlaying gameState
function gameplay(){
    clearTimeout(timer);
    gameHasStarted=true;
    background("#87ceeb");
    scorePoints();
    push();
    text("Score: " + score, 30,30);
    text("High score: " + highScore, 30,60);
    pop();
    moveFly();
    //pushFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
    checkFrogCollision();
    movePoisonFly();
    drawPoisonFly();
}

//creates the start screen for the game including the frog.
function gameStart() {
    text("quick! abandon your children!",239,190);
    text("(press any key)",270,300);
    
    console.log("hello!");
    if (keyIsPressed){
        gameState="gamePlaying";
    }
    timer=setTimeout(function(){
        if (gameHasStarted=false){
        gameState = "gameOver";
        }
    }, 3000)

}


/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the rights
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

//pushes an amount of flies to the array
function pushFly(){
    for (let i = 0; i <=10; i++){
    flies.push(new fly(random(1,5),random(10, 40)));
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
 * Moves the fly according to its  slow speed
 * Resets the fly if it gets all the way to the right
 */
function movePoisonFly() {
    // Move the fly
    poisonFly.x += poisonFly.speed;
    // Handle the fly going off the canvas
    if (poisonFly.x > width) {
        resetPoisonFly();
    }
}

/**
 * Draws the fly as a fat GREEN circle
 */
function drawPoisonFly() {
    push();
    noStroke();
    fill("#06902B");
    ellipse(poisonFly.x, poisonFly.y, poisonFly.size);
    pop();
}

/**
 * Resets the poison fly to the left with a random y
 */
function resetPoisonFly() {
    poisonFly.x = 0;
    poisonFly.y = random(0, 300);
}

/**
 * Moves the frog using WASD and arrow keys
 */
function moveFrog() {
    if (keyIsDown(87,UP_ARROW)){
        frog.body.y = frog.body.y  - 5;
    } 

    if (keyIsDown(83,DOWN_ARROW)){
        frog.body.y  = frog.body.y  + 5;
    } 

    if (keyIsDown(65,LEFT_ARROW)){
        frog.body.x= frog.body.x - 5;
    } 

    if (keyIsDown(68,RIGHT_ARROW)){
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
    const d = dist(rod.hook.x, rod.hook.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < 20);
    if (eaten) {
        // Reset the fly
        resetFly(fly);
        score = score + 250
        hasEaten=true;
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
})
//poison fly kill functionality 
const poisonD = dist(frog.tongue.x, frog.tongue.y, poisonFly.x, poisonFly.y);
// Check if it's an overlap
const poisonEaten = (poisonD < frog.tongue.size/2 + poisonFly.size/2);
if (poisonEaten) {
    //kills the frog
    hasEaten = true;
    gameState = "gameOver";
    highScoreCounter();
    endFrame = get();
    gameOverCongrats = "You ate one of your stinky kids and paid the price."
    gameOverCustody = "You died because that kid was so absolutely pungent!"
}
}

//adds to the score as you survive
function scorePoints(){
    /*if (hasEaten===false){
        score += 2;
    }
    else {
    */
    score += 1;
    
}

//makeshift collision function for frog bassed on  overlap function
function checkFrogCollision() {
    flies.forEach(fly =>{
        //get distance from frog body position
        const frogD = dist(frog.body.x, frog.body.y, fly.x, fly.y);
        
        //check if touching fly
        const dead = (frogD<50 );
        if (dead) {
            //game over
            gameState = "gameOver";
            endFrame = get();
            highScoreCounter();
        }

    })
    //poison fly touch logic (same as other)
    const poisonFrogD = dist(frog.body.x, frog.body.y, poisonFly.x, poisonFly.y);
    //kills if touching poison fly
    const poisonDead = (poisonFrogD<50 );
        if (poisonDead) {
            //game over
            gameOverCongrats = "You touched one of your stinky kids and paid the price."
            gameOverCustody = "You died because that kid was so absolutely pungent!"
            gameState = "gameOver";
            highScoreCounter();
            endFrame = get();
        }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}

//shows game over screen and calculates high score
function highScoreCounter() {
    //bonus multiplier
    if (hasEaten===false){
        score = score*2
    }
    //if you scored higher than your previous highscore, set new one
    //1st is without bonus.
    if (score>highScore && gameState==="gameOver"){
        if (hasEaten===true && gameState==="gameOver"){
            highScore = score
            gameOverScore = "NEW HIGH SCORE: ";
            gameOverBonus = " ";
        }

        else {
        highScore=score
        gameOverScore = "NEW HIGH SCORE: "
        }
        
    }
    //no high score and no bonus state
    if (score<highScore && gameState==="gameOver") {
        if (hasEaten===true && gameState==="gameOver"){
            gameOverBonus = " ";
        }
    }
    
}

//resets the game and all parameters when the frog dies, when ZED is pressed
function keyPressed() {
    if (key === 'z' && gameState === "gameOver"){
        //clears frog array
        flies = [];
        score = 0;
        frog.body.x = 320;
        frog.body.y = 240;
        frog.tongue.state = "idle";
        hasEaten=false;
        gameState = "gamePlaying";
        gameOverScore = "YOUR SCORE: ";
        gameOverBonus = " x2 BONUS for not eating your children!";
        gameOverCongrats = "Congratulations! you did not abandon your kids!";
        gameOverCustody = "Unfortunately, you lost custody. presss Z to restart";
        pushFly();
        flies.forEach(fly => {
            resetFly(fly);
        });
        resetPoisonFly();
    }
}
