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
  temperature:number = null;
  weather_icon:string = null;

  params:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataStore:DataStorage, public modalCtrl: ModalController) {
    this.chapterData = this.navParams.get("chapterData");
    this.addMode = this.navParams.get("addMode");
    this.title = this.chapterData.title;
    this.date = this.chapterData.timestampISO;
    if(this.chapterData.chapterType == 'running' && this.chapterData.run) {
      this.distance = this.chapterData.run.distanceStr;
      this.duration = this.chapterData.run.durationReadable;
      this.temperature = this.chapterData.run.temperature;
      this.weather_icon = this.chapterData.run.weather_icon;
      //Trim down the icons somewhat... there's way too many!
      switch(this.weather_icon) {
        case 'wind':
        case 'fog':
        this.weather_icon = 'cloudy';
        break;
        case 'sleet':
        this.weather_icon = 'snow';
        case 'clear-night':
        case 'partly-coudy-night':
        this.weather_icon = this.weather_icon.replace('night', 'day');
        break;
      }
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
    if(this.temperature != null) {
      this.chapterData.run.addTemperature(this.temperature);
    }
    if(this.weather_icon != null) {
      this.chapterData.run.addWeatherIcon(this.weather_icon);
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
