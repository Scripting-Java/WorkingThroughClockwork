import type { Player } from "../player";
import { dummyPlatforms } from "../../levels/data";
const groundY=800


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