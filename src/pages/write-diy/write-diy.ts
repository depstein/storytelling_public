import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { LocalPhotos } from '../../providers/local-photos';
import { AddDetailPage } from '../add-detail/add-detail';
import { ViewMapPage } from '../view-map/view-map';
import { ChapterData } from '../../models/chapter-data';
import { PhotoData } from '../../models/photo-data';

/*
  Generated class for the WriteDiy page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-write-diy',
  templateUrl: 'write-diy.html',
  providers: [ LocalPhotos ]
})
export class WriteDiyPage {

  allImages: PhotoData[] = [];
  formValues: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform, private photos : LocalPhotos) {}

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      console.log('ionViewDidLoad WritePage');
      this.photos.getPhotos().then((photos:PhotoData[]) => {
        this.allImages = photos;
        console.log(this.allImages);
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
