import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import * as shortid from 'shortid';

/*
  Generated class for the UserData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserData {
  private static uid:string = null;

  constructor(private storage:Storage) {
  }

  public getUid() {
    return new Promise((resolve, reject) => {
      if(UserData.uid != null) {
        //Send the UID if we have one
        resolve(UserData.uid);
      } else {
        //Try to get it from storage
        this.storage.ready().then(() => {
          this.storage.get('uid').then((val) => {
            if(val) {
              //Store it, send it back
              UserData.uid = val;
              resolve(UserData.uid);
            } else {
              //Make one, store it, send it back
              var uid = shortid.generate();
              this.storage.set('uid', UserData.uid).then(() => {
                UserData.uid = uid;
                resolve(UserData.uid);
              }).catch((error) => {
                reject(error);
              });
            }
          }).catch((error) => {
            reject(error);
          });
      });
      }
    })
    
  }
}
