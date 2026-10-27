export interface platform{
    x:number,
    y:number,
    width:number,
    height:number,
    ceiling?:number,
    name?:string
}
export interface room{
    platforms: platform[],
    index:number
}
type levelId = "abandoned"|"overgrowth"|"clocktower"
export interface level{
    id:levelId
}
export const dummyPlatforms: platform[] = [
    {x:0, y:540, width:1000, height:60, ceiling:1000},
    {x:200, y:420, width:150, height:20, name: "Lv1Part1"},
    {x:450, y:330, width: 200, height:20}
]