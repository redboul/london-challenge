import { Injectable } from '@angular/core';
import { User } from 'firebase/app';

import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class UserService {
  user$ = new BehaviorSubject(null);
  constructor(private authenticationService: AuthenticationService,
    private db: AngularFirestore) {
    authenticationService.authenticatedUser$.filter(user => !!user).subscribe(user => {
      this.retrieveUserRights(user);
    });
  }

  retrieveUserRights(fUser: User) {
    const userRef = this.db.collection('users').doc(fUser.email).ref;
    userRef.get().then(userContent => this.user$.next(userContent.data()));
  }
}

