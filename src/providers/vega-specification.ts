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
        var vegaData = chapterData.map((chapter:ChapterData) => {
          if(chapter.chapterType == 'running') {
            return {"id":chapter.id, "date":chapter.timestampStr, "amount":chapter.run.distance};
          } else {
            return {"id":chapter.id, "date":chapter.timestampStr, "amount":chapter.minutesWorked};
          }
        });
        vegaSpec.data[0].values = vegaData;
        resolve(vegaSpec);
      })
    });
  }

}
