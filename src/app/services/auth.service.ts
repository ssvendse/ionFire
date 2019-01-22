import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private db: DbService, private router: Router) {
    this.user$ = this.afAuth.authState.pipe(switchMap(user => (user ? db.doc$(`users/${user.uid}`) : of(null))));
  }
  async anonymousLogin() {
   const credential = await this.afAuth.auth.signInAnonymously();
   return await this.updateUserData(credential.user);
  }
  private updateUserData({ uid, email, displayName, photoURL, isAnonymous }) {
    const path = `users/${uid}`;
    const data = {
      uid,
      email,
      displayName,
      photoURL,
      isAnonymous
    };
    return this.db.updateAt(path, data);
  }
}
