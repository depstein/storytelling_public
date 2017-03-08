import * as moment from 'moment';

export class RunningData {
    timestamp:any = moment();
    id:string = null;
    distance:number = null;
    map_polyline:string = null;
    duration:number =null;


    constructor(id:string){
     this.id = id;
    }
    
    addRun(timestamp:any, distance:number, map_polyline:string, duration:number) {
        this.timestamp = moment(timestamp);
        this.distance = distance;
        this.map_polyline = map_polyline;
        this.duration = duration;
    }
}