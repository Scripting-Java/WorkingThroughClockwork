import type { obstacle, platform } from "../../levels/data";
import spikeArt from "../../assets/obstacles/spike.png"

const spikeImg = new Image()
spikeImg.src = spikeArt
export function spike(obstacle: obstacle, platform: platform, context: CanvasRenderingContext2D) {
    const x = platform.x + obstacle.obstacleX
    const y = platform.y + obstacle.obstacleY
    const w = obstacle.obstacleWidth
    const h = obstacle.obstacleHeight
    context.drawImage(spikeImg, x, y - h, w, h)
}

export function steam(obstacle: obstacle, platform: platform, context: CanvasRenderingContext2D) {

}