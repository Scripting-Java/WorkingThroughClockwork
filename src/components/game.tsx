import { useRef, useEffect, useState } from "react"
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
import { drawSign } from "../game/floors/drawFloorSigns"
import "./game.css"
import { drawDoor } from "../drawDoor"

const dropPauses = [{ y: 500, floor: 2 }, { y: 900, floor: 1 }, { y: 1300, floor: 0 }, { y: 1700, floor: -1 }]

function Game() {
    const [line, setLine] = useState(0)
    const [health, setHealth] = useState(100)
    const [maxHealth, setMaxHealth] = useState(100)
    const [skin, setSkin] = useState(skins[0])
    const [done, setDone] = useState(false)
    let spawnX = 100
    let spawnY = 200
    const playerRef = useRef<Player>({ skin: skins[0], posX: 100, posY: 450, health: 100, yVel: 0, onGround: true })
    const player = playerRef.current
    const canvas = useRef<HTMLCanvasElement | null>(null)
    useEffect(() => {
        let lastFrame = 0
        const fps = 75
        const frame = 1000 / fps
        let roomIndex = 0
        let pauseI = 0
        let paused = false
        let pauseDur = 0
        let currentRoom = abandonedWorkshop.rooms[roomIndex]
        let cycles: (steamCycle | null)[] = []
        function handleSteam() {
            cycles = currentRoom.platforms.map(platform => {
                if (platform.obstacle?.obstacleType === "steam")
                    return { elapsed: Math.random() * 7 * fps, active: false, contact: 0 }
                return null
            })
        }
        handleSteam()
        let completed = false
        function handleRoom() {
            if (roomIndex >= abandonedWorkshop.rooms.length - 1) {
                completed = true
                setDone(true)
                return
            }
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
                context.fillStyle = "#615743"
                context.fillRect(0, 0, tempCanvas.width, tempCanvas.height)
                if (roomIndex === 0)
                    drawPipe(pipes, context)
                context.save()
                view(context, camera, player)
                if(roomIndex!==7)
                drawFloor(currentRoom.floor, context)
                if (roomIndex !== 7) {
                    const lastPlatform = currentRoom.platforms.reduce((a, b) => a.x + a.width > b.x + b.width ? a : b)
                    drawDoor(context, lastPlatform.x + lastPlatform.width - 100, lastPlatform.y)
                }
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
                if (paused && roomIndex === 7)
                    drawSign(dropPauses[pauseI].floor, context)
            }
        }

        function spawn() {
            spawnX = currentRoom.platforms[0].x + 15
            spawnY = currentRoom.platforms[0].y - player.skin.height - 25
            player.posX = spawnX
            player.posY = spawnY
            player.yVel = 0
            player.health = 100 * (1 + player.skin.healthBonus)
            player.onGround = true
            setHealth(player.health)
            draw()
        }

        const inputs = new Set<string>()
        function handleJump(event: KeyboardEvent) {
            if (completed && event.key === "Enter") {
                setLine(current => Math.min(current + 1, 9))
                return
            }
            const input = event.key.toLowerCase()
            inputs.add(input)
            if (event.key.toLowerCase() === "w")
                movePlayer(player, "up", 1)
        }

        function handleInputOff(event: KeyboardEvent) {
            inputs.delete(event.key.toLowerCase())
        }

        spawn()
        function game(now: number) {
            if (completed) return
            if (now - lastFrame >= frame) {
                lastFrame = now - ((now - lastFrame) % frame)

                const prev = player.posY
                const gliding = inputs.has("s") && (inputs.has("a") || inputs.has("d"))
                if (paused) {
                    pauseDur++
                    if (pauseDur >= fps) {
                        paused = false
                        pauseDur = 0
                        pauseI++
                    }
                }
                else {
                    if (gliding)
                        glideGravity(player)
                    else
                        gravity(player)
                }
                if (roomIndex === 5 && player.posY > 1200) {
                    roomIndex++
                    currentRoom = abandonedWorkshop.rooms[roomIndex]
                    handleSteam()
                    player.posY = 250
                    player.posX = 50
                }
                if (roomIndex === 7 && pauseI < dropPauses.length && player.posY <= 1900) {
                    if (player.posY >= dropPauses[pauseI].y) {
                        player.yVel = 0
                        paused = true
                    }
                }
                ceilColl(player, 0)
                player.onGround = false
                let index = 0
                for (const platform of currentRoom.platforms) {
                    groundCollisionOfPlatform(player, platform, prev)
                    if (platform.obstacle) {
                        const cycle = cycles[index]
                        if (cycle)
                            handleObstacles(platform.obstacle, player, platform, fps, cycle)
                        else
                            handleObstacles(platform.obstacle, player, platform, fps)
                    }
                    index++
                }
                setHealth(player.health)
                draw()
                if (player.posY >= 1900 && roomIndex === 7)
                    handleRoom()
                if (belowLowestPlatform(player, currentRoom.platforms) && roomIndex != 7) {
                    player.health = 0
                    setHealth(0)
                }
                if (player.health <= 0)
                    spawn()
                if (player.posX + player.skin.width >= 2010 && roomIndex != 7 && currentRoom.platforms.length > 0)
                    handleRoom()
                if (gliding) {
                    if (inputs.has("d"))
                        movePlayer(player, "glideRight", 1)
                    else
                        movePlayer(player, "glideLeft", 1)
                }
                else {
                    if (inputs.has("d"))
                        movePlayer(player, "right", 1)
                    else if (inputs.has("a"))
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
    return (
        <div className="game">
            <div className="settings">
                <select value={skin.skin}
                    onChange={(e) => {
                        const skin = skins.find(s => s.skin === e.target.value)!
                        setSkin(skin)
                        playerRef.current.skin = skin
                        const newMaxHealth = 100 * (1 + skin.healthBonus)
                        player.health=0
                        setMaxHealth(newMaxHealth)
                        playerRef.current.health = newMaxHealth
                        setHealth(newMaxHealth)
                    }}
                >
                    {skins.map(skin => (<option key={skin.skin} value={skin.skin}>{skin.skin}</option>))}
                </select>
                <p>Difficulty: {skin.difficulty}</p>
            </div>
            <div className="containHealth">
                <div className="health">
                    <div
                        className="barLength"
                        style={{ width: `${(health / maxHealth) * 100}%` }}
                    />
                    <p className="write">{health.toFixed(0)}/{maxHealth.toFixed(0)}</p>
                </div>

                <canvas ref={canvas} width={2000} height={1500} />
            </div>
            {done && (
                <div className="win">
                    <div>
                        {[
                            "> LEVEL COMPLETE",
                            "> TIME TRAVELING...",
                            "> TIME TRAVEL COMPLETE.",
                            "> YEAR: 2026",
                            "> WELCOME BACK, ADVENTURER.",
                            "> WARNING! PORTAL UNSTABLE!",
                            "> PLEASE WAIT [-----         ]",
                            "> TRAVELING TO: YEAR -348938548",
                            "> OVERGROWTH — DINOSAUR ERA",
                            "> coming soon!"
                        ].slice(0, line + 1).map((line, i) => (
                            <p className="line" key={i}>{line}</p>
                        ))}
                        {line < 9 && <p className="enter">PRESS ENTER TO CONTINUE_</p>}
                    </div>
                </div>
            )}
        </div>
    )
}
export default Game 
