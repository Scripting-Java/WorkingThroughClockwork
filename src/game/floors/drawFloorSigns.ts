import floor1 from "../../assets/floors/floorSigns/floor1.png"
import floor2 from "../../assets/floors/floorSigns/floor2.png"
import floor3 from "../../assets/floors/floorSigns/floor3.png"
import floor0 from "../../assets/floors/floorSigns/floor0.png"
import floorNeg1 from "../../assets/floors/floorSigns/floor-1.png"


function getSign(floor:number){
    const img = new Image()
    if(floor === 1) 
        img.src=floor1
    if(floor === 2) 
        img.src=floor2
    if(floor === 3) 
        img.src=floor3
    if(floor === 0) 
        img.src=floor0
    if(floor === -1) 
        img.src=floorNeg1

    return img
}

export function drawSign(floor:number, context:CanvasRenderingContext2D){
    context.drawImage(getSign(floor), 1000,750,512,512)
}