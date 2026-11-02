# Working Through Clockwork

*A Victorian-steampunk(somewhat) platformer w/ pixel art graphics.*

## The Game
It's a platformer where the objective is to clear 10 rooms. New mechanics are introduced as you make your way through the levels. This is a demo, so more might be added in the future. 


### Controls

| Key | What it does |
|---|---|
| W | Jump |
| A | Move left |
| D | Move right |
| S + A | Glide left |
| S + D | Glide right |
*No arrow keys*
Gliding impacts player gravity, so if you can't make a jump, either swap your character or hold s to glide. You can also jump and tap s for a higher jump boost(but this won't reduce gravity on your fall).

## Characters *Work in Progress*
There are multiple skins/difficulties that you can choose. It goes as following(in terms of difficulty): 
ninja -> default -> apperentice -> clockmaker -> rags
Each skin/character plays differently as they have different gravity values and sizes. Unfortunately, I did not have the time to draw each character it's own skin, so the size is indicated instead(dimensions in which it's drawn). 
These difficulties also change player health and speed apart from gravity
The difficulties also correlate with time of day so the later in the day you play, the harder it is. Ex: ninja is noon(pretty early in the day) and clockmaker is dinner time which is much later in the day.

## Environmental Hazards

### Spikes

Spikes are very dangerous. They do a lot of damage so if you even graze it you take 40-100 damage. If you stand in them it's roughly 0.6 seconds to death. Ceiling spikes can hurt you, but they're mainly decorations.

### Steam Vents
Steam vents periodically activate and deactivate through a 7 second cycle.
- You can jump over/walk over them when they're inactive
- The dark grey wisps are warnings that the steam will come
- They lighter grey bubbles are steam and will hurt you
- One full steam cycle can kill you if you stand in place. If you jump you get a couple frames of not touching the steam so you'll have 0-10 hp left. 
The main objective here is to pass when they're inactive.


### Level 1 — Abandoned Workshop - The only complete one
This is the only level in the game right now. For more info, you can read planning.md, or play the game.
### Levels 2 — Overgrowth & 3 Clocktower
I only planned these levels in planning.md, so I'll have to finish this later.

## Art
- I drew everything using piskelapp except the doors at the end of each level
- A brief explanation of what I tried to draw
    - In the first level there's a couple of shaking pipes. My goal was to show an overloaded steam pipe that's about to collapse.
    - There are 2 types of platform. One is meant to be recycled wood and the other rusted metal. I know the oranges/reds look a little off color, but I kind of like them in the theme.
    - The background is a solid fill.
    - I sometimes have room decorations and a bunch of gears at the bottom of the room to show that if you fall you die. It's not the best, but it's probably the most well drawn part of the game :(((

## Game Structure
When I first made this, I thought I could do all 3 levels so the structure is as follows
Level->Multiple rooms->Each room has multiple platforms. This is why I structured data.ts the way it is.

### What I used

- React w/ Typescript 
- CSS 
- Piskelapp

## Website link:
https://scripting-java.github.io/WorkingThroughClockwork/

## Running it Locally

### You need:
- Node.js
- npm
- Git

### Steps:

Clone the repository:
```bash
git clone https://github.com/Scripting-Java/WorkingThroughClockwork.git
cd WorkingThroughClockwork
```

Install dependencies:
```bash
npm install
```

Start the server:
```bash
npm run dev
```
Open the url it gives you.

### What I did
This is a very oversimplified version of the game I was trying to make, but I didn't have the time to do all of it because of my own time & bugs. I was originally trying to use it to learn some python(pygame), buttttt after ~1.5 hours of trying and learning, I decided to switch back over to typescript because I'm a lot more familiar with it. I know the art/game isn't the best, but I might improve it in the future.