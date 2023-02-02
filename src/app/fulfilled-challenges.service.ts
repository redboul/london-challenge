import { Injectable } from "@angular/core";

import {
  Firestore,
  QuerySnapshot,
  Query,
  CollectionReference,
  collection,
  doc,
  getDocs,
  setDoc,
  DocumentData,
} from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { UserService } from "./user.service";

import { FulFilledChallenge } from "./fulfilled-challenge";
import { User } from "./user";
import { filter } from "rxjs/operators";

@Injectable()
export class FulfilledChallengesService {
  private fulfilledChallengesRef: CollectionReference<DocumentData>;

  size$ = new BehaviorSubject(0);
  fulfilledChallenges$ = new BehaviorSubject<FulFilledChallenge[]>(null);
  constructor(private db: Firestore, userService: UserService) {
    userService.currentUser$
      .pipe(filter((u) => !!u))
      .subscribe((u) => this.retrieveFulFilledChallenges(u));
  }

  retrieveFulFilledChallenges(user) {
    this.fulfilledChallengesRef = this.getFulFilledChallengesRef(user.email);
    this.updateFulfilledChallenges();
  }
  getFulFilledChallengesRef(userEmail) {
    return collection(
      this.db,
      `users/${userEmail}/fulfilledChallenges`
    );
  }
  getFulFilledChallengesSize(user): Promise<number> {
    return getDocs(this.getFulFilledChallengesRef(user.email)).then((ffcs) => ffcs.size);
  }
  updateFulfilledChallenges() {
    getDocs(this.fulfilledChallengesRef).then((fulfilledChallenges) => {
      const ffcs = (
        fulfilledChallenges.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as FulFilledChallenge[]
      ).filter((_ffcs) => _ffcs && _ffcs.answers && _ffcs.answers.length);
      this.fulfilledChallenges$.next(ffcs);
      this.size$.next(ffcs.length);
    });
  }
  submitFulfillChallenge(fulfillChallenge: FulFilledChallenge) {
    setDoc(
      doc(this.db, this.fulfilledChallengesRef.path, fulfillChallenge.id),
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
