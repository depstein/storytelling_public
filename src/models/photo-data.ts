import * as moment from 'moment';

export class PhotoData {
    timestamp:any = moment();
    id:string = null;
    pictureURL:string = null;

    constructor(id:string){
     this.id = id;
    }
    
    addPicture(timestamp:any, pictureURL:string) {
        this.timestamp = timestamp;
        this.pictureURL = pictureURL;
    }
}