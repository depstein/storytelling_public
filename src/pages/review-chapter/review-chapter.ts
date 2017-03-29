import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChapterData } from '../../models/chapter-data';
import { ViewChapterComponent } from '../../components/view-chapter/view-chapter';
import { DataStorage } from '../../providers/data-storage';

/*
  Generated class for the ReviewChapter page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-review-chapter',
  templateUrl: 'review-chapter.html',
  providers: [ DataStorage ]
})
export class ReviewChapterPage {
  @Input('view-chapter') viewChapter: ViewChapterComponent;
  chapterData:ChapterData;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataStore:DataStorage) {
    this.chapterData = this.navParams.get("chapterData");
    console.log(this.chapterData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewChapterPage');
  }

  completeChapter() {
    this.dataStore.addChapter(this.chapterData);
    this.navCtrl.popToRoot();
    this.navCtrl.parent.select(1);
  }

}
