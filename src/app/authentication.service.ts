import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { BehaviorSubject, from } from "rxjs";
import { Subject } from "rxjs";

@Injectable()
export class AuthenticationService {
  authenticatedUser$ = new Subject<firebase.User>();
  currentUser: firebase.User;
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.afAuth.onAuthStateChanged((user: firebase.User) => {
      this.currentUser = user;
      this.authenticatedUser$.next(user);
    });
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  userId() {
    return this.currentUser && this.currentUser.uid;
  }

  login(user: { email: string; password: string }): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
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
