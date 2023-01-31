import { Injectable } from "@angular/core";

import {
  AngularFirestore,
  QuerySnapshot,
  Query,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { BehaviorSubject } from "rxjs";
import { UserService } from "./user.service";

import { FulFilledChallenge } from "./fulfilled-challenge";
import { User } from "./user";
import { filter } from "rxjs/operators";

@Injectable()
export class FulfilledChallengesService {
  private fulfilledChallenges: QuerySnapshot<FulFilledChallenge>;
  private fulfilledChallengesRef: Query<FulFilledChallenge>;
  private fulfilledChallengesCollection: AngularFirestoreCollection<FulFilledChallenge>;
  size$ = new BehaviorSubject(0);
  fulfilledChallenges$ = new BehaviorSubject<FulFilledChallenge[]>(null);
  constructor(private db: AngularFirestore, userService: UserService) {
    userService.currentUser$
      .pipe(filter((u) => !!u))
      .subscribe((u) => this.retrieveFulFilledChallenges(u));
  }

  retrieveFulFilledChallenges(user) {
    this.fulfilledChallengesCollection = this.db.collection(
      `users/${user.email}/fulfilledChallenges`
    );
    this.fulfilledChallengesRef = this.fulfilledChallengesCollection.ref;
    this.updateFulfilledChallenges();
  }
  getFulFilledChallengesSize(user): Promise<number> {
    return this.db
      .collection(`users/${user.email}/fulfilledChallenges`)
      .ref.get()
      .then((ffcs) => ffcs.size);
  }
  updateFulfilledChallenges() {
    this.fulfilledChallengesRef.get().then((fulfilledChallenges) => {
      this.fulfilledChallenges = fulfilledChallenges;
      const ffcs = this.fulfilledChallenges.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((_ffcs) => _ffcs && _ffcs.answers && _ffcs.answers.length);
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
      } as any,
      { merge: true }
    );
    this.updateFulfilledChallenges();
  }
}
