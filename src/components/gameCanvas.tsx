import { useRef, useEffect } from "react"
import type { Player, Skin } from "../game/player"
import { movePlayer, skins } from "../game/player"


function GameCanvas() {
    const playerRef=useRef<Player>({ skin: skins[0], posX: 100, posY: 450, health: 100 })
    const player = playerRef.current
    const canvas = useRef<HTMLCanvasElement | null>(null)
    useEffect(() => {
        const tempCanvas = canvas.current
        const context = tempCanvas?.getContext('2d')
        const input = (event: KeyboardEvent) => handleInput(event, player)

        if (!tempCanvas || !context)
            return () => window.removeEventListener("keydown", input)
        function draw() {
            if (context && tempCanvas) {
                context.clearRect(0, 0, tempCanvas.width, tempCanvas.height)
                context.fillStyle = "#d6ad78"
                context.fillRect(player.posX, player.posY, 40, 60)
            }
        }
        function handleInput(event: KeyboardEvent, player: Player) {
            if (event.key.toLocaleLowerCase() === "d") {
                movePlayer(player, "right", 1)
                draw()
            }
            if(event.key.toLocaleLowerCase()==="a"){
                movePlayer(player,"left",1)
                draw()
            }
            if(event.key.toLocaleLowerCase()==="w"){
                movePlayer(player,"up",1)
                draw()
            }
            if(event.key.toLocaleLowerCase()==="s"){
                movePlayer(player,"glide",1)
                draw()
            }

        }
        draw()
        window.addEventListener("keydown",input)
        return()=>window.removeEventListener("keydown",input)
    }, [])
    return <canvas ref={canvas} width={1000} height={600} />
}
export default GameCanvas 
