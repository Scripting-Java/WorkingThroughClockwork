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