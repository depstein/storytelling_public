import * as moment from 'moment';
import * as polyline from '@mapbox/polyline';

declare var mapboxgl;

export class RunningData {
  timestamp:any = moment();
  id:string = null;
  distance:number = null;
  map_polyline:string = null;
  displayDuration:boolean = null;
  displayPace:boolean = null;
  duration:number = null;
  pace:string = null;
  coordinates:any = null;
  bounds:any = null;
  map:any = null;
  staticMapUrl:string = null;

  public static decodePolyline(map_polyline:string) {
    //For reasons I can't explain, latitude and longitude are flipped.
    return polyline.decode(map_polyline).map((r) => {return [r[1], r[0]]});
  }


  constructor(id:string){
   this.id = id;
  }
  
  addRun(timestamp:any, distance:number, map_polyline:string, duration:number) {
    this.timestamp = moment(timestamp);
    this.distance = distance;
    this.map_polyline = map_polyline;
    this.coordinates = RunningData.decodePolyline(map_polyline);
    this.duration = duration;
    var paceFractional = (this.duration / 60.0) / this.distance;
    this.pace = Math.floor(paceFractional) + ":" + Math.floor((paceFractional % 1) * 60);
    this.staticMapUrl = "https://api.mapbox.com/styles/v1/mapbox/streets-v9/static/path-5+f44-0.5+f44-0.2(" + encodeURIComponent(this.map_polyline) + ")/auto/100x100?access_token=pk.eyJ1IjoiZGVwc3RlaW4iLCJhIjoiY2owMWpnOXN5MDF1OTMycW52bGg1bnludyJ9.ss9hA0RVl_2P9UuOtMLZvQ";
  }

  addPaceDuration(paceDuration) {
    this.displayPace = paceDuration['display']['pace'] || false;
    this.displayDuration = paceDuration['display']['duration'] || false;
    this.duration = paceDuration['value']['duration'] * 60 || this.duration; //Scale it back to in seconds.
    this.pace = paceDuration['value']['pace'] || this.pace;
  }

  get distanceStr() {
    return this.distance.toFixed(2);
  }

  get timestampStr() {
    return this.timestamp.format('dddd, MMMM Do');
  }

  get durationReadable() {
    return Math.ceil(this.duration / 60.0);
  }

  get paceReadable() {
    return this.pace;
  }

  getBounds() {
    if(this.bounds != null) {
      return this.bounds;
    }
    this.bounds = this.coordinates.reduce(function(bounds, coord) {
      return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(this.coordinates[0], this.coordinates[0]));
    return this.bounds;
  }

  getCenter() {
    //TODO: probably check to make sure coordinates isn't null
    return this.coordinates[0];
  }

  //Puts a dynamic map in the div specified by this map's ID.
  //TODO: this will almost certainly crash as I move the token around and do all sorts of weird things.
  getDynamicMap() {
    if(this.map != null) {
      return this.map;
    }
    this.map = new mapboxgl.Map({
      container:this.id.toString(),
      style: 'mapbox://styles/mapbox/streets-v9',
      center: this.getCenter(),
      zoom: 15
    });

    this.map.fitBounds(this.getBounds(), {padding:20});

    this.map.on('load', () => {

    this.map.addLayer({
      "id": "route",
      "type": "line",
      "source": {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "LineString",
            "coordinates": this.coordinates
          }
        }
      },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "#888",
          "line-width": 8
        }
      });
    });
    return this.map;
  }
}