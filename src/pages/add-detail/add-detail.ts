import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ChapterData } from '../../models/chapter-data';
import { AddTextDescriptionPage } from '../add-text-description/add-text-description';

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
  params:any = {};
  textDescriptionPage:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.textDescriptionPage = AddTextDescriptionPage;
    this.chapterData = this.navParams.get("chapterData");
    this.params = {chapterData: this.chapterData};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDetailPage');
  }

  openTextDescription() {
    let modal = this.modalCtrl.create(AddTextDescriptionPage);
    modal.onDidDismiss(data => {
      this.chapterData.addTextDescription(data);
    })
    modal.present();
  }

}
