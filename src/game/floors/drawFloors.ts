import floor5 from "../../assets/floors/floor5.png"
import floor5default from "../../assets/floors/floor5default.png"


const floor5Main = new Image()
floor5Main.src=floor5

const defaultFloor5 = new Image()
defaultFloor5.src=floor5default

export function drawFloor(floor:number,context:CanvasRenderingContext2D){
    if(floor===5){
        for(let i =0; i<4;i++){
            const x= i*512
            context.drawImage(defaultFloor5,x,1200,512,512)
        }
        context.drawImage(floor5Main, 372, 1200, 512,512)
    }
}