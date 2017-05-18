import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ChapterData } from '../models/chapter-data';

/*
  Generated class for the VegaSpecification provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class VegaSpecification {

  constructor(public http: Http) {
  }

  public getVegaSpecification(chapterData:ChapterData[]) {
    //TODO: do something with the Chapter Data
    return new Promise((resolve, reject) => {
      this.http.get('assets/data/vega_spec.json').subscribe(res => {
        var vegaSpec = res.json();
        chapterData.sort((a, b) => {
          return a.timestamp.diff(b.timestamp);
        });
        var cumulative = 0;
        var vegaData = chapterData.map((chapter:ChapterData) => {
          if(chapter.chapterType == 'running') {
            if(chapter.run && chapter.run.distance) {
              cumulative += chapter.run.distance;
            }
          } else { //diy
            if(chapter.minutesWorked) {
              cumulative += chapter.minutesWorked;
            }
          }
          return {"id":chapter.id, "date":chapter.timestamp.toDate(), "amount":cumulative};
        });

        //TODO: stopgap until I properly impmlement story starts
        if(chapterData.length > 0) {
          vegaData.unshift({"id": chapterData[0].id, "date": chapterData[0].timestamp.subtract(5, "days").toDate(), "amount":0});
        }
        vegaSpec.data[0].values = vegaData;
        resolve(vegaSpec);
      })
    });
  }

}
