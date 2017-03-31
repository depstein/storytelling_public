import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { RunningData } from '../../models/running-data';

/*
  Generated class for the AddPace page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-pace',
  templateUrl: 'add-pace.html'
})
export class AddPacePage {
  value = {};
  display = {};
  runData:RunningData = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
    this.runData = this.navParams.get("runData");
    this.value['pace'] = this.runData.paceReadable;
    this.value['duration'] = this.runData.durationReadable;
  }

  ionViewDidLoad() {
  }

  logForm() {
    //TODO: consider validating whether the values entered actually match the format.
    this.viewCtrl.dismiss({'display':this.display, 'value':this.value});
  }
}
