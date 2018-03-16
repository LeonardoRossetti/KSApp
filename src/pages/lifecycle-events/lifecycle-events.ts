import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lifecycle-events',
  templateUrl: 'lifecycle-events.html',
})
export class LifecycleEventsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // ionViewCanEnter(): boolean {
  //   console.log('01 ionViewCanEnter called');
  //   return true;
  // }

  ionViewCanEnter(): Promise<any> {
    /*console.log('01 ionViewCanEnter called');
    return true;*/


    return new Promise((resolve, reject) => {
      console.log('Aguardando 2 segundos...');

      setTimeout(() => {
        let number = Math.round(Math.random() * 100);
        if (number % 2 == 0) {
          resolve();
          console.log(`${number} - Autorizado!`);
        } else{
          reject();
          console.log(`${number} - Nao autorizado!`);
        }
      }, 2000);
    });
  }
  
   ionViewDidLoad() {  
      console.log('02 ionViewDidLoad called');    
  }
  
   ionViewWillEnter() {  
      console.log('03 ionViewWillEnter called');    
  }
  
   ionViewDidEnter() {  
      console.log('04 ionViewDidEnter called');    
  }
  
   ionViewCanLeave() :boolean {  
      console.log('05 ionViewCanLeave called');
      return true;//se retornar false nao deixa sair da pagina. Seja pq tem dados preenchidos que nao foram salvos, ou qqer outro motivo
  }
   
  ionViewWillLeave() {  
      console.log('06 ionViewWillLeave called');    
  }

  ionViewDidLeave() {
    console.log('07 ionViewDidLeave called');
  }
  
  ionViewWillUnload() {
    console.log('08 ionViewWillUnload called');
  }

}
