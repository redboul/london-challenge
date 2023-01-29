import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/compat/app';
import { Firestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthenticationService {
  authenticatedUser$ = new BehaviorSubject(this.afAuth.auth.currentUser);
  constructor(private afAuth: AngularFireAuth, private db: Firestore) {
    this.afAuth.auth.onAuthStateChanged(user =>
      this.authenticatedUser$.next(user),
    );
  }

  isAuthenticated() {
    return !!this.afAuth.auth.currentUser;
  }

  userId() {
    return this.afAuth.auth.currentUser && this.afAuth.auth.currentUser.uid;
  }

  login(user: { email: string; password: string }): Promise<any> {
    return this.afAuth.auth
      .signInWithEmailAndPassword(user.email, user.password);
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  resetPassword(email: string): Promise<any> {
    return this.afAuth.auth
      .sendPasswordResetEmail(email)
      .then(() => 'An email has been send for you to reset your password');
  }
}
