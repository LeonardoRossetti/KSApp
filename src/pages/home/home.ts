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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  users: Observable<User[]>;
  estados: Observable<Estado[]>;
  estadoSelecionado: string;
  cidades: Observable<Cidade[]>;
  cidadeSelecionada: string;

  constructor(
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
    this.cidades = this.cidadeService.getAll(this.estadoSelecionado);
  }

  carregaRadiacao(): void {
    console.log(this.cidadeSelecionada);
  }

}
