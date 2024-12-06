/**
 * Fish Go - Variation Jam
 * Jack McDonald
 * 
 * 3 games about fish! loosely...
 */

"use strict";

//GO FISH GO minigame, or variation 1

//image lets
let playerSprite;
let main;
let hookd;
let hooker;
let VCR;
let foody;
let fakeFoody;
let smallFoody;
let bomb;

//preload function
function preload(){
    main = loadImage("assets/images/mainscene.gif")
    hookd = loadImage("assets/images/hookstatic.png")
    VCR = loadFont('assets/VCR_OSD_MONO_1.001.ttf')
    playerSprite = loadImage('assets/images/playerFish.gif')
    foody = loadImage('assets/images/realfood.gif')
    fakeFoody = loadImage('assets/images/fakefood.gif')
    smallFoody = loadImage('assets/images/smallfood.gif')
    bomb = loadImage('assets/images/bomb.gif')
}

//variables
let gameState = 'playing';
let playerX;
let playerY;
let randomVariant;
let rodUnspooling = true;
let endFrame;

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
}

//evil fish taht kills you
const villainFish = {
    hook: {
        x: 500, //follows player position
        y: 300, //bobs up and down and snaps to player position when bait is eaten
        baitEaten: false
    },
    //bro dont call it that :( (i'm still calling it that)
    shaft:   {
        x1: 750, //villainfish asset location 
        x2: 500, //hook location 
        y1: 170,//villainfish asset location
        y2: 100,//above hook, goes down when bait is eaten
    }
}

//food arrays
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

//handles space to restart game
function keyPressed(){
    if (gameState==='gameOver'||gameState==='gameOver2'){
        if(keyCode===32){
            foods = []
            smallFoods = []
            pushFoods();
            gameState='playing';
            resetFood(food);
            resetSmallFood(smallFood);
            playerFish.x = 700;
            playerFish.y = 600;
            
            foods.forEach(food =>{
                food.y = random(340, 900);
                food.x = random(0, 900);
            })
            smallFoods.forEach(smallFood =>{
                smallFood.y = random(340, 900);
                smallFood.x = random(0, 900);
            })
            playerFish.health=500;
            villainFish.hook.y=300;
            
        }
    }
}

//draws canvas/game based on current game state
function draw(){
    textFont(VCR);
    switch(gameState){
        case 'playing':
            gameplay();
            break;
        case 'gameOver':
            image(endFrame,0,0);
            drawPlayer();
            drawRod();
            fill('yellow');
            textSize(100);
            text('GAME OVER',250,500);
            textSize(40);
            text('You starved to death!',265,600);
            textSize(70);
            text('SPACE to restart',210,700);
            break;
        case 'gameOver2':
            image(endFrame,0,0);
            villainFishFunctions();
            drawPlayer();
            drawRod();
            fill('yellow');
            textSize(100);
            text('GAME OVER',250,500);
            textSize(40);
            text('You got caught!',335,600);
            textSize(70);
            text('SPACE to restart',210,700);
            break;
    }
}

//core gameplay functions
function gameplay(){
    image(main,0,0);
    playerCollision();
    resetFood(food);
    resetSmallFood(smallFood);
    drawFoods();
    moveFoods();
    drawPlayer();
    playerFunctions();
    drawRod();
}

//push new foods into the array at game start
function pushFoods(){
    for (let i = 0; i <=5; i++) {
        foods.push(new food(random(1,2.5),random(10,30)));
    }
    for (let i = 0; i <=7; i++) {
        smallFoods.push(new smallFood(random(1,2.5)));
    }
    
}

//reset food when it gets to the end of the canvas
function resetFood(food){
    food.x = -50;
    food.y = random(370, 800);
}

function resetSmallFood(smallFood){
    smallFood.x = -50;
    smallFood.y = random(370, 800);
}

//draws foods based on their randomized variations
function drawFoods(){
    foods.forEach(food => {
        push();
        noStroke();
        if (food.variant>15&&food.variant<25){
            //ellipse(food.x,food.y,28);
            image(fakeFoody,food.x-50,food.y-65);
        }   else if (food.variant>25){
            image(foody,food.x-50,food.y-65);
            //ellipse(food.x,food.y,30);
        }   else {
            //ellipse(food.x,food.y,70);
            image(bomb,food.x-65,food.y-75);
        }
        pop();
    })
    smallFoods.forEach(smallFood => {
        push();
        //ellipse(smallFood.x,smallFood.y,10);
        image(smallFoody,smallFood.x-50,smallFood.y-65);
        pop();
    })
}

//add food speed to food x. functionally identical to moveFly()
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
                endFrame = get();
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
                        endFrame = get();
                        gameState = 'gameOver2';
                        rodUnspooling===true;
                    }   else if (food.variant>25){
                        playerFish.health = playerFish.health + 200
                        resetFood(food);
                    }   else {
                        playerFish.health = playerFish.health - 300
                        resetFood(food);
                    }
                }
            })
            //gives small amount of health for small food, safer but lower
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

//draws the evil fish's rod
function drawRod(){
    push();
    stroke('#000000')
    strokeWeight(1);
    strokeWeight(10);
    stroke('#964B00');
    line(villainFish.shaft.x1,villainFish.shaft.y1,villainFish.shaft.x2,villainFish.shaft.y2);
    strokeWeight(1);
    stroke("#ffffff");
    line(villainFish.shaft.x2,villainFish.shaft.y2,playerX,villainFish.hook.y);
    fill("#ff0000");
    stroke('#ffffff');
    strokeWeight(1);
    image(hookd,playerX-63,villainFish.hook.y);
    pop();
}


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
                villainFish.hook.y = 300;
            break;
        case 'gameOver2':
            if (villainFish.hook.y<playerFish.y){
                villainFish.hook.y +=5;
            } 
            break;
    }
}