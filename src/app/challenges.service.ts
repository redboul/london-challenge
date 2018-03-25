import { Injectable } from '@angular/core';
import { User } from 'firebase/app';

import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthenticationService } from './authentication.service';
import { QuerySnapshot } from 'firebase/firestore';
import { Subject } from 'rxjs/Subject';
import { AppStatusService } from './app-status.service';
import { Challenge } from './challenge';

@Injectable()
export class ChallengesService {
  private challenges: QuerySnapshot;
  public foreverChallenges$ = new BehaviorSubject<Challenge[]>(undefined);
  public allChallenges$ = new BehaviorSubject<Challenge[]>(undefined);
  public allChallenges: Challenge[] = [];
  constructor(
    private authenticationService: AuthenticationService,
    private db: AngularFirestore,
    private appStatusService: AppStatusService,
  ) {
    authenticationService.authenticatedUser$
      .filter(user => !!user)
      .subscribe(user => {
        this.retrieveChallenges(user);
      });
  }

  retrieveChallenges(fUser: User) {
    this.appStatusService.workInProgress();
    this.db
      .collection('challenges')
      .ref.get()
      .then(challenges => {
        this.challenges = challenges;
        this.allChallenges = challenges.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Challenge[];
        this.allChallenges$.next(this.allChallenges);
        this.foreverChallenges$.next(
          this.allChallenges.filter(challenge => !challenge.day),
        );
        this.appStatusService.available();
      });
  }
  getChallengesCount() {
    return this.challenges.size;
  }
}
