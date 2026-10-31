import type { Player } from "./player"

export interface cameras{
    x:number,
    y:number,
    zoom:number
}
export const camera:cameras = {
    x: 0,
    y: 0,
    zoom: 2
}

export function track(camera:cameras, player:Player){
    camera.x=player.posX+player.skin.width/2
    camera.y=player.posY+player.skin.height/2
}

export function view(context: CanvasRenderingContext2D, camera:cameras, player:Player){
    context.translate(1000,750)
    track(camera, player)
    context.scale(camera.zoom, camera.zoom)
    context.translate(-camera.x, -camera.y)
}