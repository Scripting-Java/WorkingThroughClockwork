import floor5 from "../../assets/floors/floor5.png"
import floor1 from "../../assets/floors/floor1.png"
import floor2 from "../../assets/floors/floor2.png"
import floor3 from "../../assets/floors/floor3.png"
import floor4 from "../../assets/floors/floor4.png"
import floor0 from "../../assets/floors/floor0.png"
import floor15 from "../../assets/floors/floor-1.png"
import floorDefault from "../../assets/floors/floorDefault.png"


const floor5Main = new Image()
floor5Main.src = floor5

const floor1Main = new Image()
floor1Main.src = floor1

const floor2Main = new Image()
floor2Main.src = floor2

const floor3Main = new Image()
floor3Main.src = floor3

const floor4Main = new Image()
floor4Main.src = floor4


const floor0Main = new Image()
floor0Main.src = floor0

const floorNeg1Main = new Image()
floorNeg1Main.src = floor15







const defaultFloor = new Image()
defaultFloor.src = floorDefault

export function drawFloor(floor: number, context: CanvasRenderingContext2D) {
    for (let i = 0; i < 4; i++) {
        const x = i * 512
        context.drawImage(defaultFloor, x, 1200, 512, 512)
    }
    if (floor === 5) 
        context.drawImage(floor5Main, 372, 1200, 512, 512)
    if (floor === 4) 
        context.drawImage(floor4Main, 372, 1200, 512, 512)
    if (floor === 3) 
        context.drawImage(floor3Main, 372, 1200, 512, 512)
    if (floor === 2) 
        context.drawImage(floor2Main, 372, 1200, 512, 512)
    if (floor === 1)
        context.drawImage(floor1Main, 372, 1200, 512, 512)
    if (floor === 0) 
        context.drawImage(floor0Main, 372, 1200, 512, 512)
    if (floor === -1) 
        context.drawImage(floorNeg1Main, 372, 1200, 512, 512)
}