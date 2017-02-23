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

  constructor(private platform : Platform) {
  }

  getPhoto(callback) {
    this.platform.ready().then(() => {
      //If we're on mobile, call cordova
      if(this.platform.is('mobile')) {
        cordova.plugins.photoLibrary.requestAuthorization( () => {
        cordova.plugins.photoLibrary.getLibrary(
          (library) => {
            library.library.forEach((libraryItem) => {
              callback(libraryItem.thumbnailURL);
            });
          },
          (err) => {
            console.log('didn\'t get library successfully');
            callback('assets/img/gameshot.png');
          }, { thumbnailWidth: 512, thumbnailHeight: 384, quality: 0.8}
          );
        }, (err) => {
          console.log('no permission');
          callback('assets/img/gameshot.png');
        }, {read: true});
      } else { //Otherwise, return a static file.
        callback('assets/img/gameshot.png');
      }
    });
  }

}
