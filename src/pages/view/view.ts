import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { LocalPhotos } from '../../providers/local-photos';

/*
  Generated class for the View page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
  providers: [ LocalPhotos ]
})
export class ViewPage {

  allImages: any = [];
  formValues: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private photos:LocalPhotos) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPage');
  }

  tryRequestAuthorization() {
    this.allImages = this.photos.getPhotos();
  }

  logForm() {
    console.log(JSON.stringify(this.formValues));
  }

}
