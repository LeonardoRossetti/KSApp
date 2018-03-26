import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { SignupPage } from '../signup/signup';
import { User } from '../../models/user.models';
import { UserService } from '../../providers/user/user.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  users: Observable<User[]>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public userService: UserService) {
  }

  ionViewDidLoad(){
    this.users = this.userService.getAll();
  }

  onSignup(): void{
    this.navCtrl.push(SignupPage)
  }

  onChatCreate(user): void{
    console.log(user);
  }


}
