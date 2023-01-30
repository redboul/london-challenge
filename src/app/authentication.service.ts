import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase";
import { AngularFirestore } from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class AuthenticationService {
  authenticatedUser$ = new BehaviorSubject(this.afAuth.currentUser);
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.afAuth.onAuthStateChanged((user: firebase.User) =>
      this.authenticatedUser$.next(Promise.resolve(user))
    );
  }

  isAuthenticated() {
    return !!this.afAuth.currentUser;
  }

  userId() {
    return this.afAuth.currentUser && this.afAuth.currentUser.uid;
  }

  login(user: { email: string; password: string }): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(
      user.email,
      user.password
    );
  }
  logout() {
    this.afAuth.signOut();
  }
  resetPassword(email: string): Promise<any> {
    return this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => "An email has been send for you to reset your password");
  }
}
