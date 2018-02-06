import { Injectable } from '@angular/core';
import { User } from 'firebase/app';

import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthenticationService } from './authentication.service';
import { AppStatusService } from './app-status.service';

@Injectable()
export class DayService {
  days$ = new BehaviorSubject(null);
  constructor(private authenticationService: AuthenticationService,
    private db: AngularFirestore) {
      authenticationService.authenticatedUser$.filter(user => !!user).subscribe(user => {
        this.retrieveDays(user);
      });
    }

    retrieveDays(fUser: User) {
    const daysRef = this.db.collection('days').ref.get().then(days => {
      this.days$.next(days.docs.map(doc => ({ id: doc.id, ...doc.data()})));
    });
  }
}

