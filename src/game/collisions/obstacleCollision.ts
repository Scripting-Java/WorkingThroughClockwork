import type { obstacle, platform } from "../../levels/data";
import type { steamCycle } from "../obstacles/drawObstacles";
import type { Player } from "../player";

export function handleObstacles(obstacle: obstacle, player: Player, platform: platform, fps?: number, cycle?: steamCycle) {
    const x = platform.x + obstacle.obstacleX
    const y = platform.y + obstacle.obstacleY
    const w = obstacle.obstacleWidth
    const h = obstacle.obstacleHeight
    let tempFps = 75
    if (fps)
        tempFps = fps
    const touching = player.posX < x + w && player.posX + player.skin.width > x && player.posY < y && player.posY + player.skin.height > y - h
    if (obstacle.obstacleType === "spike" && touching)
        handleSpike(player,tempFps)
    if (obstacle.obstacleType === "steam" && cycle) {
        if(touching&&cycle.active)
            handleSteam(player, tempFps)
        else
            cycle.contact=0
    }
}

function handleSpike(player: Player,fps:number) {
    player.health -=250/fps
    
}


function handleSteam(player: Player, fps: number) {
        player.health-=60/fps
}