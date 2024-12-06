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
let scarcity = 3; //(determines how many fish will be in the water, increases with overfishing, resets when fish are sold)
let gameState = 'fishin';
let rodUnspooling = false;
let hookMoving = 0;
let hookX;
let hookY;
let munnee = 0;
let suckSize;

let fishCaught = false;

let endFrame;

//rod object, contains hook, line and sink- i mean shaft
const rod = {
hook: {
    x: 500, //controlled by arrow keys
    y: 300, //current reel level
    size: 20,//size of asset
    hooked: false
},
//bro dont call it that :(
shaft:   {
    x1: 700,//player sprite x position
    x2: 500, //hook.y, to be later constrained for realism
    y1: 170,//player sprite y position
    y2: 100,//constant position determined by whether or not a fish is being reeled in or not
    fishHooked: false //determines y position
},
line:    {
    //i dont know how to make the line curve/ swing to location rather than a straight line but i know theres a way to do it
    x1: 500,
    x2: 500,
    y1: 300,
    y2: 100
}
}

//fish object, to be pushed into an array
class fish{
    constructor (speed,size,value){
        this.x = 0; //moves across screen from initated position
        this.y = 600; //random from surface to floor of screen 
        this.speed = speed;//random but slow
        this.size = size;//random 
        this.value = 0,//ranges depending on different size caps (ex: 1-5 = $10 6-10 = $15 etc)
        this.radius = 0//invisible rectangle around fish that is its detection radius, = size * by random number
    }
}

class fish2 {
    constructor (speed,size,value){
        this.x = 1000; //moves across screen from initated position
        this.y = 600; //random from surface to floor of screen 
        this.speed = speed;//random but slow
        this.size = size;//random 
        this.value = 0,//ranges depending on different size caps (ex: 1-5 = $10 6-10 = $15 etc)
        this.radius = 0//invisible rectangle around fish that is its detection radius, = size * by random number
    }
}

//fishies array. yes, i know the plural of fish is fish
let fishies = []
let fishies2 = []

//setup, create canvas, reset/initialize variables
function setup() {
    createCanvas(1000,1000);
    rodUnspooling=false;
    pushFish();
    fishies.forEach(fish =>{
        fish.y = random(340, 970);
        fish.x = random(0, 900)
    })
    fishies2.forEach(fish2 =>{
        fish2.y = random(340, 970);
        fish2.x = random(0, 900)
    })
}
function mousePressed(){
    if (gameState==='reelin'){
        rod.hook.y = rod.hook.y -100
    }
}

//draws assets and objects, as well as pushes array
function draw() {
    textFont(VCR);
    switch(gameState){
        /*shop is a non-essential. can work but need to establish basics first
        case 'shop':
            shop assets 
            buyUpgrades()
            break;
            */
        case 'fishin':
            fishCaught=false;
            background('#87CEEB');
            hookCollision();
            push();
            image(main,0,0);
            fill('#ffff00');
            textSize(30);
            text('Score ' + round(munnee,2),820,100);
            rod.shaft.y2=100;
            //img(assets) //backgrounds, player location, and sea floor. as well as moving water sprite.
            resetFish(fish);
            resetFish2(fish2);
            drawFish();
            moveFish();
            drawRod();
            rodFunctions();
            suckOil();
            break;
    }
}

function hookCollision(){
    hookX = constrain(rod.hook.x,0,1000);
    if (rod.hook.x>=1000){
        rod.hook.x=1000;
    } else if (rod.hook.x<=0){
        rod.hook.x=0;
    }
    hookY = constrain(rod.hook.y,300,1000);
    if (rod.hook.y<=300){
        rod.hook.y=300;
    } else if (rod.hook.y>=1000){
        rodUnspooling=false;
        rod.hook.y=1000;
    }
}

//add fish speed to fish x. functionally identical to moveFly()
function moveFish() {
    fishies.forEach(fish => {
            fish.x += fish.speed;
        // Handle the fish going off the canvas
        if (fish.x > width) {
            resetFish(fish);
        }
    })
    fishies2.forEach(fish2 => {
        fish2.x -= fish2.speed;
    // Handle the fish2 going off the canvas
    if (fish2.x < 0) {
        resetFish2(fish2);
    }
})
}


