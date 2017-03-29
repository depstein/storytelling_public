import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChapterData } from '../../models/chapter-data';
import { ViewChapterComponent } from '../../components/view-chapter/view-chapter';

/*
  Generated class for the ReviewChapter page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-review-chapter',
  templateUrl: 'review-chapter.html'
})
export class ReviewChapterPage {
  @Input('view-chapter') viewChapter: ViewChapterComponent;
  chapterData:ChapterData;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.chapterData = this.navParams.get("chapterData");
    console.log(this.chapterData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewChapterPage');
  }

}
