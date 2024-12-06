/**
 * Fish Go - Variation Jam
 * Jack McDonald
 * 
 * 3 games about fish! loosely...
 */

"use strict";

//FISH minigame, base for variations

//asset/image lets and preload function
let main;
let hookd;
let VCR;

function preload(){
    main = loadImage("assets/images/mainscene.gif")
    hookd = loadImage("assets/images/hookstatic.gif")
    VCR = loadFont('assets/VCR_OSD_MONO_1.001.ttf')
}

//variables
let hookX;
let hookY;
let munnee = 0;
let suckSize;

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
//draws assets and objects, as well as pushes array
function draw() {
    textFont(VCR);
            fishCaught=false;
            background('#87CEEB');
            hookCollision();
            push();
            image(main,0,0);
            fill('#000000');
            stroke(random(0,255),random(0,255),random(0,255));
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
}

//collision of hook with walls of canvas
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
    strokeWeight(20);
    stroke("#000000");
    line(rod.shaft.x1,rod.shaft.y1,hookX,hookY);
    strokeWeight(1);
    image(hookd,hookX-63,hookY);
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

//sucks up oil and increases suckiness based on score
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

