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
  //TODO: should this be static?
  photoData:PhotoData[] = [];
  //TODO: clearly 10 is too few, but getting all the images was a pretty drastic performance hit.
  maxPhotoNumber = 10;

  constructor(private platform : Platform) {}

  private photoDatumFromPhoto(id:string, timestamp:any, pictureURL:string) {
    var photoDatum = new PhotoData(id);
    photoDatum.addPicture(timestamp, pictureURL);
    return photoDatum;
  }

  private generateFakePhotos() {
    return new Promise((resolve, reject) => {
      var photos:PhotoData[] = [];
      //I only made 5 fake photos... that's probably okay.
      for(var i=1;i<=5;i++) {
        photos.push(this.photoDatumFromPhoto(""+i, moment('2017-04-01').subtract(i*3, 'day'), 'assets/img/table' + i + '.jpg'));
      }
      resolve(photos);
    });
  }

  private getPhotosFromDevice() {
    return new Promise((resolve, reject) => {
      cordova.plugins.photoLibrary.requestAuthorization( () => {
        cordova.plugins.photoLibrary.getLibrary(
          (library) => {
            resolve(library.library.reverse().slice(0, this.maxPhotoNumber).map((photo) => {
              return this.photoDatumFromPhoto(photo.id, moment(photo.creationDate), photo.thumbnailURL);
            }));
          },
          (err) => {
            reject('didn\'t get library successfully' + err);
          }, { thumbnailWidth: 512, thumbnailHeight: 384, quality: 0.8}
          );
        }, (err) => {
          reject('no permission' + err);
        }, {read: true});
    });
  }

  getPhotos() {
    return new Promise((resolve, reject) => {
      if(this.photoData.length != 0) {
        resolve(this.photoData);
      }
      //Otherwise, get it from the server. Assume platform.ready() was called.
      if(this.platform.is('cordova')) {
          this.getPhotosFromDevice().then((photos:PhotoData[]) => {
            this.photoData = photos;
            resolve(this.photoData);
          }, (error) => {
            reject(error);
          });
        } else {
          this.generateFakePhotos().then((photos:PhotoData[]) => {
            this.photoData = photos;
            resolve(this.photoData);
          }, (error) => {
            reject(error);
          });
        }
      });
  }

  //TODO: this is n^2. Fine for the average case of <5 pictures, but will clearly break down at 1,000.
  getPhotosFromIDs(ids:string[]) {
    return this.photoData.filter((photo) => { return ids.indexOf(photo.id) != -1; });
  }
}
