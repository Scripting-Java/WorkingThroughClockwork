import type { Player } from "../player";

const groundY=540


export function groundCollision(player:Player){
    const playerHeight=player.skin.height
    if(player.posY+playerHeight>=groundY){
        player.posY=groundY-playerHeight
        player.yVel=0
        player.onGround=true
    }
    else
        player.onGround=false
}

interface platform{
    x:number,
    y:number,
    width:number,
    height:number,
    name?:string
}
export const dummyPlatforms: platform[] = [
    {x:0, y:540, width:1000, height:60},
    {x:200, y:420, width:150, height:20, name: "Lv1Part1"},
    {x:450, y:330, width: 200, height:20}
]

export function groundCollisionOfPlatform(player:Player, index:number){
    const playerHeight=player.skin.height
    const ground = dummyPlatforms[index].y
    if(player.posY+playerHeight>=ground){
        player.posY=ground-playerHeight
        player.yVel=0
        player.onGround=true
    }
    else
        player.onGround = false
}