/**
 * Fish Go - Variation Jam
 * Jack McDonald
 * 
 * 3 games about fish! loosely...
 */

"use strict";

//GO FISH GO minigame, or variation 1

//image lets
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
let playerSprite;

//preload function
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
    playerSprite = loadImage('assets/images/playerFish.gif')
}

//variables
let gameState = 'playing';
let playerX;
let playerY;
let randomVariant;

//smaller and safer but less appetizing food
class smallFood{
    constructor (speed){
        this.x = 0; //moves across screen from initated position
        this.y = 600; //random from surface to floor of screen 
        this.speed = speed;//random but slow
    }
}

//food objects, can be a bomb, fake (bait) or real
class food{
    constructor (speed,variant){
        this.x = 0; //moves across screen from initated position
        this.y = 600; //random from surface to floor of screen 
        this.speed = speed;//random but slow
        this.variant = variant;//random 
        this.isBomb = false,//checks if food is a bomb, higher chance of this happening. deals a lot of damage depending on distance from bomb
        this.isFake = false//if food is not a bomb, it has a chance to be bait/fake and has a slightly off color and slightly smaller size, instantly kills you if touched
    }
}

//our player
const playerFish = {
    x: 700, //controlled with movement keys, constrained to screen by playerX variable
    y: 600, //controlled with movement keys, constrained to screen by playerY variable
    health: 500, //slowly drains and needs food to refill
    dashDistance: 250 //dash distance, slowly charges up to full and charges faster when health is low. allows a dash proportional to that distance towwards the mouse pointer
}

const villainFish = {
    hook: {
        x: 500, //follows player position
        y: 300, //bobs up and down and snaps to player position when bait is eaten
        baitEaten: false
    },
    //bro dont call it that :( (i'm still calling it that)
    shaft:   {
        x1: 700, //villainfish asset location 
        x2: 500, //hook location 
        y1: 170,//villainfish asset location
        y2: 100,//above hook, goes down when bait is eaten
    },
    fish: {
        quips: undefined //linked to json file with quips that he says randomly
    }
}

let foods = []
let smallFoods = []

//sets up scene and resets arrays
//also randomizes obstacle positions
function setup() {
    createCanvas(1024,1024);
    gameState='playing';
    playerFish.health=500;
    pushFoods();
    foods.forEach(food =>{
        food.y = random(340, 900);
        food.x = random(0, 900);
    })
    smallFoods.forEach(smallFood =>{
        smallFood.y = random(340, 900);
        smallFood.x = random(0, 900);
    })
}

function mousePressed(){
    if (gameState==='playing'){
        playerFish.x = constrain(mouseX,0,playerFish.dashDistance);
    }
}

function draw(){
    textFont(VCR);
    switch(gameState){
        case 'playing':
            gameplay();
            break;
        case 'gameOver':
            break;
        case 'gameOver2':
            break;
    }
}

function gameplay(){
    image(main,0,0);
    playerCollision();
    resetFood(food);
    resetSmallFood(smallFood);
    drawFoods();
    moveFoods();
    drawPlayer();
    playerFunctions();
    //drawRod();
}

function pushFoods(){
    for (let i = 0; i <=5; i++) {
        foods.push(new food(random(1,2.5),random(10,30)));
    }
    for (let i = 0; i <=7; i++) {
        smallFoods.push(new smallFood(random(1,2.5)));
    }
    
}

function resetFood(food){
    food.x = -50;
    food.y = random(370, 800);
}

function resetSmallFood(smallFood){
    smallFood.x = -50;
    smallFood.y = random(370, 800);
}

function drawFoods(){
    foods.forEach(food => {
        push();
        noStroke();
        if (food.variant>15&&food.variant<25){
            noStroke();
            fill("#a1a103");
            ellipse(food.x,food.y,28);
        }   else if (food.variant>25){
            noStroke();
            fill('yellow');
            ellipse(food.x,food.y,30);
        }   else {
            noStroke();
            fill('black');
            ellipse(food.x,food.y,70);
        }
        pop();
    })
    smallFoods.forEach(smallFood => {
        push();
        noStroke();
        fill('yellow');
        ellipse(smallFood.x,smallFood.y,10);
        pop();
    })
}

