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
  @Input() teamName;
  fulfilledChallengesSize;
  challengesSize;
  challengeSizeSubscription: Subscription;
  fulfilledChallengesSizeSubscription: Subscription;
  constructor(
    private challengesService: ChallengesService,
    private fulfilledChallenges: FulfilledChallengesService,
  ) {}

  ngOnInit() {
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
  }
  getProgress() {
    return this.fulfilledChallengesSize * 100 / this.challengesSize;
  }
}
