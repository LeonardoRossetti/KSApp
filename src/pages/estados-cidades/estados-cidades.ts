import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Estado } from './../../models/estados.models';

@Component({
  selector: 'page-estados-cidades',
  templateUrl: 'estados-cidades.html',
})
export class EstadosCidadesPage {

  estados: Observable<Estado[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
