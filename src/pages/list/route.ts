import { Component, OnInit, ViewChild, ElementRef, NgZone } from
'@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ParkService } from '../../providers/parkservice';
import { Park } from '../../models/park'; 


declare var google;
@Component({
  selector: 'page-route',
  templateUrl: 'route.html'
})
export class RoutePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  results: string[];
  parks:Park[] = [];
  parksArray = []
  startPT:String;
  endPT:String;
  
  private markers = [];
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({
    map: this.map,
    suppressMarkers: true,
    preserveViewport: true
  });

  private start;
  private end;
  private waypts = [];

  constructor(
    public navCtrl: NavController, 
    public geolocation: Geolocation,
    private parkService: ParkService, public navParams: NavParams,
    private zone: NgZone,
  ){
  }
  ionViewDidLoad(){
    console.log("ionview did load");
    this.loadMap();
    this.directionsDisplay.addListener('direction_changed', function(){
      console.log("heys")
      this.computeTotalDistance(this.directionsDisplay.getDirections())
    })
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
        // console.log(coords.lat, coords.long)
        let latLng = new google.maps.LatLng(coords.lat, coords.long);
        parkData.push(latLng);
        this.parks.push(coords)
        this.parksArray.push(this.parks[i].school)
      }
    });

  
  }

  displayRoute(){
//validation 
// if (parks == undefined){
//  alert("need to have start and end point")
//}
    for (let i = 0; i < this.parks.length; i++){
      if (this.startPT == this.parks[i].school){
        this.start = new google.maps.LatLng(this.parks[i].lat, this.parks[i].long);
      }
      if (this.endPT == this.parks[i].school){
        this.end = new google.maps.LatLng(this.parks[i].lat, this.parks[i].long);
      }
    }

    this.directionsService = new google.maps.DirectionsService()
    this.directionsDisplay = new google.maps.DirectionsRenderer()
      this.directionsDisplay.addListener('direction_changed', function(){
      console.log("heys")
      this.computeTotalDistance(this.directionsDisplay.getDirections())
    })
    this.directionsDisplay.setMap(this.map)
    this.directionsService.route({
    origin: this.start,
    destination: this.end,
    // origin: new google.maps.LatLng(1.3786539, 103.8493234),
    // destination: new google.maps.LatLng(1.3786539, 103.8493234),
    travelMode: 'DRIVING'
   }, (response, status) => {
    if (status === 'OK') {
    this.directionsDisplay.setDirections(response)
    this.computeTotalDistance(response)
    } else {
    window.alert('Directions request failed due to ' + status)
    }
    })
   }

   computeTotalDistance(result) {
     var total = 0;
     var myroute = result.routes[0]
     for (var i = 0;i<myroute.legs.length;i++){
       total+=myroute.legs[i].distance.value;
     }
     total = total/1000
     document.getElementById('total').innerHTML = total+'km'
     console.log(total)
   }

   clearMarkers(){
     console.log("clear")
   }
}