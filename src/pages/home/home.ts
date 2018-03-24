import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onSignup(): void{
    this.navCtrl.push(SignupPage)
  }

}
