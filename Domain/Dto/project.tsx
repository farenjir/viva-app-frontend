export default interface proj {
    _id: string,
    tokenname: string,
    tokentotall: string,
    imglist:imgli[],
    isshow:boolean,
    isfuther:number,
    rounds:ro[],
    status:number,
    info:string,
    des:string,
    vesting:ve[],
    sc:string
}
interface imgli{
    id:number,
    name:string
}
interface ro{
    _id:string,
    startdate:string,
    enddate:string,
    price:string,
    status:number
    
}
interface ve{
    _id:string,
    startdate:string,
    enddate:string,
    status:number
    
}