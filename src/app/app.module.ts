import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthService } from '../providers/auth/auth.service';
import { ChangeRadiationPage } from '../pages/change-radiation/change-radiation';
import { CustomLoggedHeaderComponent } from './../components/custom-logged-header/custom-logged-header.component';
import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';
import { SigninPage } from './../pages/signin/signin';
import { SignupPage } from './../pages/signup/signup';
import { CidadeService } from '../providers/cidade/cidade.service';
import { EstadoService } from '../providers/estado/estado.service';
import { UserService } from '../providers/user/user.service';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyDJk6rV_N4xq8cmFYov5xqalcv-RrOKkqQ",
  authDomain: "ionic2-ks.firebaseapp.com",
  databaseURL: "https://ionic2-ks.firebaseio.com",
  projectId: "ionic2-ks",
  storageBucket: "ionic2-ks.appspot.com",
  messagingSenderId: "973664543161"
};

@NgModule({
  declarations: [
    ChangeRadiationPage,
    CustomLoggedHeaderComponent,
    HomePage,
    MyApp,
    SigninPage,
    SignupPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChangeRadiationPage,
    HomePage,
    MyApp,
    SignupPage,
    SigninPage
  ],
  providers: [
    AuthService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CidadeService,
    EstadoService,
    UserService
  ]
})
export class AppModule {}