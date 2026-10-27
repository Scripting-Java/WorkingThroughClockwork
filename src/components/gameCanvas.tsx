import { useRef, useEffect } from "react"
import type { Player} from "../game/player"
import { movePlayer, skins } from "../game/player"


function GameCanvas() {
    const playerRef = useRef<Player>({ skin: skins[0], posX: 100, posY: 450, health: 100, yVel:0,onGround:true })
    const player = playerRef.current
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
                context.fillRect(player.posX, player.posY, 40, 60)
            }
        }
        
        
        function handleInput(event: KeyboardEvent) {
            const input = event.key.toLowerCase()
            inputs.add(input)
            if (inputs.has("s") && inputs.has("d")) {
                movePlayer(player, "glideRight", 1)
                draw()
            }
            if (inputs.has("a") && inputs.has("s")) {
                movePlayer(player, "glideLeft", 1)
                draw()
            }
            if (event.key.toLowerCase() === "d") {
                movePlayer(player, "right", 1)
                draw()
            }
            if (event.key.toLowerCase() === "a") {
                movePlayer(player, "left", 1)
                draw()
            }
            if (event.key.toLowerCase() === "w") {
                movePlayer(player, "up", 1)
                draw()
            }
}
        function handleInputOff(event: KeyboardEvent) {
            inputs.delete(event.key.toLowerCase())
        }
        draw()
        function gameLoop(){
            draw()
            frameId = requestAnimationFrame(gameLoop)
        }
        let frameId = requestAnimationFrame(gameLoop)
        window.addEventListener("keydown", handleInput)
        window.addEventListener("keyup", handleInputOff)
        
        return () => { cancelAnimationFrame(frameId), window.removeEventListener("keydown", handleInput), window.removeEventListener("keyup", handleInputOff) }
    }, [])
    return <canvas ref={canvas} width={1000} height={600} />
}
export default GameCanvas 
