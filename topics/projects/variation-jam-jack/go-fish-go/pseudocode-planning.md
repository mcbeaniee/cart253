# PSEUDOCODE FOR VARIATION JAM

//GO FISH GO minigame, base for variations

let assets()

preload()

let playerX;
let playerY;
let gameState;

//smaller food that is constantly present but gives back less health
class smallFood {
    x = 
    y = 
    speed = 
}

class food {
    x = 
    y = 
    size = 
    speed = 
    isbomb = checks if food is a bomb, higher chance of this happening. instantly kills you
    isfake = if food is not a bomb, it has a chance to be bait/fake and has a slightly off color and slightly smaller size, instantly kills you if touched
}

const playerFish {
    x = 0,//controlled with movement keys, constrained to screen by playerX variable
    y = 0,//controlled with movement keys, constrained to screen by playerY variable
    health = 1000//slowly drains and needs food to refill
}

const villainfish {
    hook
    x: 
    y:  
    quips: linked to json file filled with quips that the fish will say at you when trying to catch you
}

let foods[];
let smallFoods[];

setup(){
    images and stuff
    pushFood
    pushSmallFood
    
    randomize x/y of food and smallfood arrays (forEach)
}

draw(){
    gameState "playing"
    gameState "dead"
}