//add fish speed to fish x. functionally identical to moveFly()
function moveFoods() {
    console.log(randomVariant);
    foods.forEach(food => {
        food.x += food.speed;
        // Handle the food going off the canvas
        if (food.x > width+50) {
            resetFood(food);
            
        }
    })
    smallFoods.forEach(smallFood => {
        smallFood.x += smallFood.speed;
        // Handle the small going off the canvas
        if (smallFood.x > width+50) {
            resetFood(smallFood);
        }
    })
}

//player collision
function playerCollision(){
    playerX = constrain(playerFish.x,0,940);
    if (playerFish.x>=940){
        playerFish.x=940;
    } else if (playerFish.x<=0){
        playerFish.x=0;
    }
    playerY = constrain(playerFish.y,350,924);
    if (playerFish.y<=350){
        playerFish.y=350;
    } else if (playerFish.y>=924){
        playerFish.y=924;
    }
}

//behaviors of player based on game state
function playerFunctions(){
    switch(gameState){
        case 'playing':
            //wasd or arrow controls
            if (keyIsDown(87||UP_ARROW)){
                playerFish.y -= 5;
            } 
        
            if (keyIsDown(83||DOWN_ARROW)){
                playerFish.y  += 5;
            } 
        
            if (keyIsDown(65||LEFT_ARROW)){
                playerFish.x -= 5;
            } 
        
            if (keyIsDown(68||RIGHT_ARROW)){
                playerFish.x += 5;
            } 
            //health bar functions
            let playerHealthBar;
            playerHealthBar = constrain(playerFish.health,-1,500)
            if (playerFish.health>500){
                playerFish.health = 500;
            }
            playerFish.health -=1;
            fill('#00ff00');
            rect(252,900,playerFish.health,50);
            if (playerFish.health<0){
                gameState = 'gameOver';
            }

            //interaction with food, bombs and bait
            foods.forEach(food => {
                // Get distance from tongue to food
                const d = dist(playerFish.x, playerFish.y, food.x, food.y);
                // Check if it's an overlap
                const eaten = (d < 40);
                if (eaten) {
                    if (food.variant>15&&food.variant<25){
                        gameState = 'gameOver2';
                    }   else if (food.variant>25){
                        playerFish.health = playerFish.health + 200
                        resetFood(food);
                    }   else {
                        playerFish.health = playerFish.health - 300
                        resetFood(food);
                    }
                }
            })
            smallFoods.forEach(smallFood => {
                // Get distance from tongue to food
                const d2 = dist(playerFish.x, playerFish.y, smallFood.x, smallFood.y);
                // Check if it's an overlap
                const eaten = (d2 < 40);
                if (eaten) {
                        playerFish.health = playerFish.health + 25
                        resetSmallFood(smallFood);
                }
            })
            break;
        case 'gameOver':
            break;
    }
}



/*
function drawRod(){
    push();
    stroke('#000000')
    strokeWeight(1);
    strokeWeight(10);
    stroke('#964B00');
    line(villainFish.shaft.x1,villainFish.shaft.y1,villainFish.shaft.x2,villainFish.shaft.y2);
    strokeWeight(5);
    stroke("#000000");
    line(villainFish.shaft.x2,villainFish.shaft.y2,hookX,hookY);
    fill("#ff0000");
    stroke('#ffffff');
    strokeWeight(1);
    image(hookd,hookX-63,hookY);
    pop();
}
*/

//draws player and player healthbar
function drawPlayer(){
    push();
    image(playerSprite,playerX-80,playerY-130);
    fill('red');
    //real x/y collission bubble
    //ellipse(playerX,playerY,40);
    rect(252,900,500,50);
    pop();
}

//functions of the devilish villain fish
function villainFishFunctions(){
    switch(gameState){
        case 'playing':
            break;
        case 'gameOver':
            break;
    }
}