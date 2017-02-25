import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the AddExpenses page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-expenses',
  templateUrl: 'add-expenses.html'
})
export class AddExpensesPage {
  expenses = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddExpensesPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  logForm() {
   this.viewCtrl.dismiss(this.expenses['amount']);
  }
}
