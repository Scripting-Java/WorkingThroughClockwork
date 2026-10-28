import { useRef, useEffect } from "react"
import type { Player } from "../game/player"
import { movePlayer, skins } from "../game/player"
import { gravity, glideGravity } from "../game/gravity"
import { groundCollision, groundCollisionOfPlatform } from "../game/collisions/groundCollision"
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
        
        function spawn(){
            //draw spawn here
        }

        function drawTest(){
            if(context&&tempCanvas){
                context.clearRect(0,0,tempCanvas.width,tempCanvas.height)
                context.fillStyle = "#b3a68c"
                context.fillRect(0,0,tempCanvas.width,tempCanvas.height)

                for(const platform of currentRoom.platforms){
                    context.fillStyle = "#ecdbcb"
                    context.fillRect(platform.x,platform.y,platform.width,platform.height)
                    context.fillStyle = "#e6cba8"
                    context.fillRect(platform.x,platform.y,platform.width,8)
                
                    const obstacle = platform.obstacle
                    if(obstacle?.obstacleType==="spike"){
                        const x = platform.x+obstacle.obstacleX
                        const y = platform.y+obstacle.obstacleY
                        const width = obstacle.obstacleWidth??30
                        const height = obstacle.obstacleHeight??50
                        context.fillStyle="#db5144"
                        context.beginPath()
                        context.moveTo(x,y)
                        context.lineTo(x+width/2,y-height)
                        context.lineTo(x+width,y)
                        context.closePath()
                        context.fill()
                    }
                }
            }
            if(context&&tempCanvas){
                context.fillStyle="d6ad78"
                context.fillRect(player.posX,player.posY,player.skin.width,player.skin.height)

            }
        }


        function handleInput(event: KeyboardEvent) {
            const input = event.key.toLowerCase()
            inputs.add(input)
            if (inputs.has("s") && inputs.has("d")) {
                movePlayer(player, "glideRight", 1)
            }
            else if (inputs.has("a") && inputs.has("s")) {
                movePlayer(player, "glideLeft", 1)
            }
            else if (event.key.toLowerCase() === "d") {
                movePlayer(player, "right", 1)
            }
            else if (event.key.toLowerCase() === "a") {
                movePlayer(player, "left", 1)
            }
            else if (event.key.toLowerCase() === "w") {
                movePlayer(player, "up", 1)
            }
        }
        function handleInputOff(event: KeyboardEvent) {
            inputs.delete(event.key.toLowerCase())
        }
        drawTest()
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
            ceilColl(player, 0)
            player.onGround = false
            for(const platform of currentRoom.platforms)
                groundCollisionOfPlatform(player,platform, player.posY)
            drawTest()
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
