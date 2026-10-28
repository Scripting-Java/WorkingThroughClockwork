import type { obstacle } from "../../levels/data";
import type { Player } from "../player";

export function handleObstacles(obstacle: obstacle, player: Player){
    if(obstacle.obstacleType==="spike")
        handleSpike(player)
}

function handleSpike(player: Player){
    player.health = 0
}