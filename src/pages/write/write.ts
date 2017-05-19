import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { WriteRunningPage } from '../write-running/write-running';
import { WriteDiyPage } from '../write-diy/write-diy';
import { UserData } from '../../providers/user-data';

/*
  Generated class for the Write page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-write',
  templateUrl: 'write.html',
  providers: [ UserData ]
})
export class WritePage {
  storyType:string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform, private userData:UserData) {}

  ionViewDidLoad() {
    this.platform.ready().then(() => {
        this.userData.getStoryType().then((storyType:string) => {
        this.storyType = storyType;
      });
    });
  }

  writeChapter(chapterType:string = this.storyType) {
    if(chapterType == 'diy') {
      this.navCtrl.push(WriteDiyPage, {});
    } else {
      this.navCtrl.push(WriteRunningPage, {});
    }
  }
}
