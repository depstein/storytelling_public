import { Component, Input } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ChapterData } from '../../models/chapter-data';
import { ViewChapterComponent } from '../../components/view-chapter/view-chapter';
import { DataStorage } from '../../providers/data-storage';

/*
  Generated class for the View page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
  providers: [ DataStorage ]
})
export class ViewPage {
  @Input('view-chapter') viewChapter: ViewChapterComponent;
  chapters:ChapterData[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private dataStore:DataStorage) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPage');
    this.dataStore.getAllChapters().then((value:ChapterData[]) => {
      this.chapters = value;
    }).catch(() => {
      //TODO: there's probably an error. Maybe present that?
      this.chapters = [];
    });
  }

}
