import type { obstacle, platform } from "../../levels/data";
import type { Player } from "../player";

export function handleObstacles(obstacle: obstacle, player: Player, platform: platform){
    const x = platform.x+obstacle.obstacleX
    const y = platform.y+obstacle.obstacleY
    const w = obstacle.obstacleWidth
    const h = obstacle.obstacleHeight
    const touching = player.posX<x+w&&player.posX+player.skin.width>x&&player.posY<y+h&&player.posY+player.skin.height>y
    if(obstacle.obstacleType==="spike" && touching)
        handleSpike(player)
    if(obstacle.obstacleType==="steam"&&touching)
}

function handleSpike(player: Player){
    player.health = 0
}
function handleSteam(player:Player)