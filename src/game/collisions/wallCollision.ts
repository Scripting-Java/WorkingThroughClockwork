import type { Player } from "../player";
import { dummyPlatforms } from "../../levels/data";

export function touchingWall(player: Player, index: number): boolean {
    const platform = dummyPlatforms[index]
    const playerW = player.skin.width
    const playerH = player.skin.height

    const pHMax = player.posY+playerH
    const pHMin = player.posY
    const wallHMax = platform.y+platform.height
    const wallHMin = platform.y
    const vert = pHMax<wallHMin || pHMin>wallHMax
    const left = player.posX + playerW >= platform.x && player.posX <= platform.x
    const right = player.posX + playerW >= platform.x + platform.width && player.posX < platform.x + platform.width
    
    return !vert&&(left||right)
}