import { Injectable } from '@angular/core';
import { User } from 'firebase/app';

import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService } from './user.service';
import { QuerySnapshot, Query } from 'firebase/firestore';

@Injectable()
export class FulfilledChallengesService {
  fulfilledChallenges: QuerySnapshot;
  fulfilledChallengesRef: Query;
  size$ = new BehaviorSubject(0);
  constructor(userService: UserService, private db: AngularFirestore) {
    userService.user$.filter(user => !!user).subscribe(user => {
      this.retrieveFulFilledChallenges(user);
    });
  }

  retrieveFulFilledChallenges(user) {
    this.fulfilledChallengesRef = this.db.collection(`users/${user.email}/fulfilledChallenges`).ref;
    this.fulfilledChallengesRef.onSnapshot(docSnapshot => {
      console.log(docSnapshot);
    });
    this.updateFulfilledChallenges();
  }
  updateFulfilledChallenges() {
    this.fulfilledChallengesRef.get().then(fulfilledChallenges => {
      console.log(fulfilledChallenges);
      this.fulfilledChallenges = fulfilledChallenges;
      this.size$.next(this.fulfilledChallenges.size);
    });
  }
}

