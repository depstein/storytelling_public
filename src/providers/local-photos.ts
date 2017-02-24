import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import * as moment from 'moment';
import 'rxjs/add/operator/map';

/*
  Generated class for the LocalPhotos provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
declare var cordova;

//Uses the photo library from Cordova.
//https://github.com/terikon/cordova-plugin-photo-library
//https://github.com/terikon/photo-library-demo-ionic2
@Injectable()
export class LocalPhotos {
  photoData:any = [];

  constructor(private platform : Platform) {
    //TODO: think about whether to create a new field for referring to photos. Right now it uses the ID field...
    for(var i=0;i<5;i++) {
      this.photoData.push({thumbnailURL: 'assets/img/gameshot.png', timestamp: moment().format("dddd, MMMM Do, h:mm a"), id:""+i});
    }
    console.log(this.photoData);

    this.platform.ready().then(() => {
      //If we're on mobile, call cordova
      if(this.platform.is('cordova')) {
        cordova.plugins.photoLibrary.requestAuthorization( () => {
        cordova.plugins.photoLibrary.getLibrary(
          (library) => {
            //TODO: clearly 10 is too few, but getting all the images was a pretty drastic performance hit.
            this.photoData = library.library.slice(0, 10).map((photo) => { photo.timestamp = moment(photo.creationDate).format("dddd, MMMM Do, h:mm a"); return photo; });
          },
          (err) => {
            console.log('didn\'t get library successfully');
          }, { thumbnailWidth: 512, thumbnailHeight: 384, quality: 0.8}
          );
        }, (err) => {
          console.log('no permission');
        }, {read: true});
      } else { //Otherwise, there's nothing to update.
      }
    });
  }

  getPhotos() {
    return this.photoData;
  }

}
