import { ValorKit } from './../../models/valorkit.models';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../providers/auth/auth.service';
import { ValorKitService } from '../../providers/valorKit/valorKit.service';

@Component({
  selector: 'page-valor-kit',
  templateUrl: 'valor-kit.html',
})
export class ValorKitPage {

  valorKit: Observable<ValorKit[]>;

  constructor(
    public db: AngularFireDatabase,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    public valorKitService: ValorKitService,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.valorKit = this.valorKitService.getAll();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.saveValorKit();
  }

  saveValorKit(): void {
    console.log('save!');
  }

}
