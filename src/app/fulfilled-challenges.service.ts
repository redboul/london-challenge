import { Injectable } from '@angular/core';
import { User } from 'firebase/app';

import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService } from './user.service';

@Injectable()
export class FulFilledChallengesService {
  fulfilledChallenges;
  constructor(userService: UserService) {
    userService.user$.filter(user => !!user).subscribe(user => {
      this.retrieveFulFilledChallenges(user);
    });
  }

  retrieveFulFilledChallenges(user) {
    user.collection('fulfilledChallenges').ref.get().then(fulfilledChallenges => {
      console.log(fulfilledChallenges);
      this.fulfilledChallenges = fulfilledChallenges;
    });
  }
}

