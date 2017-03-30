import * as moment from 'moment';
import * as shortid from 'shortid';
import { PhotoData } from './photo-data';
import { RunningData } from './running-data';

export class ChapterData {
    timestamp:any; //TODO: should this field be private, since photos/whatever will each have their own moments?
    id:string;
    photos:PhotoData[] = null;
    run:RunningData = null;
    textDescription:string = null;
    minutesWorked:number = 0;
    expenses:number = null;
    emotion:string = null; //TODO: make this more complicated eventually, probably it's own object

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

    addMinutesWorked(minutes:number) {
        this.minutesWorked = minutes;
    }

    addRun(run:RunningData) {
        this.run = run;
        this.timestamp = this.run.timestamp;
    }

    addTextDescription(textDescription:string) {
        this.textDescription = textDescription;
    }

    addExpenses(expenses:number) {
        this.expenses = expenses;
    }

    addEmotion(emotion:string) {
        this.emotion = emotion;
    }
}