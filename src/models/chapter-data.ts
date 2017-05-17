import * as moment from 'moment';
import * as shortid from 'shortid';
import { PhotoData } from './photo-data';
import { RunningData } from './running-data';

export class ChapterData {
    timestamp:any; //TODO: should this field be private, since photos/whatever will each have their own moments?
    id:string;
    chapterType:string = 'undefined';//options: 'undefined', 'diy', 'running'.
    eventType:string = 'regular'; //options: 'regular', 'setback', 'moment', 'milestone'. Probably 'start' and 'finish' eventually.
    title:string = null;
    isImportant:boolean = false;
    photos:PhotoData[] = null;
    run:RunningData = null;
    textDescription:string = null;
    minutesWorked:number = 0;
    expenses:number = null;
    emotion:string = null; //TODO: make this more complicated eventually, probably it's own object

    constructor(chapterType:string) {
     this.id = shortid.generate();
     this.chapterType = chapterType;
     this.timestamp = moment();
    }

    get timestampStr() {
        return this.timestamp.format('dddd, MMMM Do');
    }

    get timestampISO() {
        return this.timestamp.format();
    }

    get minutesStr() {
        return (this.minutesWorked/60.0).toFixed(1);
    }

    get pictureURLs() {
        let photoUrls:string[] = null;
        if(this.photos) {
            photoUrls = this.photos.map((photo) => {return photo.pictureURL});
        }
        if(this.chapterType == 'running') {
            if(!this.photos) {
                photoUrls = [];
            }
            if(this.run) {
                photoUrls.unshift(this.run.staticMapUrl);
            }
        }
        return photoUrls;
    }

    get amountStr() {
        if(this.chapterType == 'diy') {
            return this.minutesWorked + " min";
        } else {
            if(this.run) {
                return this.run.distanceStr + " miles";
            } else {
                return null;
            }
        }
    }

    addEventType(eventType:string) {
        this.eventType = eventType;
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

    addDate(date:string) {
        this.timestamp = moment(date);
    }

    addExpenses(expenses:number) {
        this.expenses = expenses;
    }

    addEmotion(emotion:string) {
        this.emotion = emotion;
    }

    addTitle(title:string) {
        this.title = title;
    }

    setImportance(importance:boolean) {
        this.isImportant = importance;
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