import type { platform, room, level} from "../data";

const intro: platform = {x: 50,y: 800,width: 1000,height: 200}

const first: room = {
    platforms: [intro],
    index: 0,
    floor:4
}
const secondRoomPt0: platform = {x:0, y:800, width:1000,height:200}
const floor4to5: room = {
    platforms:[secondRoomPt0], index:1,floor:4
}

const secondRoomPt1: platform = {x:0,y:800,width:200,height:200}
const secondRoomPt2: platform = {x:250,y:700, width: 100, height:100}
const secondRoomPt3: platform = {x:375, y:700, width: 150, height:300}
const secondRoomPt4: platform = {x:550, y: 600, width:100,height:300}
const secondRoomPt5: platform = {x:700,y:600, width:150, height:400,obstacle:{obstacleType:"spike", obstacleHeight:50,obstacleWidth:50,obstacleX:50, obstacleY:0}}
const secondRoomPt6: platform = {x:900, y:600, width:100, height:400}

const second: room = {
    platforms: [secondRoomPt1,secondRoomPt2,secondRoomPt3,secondRoomPt4,secondRoomPt5,secondRoomPt6],
    index:2,
    floor:5
}

export const abandonedWorkshop: level = {
    id: "abandoned",
    rooms: [first, floor4to5,second]
}
