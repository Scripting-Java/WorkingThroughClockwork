import woodenTile from "../../assets/platform/woodenTile.png"
import rustedTile from "../../assets/platform/rustedFloor.png"
import pipe from "../../assets/platform/pipes.png"
import type { platform } from "../../levels/data"

const woodTile = new Image()
woodTile.src=woodenTile
const rustTile = new Image()
rustTile.src=rustedTile
const pipes = new Image()
pipes.src=pipe

const width = 64
const height =64
export function drawTile(platform:platform, context: CanvasRenderingContext2D){
    let tile = woodTile
    if(platform.style==="rusted")
        tile=rustTile
    else
        platform.style="default" 
    const tileCount = Math.ceil(platform.width/(width))
    for(let i = 0; i<tileCount;i++){
        const x = platform.x+i*width
        const tempWidth = Math.min(width, platform.x+platform.width-x)
        context.drawImage(tile,x,platform.y,tempWidth,height)
    }
}

export function drawPipe(platform: platform, context: CanvasRenderingContext2D){
    const tileCount = Math.ceil(platform.width/512)
    let y = platform.y
    for(let i =0; i<tileCount; i++){
        if(i>0){
            let temp = 0
            const dir = Math.random()<0.5
            if(dir)
                temp = 1
            else
                temp = -1
            y+=temp*Math.random()*2
        }
        const x = platform.x+i*512
        context.drawImage(pipes,x,y,512,300)
    }
}