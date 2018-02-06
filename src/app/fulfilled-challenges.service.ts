import { Injectable } from '@angular/core';
import { User } from 'firebase/app';

import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs/Subject';
import { UserService } from './user.service';
import { QuerySnapshot, Query } from 'firebase/firestore';
import { FulFilledChallenge } from './fulfilled-challenge';

@Injectable()
export class FulfilledChallengesService {
  private fulfilledChallenges: QuerySnapshot;
  private fulfilledChallengesRef: Query;
  size$ = new Subject();
  fulfilledChallenges$ = new Subject<FulFilledChallenge[]>();
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
      this.fulfilledChallenges$.next(this.fulfilledChallenges.docs.map(doc => ({ id: doc.id, ...doc.data()})));
      this.size$.next(this.fulfilledChallenges.size);
    });
  }
}

