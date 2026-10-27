type playerSkin = "default"|"ninja"|"clockmaker"|"apprentice"|"rags"
type direction = "up"|"left"|"right"|"glideRight"| "glideLeft"
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
    jump: number
}
export const skins: Skin[] = [
    {skin:"default", buff: 0,healthBonus:0, gravity:1, jump:1}, 
    {skin:"ninja", buff:0.25, healthBonus:-0.1, gravity:0.85,jump:1.2},
    {skin:"clockmaker", buff:0.1, healthBonus:0.25, gravity:1.05,jump:0.9},
    {skin:"apprentice", buff:0.1,healthBonus:0.1, gravity:0.9,jump:1.1},
    {skin:"rags",buff:-0.2,healthBonus:-0.2, gravity:1.2,jump:0.9}
]
function calculateMoveDist(elapsed: number, skin:Skin, dist:number, jump?:boolean):number{
    if(jump)
        return elapsed*(1+skin.buff*skin.jump)*dist
    return elapsed*(1+skin.buff)*dist
}

export function movePlayer(player: Player, dir:direction, time:number,){
    if(dir==="right")
        player.posX+=calculateMoveDist(time,player.skin,20)
    if(dir==="left")
        player.posX-=calculateMoveDist(time,player.skin,20)
    if(dir==="up" && player.onGround)
        player.posY-=calculateMoveDist(time,player.skin,50,true)*(1+(1-player.skin.gravity))
    if(dir==="glideRight"){
        player.posX+=calculateMoveDist(time,player.skin,40)
        player.posY+=calculateMoveDist(time,player.skin,20)*(player.skin.gravity)
    }
    if(dir==="glideLeft"){
        player.posX-=calculateMoveDist(time,player.skin,40)
        player.posY+=calculateMoveDist(time,player.skin,20)*(player.skin.gravity)
    }
}

