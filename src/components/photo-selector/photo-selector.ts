import { Component, Input } from '@angular/core';
import { PhotoData } from '../../models/photo-data';
import { DataStorage } from '../../providers/data-storage';

/*
  Generated class for the PhotoSelector component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'photo-selector',
  templateUrl: 'photo-selector.html',
  providers: [ DataStorage ]
})
export class PhotoSelectorComponent {
  @Input() allImages: PhotoData[];
  @Input() pictureIdsSelected: any = {};

  constructor(private dataStore:DataStorage) {
    
  }

  photoDisabled(id) {
    return this.dataStore.photoIdExists(id);
  }

}
