import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { ChapterData } from '../../models/chapter-data';
import { ViewChapterComponent } from '../../components/view-chapter/view-chapter';
import { DataStorage } from '../../providers/data-storage';
import { VegaSpecification } from '../../providers/vega-specification';
import { WritePage } from '../write/write';
import { SettingsPage } from '../settings/settings';
import * as vega from 'vega';

/*
  Generated class for the View page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
  providers: [ DataStorage, VegaSpecification ]
})
export class ViewPage implements AfterViewInit {
  @Input('view-chapter') viewChapter: ViewChapterComponent;
  @ViewChild('chart') chart:ElementRef;
  chapters:ChapterData[] = [];
  chapterView:string = "timeline";
  vegaView = null;
  focusChapter:ChapterData = null;
  onTimelinePage:boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private dataStore:DataStorage, private vegaSpec:VegaSpecification, private modalCtrl:ModalController) {
    //If you view the link directly, a uid and a cid will get passed.
    //if you go to: http://localhost:8100/#/view/abc/def
    //Then in navParams.data, uid='abc' and cid='def'.
    console.log(navParams.data);
    //I do nothing with this information for now. But I expect to do something with it later.
  }

  ionViewDidEnter() {
    this.dataStore.getAllChapters().then((value:ChapterData[]) => {
      this.chapters = value;
      this.updateVegaChart();
    }).catch((error) => {
      //TODO: there's probably an error. Maybe present that?
      this.chapters = [];
    });
  }

  ngAfterViewInit() {
    this.updateVegaChart();
  }

  addChapter() {
    this.navCtrl.push(WritePage, {});
  }

  openSettings() {
    let modal = this.modalCtrl.create(SettingsPage);
    modal.present();
  }

  selectedTimeline() {
    this.onTimelinePage = true;
  }

  selectedGraph() {
    this.onTimelinePage = false;
  }

  updateVegaChart() {
    //We may or may not be at the right point in the life cycle for this.
    if(this.chart) {
      this.vegaSpec.getVegaSpecification(this.chapters).then((json) => {
        this.vegaView = new vega.View(vega.parse(json)).initialize(this.chart.nativeElement).renderer('svg').hover().run();
        this.vegaView.addEventListener('click', (evt, item) => {
          if(item && item.datum && item.datum.id) {
            this.focusChapter = this.chapters.find((el:ChapterData) => {return el.id == item.datum.id;});
          }
        });
      }).catch((error) => {
        console.error(error);
        //TODO: there's probably an error. Maybe present that?
      });  
    }
  }
}
