# Planning

## Starting point

The initial idea:

> Frog eating flies

## Experience design

The experience:

> The user controls a frog at the bottom of the screen, they can shoot out the frog's tongue and catch a fly which is moving on the screen. If the tongue hits the fly it gets eaten.

## Breaking it down

Basic things to do:

- Draw the frog (image? a circle?)
- Draw the tongue...
- Move the frog (how? mouse? keyboard? breathing?)
- Move the fly (in line? buzzing around? random?)
- Figure out if the tongue hits the fly?

Questions:

- What does the frog look like?
    - Circles!
- How does the user control the frog?
    - User controls frog with the mouse position, just to the left and right
    - User launches the tongue with a mouse click
- How does the fly move?
    - The fly starts on the left at a random y position, and moves to the right in a line
- What does the tongue look like?
    - A red line coming out of the frog...
- What happens if the user doesn't catch the fly?
    - If the fly goes off the right side, it just resets to a new random y on the left
- What does it all look like on the screen? Layout?
    - Frog at the bottom, fly moving across, tongue shooting out of frog

## The program starts to form....

What is there?

- The frog
    - Position and size
    - Position and size of tongue
    - What is the tongue doing?
- The fly
    - Position and the size
    - Velocity

```
frog
    body
        x
        y
        size
    tongue
        x
        y
        size
        speed
        state

fly
    x
    y
    size
    speed
```

What happens in this project?

- Start (setup)
    - Create a canvas
    
- Every frame (draw)
    - Draw the background
    - Move and draw the fly
        - Add the fly's speed to it x
        - Draw a circle at the fly's position with its size (black)
        - variable sizes and speeds to 
    - Move and draw the frog
        - give frog movement depending on the keypresses of the user
        - Draw a green circle at the frog's position with its size
    - Move and draw the tongue
        - Move the tongue
            - If the tongue is launched, immediately teleport it to the mouse position
            - If the tongue hits the a fly, send it back immediately
            - If the tongue gets back to the frog, then stop it
        - Draw the tongue
            - Draw a line from the frog to the tongue position
            - Draw a circle at the end of the tongue
    - Check if the tongue hit the fly
        - Check if tongue circle and fly circle overlap
        - If they do, then reset the fly and add to score. 
        - If they don't.... nothing... just keep being a tongue

Events

- If the user clicks the mouse
    - If the tongue is still inside the frog's mouth
        - Launch the tongue
- if the user touches a fly
    - game over state
        - calculate score
        - calculate high score
        - calculate bonus
        - provide reset and flavor text
        - capture background
- if the user restarts the game
    - reset game to original state
    - update high score text and reset variables
- if the user eats a fly
    - take away bonus.

