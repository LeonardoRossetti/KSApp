import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";

import { BaseService } from "./../base.service";
import { ValorKit } from './../../models/ValorKit.models';

import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Loading, LoadingController } from 'ionic-angular';

@Injectable()
export class ValorKitService extends BaseService {

  ValorKits: Observable<ValorKit[]>;
  currentValorKit: AngularFireObject<ValorKit>;
  listaValorKits: ValorKit[];

  constructor(
    public db: AngularFireDatabase,
    public http: Http,
    public loadingCtrl: LoadingController
  ) {
    super();  
  }
  
  edit(valorKit: { valor: string }): Promise<void> {
    return this.currentValorKit
      .update(valorKit)
      .catch(this.handlePromiseError);
  }

  ValorKitExists(valorKit: string): Observable<boolean> {
    return this.db.list(`/valorKits`, 
      (ref: firebase.database.Reference) => ref.equalTo(valorKit)
    )
    .valueChanges()
    .map((ValorKits: ValorKit[]) => {
      return ValorKits.length > 0;
    }).catch(this.handleObservableError);
  }

  get(kit): AngularFireObject<ValorKit> {
    return this.db.object<ValorKit>(`/valorKits/${kit}`);
  }

  getAll(): Observable<ValorKit[]> {

    let loading: Loading = this.showLoading();

    this.ValorKits = this.mapListKeys<ValorKit>(
      this.db.list<ValorKit>(`/valorKits`, 
        (ref: firebase.database.Reference) => ref
      )
    )
    .map((valorKits: ValorKit[]) => {
      this.listaValorKits = valorKits;
      loading.dismiss();
      return valorKits;
    });

    return this.ValorKits;
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Carregando valores dos Kits...'
    });

    loading.present();
    return loading;
  }
}