import { UserService } from './../user.service';
import { User, AccountType } from './../user';
import { AppStatusService } from './../app-status.service';
import { FulfilledChallengesService } from './../fulfilled-challenges.service';
import { ChallengesService } from './../challenges.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-team-status',
  templateUrl: './team-status.component.html',
  styleUrls: ['./team-status.component.css'],
})
export class TeamStatusComponent implements OnInit, OnDestroy {
  @Input() teamUser: User;
  fulfilledChallengesSize = 0;
  challengesSize;
  challengeSizeSubscription: Subscription;
  sizePromise: Promise<number>;
  constructor(
    private userService: UserService,
    private challengesService: ChallengesService,
    private fulfilledChallenges: FulfilledChallengesService,
  ) {}

  ngOnInit() {
    this.sizePromise = this.fulfilledChallenges.getFulFilledChallengesSize(
      this.teamUser,
    );
    this.sizePromise.then(size => (this.fulfilledChallengesSize = size));
    this.challengeSizeSubscription = this.challengesService.allChallenges$
      .filter(cs => !!cs)
      .subscribe(cs => (this.challengesSize = cs.length));
  }

  ngOnDestroy() {
    this.challengeSizeSubscription.unsubscribe();
  }
  getProgress() {
    return this.fulfilledChallengesSize * 100 / this.challengesSize;
  }
  setCurrentUser() {
    if (this.userService.authenticatedUser.accountType === AccountType.admin) {
      this.userService.setCurrentUser(this.teamUser);
    }
  }
}
