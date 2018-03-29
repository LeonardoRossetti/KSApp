import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators/map';

//import { FirebaseApp } from "angularfire2";
//import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireObject/*, AngularFireList*/ } from "angularfire2/database";

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
    //public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    //public firebaseApp: FirebaseApp,
    public http: Http,
    public loadingCtrl: LoadingController
  ) {
    super();  
  }

  // private setValorKits(uidToExclude: string): void {
  //   this.ValorKits = this.mapListKeys<ValorKit>(
  //     this.db.list<ValorKit>(`/ValorKits`, 
  //       (ref: firebase.database.Reference) => ref.orderByChild('nome')
  //     )
  //   )
  //   .map((ValorKits: ValorKit[]) => {      
  //     return ValorKits.filter((ValorKit: ValorKit) => ValorKit.$key !== uidToExclude);
  //   });
  // }
  
  edit(valorKit: 
        {
          ate5: string, 
          de5a10: string, 
          de10a15: string,
          de15a20: string,
          de20a25: string,
          de25a30: string,
          de30a35: string,
          de35a40: string,
          de40a45: string,
          de45a50: string,
          de50a55: string,
          de55a60: string,
          de60a65: string,
          de65a70: string,
          de70a75: string     
        }): Promise<void> {
    return this.currentValorKit
      .update(valorKit)
      .catch(this.handlePromiseError);
  }

  ValorKitExists(valorKit: string): Observable<boolean> {
    return this.db.list(`/ValorKits`, 
      (ref: firebase.database.Reference) => ref.equalTo(valorKit)
    )
    .valueChanges()
    .map((ValorKits: ValorKit[]) => {
      return ValorKits.length > 0;
    }).catch(this.handleObservableError);
  }

  get(qualValor: string): AngularFireObject<ValorKit> {
    return this.db.object<ValorKit>(`/ValorKits/${qualValor}`);
  }

  getAll(): Observable<ValorKit[]> {

    let loading: Loading = this.showLoading();

    this.ValorKits = this.mapListKeys<ValorKit>(
      this.db.list<ValorKit>(`/ValorKits`, 
        (ref: firebase.database.Reference) => ref
      )
    )
    .map((ValorKits: ValorKit[]) => {
      this.listaValorKits = ValorKits;
      loading.dismiss();
      return ValorKits;
    });

    return this.ValorKits;
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Carregando ValorKits...'
    });

    loading.present();

    return loading;
  }

}