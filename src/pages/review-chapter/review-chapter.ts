import { Component, Input } from '@angular/core';
import { NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { ChapterData } from '../../models/chapter-data';
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
  chapterData:ChapterData;
  addedChapter:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform : Platform, private toastCtrl: ToastController, private social:SocialSharing) {
    this.chapterData = this.navParams.get("chapterData");
    this.addedChapter = this.navParams.get("addedChapter");
  }

  ionViewDidLoad() {
    if(this.addedChapter) {
      let toast = this.toastCtrl.create({
        message: 'Your chapter has been added to your story!',
        duration: 3000,
        position: 'top',
        dismissOnPageChange: true
      });

      toast.present();
    }
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

}
