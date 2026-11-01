import { spike } from "../../game/obstacles/drawObstacles";
import type { platform, room, level } from "../data";
import { style } from "../styles";
const intro: platform = { x: 0, y: 1300, width: 2000, height: 200 }
const intropt2: platform = { x: 500, y: 1300, width: 50, height: 200, obstacle: { obstacleType: "spike", obstacleHeight: 50, obstacleWidth: 50, obstacleX: 0, obstacleY: 0 } }
const intropt3: platform = { x: 550, y: 1300, width: 50, height: 200, obstacle: { obstacleType: "spike", obstacleHeight: 50, obstacleWidth: 50, obstacleX: 0, obstacleY: 0 } }
const intropt4: platform = { x: 1250, y: 1300, width: 50, height: 200, obstacle: { obstacleType: "spike", obstacleHeight: 50, obstacleWidth: 50, obstacleX: 0, obstacleY: 0 } }
const intropt5: platform = { x: 1300, y: 1300, width: 50, height: 200, obstacle: { obstacleType: "spike", obstacleHeight: 50, obstacleWidth: 50, obstacleX: 0, obstacleY: 0 } }


const first: room = {
    platforms: style([intro, intropt2, intropt3, intropt4, intropt5]),
    index: 0,
    floor: 4
}
const stairMaker: platform[] = []
for (let i = 1400; i >= 500; i -= 100) {
    stairMaker.push({ x: (1400 - i) * 1.2, y: i, width: 50, height: 25 })
}
for (let i = 1140; i <= 1700; i += 90) {
    const x = i
    const y = 500 + 300 * (1 - Math.pow((x - 1420) / 280, 2)) //Quadratic Stairs
    if (x === 1410)
        stairMaker.push({ x: 1410, y: y, width: 50, height: 25, style: "rusted", obstacle: { obstacleType: "spike", obstacleHeight: 50, obstacleWidth: 50, obstacleX: 0, obstacleY: 0 } })
    stairMaker.push({ x: x, y: y, width: 50, height: 25 })
}
stairMaker.push({ x: 1750, y: 500, width: 250, height: 400 })

const stairs: room = {
    platforms: style(stairMaker),
    index: 1,
    floor: 4
}

const secondRoomPt1: platform = { x: 0, y: 1300, width: 200, height: 200 }
const secondRoomPt2: platform = { x: 375, y: 1200, width: 150, height: 200 }
const secondRoomPt3: platform = { x: 700, y: 1100, width: 100, height: 200, obstacle: { obstacleType: "spike", obstacleHeight: 50, obstacleWidth: 50, obstacleX: 50, obstacleY: 0 } }
const secondRoomPt4: platform = { x: 900, y: 1000, width: 100, height: 200 }
const secondRoomPt5: platform = { x: 1025, y: 1000, width: 50, height: 200, obstacle: { obstacleType: "spike", obstacleHeight: 50, obstacleWidth: 50, obstacleX: 0, obstacleY: 0 } }
const secondRoomPt6: platform = { x: 1075, y: 1000, width: 50, height: 200, obstacle: { obstacleType: "spike", obstacleHeight: 50, obstacleWidth: 50, obstacleX: 0, obstacleY: 0 } }
const secondRoomPt7: platform = { x: 1150, y: 900, width: 150, height: 200 }
const secondRoomPt8: platform = { x: 1450, y: 800, width: 150, height: 200, obstacle: { obstacleType: "spike", obstacleHeight: 50, obstacleWidth: 50, obstacleX: 50, obstacleY: 0 } }
const secondRoomPt9: platform = { x: 1700, y: 900, height: 100, width: 300 }

const second: room = {
    platforms: [secondRoomPt1, secondRoomPt2, secondRoomPt3, secondRoomPt4, secondRoomPt5, secondRoomPt6, secondRoomPt7, secondRoomPt8, secondRoomPt9],
    index: 2,
    floor: 5
}

