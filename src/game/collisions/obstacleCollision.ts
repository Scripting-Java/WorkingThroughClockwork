import type { obstacle, platform } from "../../levels/data";
import type { Player } from "../player";

export function handleObstacles(obstacle: obstacle, player: Player, platform: platform){
    const x = platform.x+obstacle.obstacleX
    const y = platform.y+obstacle.obstacleY
    const w = obstacle.obstacleWidth
    const h = obstacle.obstacleHeight
    const touching = player.posX<w+x&&player.posX+player.skin.width>x&&player.posY<y+h&&player.posY+player.skin.height>y
    if(touching){
        if(obstacle.obstacleType==="spike")
            handleSpike(player)
    }
}

function handleSpike(player: Player){
    player.health = 0
}