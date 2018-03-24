import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams) {

      let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

      this.signupForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        userName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.compose([Validators.required, Validators.pattern(emailRegex)])]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  onSubmit():void{
    console.log('Console submited!');
  }

}