const thirdRoomPt1: platform = { x: 0, y: 1300, width: 400, height: 200 }
const thirdRoomPt2: platform = { x: 450, y: 1300, width: 50, height: 200, obstacle: { obstacleType: "spike", obstacleHeight: 50, obstacleWidth: 50, obstacleX: 0, obstacleY: 0 } }
const thirdRoomPt3: platform = { x: 500, y: 1300, width: 50, height: 200, obstacle: { obstacleType: "spike", obstacleHeight: 50, obstacleWidth: 50, obstacleX: 0, obstacleY: 0 } }
const thirdRoomPt4: platform = { x: 600, y: 1300, width: 50, height: 200 }
const thirdRoomPt5: platform = { x: 700, y: 1300, width: 50, height: 200 }
const thirdRoomPt6: platform = { x: 800, y: 1300, width: 50, height: 200 }
const thirdRoomPt7: platform = { x: 900, y: 1300, width: 50, height: 200 }
const thirdRoomPt8: platform = { x: 1000, y: 1350, width: 300, height: 200 }
const thirdRoomPt9: platform = { x: 1400, y: 1400, width: 50, height: 200, obstacle: { obstacleType: "spike", obstacleHeight: 50, obstacleWidth: 50, obstacleX: 0, obstacleY: 0 } }
const thirdRoomPt10: platform = { x: 1500, y: 1450, width: 50, height: 100 }
const thirdRoomPt11: platform = { x: 1600, y: 1425, width: 50, height: 100 }
const thirdRoomPt12: platform = { x: 1700, y: 1300, width: 50, height: 100 }
const thirdRoomPt13: platform = { x: 1800, y: 1200, width: 200, height: 50 }
const third: room = {
    platforms: [thirdRoomPt1, thirdRoomPt2, thirdRoomPt3, thirdRoomPt4, thirdRoomPt5, thirdRoomPt6, thirdRoomPt7, thirdRoomPt8, thirdRoomPt9, thirdRoomPt10, thirdRoomPt11, thirdRoomPt12, thirdRoomPt13],
    index: 3,
    floor: 5
}

const pt4Stairs: platform[] = []
for (let i = 400; i <= 1000; i += 100) {
    pt4Stairs.push({ x: i, y: 900 + (i - 400) * 0.4, width: 50, height: 25 })
}
const pt4spike1: platform = { x: 1125, y: 1200, width: 50, height: 100, obstacle: { obstacleType: "spike", obstacleHeight: 50, obstacleWidth: 50, obstacleX: 0, obstacleY: 0 } }
const pt4spike2: platform = { x: 1175, y: 1200, width: 50, height: 100, obstacle: { obstacleType: "spike", obstacleHeight: 50, obstacleWidth: 50, obstacleX: 0, obstacleY: 0 } }
const pt4spike3: platform = { x: 1225, y: 1200, width: 50, height: 100, obstacle: { obstacleType: "spike", obstacleHeight: 50, obstacleWidth: 50, obstacleX: 0, obstacleY: 0 } }
const pt4land: platform = { x: 1360, y: 1300, width: 600, height: 200 }

const fourth: room = {
    platforms: style([...pt4Stairs, pt4spike1, pt4spike2, pt4spike3, pt4land]),
    index: 4,
    floor: 5
}

const fifthPt1: platform = { x: 0, y: 1200, width: 1200, height: 100 }
const fifthPt2: platform = { x: 1500, y: 900, width: 500, height: 100 }


const fifth: room = {
    platforms: style([fifthPt1, fifthPt2]),
    index: 5,
    floor: 5
}

const sixthPt1: platform = { x: 0, y: 1300, width: 500, height: 200 }
const sixthPt2: platform = { x: 500, y: 1300, width: 50, height: 200, obstacle: { obstacleType: "steam", obstacleHeight: 200, obstacleWidth: 100, obstacleX: -50, obstacleY: 0 } }
const sixthPt3: platform = { x: 650, y: 1300, width: 50, height: 200, obstacle: { obstacleType: "spike", obstacleWidth: 50, obstacleHeight: 50, obstacleX: 0, obstacleY: 0 } }
const sixthPt4: platform = { x: 800, y: 1300, width: 50, height: 200, obstacle: { obstacleType: "steam", obstacleHeight: 200, obstacleWidth: 100, obstacleX: 25, obstacleY: 0 } }
const sixthPt5: platform = { x: 850, y: 1300, width: 1150, height: 200 }
const sixthPt6: platform = { x: 600, y: 900, width: 50, height: 50, obstacle: { obstacleType: "spike", obstacleWidth: 50, obstacleHeight: 50, obstacleX: 0, obstacleY: 0, dir: "down" } }

