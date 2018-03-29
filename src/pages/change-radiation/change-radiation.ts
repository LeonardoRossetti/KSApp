import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-change-radiation',
  templateUrl: 'change-radiation.html',
})
export class ChangeRadiationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  @Input() title: string;

  @Input() radiacao: string;

  //trazer a radiação e fazer a alteração da radiação aqui

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeRadiationPage');
  }

}
