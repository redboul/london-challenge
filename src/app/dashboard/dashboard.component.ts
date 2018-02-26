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
  userSubscription: Subscription;
  constructor(
    private userService: UserService,
    private appStatusService: AppStatusService,
  ) {}

  ngOnInit() {
    this.userSubscription = this.userService.user$
      .filter(user => !!user)
      .subscribe(user => {
        this.user = user;
        this.appStatusService.available();
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
