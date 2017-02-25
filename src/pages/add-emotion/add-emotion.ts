import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the AddEmotion page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-emotion',
  templateUrl: 'add-emotion.html'
})
export class AddEmotionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEmotionPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  logEmotion(emotion) {
   this.viewCtrl.dismiss(emotion);
  }
}
