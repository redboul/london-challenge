import { Injectable } from "@angular/core";
import firebase from "firebase";

import { AngularFirestore, QuerySnapshot } from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { AuthenticationService } from "./authentication.service";
import { AppStatusService } from "./app-status.service";
import { Challenge } from "./challenge";
import { filter } from "rxjs/operators";

@Injectable()
export class ChallengesService {
  private challenges: QuerySnapshot<Challenge>;
  public foreverChallenges$ = new BehaviorSubject<Challenge[]>(undefined);
  public allChallenges$ = new BehaviorSubject<Challenge[]>(undefined);
  public allChallenges: Challenge[] = [];
  constructor(
    authenticationService: AuthenticationService,
    private db: AngularFirestore,
    private appStatusService: AppStatusService
  ) {
    authenticationService.authenticatedUser$
      .pipe(filter((user) => !!user))
      .subscribe((user) => {
        this.retrieveChallenges(user);
      });
  }

  retrieveChallenges(fUser: firebase.User) {
    this.appStatusService.workInProgress();
    this.db
      .collection<Challenge>("challenges")
      .ref.get()
      .then((challenges) => {
        this.challenges = challenges;
        this.allChallenges = challenges.docs.map((doc) =>
          Object.assign(
            {
              id: doc.id,
            } as Challenge,
            doc.data()
          )
        );
        this.allChallenges$.next(this.allChallenges);
        this.foreverChallenges$.next(
          this.allChallenges.filter((challenge) => !challenge.day)
        );
        this.appStatusService.available();
      });
  }
  getChallengesCount() {
    return this.challenges.size;
  }
}
