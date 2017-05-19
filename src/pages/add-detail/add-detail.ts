import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ChapterData } from '../../models/chapter-data';
import { AddPhotosPage } from '../add-photos/add-photos';
import { ReviewChapterPage } from '../review-chapter/review-chapter';
import { DataStorage } from '../../providers/data-storage';

/*
  Generated class for the AddDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-detail',
  templateUrl: 'add-detail.html',
  providers: [ DataStorage ]
})
export class AddDetailPage {
  chapterData:ChapterData;
  addMode:boolean = false;
  eventType:string = "progress";
  title:string = null;
  date:string = "2017-01-01";
  description:string = null;
  photos:any = null;
  distance:string = null;
  duration:number = null;
  workTime:number = null;

  params:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataStore:DataStorage, public modalCtrl: ModalController) {
    this.chapterData = this.navParams.get("chapterData");
    this.addMode = this.navParams.get("addMode");
    this.title = this.chapterData.title;
    this.date = this.chapterData.timestampISO;
    if(this.chapterData.chapterType == 'running' && this.chapterData.run) {
      this.distance = this.chapterData.run.distanceStr;
      this.duration = this.chapterData.run.durationReadable;
    }
    this.params = {chapterData: this.chapterData};
  }

  ionViewDidLoad() {
  }

  saveChapter() {
    this.chapterData.addEventType(this.eventType);
    this.chapterData.addTitle(this.title);
    this.chapterData.addDate(this.date);
    if(this.description != null) {
      this.chapterData.addTextDescription(this.description);
    }
    if(this.distance != null) {
      this.chapterData.run.addDistance(parseFloat(this.distance));
    }
    if(this.duration != null) {
      this.chapterData.run.addDuration(this.duration * 60);
    }
    if(this.workTime != null) {
      this.chapterData.addMinutesWorked(this.workTime);
    }

    if(this.addMode) {
      this.dataStore.addChapter(this.chapterData);
      this.navCtrl.popToRoot().then(() => {
        this.navCtrl.push(ReviewChapterPage, {chapterData:this.chapterData, addedChapter:true});
      });
    } else {
      this.navCtrl.popToRoot();
    }
  }

  addPhotos() {
    let modal = this.modalCtrl.create(AddPhotosPage, {idsSelected: this.photos});
    modal.onDidDismiss(data => {
      if(data) {
        this.chapterData.addPictures(data);
        this.photos = {};
        data.forEach((d) => {this.photos[d.id] = true;});
      }
    })
    modal.present();
  }

}
