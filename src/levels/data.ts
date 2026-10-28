export type harmful = "spike"|"gear"|"steam"
export interface platform{
    x:number,
    y:number,
    width:number,
    height:number,
    ceiling?:number,
    name?:string
    img?:string,
    obstacle?: obstacle,
   
}
export interface obstacle{
    obstacleType: harmful
    obstacleWidth: number,
    obstacleHeight:number,
    obstacleX:number, 
    obstacleY:number
}
export interface room{
    platforms: platform[],
    index:number,
    floor: number
}
export type levelId = "abandoned"|"overgrowth"|"clocktower"
export interface level{
    id:levelId,
    rooms: room[]
}
export const dummyPlatforms: platform[] = [
    {x:0, y:540, width:1000, height:60, ceiling:100},
    {x:200, y:420, width:150, height:20, name: "Lv1Part1"},
    {x:450, y:330, width: 200, height:20}
]