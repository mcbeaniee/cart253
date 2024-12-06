# PSEUDOCODE FOR VARIATION JAM

//FISH minigame, base for variations

let assets()
let scarcity (determines how many fish will be in the water, increases with overfishing, resets when fish are sold)

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

//fish object, to be pushed into an array
class fish{
    constructor blah blah (contains size, start and speed values)
    x = moves across screen from initated position
    y = random from surface to floor of screen 
    size = random 
    value = ranges depending on different size caps (ex: 1-5 = $10 6-10 = $15 etc)
    speed = random but pretty slow
    start = randomizes right moving or left moving
    radius = invisible rectangle around fish that is its detection radius, = size * by random number
}

//fishies array. yes, i know the plural of fish is fish
let fishies[]

//setup
setup()
    create canvas, reset/initialize variables
    timetofish()

//draws assets and objects, as well as pushes array
draw()
    shop is a non-essential. 
    gamestate shop
        shop assets 
        buyUpgrades()
    gamestate cash
        moves back to fishin when "next day" is pressed"
        cash assets
        cashFish()
    gamestate fishin
        img(assets) //backgrounds, player location, and sea floor. as well as moving water sprite.
        moveFish()
        resetFish()
        pushFish()
        drawFish()
        drawRod()
        catchFish()


//functionally identical to //moveFly()
moveFish() 
    add fish speed to fish x
    if (fish x is past the its opposite side of the canvas)
        move the fish back to the left
        give the fly a random y position

pushFish()
    pushes new fish to array, up to a limit of the current scarcity level
    for (scarcity range) {
        fishies.push(randomize size, speed and start location)
    }

resetFish()
    resets fish location after being reeled and spawns a new one, so long as there is enough time and scarcity space

drawFish()
    draws fish, randomized textures.
    if (random number) = 1
    img(asset,size)
    else if = 2
    img(asset,size)

drawRod()
    code for moving and controlling rod.hook and rod.line parameters
    moves hook and end of line X based on arrow keys. left/right
    moves hook and end of line Y down when button F is pressed (at  a constant rate) press F again to reeling down. plays unspool sound loop
    moves hook and end of line Y up at a rate determined by current reel in speed, when button R is held: when no fish is on th line and MASHED: when rod.hook.hooked = true. (reel) plays reeling in sound loop

    slowly moves rod down when fish is on the line (rod.hook.hooked = true) at a rate proportional to fish.size and fish.speed. 
    when fish is hooked, also change rod.shaft.fishHooked to secondary postion and make it shake a little bit.

catchFish()
    checks if hook overlaps fish.radius, and make random checks until fish bites.
    when fish bites: rod.hook.hooked = true
    if fish reaches x pixels above level fish was hooked, fish will be caught. if fish reaches location x pixels lower than level fish was hooked, rod breaks and fully reels up. fish is lost.

timeToCash()
    plays day/night cycle and switches state to fish cashin when time runs out. 

cashFish()
    if E key pressed to sell all fish, sells fish at current market rate.

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




