import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { RunningData } from '../models/running-data';

/*
  Generated class for the StravaRuns provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StravaRuns {
  runningData:RunningData[] = [];

  constructor(private platform : Platform, private http:Http) {}

  private runDatumFromRun(id:string, timestamp:any, distance:number, map_polyline:string, duration:number) {
    var runDatum = new RunningData(id);
    runDatum.addRun(timestamp, distance, map_polyline, duration);
    return runDatum;
  }

  private generateFakeRuns() {
    return new Promise((resolve, reject) => {
      this.http.get('assets/data/running_data.json').subscribe(res => {
        var runs:RunningData[] = [];
        var runLogs = res.json();
        console.log(runLogs);
        for(var i=0;i<runLogs.length;i++) {
          runs.push(this.runDatumFromRun(runLogs[i]['id'], runLogs[i]['timestamp'], runLogs[i]['distance'], runLogs[i]['map_polyline'], runLogs[i]['duration']));
        }
        resolve(runs);
      })
    });
  }

  getRuns() {
    return new Promise((resolve, reject) => {
      if(this.runningData.length != 0) {
        resolve(this.runningData);
      }

      //TODO: get from the database, rather than from the cached file.
      this.generateFakeRuns().then((runs:RunningData[]) => {
        this.runningData = runs;
        resolve(this.runningData);
      }, (error) => {
        reject(error);
      })
    });
  }

}
