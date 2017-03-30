import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AddDetailPage } from '../add-detail/add-detail';
import { ChapterData } from '../../models/chapter-data';
import { RunningData } from '../../models/running-data';
import { StravaRuns } from '../../providers/strava-runs';
import { DataStorage } from '../../providers/data-storage';

/*
  Generated class for the WriteRunning page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var mapboxgl;

@Component({
  selector: 'page-write-running',
  templateUrl: 'write-running.html',
  providers: [ StravaRuns, DataStorage ]
})
export class WriteRunningPage {
  allRuns: RunningData[] = [];
  runIdSelected: any = {};
  distanceRan:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform, private runs : StravaRuns, private dataStore:DataStorage, private ngz:NgZone) {
    //TODO: possibly load this from a file, or something more scretive...
    //Checking into the repository because lazy.
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGVwc3RlaW4iLCJhIjoiY2owMWpnOXN5MDF1OTMycW52bGg1bnludyJ9.ss9hA0RVl_2P9UuOtMLZvQ';
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.runs.getRuns().then((runs:RunningData[]) => {
          this.allRuns = runs;
        });
    });
  }

  ionViewDidEnter() {
    this.showMap();
  }

  ionViewWillLeave() {
      this.hideMap();
  }

  showMap() {
    this.platform.ready().then(() => {
      // for(let r of this.allRuns) {
      //   r.getDynamicMap();
      // }
    });
  }

  hideMap() {
    
  }

  selectedRun(id) {
    //Ensure the data binding updates when a new run is clicked on.
    this.ngz.run(() => this.distanceRan = this.runs.getRunFromId(id).distance);
  }

  //For reasons I don't understand, the data binding will revert to a string unless this is undertaken.
  set distanceStr(s:string) {
    this.distanceRan = parseFloat(s);
  }

  get distanceStr() {
    return this.distanceRan.toString();
  }

  isDisabled(id) {
    return this.dataStore.runIdExists(id);
  }

  logForm() {
    let chapterData: ChapterData = new ChapterData();
    let run:RunningData = this.runs.getRunFromId(this.runIdSelected['run']);
    run.distance = this.distanceRan; //In case the distance entered is is different
    chapterData.addRun(run);
    this.navCtrl.push(AddDetailPage, {chapterData:chapterData});
  }

}
