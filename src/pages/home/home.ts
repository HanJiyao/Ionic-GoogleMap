import { Component, OnInit, ViewChild, ElementRef, NgZone } from
'@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ParkService } from '../../providers/parkservice';
import { Park } from '../../models/park'; 


declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  results: string[];

  private markers = [];
  constructor(
    public navCtrl: NavController, 
    public geolocation: Geolocation,
    private parkService: ParkService
  ){}
  ionViewDidLoad(){
    console.log("ionview did load");
    this.loadMap();
  }
  loadMap(){
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(1.3786539, 103.8493234);
      let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }, (err) => {
      console.log(err);
    });
    

    let parkData = [];
    this.parkService.getLocalData().subscribe((data: Park[]) => {
      // let results = data
      for (let i = 0; i < data.length; i++) {
        let coords = data[i];
        console.log(coords.lat, coords.long)
        let latLng = new google.maps.LatLng(coords.lat, coords.long);
        parkData.push(latLng);
        this.addMarker(latLng, coords)
      }
    });
  }
  addMarker(LatLng, coords){
    let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: LatLng,
        icon: {url: "../../assets/imgs/"+coords.ordering+".png",
          scaledSize: new google.maps.Size(30, 30),
        },
      });
     
      let content = "<h4>"+coords.ordering+"."+coords.school+"</h4><h6>"+coords.desc+"</h6>";
      this.markers.push(marker);
      this.addInfoWindow(marker, content);
  }
  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
    content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
    });
  }
}