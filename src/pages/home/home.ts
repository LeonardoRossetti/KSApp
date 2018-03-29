import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../providers/auth/auth.service';

import { Cidade } from '../../models/cidades.models';
import { CidadeService } from '../../providers/cidade/cidade.service';
import { Estado } from '../../models/estados.models';
import { EstadoService } from '../../providers/estado/estado.service';
import { User } from '../../models/user.models';
import { UserService } from '../../providers/user/user.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  users: Observable<User[]>;
  canEdit: boolean = false;
  estados: Observable<Estado[]>;
  estadoSelecionado: string;
  cidades: Observable<Cidade[]>;
  cidadeSelecionada: string;
  currentCidade: Cidade;
  
  constructor(
    public db: AngularFireDatabase,
    public authService: AuthService,
    public cidadeService: CidadeService,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public estadoService: EstadoService,
    public userService: UserService) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.users = this.userService.getAll();
    this.estados = this.estadoService.getAll();
  }
  
  carregaCidades(): void{
    this.canEdit = false;
    this.cidades = this.cidadeService.getAll(this.estadoSelecionado);
  }

  mudaCidadeSelecionada(): void {
    this.canEdit = false;
  }
  
  carregaRadiacao(): void {
    if (this.cidadeSelecionada == null || this.cidadeSelecionada == "")
      return;
      
    this.currentCidade = this.cidadeService.listaCidades.filter(x=> x.$key == this.cidadeSelecionada)[0];

  //   let c = this.cidades.map(processArray => {
  //     return processArray.filter(x=> x.$key == this.cidadeSelecionada)[0]
  //     //.first()
  //  });

    //this.cidadeService.currentCidade = this.db.object(`/cidades/${this.estadoSelecionado}/${this.cidadeSelecionada}`);
    //this.cidadeService.currentCidade = this.cidadeService.get(this.cidadeSelecionada);
    
    // this.cidades.forEach(element => {
    //   this.currentCidade = element.filter(a => a.$key == this.cidadeSelecionada)[0];


    if (!this.canEdit) {
      this.canEdit = true;
    }
  }

  alterar(cidade): void{
    console.log("Cidade: "+cidade);
    
  }
}
