import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ChapterData } from '../../models/chapter-data';
import { AddTextDescriptionPage } from '../add-text-description/add-text-description';
import { AddExpensesPage } from '../add-expenses/add-expenses';
import { AddEmotionPage } from '../add-emotion/add-emotion';
import { ReviewChapterPage } from '../review-chapter/review-chapter'

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

  getTextDescriptionColor() {
    return this.chapterData.textDescription ? "secondary" : "default";
  }

  getExpensesColor() {
    return this.chapterData.expenses ? "secondary" : "default";
  }

  getEmotionColor() {
    return this.chapterData.emotion ? "secondary" : "default";
  }

  reviewChapter() {
    this.navCtrl.push(ReviewChapterPage, {chapterData:this.chapterData});
  }

}
