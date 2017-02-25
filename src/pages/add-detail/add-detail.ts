import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChapterData } from '../../models/chapter-data';

/*
  Generated class for the AddDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-detail',
  templateUrl: 'add-detail.html'
})
export class AddDetailPage {
  chapterData:ChapterData;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.chapterData = this.navParams.get("chapterData");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDetailPage');
  }

}
