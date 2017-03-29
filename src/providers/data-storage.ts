import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ChapterData } from '../models/chapter-data';
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
  static chapters:ChapterData[] = [];
  static photoIds:{} = {};
  static runIds:{} = {};

  constructor(public http: Http) {
    console.log('Hello DataStorage Provider');
  }

  getAllChapters() {
    return new Promise((resolve, reject) => {
      resolve(DataStorage.chapters);
    });
  }

  photoIdExists(id) {
    console.log(DataStorage.photoIds[id] === true);
    return DataStorage.photoIds[id] === true;
  }

  runIdExists(id) {
    return DataStorage.runIds[id] === true;
  }

  addChapter(chapter:ChapterData) {
    DataStorage.chapters.push(chapter);
    if(chapter.photos) {
      chapter.photos.forEach((photo) => {
        DataStorage.photoIds[photo.id] = true;
      });
    }
    if(chapter.run) {
      DataStorage.runIds[chapter.run.id] = true;
    }
  }
}
