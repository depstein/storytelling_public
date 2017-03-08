import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { LocalPhotos } from '../../providers/local-photos';
import { StravaRuns } from '../../providers/strava-runs';
import { AddDetailPage } from '../add-detail/add-detail';
import { ChapterData } from '../../models/chapter-data';
import { PhotoData } from '../../models/photo-data';
import { RunningData } from '../../models/running-data';

/*
  Generated class for the Write page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-write',
  templateUrl: 'write.html',
  providers: [ LocalPhotos, StravaRuns ]
})
export class WritePage {

  allImages: PhotoData[] = [];
  allRuns: RunningData[] = [];
  formValues: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform, private photos : LocalPhotos, private runs : StravaRuns) {}

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      console.log('ionViewDidLoad WritePage');
      this.photos.getPhotos().then((photos:PhotoData[]) => {
        this.allImages = photos;
        console.log(this.allImages);
        this.runs.getRuns().then((runs:RunningData[]) => {
          this.allRuns = runs;
          console.log(this.allRuns);
        })
      }, (error) => {
        console.log(error);
      });
    });
  }

  logForm() {
    let chapterData: ChapterData = new ChapterData();
    chapterData.addPictures(this.photos.getPhotosFromIDs(Object.keys(this.formValues)));
    this.navCtrl.push(AddDetailPage, {chapterData:chapterData});
  }

}
