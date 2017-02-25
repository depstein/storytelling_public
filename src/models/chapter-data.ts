import * as moment from 'moment';
import * as shortid from 'shortid';
import { PhotoData } from './photo-data';

export class ChapterData {
    timestamp:any; //TODO: should this field be private, since photos/whatever will each have their own moments?
    id:string;
    photos:PhotoData[] = [];
    textDescription:string;

    constructor(){
     this.id = shortid.generate();
     //TODO: this will clearly break if a story spans across years, but whatever.
     this.timestamp = moment().startOf('year');
    }
    
    addPictures(photos:PhotoData[]) {
        this.photos = photos;
        photos.forEach((photo) => {
            this.timestamp = moment.max(this.timestamp, photo.timestamp);
        });
    }

    addTextDescription(textDescription:string) {
        this.textDescription = textDescription;
    }
}