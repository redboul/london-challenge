import { Injectable } from '@angular/core';
import { User } from 'firebase/app';

import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthenticationService } from './authentication.service';
import { QuerySnapshot } from 'firebase/firestore';

@Injectable()
export class ChallengesService {
  challenges: QuerySnapshot;
  constructor(private authenticationService: AuthenticationService,
    private db: AngularFirestore) {
    authenticationService.authenticatedUser$.filter(user => !!user).subscribe(user => {
      this.retrieveChallenges(user);
    });
  }

  retrieveChallenges(fUser: User) {
    this.db.collection('challenges').ref.get().then(challenges => {
      console.log(challenges);
      this.challenges = challenges;
    });
  }
  getChallengesCount() {
    return this.challenges.size;
  }
}

