import { Day } from './day';
import { Injectable } from '@angular/core';
import { User } from 'firebase/compat/app';

import { Firestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { AppStatusService } from './app-status.service';

@Injectable()
export class DayService {
  days$ = new BehaviorSubject(null);
  constructor(
    private authenticationService: AuthenticationService,
    private db: Firestore,
  ) {
    authenticationService.authenticatedUser$
      .filter(user => !!user)
      .subscribe(user => {
        this.retrieveDays(user);
      });
  }

  retrieveDays(fUser: User) {
    const daysRef = this.db
      .collection('days')
      .ref.get()
      .then(_days => {
        const days = _days.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Day[];
        this.days$.next(
          days,
          // days.filter(day => new Date(day.id).getTime() < Date.now()),
        );
      });
  }
}
