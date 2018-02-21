import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { ChallengesService } from '../challenges.service';
import { FulfilledChallengesService } from '../fulfilled-challenges.service';
import { AppStatusService } from '../app-status.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  user;
  fulfilledChallengesSize;
  challengesSize;
  challengeSizeSubscription: Subscription;
  fulfilledChallengesSizeSubscription: Subscription;
  userSubscription: Subscription;
  constructor(
    private userService: UserService,
    private challengesService: ChallengesService,
    private fulfilledChallenges: FulfilledChallengesService,
    private appStatusService: AppStatusService,
  ) {}

  ngOnInit() {
    this.userSubscription = this.userService.user$
      .filter(user => !!user)
      .subscribe(user => {
        this.user = user;
        this.appStatusService.available();
      });
    this.fulfilledChallengesSizeSubscription = this.fulfilledChallenges.size$.subscribe(
      size => (this.fulfilledChallengesSize = size),
    );
    this.challengeSizeSubscription = this.challengesService.allChallenges$
      .filter(cs => !!cs)
      .subscribe(cs => (this.challengesSize = cs.length));
  }

  ngOnDestroy() {
    this.challengeSizeSubscription.unsubscribe();
    this.fulfilledChallengesSizeSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
  getProgress() {
    return this.fulfilledChallengesSize * 100 / this.challengesSize;
  }
}
