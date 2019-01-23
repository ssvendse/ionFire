import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private alertController: AlertController) {}
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const uid = await this.auth.uid();
    const isLoggedIn = !!uid;
    if (!isLoggedIn) {
      const alert = await this.alertController.create({
        header: 'Unauthorized action',
        subHeader: 'Users only',
        message: 'Only signed-in users are allowed to access their todo list',
        buttons: ['OK']
      });
      await alert.present();
    }
    return isLoggedIn;
  }
}
