import { Injectable, OnDestroy } from "@angular/core";
import {
  Auth,
  authState,
  User,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "@angular/fire/auth";
import { Firestore } from "@angular/fire/firestore";
import { Subscription, Subject } from "rxjs";

@Injectable()
export class AuthenticationService implements OnDestroy {
  authenticatedUser$ = new Subject<User>();
  currentUser: User;
  private readonly userDisposable: Subscription | undefined;
  constructor(private afAuth: Auth, private db: Firestore) {
    this.userDisposable = authState(this.afAuth).subscribe((user: User) => {
      this.currentUser = user;
      this.authenticatedUser$.next(user);
    });
  }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  userId() {
    return this.currentUser && this.currentUser.uid;
  }

  login(user: { email: string; password: string }): Promise<any> {
    return signInWithEmailAndPassword(this.afAuth, user.email, user.password);
  }
  logout() {
    this.afAuth.signOut();
  }
  async resetPassword(email: string): Promise<string> {
    await sendPasswordResetEmail(this.afAuth, email);
    return "An email has been send for you to reset your password";
  }
}
