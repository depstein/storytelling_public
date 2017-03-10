import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { WriteRunningPage } from '../write-running/write-running';
import { WriteDiyPage } from '../write-diy/write-diy';

/*
  Generated class for the Write page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-write',
  templateUrl: 'write.html'
})
export class WritePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform) {}

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      console.log('ionViewDidLoad WritePage');
    });
  }

  writeDiyStory() {
    this.navCtrl.push(WriteDiyPage, {});
  }

  writeRunningStory() {
    this.navCtrl.push(WriteRunningPage, {});
  }

}
