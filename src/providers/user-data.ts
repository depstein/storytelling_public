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
  private static userData:{} = {};

  constructor(private storage:Storage) {
  }

  public getUid() {
    return this.getUserData('uid', shortid.generate());
  }

  public getStoryType() {
    return this.getUserData('storyType', 'diy')
  }

  private getUserData(key:string, defaultValue:string):Promise<string> {
    return new Promise((resolve, reject) => {
      if(UserData.userData[key] != null) {
        //Send the data if we have it
        resolve(UserData.userData[key]);
      } else {
          //Try to get it from storage
          this.storage.ready().then(() => {
            this.storage.get(key).then((val) => {
              if(val) {
                //Store it, send it back
                UserData.userData[key] = val;
                resolve(UserData.userData[key]);
              } else {
                //Use the default value and store it
                this.storage.set(key, defaultValue).then(() => {
                  UserData.userData[key] = defaultValue;
                  resolve(UserData.userData[key]);
                }).catch((error) => {
                  reject(error);
                });
              }
            }).catch((error) => {
              reject(error);
            });
        });
      }
    });
  }
}