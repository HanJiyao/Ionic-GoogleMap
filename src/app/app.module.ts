import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { MapPage } from '../pages/home/home';
import { RoutePage } from '../pages/list/route';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { ParkService } from '../providers/parkservice';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    RoutePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    RoutePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ParkService,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
