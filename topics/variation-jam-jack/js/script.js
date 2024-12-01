/**
 * Fish Go - Variation Jam
 * Jack McDonald
 * 
 * 3 games about fish! loosely...
 */

"use strict";

//FISH minigame, base for variations

function preload(){
//img()
}
let scarcity = 3; //(determines how many fish will be in the water, increases with overfishing, resets when fish are sold)
let gameState = 'fishin';
let rodUnspooling = false;
let hookX;
let hookY;

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
    x1: 650,//player sprite x position
    x2: 500, //hook.y, to be later constrained for realism
    y1: 150,//player sprite y position
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
    constructor (speed,size){
        this.x = 0; //moves across screen from initated position
        this.y = 600; //random from surface to floor of screen 
        this.speed = speed;//random but slow
        this.size = size;//random 
        this.value = 0,//ranges depending on different size caps (ex: 1-5 = $10 6-10 = $15 etc)
        this.radius = 0//invisible rectangle around fish that is its detection radius, = size * by random number
    }
}

class fish2 {
    constructor (speed,size){
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
        fish.y = random(340, 1000);
        fish.x = random(0, 1000)
    })
    fishies2.forEach(fish2 =>{
        fish2.y = random(340, 1000);
        fish2.x = random(0, 1000)
    })
    //timetofish();
}

function keyPressed(){
    if (keyCode===70){
        rodUnspooling=!rodUnspooling;
        console.log(rodUnspooling)
    }
}

//draws assets and objects, as well as pushes array
function draw() {
    switch(gameState){
        /*shop is a non-essential. can work but need to establish basics first
        case 'shop':
            shop assets 
            buyUpgrades()
            break;
            */
        case 'cash':
            //moves back to fishin when "next day" is pressed"
            //cash assets
            cashFish();
            break;
        case 'fishin':
            background('#87CEEB');
            hookCollision();
            push();
            fill('#007BA7');
            rect(0,300,1000,1000);
            //img(assets) //backgrounds, player location, and sea floor. as well as moving water sprite.
            resetFish(fish);
            resetFish2(fish2);
            drawFish();
            moveFish();
            drawRod();
            
            //catchFish();
            break;
    }
}

function hookCollision(){
    hookX = constrain(rod.hook.x,350,600);
    if (rod.hook.x>=600){
        rod.hook.x=600;
    } else if (rod.hook.x<=350){
        rod.hook.x=350;
    }
    hookY = constrain(rod.hook.y,300,900);
    if (rod.hook.y<=300){
        rod.hook.y=300;
    } else if (rod.hook.y>=900){
        rodUnspooling=false;
        rod.hook.y=900;
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
    for (let i = 0; i <=scarcity; i++) {
        fishies.push(new fish(random(1,2.5),random(15,30)));
    }
    for (let i = 0; i <=scarcity; i++) {
        fishies2.push(new fish2(random(1,2.5),random(15,30)));
    }
}

//resets fish location after being reeled and spawns a new one, so long as there is enough time and scarcity space
function resetFish(fish) {
    fish.x = 0;
    fish.y = random(340, 1000);
}

//resets fish2 location after being reeled and spawns a new one, so long as there is enough time and scarcity space
function resetFish2(fish2) {
    fish2.x = 1000;
    fish2.y = random(340, 1000);
}

//draws fish, randomized textures.
function drawFish() {
    fishies.forEach(fish => {
        push();
        noStroke();
        fill("#000000");
        ellipse(fish.x, fish.y, fish.size);
        pop();
    })
    fishies2.forEach(fish2 => {
        push();
        noStroke();
        fill("#000000");
        ellipse(fish2.x, fish2.y, fish2.size);
        pop();
    })
    /* for when i add assets, circles for now
    foreach pushFish(fish)
    if (random number) = 1
        img(asset,size)
    else if = 2
        img(asset,size)
    else if = 3 etc etc
    */
}

/*
code for drawing, moving, and controlling rod.hook and rod.line parameters
*/
function drawRod() {
    push();
    stroke('#000000')
    strokeWeight(1);
    fill("#ffffff");
    ellipse(hookX,hookY,rod.hook.size);
    strokeWeight(10);
    stroke('#964B00');
    line(rod.shaft.x1,rod.shaft.y1,rod.shaft.x2,rod.shaft.y2);
    strokeWeight(5);
    stroke("000000");
    line(rod.shaft.x2,rod.shaft.y2,hookX,hookY);
    pop();
    if (rodUnspooling===true){
        rod.hook.y += 10;
    } else 
        rod.hook.y = hookY;
    
    if (keyIsDown(RIGHT_ARROW)) {
        rod.hook.x +=3;
    }
    if (keyIsDown(LEFT_ARROW)) {
        rod.hook.x -=3;
    }
    if (keyIsDown(82)){
        rod.hook.y = rod.hook.y -3;
    }
}
    /*
    moves hook and end of line X based on arrow keys. left/right
    moves hook and end of line Y down when button F is pressed (at  a constant rate) press F again to reeling down. plays unspool sound loop
    moves hook and end of line Y up at a rate determined by current reel in speed, when button R is held: when no fish is on th line and MASHED: when rod.hook.hooked = true. (reel) plays reeling in sound loop
    
    slowly moves rod down when fish is on the line (rod.hook.hooked = true) at a rate proportional to fish.size and fish.speed. 
    when fish is hooked, also change rod.shaft.fishHooked to secondary postion and make it shake a little bit.
    */


/* 
//checks if hook overlaps fish.radius, and make random checks until fish bites.
function catchFish() { 
    when fish bites: rod.hook.hooked = true
    if fish reaches x pixels above level fish was hooked, 
        fish will be caught. 
    else fish reaches location x pixels lower than level fish was hooked, 
        rod breaks and fully reels up. fish is lost.
}   

//plays day/night cycle and switches state to fish cashin when time runs out. 
function timeToCash() { 

}

//sells fish and moves on to next day, resetting gameState
cashFish() {
    if E key pressed to sell all fish, 
        sells fish at current market rate.
}
*/

/** for stats and upgrades function, work on after initial project is working and assets are solidified.
buyUpgrades()
shows upgrades 1 2 and 3, randomized from upgrades.json
can be basic to premium in rarity and include reel strength, reel speed and 
/fisherman stats
let stats = {
all values start at 1, as they are multipliers 
speed = speed at which reel in and unspool happens
strength = strength of mash when fish is hooked. like webfishing
value = multiplier or flat increase? to fish value
bait = makes fish more likely to bite the higher the stat is
}
*/




