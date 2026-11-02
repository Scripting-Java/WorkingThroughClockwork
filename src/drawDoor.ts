import door from "/src/assets/door.png"

const doorImg = new Image()
doorImg.src = door

export function drawDoor(context: CanvasRenderingContext2D, x: number, y: number) {
    context.drawImage(doorImg, x, y - 180, 180, 180)
}