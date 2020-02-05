import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Injectable()
export class ParkService {

    constructor(public http: HttpClient) {

    }
    getLocalData(){
        // let coordsArray = [];
        return this.http.get('assets/imgs/Park.json')
        .map(res => {
            // let data = (res as any).features;
            // for (let i = 0; i < data1.length; i++) {
            //     let coords = [data1[i].lat, data1[i].long];
            //     console.log(coords)
            //     coordsArray.push(coords);
            // }
            return res
        // return coordsArray;
        })
    } 
}