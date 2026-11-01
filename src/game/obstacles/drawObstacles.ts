import type { obstacle, platform } from "../../levels/data";
import spikeArt from "../../assets/obstacles/spike.png"
import steamAnim from "../../assets/obstacles/SteamAnimation.png"
//btw a lot of the code renders weird frames
//this is because the way I drew it, frames 4-7 are warnings
//all of the drawing is on lapse btw
//frame 8 is steam vent off
//and frames 1-3 are obviously the steam
//these are tentative values
//also the frames are drawn in a 3x3 spritesheet from piskelapp.com
//for the column and row logic

const spikeImg = new Image()
spikeImg.src = spikeArt
const steamImg = new Image()
steamImg.src= steamAnim
export function spike(obstacle: obstacle, platform: platform, context: CanvasRenderingContext2D) {
    const x = platform.x + obstacle.obstacleX
    const y = platform.y + obstacle.obstacleY
    const w = obstacle.obstacleWidth
    const h = obstacle.obstacleHeight
    if(obstacle.dir==="down"){
        context.save()
        context.translate(x,y+h)
        context.scale(1,-1)
        context.drawImage(spikeImg,0,0,w,h)
        context.restore()
    }
    else
        context.drawImage(spikeImg, x, y - h, w, h)
}
export interface steamCycle{
    elapsed:number, //frames btw
    active:boolean,
    contact:number //time player has been touching
}

export function steam(obstacle: obstacle, platform: platform, context: CanvasRenderingContext2D, cycle:steamCycle, fps?:number) {
    const x = platform.x+obstacle.obstacleX
    const y = platform.y+obstacle.obstacleY
    const w = obstacle.obstacleWidth
    const h = obstacle.obstacleHeight
    const cycleDur = 7
    let tempFPS = 75
    if(fps)
        tempFPS=fps

    cycle.elapsed++
    if(cycle.elapsed>=tempFPS*cycleDur)
        cycle.elapsed = 0

    let frame = 0
    //warning frames mentioned above
    if(cycle.elapsed<tempFPS){
        cycle.active=false
        frame = 3+Math.floor(cycle.elapsed/(tempFPS/4))
    }
    //active steam vent(cycles through 4 frames)
    else if(cycle.elapsed<tempFPS*5){
        cycle.active=true
        frame=Math.floor((cycle.elapsed-tempFPS)/(tempFPS/3))%3
    }
    //cooldown
    else{
        cycle.active = false
        frame = 8
    }

    const col=frame%3
    const row = Math.floor(frame/3)
    if(context)
        context.drawImage(steamImg,col*64,row*64,64,64,x,y-h,w,h)

}