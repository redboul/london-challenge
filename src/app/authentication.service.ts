import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { User } from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class AuthenticationService {
  userRights;
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  isAuthenticated() {
    return !!this.afAuth.auth.currentUser;
  }

  login(user: {email: string, password: string}): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
    .then(fUser => this.retrieveUserRights(fUser));
  }

  retrieveUserRights(fUser: User) {
    this.db.collection('users').valueChanges().subscribe(_userRights => this.userRights = _userRights);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
