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
  static chapters:ChapterData[] = [];

  constructor(public http: Http) {
    console.log('Hello DataStorage Provider');
  }

  getAllChapters() {
    return new Promise((resolve, reject) => {
      resolve(DataStorage.chapters);
    });
  }

  addChapter(chapter:ChapterData) {
    DataStorage.chapters.push(chapter);
  }
}
