import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ChapterData } from '../../models/chapter-data';
import { ViewChapterComponent } from '../../components/view-chapter/view-chapter';
import { DataStorage } from '../../providers/data-storage';
import { VegaSpecification } from '../../providers/vega-specification';
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
  chartData = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private dataStore:DataStorage, private vegaSpec:VegaSpecification) {
    
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
  }

  selectedTimeline() {
  }

  selectedGraph() {
    this.updateVegaChart();
  }

  updateVegaChart() {
    //We may or may not be at the right point in the life cycle for this.
    if(this.chart) {
      this.vegaSpec.getVegaSpecification(this.chapters).then((json) => {
        this.vegaView = new vega.View(vega.parse(json)).initialize(this.chart.nativeElement).renderer('svg').hover().run();
        this.vegaView.addEventListener('click', (evt, item) => {
          console.log(evt);
          console.log(item);
        });
      }).catch((error) => {
        console.error(error);
        //TODO: there's probably an error. Maybe present that?
      });  
    }
  }
}
