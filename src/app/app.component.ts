import { Component, ViewChild } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './services/auth.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { FcmService } from './services/fcm.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private storage: Storage,
    private router: Router,
    private fcm: FcmService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fcm.getPermission().subscribe();
      this.fcm.listenToMessages().subscribe();
    });
  }
}
