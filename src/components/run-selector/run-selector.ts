import { Component, Input } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { RunningData } from '../../models/running-data';
import { AddDetailPage } from '../../pages/add-detail/add-detail';
import { ChapterData } from '../../models/chapter-data';
import { StravaRuns } from '../../providers/strava-runs';
import { DataStorage } from '../../providers/data-storage';

/**
 * Generated class for the RunSelectorComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'run-selector',
  templateUrl: 'run-selector.html'
})
export class RunSelectorComponent {
  @Input() allRuns: RunningData[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform, private runs : StravaRuns, private dataStore:DataStorage) {
  }

  selectedRun(id) {
    let chapterData: ChapterData = new ChapterData('running');
    let run:RunningData = this.runs.getRunFromId(id);
    chapterData.addRun(run);
    this.navCtrl.push(AddDetailPage, {chapterData:chapterData, addMode:true});
  }

  isDisabled(id) {
    return this.dataStore.runIdExists(id);
  }

}
