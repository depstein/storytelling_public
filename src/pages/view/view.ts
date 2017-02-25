import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

/*
  Generated class for the View page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-view',
  templateUrl: 'view.html'
})
export class ViewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPage');
  }

}