const sixth: room = {
    platforms: style([sixthPt1, sixthPt2, sixthPt3, sixthPt4, sixthPt5, sixthPt6]),
    index: 6,
    floor: 3
}
const lasttemp: platform = { x: 100, y: 150, width: 0, height: 0 }
const lastpt1: platform = { x: 0, y: 250, width: 100, height: 50 }
const dropMarker1: platform = { x: 0, y: 500, width: 0, height: 0 }
const dropMarker2: platform = { x: 0, y: 900, width: 0, height: 0 }
const dropMarker3: platform = { x: 0, y: 1300, width: 0, height: 0 }
const dropMarker4: platform = { x: 0, y: 1700, width: 0, height: 0 }
const playerKillprevention: platform = { x: 0, y: 2000, width: 0, height: 0 }


const seventh: room = {
    platforms: [lastpt1, lasttemp, dropMarker1, dropMarker2, dropMarker3, dropMarker4, playerKillprevention],
    index: 7,
    floor: -1
}


const seventhPt1: platform = { x: 0, y: 1300, width: 250, height: 200 }
const seventhPt2: platform = { x: 350, y: 1200, width: 100, height: 100 }
const seventhPt3: platform = { x: 550, y: 1050, width: 100, height: 100 }
const seventhPt4: platform = { x: 750, y: 900, width: 100, height: 100 }
const seventhPt5: platform = { x: 950, y: 800, width: 100, height: 100 }
const seventhPt6: platform = { x: 1150, y: 700, width: 100, height: 100 }
const seventhPt7: platform = { x: 1400, y: 650, width: 600, height: 100 }

const eigth: room = {
    platforms: style([seventhPt1, seventhPt2, seventhPt3, seventhPt4, seventhPt5, seventhPt6, seventhPt7]),
    index: 8,
    floor: -1
}

const ninthP1: platform = {x:0,y:1300,width:250,height:200,obstacle:{obstacleType:"steam", obstacleHeight:200,obstacleWidth:100,obstacleX:75,obstacleY:0}}
const ninthP2: platform = {x:350,y:1200,width:250,height:200,obstacle:{obstacleType:"steam", obstacleHeight:200,obstacleWidth:100,obstacleX:25,obstacleY:0}}
const ninthP3: platform = {x:600,y:1100,width:250,height:200,obstacle:{obstacleType:"steam", obstacleHeight:200,obstacleWidth:100,obstacleX:0,obstacleY:0}}
const ninthP4: platform = {x:900,y:1200,width:250,height:200,obstacle:{obstacleType:"steam", obstacleHeight:200,obstacleWidth:100,obstacleX:50,obstacleY:0}}
const ninthP5: platform = {x:1150,y:1100,width:250,height:200,obstacle:{obstacleType:"steam", obstacleHeight:200,obstacleWidth:100,obstacleX:75,obstacleY:0}}
const ninthP6: platform = {x:1350,y:1000,width:250,height:200,obstacle:{obstacleType:"steam", obstacleHeight:200,obstacleWidth:100,obstacleX:75,obstacleY:0}}
const ninthP7: platform = {x:1700,y:1100,width:300,height:200}

const ninth: room = {
    platforms: [ninthP1,ninthP2,ninthP3,ninthP4,ninthP5,ninthP6,ninthP7],
    index: 9,
    floor: -1
}
const lastStairs: platform[] =[]
for(let i =500;i<=1400;i+=100){
    lastStairs.push({x:(i-500)*1.2,y:2000-i,width:50,height:25, ceiling:-1000})
}
const exit:platform = {x:1200,y:500,width:800,height:100}

const tenth: room = {
    platforms: [...lastStairs,exit],
    index: 10,
    floor: 0
}

export const abandonedWorkshop: level = {
    id: "abandoned",
    rooms: [first, stairs, second, third, fourth, fifth, sixth, seventh, eigth, ninth, tenth]
}
