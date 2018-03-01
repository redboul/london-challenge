import { Injectable } from '@angular/core';
import { User } from 'firebase/app';

import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthenticationService } from './authentication.service';
import { User as LondonChallengeUser, AccountType } from './user';

@Injectable()
export class UserService {
  users$ = new BehaviorSubject<LondonChallengeUser[]>(null);
  currentUser$ = new BehaviorSubject<LondonChallengeUser>(null);
  authenticatedUser: LondonChallengeUser;
  currentUser: LondonChallengeUser;
  constructor(
    private authenticationService: AuthenticationService,
    private db: AngularFirestore,
  ) {
    authenticationService.authenticatedUser$
      .filter(user => !!user)
      .subscribe(user => {
        this.retrieveUsersRights();
        this.retrieveUserRights(user.email).then(u => {
          this.authenticatedUser = u;
          this.setCurrentUser(u);
        });
      });
  }
  setCurrentUser(user: LondonChallengeUser) {
    this.currentUser = user;
    this.currentUser$.next(user);
  }

  public isCurrentUserAuthorized(uuid: string): boolean {
    return (
      this.currentUser &&
      (this.currentUser.uuid === uuid ||
        this.currentUser.accountType === AccountType.admin)
    );
  }

  retrieveUserRights(email: string): Promise<LondonChallengeUser> {
    const userRef = this.db.collection('users').doc(email).ref;
    return userRef
      .get()
      .then(
        userContent => ({ id: userContent.id, ...userContent.data() } as any),
      );
  }

  retrieveUsersRights() {
    const usersRef = this.db.collection('users').ref;
    usersRef
      .get()
      .then(users =>
        this.users$.next(
          users.docs.map(user => ({ id: user.id, ...user.data() } as any)),
        ),
      );
  }
}
