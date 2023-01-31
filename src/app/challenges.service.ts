import { Injectable } from "@angular/core";
import { User } from "@angular/fire/auth";
import {
  Firestore,
  QuerySnapshot,
  collection,
  getDocs,
  DocumentData
} from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { AuthenticationService } from "./authentication.service";
import { AppStatusService } from "./app-status.service";
import { Challenge } from "./challenge";
import { filter } from "rxjs/operators";

@Injectable()
export class ChallengesService {
  private challenges: QuerySnapshot<DocumentData>;
  public foreverChallenges$ = new BehaviorSubject<Challenge[]>(undefined);
  public allChallenges$ = new BehaviorSubject<Challenge[]>(undefined);
  public allChallenges: Challenge[] = [];
  constructor(
    authenticationService: AuthenticationService,
    private db: Firestore,
    private appStatusService: AppStatusService
  ) {
    authenticationService.authenticatedUser$
      .pipe(filter((user) => !!user))
      .subscribe((user) => {
        this.retrieveChallenges(user);
      });
  }

  retrieveChallenges(fUser: User) {
    this.appStatusService.workInProgress();
    getDocs(collection(this.db, "challenges"))
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
