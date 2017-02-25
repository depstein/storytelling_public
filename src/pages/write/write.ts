import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocalPhotos } from '../../providers/local-photos';
import { AddDetailPage } from '../add-detail/add-detail';
import { ChapterData } from '../../models/chapter-data';
import { PhotoData } from '../../models/photo-data';

/*
  Generated class for the Write page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-write',
  templateUrl: 'write.html',
  providers: [ LocalPhotos ]
})
export class WritePage {

  allImages: PhotoData[] = [];
  formValues: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private photos : LocalPhotos) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad WritePage');
    this.allImages = this.photos.getPhotos();
  }

  logForm() {
    let chapterData: ChapterData = new ChapterData();
    chapterData.addPictures(this.photos.getPhotosFromIDs(Object.keys(this.formValues)));
    this.navCtrl.push(AddDetailPage, {chapterData:chapterData});
  }

}
