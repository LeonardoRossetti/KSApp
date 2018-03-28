import { OnInit } from '@angular/core';

import { AlertController, App, MenuController, NavController } from 'ionic-angular';

import { AuthService } from './../providers/auth/auth.service';
import { SigninPage } from './../pages/signin/signin';

export abstract class BaseComponent implements OnInit {

    protected navControl: NavController;

    constructor(
        public alertControl: AlertController,
        public authService: AuthService,
        public app: App,
        public menuControl: MenuController
    ){}

    ngOnInit(): void {
        this.navControl = this.app.getActiveNav();
    }

    onLogout(): void {
        this.alertControl.create({
            message: 'Você deseja sair?',
            buttons: [
                {
                    text: 'Sim',
                    handler: () => {
                        this.authService.logout()
                            .then(() => {
                                this.navControl.setRoot(SigninPage);
                            });
                    }
                },
                {
                    text: 'Não'
                }
            ]
        }).present();
    }
}