//pushes new fish to array, up to a limit of the current scarcity level. randomizes speed, size and side.
function pushFish() {
    for (let i = 0; i <=700; i++) {
        fishies.push(new fish(random(1,2.5),random(15,50),10));
    }
    for (let i = 0; i <=700; i++) {
        fishies2.push(new fish2(random(1,2.5),random(15,50),10+fish2.size*.5));
    }
}

//resets fish location after being reeled and spawns a new one, so long as there is enough time and scarcity space
function resetFish(fish) {
    fish.x = 0;
    fish.y = random(370, 970);
}

//resets fish2 location after being reeled and spawns a new one, so long as there is enough time and scarcity space
function resetFish2(fish2) {
    fish2.x = 1000;
    fish2.y = random(340,970);
}

//draws fish, randomized textures.
function drawFish() {
    fishies.forEach(fish => {
        push();
        strokeWeight(1);
        stroke(random(0,255),random(0,255),random(0,255));
        fill('black');
        ellipse(fish.x,fish.y,fish.size);
        pop();
    })
    fishies2.forEach(fish2 => {
        push();
        strokeWeight(1);
        stroke(random(0,255),random(0,255),random(0,255));
        fill('black');
        ellipse(fish2.x,fish2.y,fish2.size);
        pop();
    })
}

/*
code for drawing, moving, and controlling rod.hook and rod.line parameters
*/
function drawRod(){
    push();
    stroke('#000000')
    strokeWeight(1);
    strokeWeight(10);
    stroke('#964B00');
    line(rod.shaft.x1,rod.shaft.y1,rod.shaft.x2,rod.shaft.y2);
    strokeWeight(8);
    stroke("#000000");
    line(rod.shaft.x2,rod.shaft.y2,hookX,hookY);
    fill("#ff0000");
    stroke('#ffffff');
    strokeWeight(1);
    image(hookd,hookX-63,hookY);
    pop();
}

function drawRodReel(){
    push();
    stroke('#000000')
    strokeWeight(1);
    strokeWeight(10);
    stroke('#964B00');
    line(rod.shaft.x1,rod.shaft.y1,rod.shaft.x2,rod.shaft.y2);
    strokeWeight(5);
    stroke("#000000");
    line(rod.shaft.x2,rod.shaft.y2,hookX,hookY);
    fill("#ff0000");
    stroke('#ffffff');
    strokeWeight(1);
    image(hooker,hookX-63,hookY);
    pop();
}
function rodFunctions() {
    if (keyIsDown(87||UP_ARROW)){
        rod.hook.y -= 5;
    } 

    if (keyIsDown(83||DOWN_ARROW)){
        rod.hook.y  += 5;
    } 

    if (keyIsDown(65||LEFT_ARROW)){
        rod.hook.x -= 5;
    } 

    if (keyIsDown(68||RIGHT_ARROW)){
        rod.hook.x += 5;
    } 
}

function suckOil(){
    suckSize = 40+constrain((munnee/500),0,300);
    fishies.forEach(fish => {
        // Get distance from hook to fish
        const d = dist(rod.hook.x, rod.hook.y, fish.x, fish.y);
        // Check if it's an overlap
        const sucked = (d < suckSize);
        if (sucked) {
            // Reset the fish
            munnee += 5;
            resetFish(fish);
        }
    })
    fishies2.forEach(fish2 => {
        // Get distance from hook to fish
        const d2 = dist(rod.hook.x, rod.hook.y, fish2.x, fish2.y);
        // Check if it's an overlap
        const sucked = (d2 < suckSize);
        if (sucked) {
            // Reset the fish
            munnee += 5;
            resetFish2(fish2);
        }
    })
}
    /*
    moves hook and end of line X based on arrow keys. left/right
    moves hook and end of line Y down when button F is pressed (at  a constant rate) press F again to reeling down. plays unspool sound loop
    moves hook and end of line Y up at a rate determined by current reel in speed, when button R is held: when no fish is on th line and MASHED: when rod.hook.hooked = true. (reel) plays reeling in sound loop
    
    slowly moves rod down when fish is on the line (rod.hook.hooked = true) at a rate proportional to fish.size and fish.speed. 
    when fish is hooked, also change rod.shaft.fishHooked to secondary postion and make it shake a little bit.
    */





