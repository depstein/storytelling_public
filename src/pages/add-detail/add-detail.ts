import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ChapterData } from '../../models/chapter-data';
import { AddTextDescriptionPage } from '../add-text-description/add-text-description';
import { AddExpensesPage } from '../add-expenses/add-expenses';
import { AddEmotionPage } from '../add-emotion/add-emotion';
import { AddPacePage } from '../add-pace/add-pace';
import { ReviewChapterPage } from '../review-chapter/review-chapter';
import { DataStorage } from '../../providers/data-storage';

/*
  Generated class for the AddDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-detail',
  templateUrl: 'add-detail.html',
  providers: [ DataStorage ]
})
export class AddDetailPage {
  chapterData:ChapterData;
  chapterType:string;
  params:any = {};
  textDescriptionPage:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataStore:DataStorage, public modalCtrl: ModalController) {
    this.textDescriptionPage = AddTextDescriptionPage;
    this.chapterData = this.navParams.get("chapterData");
    this.chapterType = this.navParams.get("chapterType");
    this.params = {chapterData: this.chapterData};
  }

  ionViewDidLoad() {
  }

  openTextDescription() {
    let modal = this.modalCtrl.create(AddTextDescriptionPage);
    modal.onDidDismiss(data => {
      this.chapterData.addTextDescription(data);
    })
    modal.present();
  }

  openExpenses() {
    let modal = this.modalCtrl.create(AddExpensesPage);
    modal.onDidDismiss(data => {
      this.chapterData.addExpenses(data);
    })
    modal.present();
  }

  openEmotion() {
    let modal = this.modalCtrl.create(AddEmotionPage);
    modal.onDidDismiss(data => {
      this.chapterData.addEmotion(data);
    })
    modal.present();
  }

  openPace() {
    let modal = this.modalCtrl.create(AddPacePage, {runData:this.chapterData.run});
    modal.onDidDismiss(data => {
      if(this.chapterData.run) {
        this.chapterData.run.addPaceDuration(data);
      }
    })
    modal.present();
  }

  getTextDescriptionColor() {
    return this.chapterData.textDescription ? "light" : "default";
  }

  getExpensesColor() {
    return this.chapterData.expenses ? "light" : "default";
  }

  getEmotionColor() {
    return this.chapterData.emotion ? "light" : "default";
  }

  getPaceColor() {
    return (this.chapterData.run.displayDuration || this.chapterData.run.displayPace) ? "light" : "default";
  }

  reviewChapter() {
    this.dataStore.addChapter(this.chapterData);
    this.navCtrl.push(ReviewChapterPage, {chapterData:this.chapterData});
  }

}
