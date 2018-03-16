import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
import { LifecycleEventsPage } from '../lifecycle-events/lifecycle-events';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  pushPage(): void{
    this.navCtrl.push(ContactPage, {
      type:'push',
      course: 'Ionic',
      year: 2018,
      messge: () => {
        console.log('Curso ionic')
      }
    })
  }

  setRoot(): void{
    this.navCtrl.setRoot(ContactPage, {
      type: 'setRoot'
    });
  }

  lifecycle(): void {
    this.navCtrl.push(LifecycleEventsPage)
      .then((authorizedAccess: boolean) => {
         
        if(authorizedAccess) {        
          console.log('Page pushed!');
        } else {
          console.log('Acesso não autorizado!');
        }
      
      }).catch(error => {
        console.log('Mensagem se houver erro.', error);        
      });
  }
}
