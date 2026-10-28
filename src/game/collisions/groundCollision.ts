import type { Player } from "../player";
import {  type platform } from "../../levels/data";
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


export function groundCollisionOfPlatform(player:Player, platform: platform, prevY:number){
    const playerH=player.skin.height
    const playerW = player.skin.width
    const ground = platform.y
    const pass = prevY<=ground&&player.posY+playerH>=ground
    const overlap = player.posX+playerW>platform.x&&player.posX<platform.x+platform.width
    if(pass&&overlap&&player.posY+playerH>=ground){
        player.posY=ground-playerH
        player.yVel=0
        player.onGround=true
    }
}