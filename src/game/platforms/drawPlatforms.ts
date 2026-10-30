import woodenTile from "../../assets/platform/woodenTile.png"
import rustedTile from "../../assets/platform/rustedFloor.png"
import type { platform } from "../../levels/data"

const woodTile = new Image()
woodTile.src=woodenTile
const rustTile = new Image()
rustTile.src=rustedTile

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