import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { RunningData } from '../models/running-data';
import { DataStorage } from './data-storage';

/*
  Generated class for the StravaRuns provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StravaRuns {
  private static stravaTokenSet:boolean = false;

  //TODO: should this be static?
  runningData:RunningData[] = [];

  constructor(private platform : Platform, private http:Http) {
    if(DataStorage.useWebserver && !StravaRuns.stravaTokenSet) {
      //If there's no access token, set it based on our default.
      //TODO don't keep the access token in a file...
      this.http.get(DataStorage.webserver + '/storytelling_strava/access_token/' + DataStorage.weblogin['account'], new RequestOptions({withCredentials: true})).subscribe(res => {
        StravaRuns.stravaTokenSet = true;
        console.log('Strava token set');
      }, err => {
        this.http.post(DataStorage.webserver + '/storytelling_strava/access_token/' + DataStorage.weblogin['account'], {strava_access_token:'6243b58b988d479ec54a6e87b7ae9c0e61acd56b'}, new RequestOptions({withCredentials: true})).subscribe(res => {
          StravaRuns.stravaTokenSet = true;
          console.log('Strava token set');
        });
      });
    }
  }

  private runDatumFromRun(runData:{}) {
    var runDatum = new RunningData(runData['id']);
    runDatum.addRun(runData);
    return runDatum;
  }

  private parseRunsFromJson(runLogs):RunningData[] {
    var runs:RunningData[] = [];
    for(var i=0;i<runLogs.length;i++) {
      runs.push(this.runDatumFromRun(runLogs[i]));
    }
    return runs;
  }

  private generateFakeRuns() {
    return new Promise((resolve, reject) => {
      this.http.get('assets/data/running_data.json').subscribe(res => {
        this.runningData = this.parseRunsFromJson(res.json())
        resolve(this.runningData);
      })
    });
  }

  getRunFromId(id:string) {
    for(let r of this.runningData) {
      if(r.id == id) {
        return r;
      }
    }
    return null;
  }

  getRuns() {
    return new Promise((resolve, reject) => {
      if(DataStorage.useWebserver) {
        this.http.get(DataStorage.webserver + '/storytelling_strava/runs/' + DataStorage.weblogin['account'], new RequestOptions({withCredentials: true})).subscribe(res => {
          this.runningData = this.parseRunsFromJson(res.json()['runs']);
          resolve(this.runningData);
        });
      }
      else {
        if(this.runningData.length != 0) {
          resolve(this.runningData);
        }
        this.generateFakeRuns().then((runs:RunningData[]) => {
            this.runningData = runs;
            resolve(this.runningData);
          }, (error) => {
            reject(error);
          });
      }
    });
  }
}
