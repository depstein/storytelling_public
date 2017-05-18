import { Component, Input } from '@angular/core';
import { ChapterData } from '../../models/chapter-data';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ReviewChapterPage } from '../../pages/review-chapter/review-chapter';

/**
 * Generated class for the ChapterCardComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'chapter-card',
  templateUrl: 'chapter-card.html'
})
export class ChapterCardComponent {
  @Input() chapterData: ChapterData;


  constructor(public navCtrl: NavController, public navParams: NavParams, private platform : Platform) {
  }

  reviewChapter() {
    this.navCtrl.push(ReviewChapterPage, {chapterData:this.chapterData, addedChapter:false});
  }

}
