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

    get timestampStr() {
        return this.timestamp.format('dddd, MMMM Do');
    }

    get minutesStr() {
        return (this.minutesWorked/60.0).toFixed(1);
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

    //TODO: design the code betterer so I don't have to include an if statement in places like these.
    getMessage() {
        let message:string =this.textDescription === null ? "" : this.textDescription + "\n\n"
        //DIY chapter?
        if(this.run === null) {
            return message + "Worked " + this.minutesStr + " hours";
        }
        //Running chapter?
        else {
            return message + "Ran " + this.run.distanceStr + " miles";
        }
    }

    getImages():string|string[] {
        if(this.run === null) {
            return this.photos.map((photo:PhotoData) => {return photo.pictureURL;});
        }
        else {
            return this.run.staticMapUrl;
        }
    }

    getUrl() {
        //TODO: publicly accessible URLs!
        return null;
    }
}