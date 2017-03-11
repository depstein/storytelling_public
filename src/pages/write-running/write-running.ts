import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AddDetailPage } from '../add-detail/add-detail';
import { ChapterData } from '../../models/chapter-data';
import { RunningData } from '../../models/running-data';
import { StravaRuns } from '../../providers/strava-runs';

/*
  Generated class for the WriteRunning page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var mapboxgl;

@Component({
  selector: 'page-write-running',
  templateUrl: 'write-running.html',
  providers: [ StravaRuns ]
})
export class WriteRunningPage {
  allRuns: RunningData[] = [];
  formValues: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform, private runs : StravaRuns) {
    //TODO: possibly load this from a file, or something more scretive...
    //Checking into the repository because lazy.
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGVwc3RlaW4iLCJhIjoiY2owMWpnOXN5MDF1OTMycW52bGg1bnludyJ9.ss9hA0RVl_2P9UuOtMLZvQ';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WriteRunningPage');
    this.platform.ready().then(() => {
      this.runs.getRuns().then((runs:RunningData[]) => {
          this.allRuns = runs;
          console.log(this.allRuns);
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

  logForm() {
    let chapterData: ChapterData = new ChapterData();
    chapterData.addRun(this.runs.getRunFromId(this.formValues['run']));
    this.navCtrl.push(AddDetailPage, {chapterData:chapterData});
  }

}
