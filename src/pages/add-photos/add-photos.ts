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

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform, private photos : LocalPhotos, public viewCtrl : ViewController) {
    let idsSelected = this.navParams.get('idsSelected');
    if(idsSelected != null) {
      //Make a deep copy the ids, so that if you cancel you're not impacting the passed list.
      this.pictureIdsSelected = Object.assign({}, idsSelected);
    }
  }

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

  savePhotos() {
  console.log(this.pictureIdsSelected);
   this.viewCtrl.dismiss(this.photos.getPhotosFromIDs(Object.keys(this.pictureIdsSelected).filter((id) => {return this.pictureIdsSelected[id];})));
  }

}
