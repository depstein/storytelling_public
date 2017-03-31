import { Component, Input } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ChapterData } from '../../models/chapter-data';
import { ViewChapterComponent } from '../../components/view-chapter/view-chapter';
import { SocialSharing } from '@ionic-native/social-sharing';

/*
  Generated class for the ReviewChapter page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-review-chapter',
  templateUrl: 'review-chapter.html',
  providers: [ SocialSharing ]
})
export class ReviewChapterPage {
  @Input('view-chapter') viewChapter: ViewChapterComponent;
  chapterData:ChapterData;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform : Platform, private social:SocialSharing) {
    this.chapterData = this.navParams.get("chapterData");
  }

  ionViewDidLoad() {
  }

  share() {
    if(this.platform.is('cordova')) {
      this.social.share(this.chapterData.getMessage(), "", this.chapterData.getImages(), this.chapterData.getUrl()).then(() => {
        console.log('Shared correctly!');
      }).catch((reason) => {
        console.log('Something bad happened');
        console.log(reason);
      });
    }
  }

  completeChapter() {
    this.navCtrl.popToRoot();
    this.navCtrl.parent.select(1);
  }

}
