import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { ChallengesService } from '../challenges.service';
import { FulfilledChallengesService } from '../fulfilled-challenges.service';
import { AppStatusService } from '../app-status.service';
import { sortBy } from 'lodash';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  users;
  usersSubscription: Subscription;
  constructor(
    private userService: UserService,
    private appStatusService: AppStatusService,
  ) {}

  ngOnInit() {
    this.usersSubscription = this.userService.users$
      .filter(users => !!users)
      .subscribe(users => {
        this.users = sortBy(users, 'teamName');
        this.appStatusService.available();
      });
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }
}
