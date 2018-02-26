import { Injectable } from '@angular/core';
import { User } from 'firebase/app';

import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService } from './user.service';
import { QuerySnapshot, Query } from 'firebase/firestore';
import { FulFilledChallenge } from './fulfilled-challenge';

@Injectable()
export class FulfilledChallengesService {
  private fulfilledChallenges: QuerySnapshot;
  private fulfilledChallengesRef: Query;
  private fulfilledChallengesCollection;
  size$ = new BehaviorSubject(0);
  fulfilledChallenges$ = new BehaviorSubject<FulFilledChallenge[]>(null);
  constructor(userService: UserService, private db: AngularFirestore) {
    userService.user$.filter(user => !!user).subscribe(user => {
      this.retrieveFulFilledChallenges(user);
    });
  }

  retrieveFulFilledChallenges(user) {
    this.fulfilledChallengesCollection = this.db.collection(
      `users/${user.email}/fulfilledChallenges`,
    );
    this.fulfilledChallengesRef = this.fulfilledChallengesCollection.ref;
    this.fulfilledChallengesRef.onSnapshot(docSnapshot => {
      console.log(docSnapshot);
    });
    this.updateFulfilledChallenges();
  }
  updateFulfilledChallenges() {
    this.fulfilledChallengesRef
      .get()
      .then((fulfilledChallenges: FulFilledChallenge[]) => {
        this.fulfilledChallenges = fulfilledChallenges;
        const ffcs = this.fulfilledChallenges.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(_ffcs => _ffcs && _ffcs.answers && _ffcs.answers.length);
        this.fulfilledChallenges$.next(ffcs);
        this.size$.next(ffcs.length);
      });
  }
  submitFulfillChallenge(fulfillChallenge: FulFilledChallenge) {
    this.fulfilledChallengesCollection.doc(fulfillChallenge.id).set(
      {
        type: fulfillChallenge.type,
        day: fulfillChallenge.day,
        answers: fulfillChallenge.answers,
      },
      { merge: true },
    );
    this.updateFulfilledChallenges();
  }
}
