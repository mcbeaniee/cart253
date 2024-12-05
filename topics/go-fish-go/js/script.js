/**
 * Fish Go - Variation Jam
 * Jack McDonald
 * 
 * 3 games about fish! loosely...
 */

"use strict";

//FISH minigame, base for variations
let main;
let fishOne;
let fishOne2;
let fishTwo;
let fishTwo2;
let fishThree;
let fishThree2;
let hookd;
let hooker;
let VCR;
let money;

function preload(){
    main = loadImage("assets/images/mainscene.gif")
    fishOne = loadImage("assets/images/1fish.gif")
    fishTwo = loadImage("assets/images/2fish.gif")
    fishThree = loadImage("assets/images/3fish.gif")
    fishOne2 = loadImage("assets/images/1fish2.gif")
    fishTwo2 = loadImage("assets/images/2fish2.gif")
    fishThree2 = loadImage("assets/images/3fish2.gif")
    hookd = loadImage("assets/images/hookstatic.png")
    hooker = loadImage("assets/images/fishhooked.gif")
    VCR = loadFont('assets/VCR_OSD_MONO_1.001.ttf')
    money = loadSound('assets/sounds/money.mp3')
}

let gameState = "gameStart";


//fish object
const fish = { 
    body: {
        x: 320,
        y: 240,
        size: 80
    },
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
    moveFrog();

    drawFrog();
    checkTongueFlyOverlap();
    checkFrogCollision();
    movePoisonFly();
    drawPoisonFly();
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
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
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
