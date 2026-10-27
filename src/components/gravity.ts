import type { Player } from "../game/player";

const gravityConstant = 0.1
export function gravity(player:Player){
    if(!player.onGround){
        player.yVel+=gravityConstant*player.skin.gravity
        player.posY+=player.yVel
    }
}