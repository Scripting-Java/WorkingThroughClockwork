import { useRef, useEffect } from "react"
import type { Player } from "../game/player"
import { movePlayer, skins } from "../game/player"
import { gravity, glideGravity } from "../game/gravity"
import { groundCollision } from "../game/collisions/groundCollision"
import { ceilColl } from "../game/collisions/ceilingCollision"
import { abandonedWorkshop } from "../levels/L1/level1"

function GameCanvas() {
    const playerRef = useRef<Player>({ skin: skins[0], posX: 100, posY: 450, health: 100, yVel: 0, onGround: true })
    const player = playerRef.current
    const currentRoom = abandonedWorkshop.rooms[2]
    const canvas = useRef<HTMLCanvasElement | null>(null)
    useEffect(() => {
        const tempCanvas = canvas.current
        const context = tempCanvas?.getContext('2d')
        const inputs = new Set<string>()
        if (!tempCanvas || !context)
            return
        function draw() {
            if (context && tempCanvas) {
                context.clearRect(0, 0, tempCanvas.width, tempCanvas.height)
                context.fillStyle = "#d6ad78"
                context.fillRect(player.posX, player.posY, 10, 10)
            }
        }
        function drawTest(){
            if(context&&tempCanvas){
                context.fillStyle = "#99846f"
                context.fillRect(0,0,tempCanvas.width,tempCanvas.height)

                for(const platform of currentRoom.platforms){
                    context.fillStyle = "#ecdbcb"
                    context.fillRect(platform.x,platform.y,platform.width,platform.height)
                }
            }
        }


        function handleInput(event: KeyboardEvent) {
            const input = event.key.toLowerCase()
            inputs.add(input)
            if (inputs.has("s") && inputs.has("d")) {
                movePlayer(player, "glideRight", 1)
                draw()
            }
            else if (inputs.has("a") && inputs.has("s")) {
                movePlayer(player, "glideLeft", 1)
                draw()
            }
            else if (event.key.toLowerCase() === "d") {
                movePlayer(player, "right", 1)
                draw()
            }
            else if (event.key.toLowerCase() === "a") {
                movePlayer(player, "left", 1)
                draw()
            }
            else if (event.key.toLowerCase() === "w") {
                movePlayer(player, "up", 1)
                draw()
            }
        }
        function handleInputOff(event: KeyboardEvent) {
            inputs.delete(event.key.toLowerCase())
        }
        draw()
        const fps = 60
        const frameDur = 1000/fps
        let lastFrame = 0
        function game(now: number) {
            if(now-lastFrame>=frameDur){
                lastFrame=now-((now-lastFrame)%frameDur)
            const gliding = inputs.has("s") && (inputs.has("a") || inputs.has("d"))
            if (gliding)
                glideGravity(player)
            else
                gravity(player)
            groundCollision(player)
            ceilColl(player, 0)
            draw()
        }
            frameId = requestAnimationFrame(game)
        }
        let frameId = requestAnimationFrame(game)
        window.addEventListener("keydown", handleInput)
        window.addEventListener("keyup", handleInputOff)

        return () => { cancelAnimationFrame(frameId), window.removeEventListener("keydown", handleInput), window.removeEventListener("keyup", handleInputOff) }
    }, [])
    return <canvas ref={canvas} width={1000} height={1000} />
}
export default GameCanvas 
