import { Component, Input } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ChapterData } from '../../models/chapter-data';
import { ViewChapterComponent } from '../../components/view-chapter/view-chapter';
import { DataStorage } from '../../providers/data-storage';
import { SocialSharing } from '@ionic-native/social-sharing';

/*
  Generated class for the ReviewChapter page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-review-chapter',
  templateUrl: 'review-chapter.html',
  providers: [ DataStorage, SocialSharing ]
})
export class ReviewChapterPage {
  @Input('view-chapter') viewChapter: ViewChapterComponent;
  chapterData:ChapterData;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform : Platform, private dataStore:DataStorage, private social:SocialSharing) {
    this.chapterData = this.navParams.get("chapterData");
  }

  ionViewDidLoad() {
  }

  shareViaFacebook() {
    if(this.platform.is('cordova')) {
      this.social.share("<html><body>THIS IS THE <strong>best!</strong>...<br>AGAIN, with feeling!</body></html>", "", this.chapterData.run.staticMapUrl).then(() => {
        console.log('Shared correctly!');
      }).catch((reason) => {
        console.log('Something bad happened');
        console.log(reason);
      });
    }
  }

  completeChapter() {
    this.dataStore.addChapter(this.chapterData);
    this.navCtrl.popToRoot();
    this.navCtrl.parent.select(1);
  }

}
