import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import * as moment from 'moment';
import 'rxjs/add/operator/map';
import { PhotoData } from '../models/photo-data';

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
  photoData:PhotoData[] = [];
  //TODO: clearly 10 is too few, but getting all the images was a pretty drastic performance hit.
  maxPhotoNumber = 10;

  constructor(private platform : Platform) {
    this.platform.ready().then(() => {
      //If we're on mobile, get the photos from the device
      if(this.platform.is('cordova')) {
        this.getPhotosFromDevice();
      } else { //Otherwise, there's nothing to update.
        this.generateFakePhotos();
      }
    });
  }

  private photoDatumFromPhoto(id:string, timestamp:any, pictureURL:string) {
    var photoDatum = new PhotoData(id);
    photoDatum.addPicture(timestamp, pictureURL);
    return photoDatum;
  }

  private generateFakePhotos() {
    for(var i=0;i<this.maxPhotoNumber;i++) {
      this.photoData.push(this.photoDatumFromPhoto(""+i, moment(), 'assets/img/gameshot.png'));
    }
  }

  private getPhotosFromDevice() {
    cordova.plugins.photoLibrary.requestAuthorization( () => {
        cordova.plugins.photoLibrary.getLibrary(
          (library) => {
            this.photoData = library.library.slice(0, this.maxPhotoNumber).map((photo) => {
              return this.photoDatumFromPhoto(photo.id, moment(photo.creationDate), photo.thumbnailURL);
            });
          },
          (err) => {
            console.log('didn\'t get library successfully' + err);
            // TODO: properly manage error
            this.generateFakePhotos();
          }, { thumbnailWidth: 512, thumbnailHeight: 384, quality: 0.8}
          );
        }, (err) => {
          // TODO: properly manage error
          console.log('no permission' + err);
          this.generateFakePhotos();
        }, {read: true});
  }

  getPhotos() {
    return this.photoData;
  }

  //TODO: this is n^2. Fine for the average case of <5 pictures, but will clearly break down at 1,000.
  getPhotosFromIDs(ids:string[]) {
    return this.photoData.filter((photo) => { return ids.indexOf(photo.id) != -1; });
  }
}
