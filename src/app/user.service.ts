import { Injectable } from '@angular/core';
import { User } from 'firebase/app';

import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthenticationService } from './authentication.service';
import { User as LondonChallengeUser, AccountType } from './user';

@Injectable()
export class UserService {
  users$ = new BehaviorSubject<LondonChallengeUser[]>(null);
  user$ = new BehaviorSubject<LondonChallengeUser>(null);
  constructor(
    private authenticationService: AuthenticationService,
    private db: AngularFirestore,
  ) {
    authenticationService.authenticatedUser$
      .filter(user => !!user)
      .subscribe(user => {
        this.retrieveUsersRights(user);
      });
  }

  public isCurrentUserAuthorized(uuid: string): Promise<boolean> {
    return this.user$
      .filter(user => !!user)
      .map(user => user.uuid === uuid || user.accountType === AccountType.admin)
      .toPromise();
  }

  retrieveUserRights(fUser: User): Promise<LondonChallengeUser> {
    const userRef = this.db.collection('users').doc(fUser.email).ref;
    return userRef
      .get()
      .then(
        userContent => ({ id: userContent.id, ...userContent.data() } as any),
      );
  }

  retrieveUsersRights(fUser: User) {
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
