import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  //esse m'etodo 'e executado uma vez por pagina quando a pagina for carregada.
  ionViewDidLoad() { 
    console.log(this.navParams);
    console.log(this.navParams.get("type")); //how to access one parameter

    this.navParams.data.type; //other way to access one parameter
  }

  pushPage():void{
    this.navCtrl.push(ContactPage);
  }

  popPage():void{
    this.navCtrl.pop();
  }

}
