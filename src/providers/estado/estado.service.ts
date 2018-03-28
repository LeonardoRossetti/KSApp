import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators/map';

import { FirebaseApp } from "angularfire2";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireObject/*, AngularFireList*/ } from "angularfire2/database";

import { BaseService } from "./../base.service";
import { Estado } from '../../models/estados.models';

import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class EstadoService extends BaseService {

  estados: Observable<Estado[]>;
  currentEstado: AngularFireObject<Estado>;

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public firebaseApp: FirebaseApp,
    public http: Http
  ) {
    super();  
  }

//   private setEstados(uidToExclude: string): void {
//     this.estados = this.mapListKeys<Estado>(
//       this.db.list<Estado>(`/estados`, 
//         (ref: firebase.database.Reference) => ref.orderByChild('nome')
//       )
//     )
//     .map((estados: Estado[]) => {      
//       return estados.filter((estado: Estado) => estado.$key !== uidToExclude);
//     });
//   }

  get(estadoId: string): AngularFireObject<Estado> {
    return this.db.object<Estado>(`/estados/${estadoId}`);
  }

  getAll(): Observable<Estado[]> {
    this.estados = this.mapListKeys<Estado>(
      this.db.list<Estado>(`/estados`, 
        (ref: firebase.database.Reference) => ref.orderByChild('nome')
      )
    )
    .map((estados: Estado[]) => {
      return estados
    });

    return this.estados;
  }

}