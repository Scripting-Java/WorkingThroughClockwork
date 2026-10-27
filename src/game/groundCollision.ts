import type { Player } from "./player";

const groundY=540
const playerHeight=60

export function groundCollision(player:Player){
    if(player.posY+playerHeight>=groundY){
        player.posY=groundY-playerHeight
        player.yVel=0
        player.onGround=true
    }
    else
        player.onGround=false
}
