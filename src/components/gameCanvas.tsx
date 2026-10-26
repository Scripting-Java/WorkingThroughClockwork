import { useRef,useEffect } from "react"
function GameCanvas(){
const canvas = useRef<HTMLCanvasElement|null>(null)
  useEffect(()=>{
    const tempCanvas = canvas.current
    const context = tempCanvas?.getContext('2d')
    if(!tempCanvas||!context)
      return
    context.fillStyle="#d6ad78"
    context.fillRect(100,450,40,60)
  }, [])
  return <canvas ref={canvas} width={1000} height={600}/>
}
export default GameCanvas