import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ChapterData } from '../models/chapter-data';
import { PhotoData } from '../models/photo-data';
import { RunningData } from '../models/running-data';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataStorage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataStorage {
  //TODO: move this to the cloud!
  //When the cloud move is done, visit which of these should be asynchronous and which can be synchronous.
  static chapters:ChapterData[] = null;
  static chapterArrayDirty = true;
  static chapterIds:{} = {};
  static photoIds:{} = {};
  static runIds:{} = {};

  constructor(public http: Http) {
  }

  getAllChapters() {
    return new Promise((resolve, reject) => {
      //If the bit is dirty, refresh the list of chapters.
      //This probably needs more rigorous testing.
      if(DataStorage.chapterArrayDirty) {
        DataStorage.chapters = [];
        for(var id in DataStorage.chapterIds) {
          DataStorage.chapters.push(DataStorage.chapterIds[id]);
        }

        DataStorage.chapters.sort((a, b) => {return a.timestamp.isBefore(b.timestamp);} );
        DataStorage.chapterArrayDirty = false;
      }
      resolve(DataStorage.chapters);
    });
  }

  photoIdExists(id) {
    return DataStorage.photoIds[id] === true;
  }

  runIdExists(id) {
    return DataStorage.runIds[id] === true;
  }

  addChapter(chapter:ChapterData) {
    DataStorage.chapterIds[chapter.id] = chapter;

    if(chapter.photos) {
      chapter.photos.forEach((photo) => {
        DataStorage.photoIds[photo.id] = true;
      });
    }
    if(chapter.run) {
      DataStorage.runIds[chapter.run.id] = true;
    }

    DataStorage.chapterArrayDirty = true;
  }

  public preloadRunning(runs:RunningData[]) {
    //TODO: Super ad-hoc. Consider formalizing this process.
    var chapter1 = new ChapterData('running');
    chapter1.addRun(runs[0]);
    chapter1.addTextDescription("That was a hard one! But I'm glad I did it.");
    this.addChapter(chapter1);
    var chapter2 = new ChapterData('running');
    chapter2.addRun(runs[3]);
    chapter2.run.displayPace = true;
    chapter2.addEmotion('sad');
    this.addChapter(chapter2);
  }

  public preloadDiy(photos:PhotoData[]) {
    //TODO: Super ad-hoc. Consider formalizing this process.
    var chapter1 = new ChapterData('diy');
    chapter1.addPictures([photos[0]]);
    chapter1.addTextDescription('Spent a lot of time today! Feeling good about my progress.');
    chapter1.addEmotion('happy');
    chapter1.addMinutesWorked(240);
    this.addChapter(chapter1);
    var chapter2 = new ChapterData('diy');
    chapter2.addPictures([photos[2], photos[3]]);
    chapter2.addExpenses(30);
    chapter2.addMinutesWorked(30);
    this.addChapter(chapter2);
  }
}
