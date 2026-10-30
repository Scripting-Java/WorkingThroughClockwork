import type { obstacle, platform } from "../../levels/data";
import spikeFrames from "../../assets/obstacles/spike.png"

type point = {x:number,y:number}
const spikeFrame = new Image()
spikeFrame.src = spikeFrames
const frameDim = 128; //64 px => doesn't fill up entire thing so resize later
const advance = 8; //num game frames per anim frame
let currFrame = 0
let count = 0

export function spike(obstacle:obstacle,platform:platform, context: CanvasRenderingContext2D){
    const x=  platform.x+obstacle.obstacleX
    const y = platform.y+obstacle.obstacleY
    const w= obstacle.obstacleWidth
    const h = obstacle.obstacleHeight


    const points = [{x,y},{x:x+w/2, y:y-h},{x: x+w,y}]
    //Written in left point, top point, right point
    
    if(!spikeFrame)
        return
    count++
    if(count>=advance){
        currFrame = (currFrame+1)%16
        count=0
    }
    const frameX = (currFrame%4)*frameDim
    const frameY = Math.floor(currFrame/4)*frameDim

    context.drawImage(spikeFrame,frameX,frameY,frameDim,frameDim,x,y-h,w,h)
}

export function steam(obstacle: obstacle, platform: platform, context: CanvasRenderingContext2D){

}