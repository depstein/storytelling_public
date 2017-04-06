import { Component, Input } from '@angular/core';
import { NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { LocalPhotos } from '../../providers/local-photos';
import { PhotoSelectorComponent } from '../../components/photo-selector/photo-selector';
import { PhotoData } from '../../models/photo-data';

/*
  Generated class for the AddPhotos page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-photos',
  templateUrl: 'add-photos.html',
  providers: [ LocalPhotos ]
})
export class AddPhotosPage {
  @Input('photo-selector') photoSelector: PhotoSelectorComponent;
  allImages: PhotoData[] = [];
  pictureIdsSelected: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform, private photos : LocalPhotos, public viewCtrl : ViewController) {}

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.photos.getPhotos().then((photos:PhotoData[]) => {
        this.allImages = photos;
      }, (error) => {
        console.log(error);
      });
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  logForm() {
   this.viewCtrl.dismiss(this.photos.getPhotosFromIDs(Object.keys(this.pictureIdsSelected)));
  }

}
