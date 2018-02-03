import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthenticationService {
  authenticatedUser$ = new BehaviorSubject(null);
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  isAuthenticated() {
    return !!this.afAuth.auth.currentUser;
  }

  login(user: {email: string, password: string}): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
    .then(fUser => {
      console.log('logged in with user', fUser.uid);
      this.authenticatedUser$.next(fUser);
    });
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
