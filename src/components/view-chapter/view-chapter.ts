import { Component, Input } from '@angular/core';
import { ChapterData } from '../../models/chapter-data';

/*
  Generated class for the ViewChapter component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'view-chapter',
  templateUrl: 'view-chapter.html'
})
export class ViewChapterComponent {
  @Input() chapterData: ChapterData;

  constructor() {
    
  }

}
