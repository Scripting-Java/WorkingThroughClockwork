import type { Player } from "../player";
import { dummyPlatforms } from "./groundCollision";

export function ceilColl(player:Player, index:number){
    const
    const playerHeight=player.skin.height
    const platform = dummyPlatforms[index]
    if(platform.height+platform.y){
        player.posY=-playerHeight
        player.yVel=0
        player.onGround=true
    }
    else
        player.onGround = false
}