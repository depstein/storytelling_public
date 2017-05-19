import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
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
  static webserver:string = 'http://localhost:8080';
  static weblogin:{} = {account:'test', password:'fitbit1111'};
  private static loggedIn:boolean = false;

  constructor(public http: Http) {
    if(!DataStorage.loggedIn) {
      this.http.get(DataStorage.webserver + '/accounts', new RequestOptions({withCredentials: true})).subscribe(res => {
        if(res.json()['accounts'].includes(DataStorage.weblogin['account'])) {
          //Log in!
          this.http.post(DataStorage.webserver + '/login', DataStorage.weblogin, new RequestOptions({withCredentials: true})).subscribe(res => {
            DataStorage.loggedIn = true;
            console.log('Logged in to the webserver');
          });
        } else {
          //Make the account and log in
          this.http.post(DataStorage.webserver + '/accounts', DataStorage.weblogin, new RequestOptions({withCredentials: true})).subscribe(res => {
            this.http.post(DataStorage.webserver + '/login', DataStorage.weblogin, new RequestOptions({withCredentials: true})).subscribe(res => {
                DataStorage.loggedIn = true;
                console.log('Logged in to the webserver');
            });
          });
        }
      });
    }
  }

  serverCall(requestType, url, callback, body?) {
    switch(requestType) {
      case 'get':
      this.http.get(DataStorage.webserver + url, new RequestOptions({withCredentials: true})).subscribe(callback());
      break;
      case 'post':
      break;
    }
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

        DataStorage.chapters.sort((a, b) => {return -a.timestamp.diff(b.timestamp);} );
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

  deleteChapter(chapter:ChapterData) {
    delete DataStorage.chapterIds[chapter.id];

    if(chapter.photos) {
      chapter.photos.forEach((photo) => {
        DataStorage.photoIds[photo.id] = false;
      });
    }
    if(chapter.run) {
      DataStorage.runIds[chapter.run.id] = false;
    }

    DataStorage.chapterArrayDirty = true;
  }

  public preloadRunning(runs:RunningData[]) {
    //TODO: Super ad-hoc. Consider formalizing this process.
    var chapter1 = new ChapterData('running');
    chapter1.addRun(runs[0]);
    chapter1.addTextDescription("That was a hard one! But I'm glad I did it.");
    chapter1.addTitle('A hard run');
    chapter1.setImportance(true);
    chapter1.addDate('2017-05-01');
    this.addChapter(chapter1);
    var chapter2 = new ChapterData('running');
    chapter2.addRun(runs[3]);
    chapter2.addTitle('An unfortunate run');
    chapter2.run.displayPace = true;
    chapter2.addEmotion('sad');
    chapter2.addDate('2017-05-13');
    this.addChapter(chapter2);
  }

  public preloadDiy(photos:PhotoData[]) {
    //TODO: Super ad-hoc. Consider formalizing this process.
    var chapter1 = new ChapterData('diy');
    chapter1.addPictures([photos[0], photos[2]]);
    chapter1.addTextDescription('Spent a lot of time today! Feeling good about my progress.');
    chapter1.addEmotion('happy');
    chapter1.addTitle('A good work session');
    chapter1.addMinutesWorked(240);
    chapter1.setImportance(true);
    chapter1.addDate('2017-05-01');
    this.addChapter(chapter1);
    var chapter2 = new ChapterData('diy');
    chapter2.addPictures([photos[3]]);
    chapter2.addTitle('A lot of progress');
    chapter2.addExpenses(30);
    chapter2.addMinutesWorked(30);
    chapter2.addDate('2017-05-13');
    this.addChapter(chapter2);
  }
}
