type playerSkin = "default"|"ninja"|"clockmaker"|"apprentice"|"rags"
type direction = "up"|"left"|"right"|"glideRight"| "glideLeft"
export type difficulty = "noon"|"midday"|"evening"|"dinnerTime"|"Midnight"
export interface Player{
    skin: Skin,
    posX: number,
    posY:number,
    health: number
    yVel: number,
    onGround:boolean
}
export interface Skin{
    skin: playerSkin,
    buff: number, //speed
    healthBonus: number,
    gravity:number,
    jump: number,
    height: number,
    width: number,
    difficulty: difficulty
}
export const skins: Skin[] = [
    {skin:"default", buff: 0,healthBonus:0, gravity:1, jump:1, height: 60, width:60, difficulty:"midday"}, 
    {skin:"ninja", buff:0.25, healthBonus:0, gravity:0.85,jump:1.2, height: 50, width:50, difficulty:"noon"},
    {skin:"clockmaker", buff:0.1, healthBonus:0.25, gravity:1.05,jump:0.9, height: 60, width:70, difficulty:"dinnerTime"},
    {skin:"apprentice", buff:0.1,healthBonus:0.1, gravity:0.9,jump:1.1, height: 55, width:55, difficulty:"evening"},
    {skin:"rags",buff:-0.2,healthBonus:-0.2, gravity:1.2,jump:0.9, height: 65, width:55, difficulty:"Midnight"}
]
function calculateMoveDist(elapsed: number, skin:Skin, dist:number, jump?:boolean):number{
    if(jump)
        return elapsed*(1+skin.buff*skin.jump)*dist
    return elapsed*(1+skin.buff)*dist
}

export function movePlayer(player: Player, dir:direction, time:number,){
    const glideX = 10
    const move = 13
    if(dir==="right")
        player.posX+=calculateMoveDist(time,player.skin,move)
    if(dir==="left")
        player.posX-=calculateMoveDist(time,player.skin,move)
    if(dir==="up" && player.onGround){
        player.yVel=-8*player.skin.jump
        player.onGround=false
        }
    if(dir==="glideRight"){
        player.posX+=calculateMoveDist(time,player.skin,glideX)
        }
    if(dir==="glideLeft"){
        player.posX-=calculateMoveDist(time,player.skin,glideX)
    }
}

