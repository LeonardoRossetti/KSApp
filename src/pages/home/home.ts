import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../providers/auth/auth.service';
import { Cidade } from '../../models/cidades.models';
import { CidadeService } from '../../providers/cidade/cidade.service';
import { Estado } from '../../models/estados.models';
import { EstadoService } from '../../providers/estado/estado.service';
import { ValorKitPage } from './../valor-kit/valor-kit';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  canEdit: boolean = false;
  estados: Observable<Estado[]>;
  estadoSelecionado: string;
  cidades: Observable<Cidade[]>;
  cidadeSelecionada: string;
  currentCidade: Cidade;
  
  constructor(
    public db: AngularFireDatabase,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    public cidadeService: CidadeService,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public estadoService: EstadoService) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.estados = this.estadoService.getAll();
  }

  carregaCidades(): void{
    this.canEdit = false;
    this.cidadeSelecionada = null;
    this.currentCidade = null;
    this.cidades = this.cidadeService.getAll(this.estadoSelecionado);
  }

  mudaCidadeSelecionada(): void {
    this.canEdit = false;
    this.cidadeService.currentCidade = this.cidadeService.get(this.cidadeSelecionada, this.estadoSelecionado);
  }
  
  carregaRadiacao(): void {
    if (this.cidadeSelecionada == null || this.cidadeSelecionada == "")
      return;

    this.currentCidade = this.cidadeService.listaCidades.filter(x=> x.$key == this.cidadeSelecionada)[0];

    if (!this.canEdit) {
      this.canEdit = true;
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.editCity();
  }

  private editCity(): void {
    let loading: Loading = this.showLoading();

    this.cidadeService.edit({
      //altera somente os campos que forem passados
      radiacao: this.currentCidade.radiacao
    }).then(() => {
      this.canEdit = false;
      loading.dismiss();
    });
  }

  alterarValorKits(): void {
    this.navCtrl.push(ValorKitPage);
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Salvando...'
    });

    loading.present();
    return loading;
  }
}
