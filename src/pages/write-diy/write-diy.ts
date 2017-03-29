import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { LocalPhotos } from '../../providers/local-photos';
import { AddDetailPage } from '../add-detail/add-detail';
import { ChapterData } from '../../models/chapter-data';
import { PhotoData } from '../../models/photo-data';
import { DataStorage } from '../../providers/data-storage';

/*
  Generated class for the WriteDiy page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-write-diy',
  templateUrl: 'write-diy.html',
  providers: [ LocalPhotos, DataStorage ]
})
export class WriteDiyPage {

  allImages: PhotoData[] = [];
  formValues: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform, private photos : LocalPhotos, private dataStore:DataStorage) {}

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.photos.getPhotos().then((photos:PhotoData[]) => {
        this.allImages = photos;
      }, (error) => {
        console.log(error);
      });
    });
  }

  isDisabled(id) {
    return this.dataStore.photoIdExists(id);
  }

  logForm() {
    let chapterData: ChapterData = new ChapterData();
    chapterData.addPictures(this.photos.getPhotosFromIDs(Object.keys(this.formValues)));
    this.navCtrl.push(AddDetailPage, {chapterData:chapterData});
  }

}
