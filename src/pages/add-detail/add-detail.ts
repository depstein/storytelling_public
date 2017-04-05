import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ChapterData } from '../../models/chapter-data';
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
  params:any = {};
  description:string = null;
  descriptionPrompt:string = "What happened? [TODO: Ask Mira about better prompts here]";
  //Variables on whether to hide each parameter
  hidePhotos = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataStore:DataStorage, public modalCtrl: ModalController) {
    this.chapterData = this.navParams.get("chapterData");
    this.params = {chapterData: this.chapterData};
    //Set all the variables on hiding parameters
    this.hidePhotos = this.chapterData.chapterType == 'diy' && this.chapterData.eventType == 'regular';
  }

  ionViewDidLoad() {
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
    if(this.description != null) {
      this.chapterData.addTextDescription(this.description);
    }
    this.dataStore.addChapter(this.chapterData);
    this.navCtrl.push(ReviewChapterPage, {chapterData:this.chapterData});
  }

}
