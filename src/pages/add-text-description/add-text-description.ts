import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  NOTENOTE: Deprecating this. Probably won't use it.
  
  Generated class for the AddTextDescription page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-text-description',
  templateUrl: 'add-text-description.html'
})
export class AddTextDescriptionPage {
  description = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {}

  ionViewDidLoad() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  logForm() {
   this.viewCtrl.dismiss(this.description['text']);
  }
}
