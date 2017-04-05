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
  pictureIdsSelected: any = {};
  minutesWorked:number = 0;
  public static preloadFakeData:boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform, private photos : LocalPhotos, private dataStore:DataStorage) {}

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.photos.getPhotos().then((photos:PhotoData[]) => {
        this.allImages = photos;
        if(WriteDiyPage.preloadFakeData) {
          this.dataStore.preloadDiy(this.allImages);
          //Don't preload again every time this page is accessed.
          WriteDiyPage.preloadFakeData = false;
        }
      }, (error) => {
        console.log(error);
      });
    });
  }

  isDisabled(id) {
    return this.dataStore.photoIdExists(id);
  }

  //For reasons I don't understand, the data binding will revert to a string unless this is undertaken.
  set minuteStr(s:string) {
    this.minutesWorked = parseInt(s);
  }

  get minuteStr() {
    return this.minutesWorked.toString();
  }

  logForm() {
    let chapterData: ChapterData = new ChapterData('diy');
    chapterData.addMinutesWorked(this.minutesWorked);
    chapterData.addPictures(this.photos.getPhotosFromIDs(Object.keys(this.pictureIdsSelected)));
    this.navCtrl.push(AddDetailPage, {chapterData:chapterData, chapterType:'diy'});
  }

}
