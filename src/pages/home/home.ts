import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../providers/auth/auth.service';
import { Cidade } from '../../models/cidades.models';
import { CidadeService } from '../../providers/cidade/cidade.service';
import { Estado } from '../../models/estados.models';
import { EstadoService } from '../../providers/estado/estado.service';
import { ValorKitService } from '../../providers/valorKit/valorKit.service';
import { ValorKit } from './../../models/valorkit.models';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  view: string = 'Radiação';
  canEdit: boolean = false;
  estados: Observable<Estado[]>;
  estadoSelecionado: string;
  cidades: Observable<Cidade[]>;
  cidadeSelecionada: string;
  currentCidade: Cidade;

  valorKit: Observable<ValorKit[]>;
  currentValorKit: ValorKit; 
  myGroup;
  
  constructor(
    public authService: AuthService,
    public db: AngularFireDatabase,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public valorKitService: ValorKitService,
  ) {
    this.myGroup = new FormGroup({
      ate5:    new FormControl('ate5'),   
      de5a10:  new FormControl('de5a10'),  
      de10a15: new FormControl('de10a15'),   
      de15a20: new FormControl('de15a20'),   
      de20a25: new FormControl('de20a25'),   
      de25a30: new FormControl('de25a30'),   
      de30a35: new FormControl('de30a35'),   
      de35a40: new FormControl('de35a40'),   
      de40a45: new FormControl('de40a45'),   
      de45a50: new FormControl('de45a50'),   
      de50a55: new FormControl('de50a55'),   
      de55a60: new FormControl('de55a60'),   
      de60a65: new FormControl('de60a65'),   
      de65a70: new FormControl('de65a70'),   
      de70a75: new FormControl('de70a75')
   });
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.estados = this.estadoService.getAll();
    this.valorKit = this.valorKitService.getAll();
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

  onSubmitKit(event: Event, form): void {
    event.preventDefault();

    //salva apenas os items que foram alterados
    this.valorKitService.listaValorKits.forEach(item => {
      if (item.valor != form[item.$key])
      {
        //console.log(`Item alterado: ${item.$key}, valor anterior: ${item.valor}, novo: ${form[item.$key]}`);
        this.saveValorKit(item.$key, form[item.$key]);
      }
    });
  }

  saveValorKit(kit, novoValor): void {
    let loading = this.showLoading();

    this.valorKitService.currentValorKit = this.valorKitService.get(kit);

    this.valorKitService.edit({
      //altera somente os campos que forem passados
      valor: novoValor
    }).then(() => {
      loading.dismiss();
    });
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Salvando...'
    });

    loading.present();
    return loading;
  }
}
