import type { Player } from "../player";
import { dummyPlatforms } from "../../levels/data";

export function ceilColl(player:Player, index:number){
    const platform = dummyPlatforms[index]
    const ceil = platform.ceiling
    
    if(ceil===undefined||player.yVel>=0)
        return
    
    const playerW = player.skin.width
    const horizontal = player.posX<platform.x+platform.width && player.posX+playerW>platform.x
    
    const touchCeil = player.posY<=ceil
    if(horizontal&&touchCeil){
        player.posY=ceil
        player.yVel=0
    }
}