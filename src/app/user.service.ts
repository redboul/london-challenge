import { Injectable } from "@angular/core";

import { AngularFirestore } from "@angular/fire/compat/firestore";
import { BehaviorSubject } from "rxjs";
import { AuthenticationService } from "./authentication.service";
import { User as LondonChallengeUser, AccountType } from "./user";
import { filter } from "rxjs/operators";

@Injectable()
export class UserService {
  users$ = new BehaviorSubject<LondonChallengeUser[]>(null);
  currentUser$ = new BehaviorSubject<LondonChallengeUser>(null);
  authenticatedUser: LondonChallengeUser;
  currentUser: LondonChallengeUser;
  constructor(
    authenticationService: AuthenticationService,
    private db: AngularFirestore
  ) {
    authenticationService.authenticatedUser$
      .pipe(filter((user) => !!user))
      .subscribe((user) => {
        this.retrieveUsersRights();
        this.retrieveUserRights(user.email).then((u) => {
          this.authenticatedUser = u;
          this.setCurrentUser(u);
        });
      });
  }
  setCurrentUser(user: LondonChallengeUser) {
    this.currentUser = user;
    this.currentUser$.next(user);
  }

  public isCurrentUserAuthorized(uuid: string): boolean {
    return (
      this.currentUser &&
      (this.currentUser.uuid === uuid ||
        this.currentUser.accountType === AccountType.admin)
    );
  }

  retrieveUserRights(email: string): Promise<LondonChallengeUser> {
    const userRef = this.db.collection("users").doc(email).ref;
    return userRef
      .get()
      .then((userContent) =>
        Object.assign(
          { id: userContent.id } as LondonChallengeUser,
          userContent.data()
        )
      );
  }

  retrieveUsersRights() {
    const usersRef = this.db.collection("users").ref;
    usersRef
      .get()
      .then((users) =>
        this.users$.next(
          users.docs.map((user) =>
            Object.assign({ id: user.id } as LondonChallengeUser, user.data())
          )
        )
      );
  }
}
