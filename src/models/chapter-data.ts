import * as moment from 'moment';
import * as shortid from 'shortid';
import { PhotoData } from './photo-data';
import { RunningData } from './running-data';

export class ChapterData {
    timestamp:any; //TODO: should this field be private, since photos/whatever will each have their own moments?
    id:string;
    chapterType:string = 'undefined';//options: 'undefined', 'diy', 'running'.
    eventType:string = 'regular'; //options: 'regular', 'setback'. Add 'happening', 'completion', and 'start' eventually
    photos:PhotoData[] = null;
    run:RunningData = null;
    textDescription:string = null;
    minutesWorked:number = 0;
    expenses:number = null;
    emotion:string = null; //TODO: make this more complicated eventually, probably it's own object

    constructor(chapterType:string, eventType:string) {
     this.id = shortid.generate();
     this.chapterType = chapterType;
     this.eventType = eventType;
     this.timestamp = moment();
    }

    get timestampStr() {
        return this.timestamp.format('dddd, MMMM Do');
    }

    get minutesStr() {
        return (this.minutesWorked/60.0).toFixed(1);
    }
    
    addPictures(photos:PhotoData[]) {
        this.photos = photos;
        this.timestamp = moment().startOf('year');//Won't work if spanning multiple years
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
        if(this.chapterType == 'diy') {
            return message + "Worked " + this.minutesStr + " hours";
        }
        //Running chapter?
        else {
            return message + "Ran " + this.run.distanceStr + " miles";
        }
    }

    getImages():string|string[] {
        if(this.chapterType == 'diy') {
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