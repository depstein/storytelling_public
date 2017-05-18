import { Component, Input } from '@angular/core';
import { ChapterData } from '../../models/chapter-data';
import { NavController, NavParams, Platform, ActionSheetController, AlertController } from 'ionic-angular';
import { ReviewChapterPage } from '../../pages/review-chapter/review-chapter';
import { AddDetailPage } from '../../pages/add-detail/add-detail';
import { DataStorage } from '../../providers/data-storage';

/**
 * Generated class for the ChapterCardComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'chapter-card',
  templateUrl: 'chapter-card.html',
  providers: [ DataStorage ]
})
export class ChapterCardComponent {
  @Input() chapterData: ChapterData;
  actionSheetVisible:boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, private platform : Platform, private actionSheetCtrl:ActionSheetController, private alertCtrl:AlertController, private dataStore:DataStorage) {
  }

  reviewChapter() {
    //This feels like a hack, but it seems to work in practice. I'll take it :-)
    if(!this.actionSheetVisible) {
      this.navCtrl.push(ReviewChapterPage, {chapterData:this.chapterData, addedChapter:false});
    }
  }

  showActionSheet() {
    this.actionSheetVisible = true;
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
      {
        text: 'Delete Chapter',
        role: 'destructive',
        handler: () => {
          let alert = this.alertCtrl.create({
            title: 'Confirm delete',
            message: 'Are you sure you want to delete this chapter?',
            buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            }, {
              text: 'Delete',
              handler: () => {
                this.dataStore.deleteChapter(this.chapterData);
                //This is a hack to trigger a refresh. But it works, so whatever.
                this.navCtrl.setRoot(this.navCtrl.getActive().component);
              }
            }]
          });

          alert.present();
        }
      },{
        text: 'Edit Chapter',
        handler: () => {
          this.navCtrl.push(AddDetailPage, {chapterData:this.chapterData, addMode:false});
        }
      },{
        text: this.chapterData.isImportant?'Mark Chapter as unimportant':'Mark Chapter as important',
        handler: () => {
          this.chapterData.setImportance(!this.chapterData.isImportant);
        }
      }, {
        text: this.chapterData.isPublic?'Mark Chapter as private':'Mark Chapter as public',
        handler: () => {
          this.chapterData.setPublic(!this.chapterData.isPublic);
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          
        }
      }
    ]
    });

    actionSheet.present().then(() => {
      this.actionSheetVisible = false;
    });
  }
}
