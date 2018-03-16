import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  pushPage():void{
    this.navCtrl.push(ContactPage, {
      type:'push',
      course: 'Ionic',
      year: 2018,
      messge: () => {
        console.log('Curso ionic')
      }
    })
  }

  setRoot():void{
    this.navCtrl.setRoot(ContactPage, {
      type: 'setRoot'
    });
  }
}
