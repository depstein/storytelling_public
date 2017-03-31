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
}
