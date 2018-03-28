import { Component, Input } from '@angular/core';

import { AlertController, App, MenuController } from 'ionic-angular';

import { AuthService } from '../../providers/auth/auth.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.component.html'
})
export class CustomLoggedHeaderComponent extends BaseComponent {

  @Input() title: string;

  constructor(
      public alertControl: AlertController,
      public authService: AuthService,
      public app: App,
      public menuControl: MenuController
    ) {
    super(alertControl, authService, app, menuControl);
  }

}
