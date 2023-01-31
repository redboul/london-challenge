import { Day } from "./day";
import { Injectable } from "@angular/core";
import firebase from "firebase/compat";

import { AngularFirestore } from "@angular/fire/compat/firestore";
import { BehaviorSubject } from "rxjs";
import { AuthenticationService } from "./authentication.service";
import { AppStatusService } from "./app-status.service";
import { filter } from "rxjs/operators";

@Injectable()
export class DayService {
  days$ = new BehaviorSubject(null);
  constructor(
    authenticationService: AuthenticationService,
    private db: AngularFirestore
  ) {
    authenticationService.authenticatedUser$
      .pipe(filter((user) => !!user))
      .subscribe((user) => {
        this.retrieveDays(user);
      });
  }

  retrieveDays(fUser: firebase.User) {
    const daysRef = this.db
      .collection<Day>("days")
      .ref.get()
      .then((_days) => {
        const days = _days.docs.map((doc) =>
          Object.assign({ id: doc.id }, doc.data())
        );
        this.days$.next(
          days
          // days.filter(day => new Date(day.id).getTime() < Date.now()),
        );
      });
  }
}
