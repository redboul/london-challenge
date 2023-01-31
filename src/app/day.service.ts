import { Day } from "./day";
import { Injectable } from "@angular/core";
import { User } from "@angular/fire/auth";
import { Firestore, collection, getDocs } from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { AuthenticationService } from "./authentication.service";
import { AppStatusService } from "./app-status.service";
import { filter } from "rxjs/operators";

@Injectable()
export class DayService {
  days$ = new BehaviorSubject(null);
  constructor(
    authenticationService: AuthenticationService,
    private db: Firestore
  ) {
    authenticationService.authenticatedUser$
      .pipe(filter((user) => !!user))
      .subscribe((user) => {
        this.retrieveDays(user);
      });
  }

  retrieveDays(fUser: User) {
    const daysRef = getDocs(collection(this.db, "days")).then((_days) => {
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
