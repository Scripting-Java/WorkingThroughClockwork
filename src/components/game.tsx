import { useRef, useEffect } from "react"
import type { Player } from "../game/player"
import { movePlayer, skins } from "../game/player"
import { gravity, glideGravity } from "../game/gravity"
import { belowLowestPlatform, groundCollisionOfPlatform } from "../game/collisions/groundCollision"
import { ceilColl } from "../game/collisions/ceilingCollision"
import { abandonedWorkshop } from "../levels/L1/level1"
import { handleObstacles } from "../game/collisions/obstacleCollision"
import { spike, steam } from "../game/obstacles/drawObstacles"
import { drawPipe, drawTile } from "../game/platforms/drawPlatforms"
import { drawFloor } from "../game/floors/drawFloors"
import { camera, view } from "../game/camera"
import { pipes } from "../levels/data"
import type { steamCycle } from "../game/obstacles/drawObstacles"


const dropPauses

function Game() {
    let spawnX = 100
    let spawnY = 200
    const playerRef = useRef<Player>({ skin: skins[0], posX: 100, posY: 450, health: 100, yVel: 0, onGround: true })
    const player = playerRef.current
    const canvas = useRef<HTMLCanvasElement | null>(null)
    useEffect(() => {
        const fps = 75
        const frame = 1000 / fps
        let roomIndex = 5
        let currentRoom = abandonedWorkshop.rooms[roomIndex]
        let cycles: (steamCycle | null)[] = []
        function handleSteam() {
            cycles = currentRoom.platforms.map(platform => {
                if (platform.obstacle?.obstacleType === "steam")
                    return { elapsed: Math.random()*7*fps, active: false, contact: 0 }
                return null
            })
        }
        handleSteam()
        function handleRoom() {
            if (roomIndex >= abandonedWorkshop.rooms.length - 1)
                return
            roomIndex++
            currentRoom = abandonedWorkshop.rooms[roomIndex]
            handleSteam()
            spawn()
        }
        const tempCanvas = canvas.current
        const context = tempCanvas?.getContext('2d')
        function draw() {
            if (context && tempCanvas) {
                context.clearRect(0, 0, tempCanvas.width, tempCanvas.height)
                context.fillStyle = "#b3a68c"
                context.fillRect(0, 0, tempCanvas.width, tempCanvas.height)
                if (roomIndex === 0)
                    drawPipe(pipes, context)
                context.save()
                view(context, camera, player)
                drawFloor(currentRoom.floor, context)
                let index = 0
                for (const platform of currentRoom.platforms) {
                    drawTile(platform, context)
                    if (platform.obstacle?.obstacleType === "spike")
                        spike(platform.obstacle, platform, context)
                    if (platform.obstacle?.obstacleType === "steam") {
                        const cycle = cycles[index]
                        if (cycle)
                            steam(platform.obstacle, platform, context, cycle, fps)
                    }
                    index++
                }

                context.fillStyle = "#d6ad78"
                context.fillRect(player.posX, player.posY, player.skin.width, player.skin.height)
                context.restore()
            }
        }

        function spawn() {
            spawnX = currentRoom.platforms[0].x + 15
            spawnY = currentRoom.platforms[0].y - player.skin.height - 25
            player.posX = spawnX
            player.posY = spawnY
            player.yVel = 0
            player.health = 100
            player.onGround = false
            draw()
        }

        const inputs = new Set<string>()
        function handleJump(event: KeyboardEvent) {
            const input = event.key.toLowerCase()
            inputs.add(input)
            if (event.key.toLowerCase() === "w")
                movePlayer(player, "up", 1)
        }

        function handleInputOff(event: KeyboardEvent) {
            inputs.delete(event.key.toLowerCase())
        }

        spawn()
        let lastFrame = 0
        let falling = false
        function game(now: number) {
            if (now - lastFrame >= frame) {
                lastFrame = now - ((now - lastFrame) % frame)

                const prev = player.posY
                const gliding = inputs.has("s") && (inputs.has("a") || inputs.has("d"))
                if (gliding)
                    glideGravity(player)
                else
                    gravity(player)
                if(roomIndex===5&&player.posY>1200){
                    roomIndex++
                    currentRoom=abandonedWorkshop.rooms[roomIndex]
                    handleSteam()
                    player.posY=250
                    player.posX=50
                    falling=true
                }
                if(player.posY>=1000)
                    falling=false

                ceilColl(player, 0)
                player.onGround = false
                let index = 0
                for (const platform of currentRoom.platforms) {
                    groundCollisionOfPlatform(player, platform, prev)
                    if (platform.obstacle) {
                        const cycle = cycles[index]
                        if(cycle)
                            handleObstacles(platform.obstacle, player, platform, fps, cycle)
                        else
                            handleObstacles(platform.obstacle, player, platform, fps)
                    }
                    index++
                }
                draw()
                if (belowLowestPlatform(player, currentRoom.platforms))
                    player.health = 0
                if (player.health <= 0)
                    spawn()
                if (player.posX + player.skin.width >= 2010)
                    handleRoom()
                if (gliding&&!falling) {
                    if (inputs.has("d"))
                        movePlayer(player, "glideRight", 1)
                    else
                        movePlayer(player, "glideLeft", 1)
                }
                else {
                    if (inputs.has("d")&&!falling)
                        movePlayer(player, "right", 1)
                    else if(inputs.has("a")&&!falling)
                         movePlayer(player, "left", 1)
                }
            }
            frameId = requestAnimationFrame(game)
        }
        let frameId = requestAnimationFrame(game)
        window.addEventListener("keydown", handleJump)
        window.addEventListener("keyup", handleInputOff)
        return () => { cancelAnimationFrame(frameId), window.removeEventListener("keydown", handleJump), window.removeEventListener("keyup", handleInputOff) }
    }, [])
    return <canvas ref={canvas} width={2000} height={1500} />
}
export default Game 
