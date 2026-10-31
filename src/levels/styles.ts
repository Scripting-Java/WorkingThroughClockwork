import type { platform, platType } from "./data";

function randomStyle(): platType{
    if(Math.random()<0.5)
        return "default"
    else
        return "rusted"
}
export function style(platforms: platform[]): platform[]{
    const temp: platform[] = []
    for(const plat of platforms){
        plat.style = randomStyle()
        temp.push({...plat, style:plat.style})
    }
    return temp
}