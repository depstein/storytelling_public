import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the LocalPhotos provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
declare var cordova;

@Injectable()
export class LocalPhotos {
  photoData:any = [];

  constructor(private platform : Platform) {
    this.photoData = [{thumbnailURL: 'assets/img/gameshot.png'}, {thumbnailURL: 'assets/img/gameshot.png'}, {thumbnailURL: 'assets/img/gameshot.png'}];

    this.platform.ready().then(() => {
      //If we're on mobile, call cordova
      if(this.platform.is('mobile')) {
        cordova.plugins.photoLibrary.requestAuthorization( () => {
        cordova.plugins.photoLibrary.getLibrary(
          (library) => {
            this.photoData = library.library;
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
