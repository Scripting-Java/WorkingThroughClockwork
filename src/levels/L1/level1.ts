import type { platform, room, level} from "../data";

const intro: platform = {x: 0,y: 1300,width: 2000,height: 200}

const first: room = {
    platforms: [intro],
    index: 0,
    floor:4
}
const stairMaker: platform[] =[]
for(let i =1400;i>=500;i-=100){
    stairMaker.push({x:(1400-i)*1.2,y:i, width:50,height:25})
}
for(let i = 1140; i<=1700; i+=90){
    const x = i
    const y = 500+300*(1-Math.pow((x-1420)/280,2)) //Quadratic Stairs
    stairMaker.push({x:x,y:y,width:50,height:25})
}
stairMaker.push({x:1750,y:500,width:250,height:400})

const stairs: room = {
    platforms: stairMaker,
    index:1,
    floor:4
}

const secondRoomPt1: platform = {x:0,y:1300,width:200,height:200}
const secondRoomPt2: platform = {x:375, y:1200, width: 150, height:200}
const secondRoomPt3: platform = {x:700,y:1100, width:100, height:200,obstacle:{obstacleType:"spike", obstacleHeight:50,obstacleWidth:50,obstacleX:50, obstacleY:0}}
const secondRoomPt4: platform = {x:900, y:1000, width:100, height:200}
const secondRoomPt5: platform = {x:1025,y:1000, width:50, height:200, obstacle:{obstacleType:"spike", obstacleHeight:50,obstacleWidth:50,obstacleX:0,obstacleY:0}}
const secondRoomPt6: platform = {x:1075,y:1000,width:50,height:200,obstacle:{obstacleType:"spike",obstacleHeight:50,obstacleWidth:50,obstacleX:0,obstacleY:0}}
const secondRoomPt7: platform = {x:1150, y:900, width: 150, height:200}
const secondRoomPt8: platform = {x:1450,y:800, width:150, height:200, obstacle: {obstacleType:"spike", obstacleHeight:50, obstacleWidth: 50, obstacleX:50, obstacleY:0}}

const second: room = {
    platforms: [secondRoomPt1,secondRoomPt2,secondRoomPt3,secondRoomPt4, secondRoomPt5,secondRoomPt6,secondRoomPt7, secondRoomPt8],
    index:2,
    floor:5
}

export const abandonedWorkshop: level = {
    id: "abandoned",
    rooms: [first, stairs,second]
}
