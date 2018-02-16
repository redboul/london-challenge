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
  private fulfilledChallengesCollection;
  size$ = new Subject();
  fulfilledChallenges$ = new Subject<FulFilledChallenge[]>();
  constructor(userService: UserService, private db: AngularFirestore) {
    userService.user$.filter(user => !!user).subscribe(user => {
      this.retrieveFulFilledChallenges(user);
    });
  }

  retrieveFulFilledChallenges(user) {
    this.fulfilledChallengesCollection = this.db.collection(`users/${user.email}/fulfilledChallenges`);
    this.fulfilledChallengesRef = this.fulfilledChallengesCollection.ref;
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
  submitFulfillChallenge(fulfillChallenge: FulFilledChallenge) {
    this.fulfilledChallengesCollection.doc(fulfillChallenge.id).set({
      type: fulfillChallenge.type,
      answers: fulfillChallenge.answers,
    }, { merge: true });
  }
}

