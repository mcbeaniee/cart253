# PSEUDOCODE FOR VARIATION JAM

//FISH minigame, base for variations

let assets()

//rod object, contains hook, line and sink- i mean shaft
const rod = {
    hook {
        x = controlled by arrow keys
        y = current reel level
        size = size of asset
        hooked = y/n
    },
    shaft   {
        x1 = player sprite x position
        x2 = hook.y, to be later constrained for realism
        y1 = player sprite y position
        y2 = constant position determined by whether or not a fish is being reeled in or not
        fishHooked = y/n, determines y position
    },
    line    {
        i dont know how to make the line curve/ swing to location rather than a straight line but i know theres a way to do it
        x1 = hook.X
        x2 = rod.x2
        y1 = hook.y
        y2 = rod.y2
    }
}

const food = {
    faker = bool, most are fake
    size = 
    x 
    y 
}

const fish = {
    x = x position, controlled by wasd or arrow keys
    y = y position, controlled by wasd or arrow keys
    health = health, drains slowly
}

setup(){
    images and stuff
}