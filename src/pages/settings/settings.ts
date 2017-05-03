import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [ UserData ]
})
export class SettingsPage {
  uid:string = null;
  storyType:string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userData:UserData, private viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    this.userData.getUid().then((uid:string) => {
      this.uid = uid;
    });

    this.userData.getStoryType().then((storyType:string) => {
      this.storyType = storyType;
    });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
