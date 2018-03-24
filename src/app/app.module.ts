import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from './../pages/home/home';
import { MyApp } from './app.component';
import { SignupPage } from '../pages/signup/signup';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyDJk6rV_N4xq8cmFYov5xqalcv-RrOKkqQ",
  authDomain: "ionic2-ks.firebaseapp.com",
  databaseURL: "https://ionic2-ks.firebaseio.com",
  projectId: "ionic2-ks",
  storageBucket: "ionic2-ks.appspot.com",
  messagingSenderId: "973664543161"
}

@NgModule({
  declarations: [
    HomePage,
    MyApp,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HomePage,
    MyApp,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
