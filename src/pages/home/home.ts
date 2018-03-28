import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../providers/auth/auth.service';
import { SignupPage } from '../signup/signup';
import { User } from '../../models/user.models';
import { UserService } from '../../providers/user/user.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  users: Observable<User[]>;

  constructor(
              public authService: AuthService,
              public navCtrl: NavController, 
              public navParams: NavParams,
              public userService: UserService) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad(){
    this.users = this.userService.getAll();
  }

  onChatCreate(user): void{
    console.log(user);
  }

  onLogout(): void{
    this.authService.logout();
  }


}
