import type { obstacle, platform } from "../../levels/data";

type point = {x:number,y:number}

export function spike(obstacle:obstacle,platform:platform, context: CanvasRenderingContext2D){
    const x=  platform.x+obstacle.obstacleX
    const y = platform.y+obstacle.obstacleY
    const w= obstacle.obstacleWidth
    const h = obstacle.obstacleHeight

    const points = [{x,y},{x:x+w/2, y:y-h},{x: x+w,y}]
    //Written in left point, top point, right point
    
    context.fillStyle = ("#db5144")
    context.beginPath()
    context.moveTo(points[0].x, points[0].y)
    context.lineTo(points[1].x,points[1].y)
    context.lineTo(points[2].x,points[2].y)
    context.closePath()
    context.fill()
}