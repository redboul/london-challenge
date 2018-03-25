import { FulfilledChallengesService } from './../fulfilled-challenges.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChallengesService } from '../challenges.service';
import { AppStatusService } from '../app-status.service';
import { Challenge } from '../challenge';
import { FulFilledChallenge } from '../fulfilled-challenge';
import { groupBy } from 'lodash';

@Component({
  selector: 'app-forever-challenges',
  templateUrl: './forever-challenges.component.html',
  styleUrls: ['./forever-challenges.component.css'],
})
export class ForeverChallengesComponent implements OnInit, OnDestroy {
  challenges: Challenge[] = [];
  challengesByCategory: any[][] = [];
  fulfilledForeverChallenges: FulFilledChallenge[] = [];
  foreverChallengesSubscription: Subscription;
  fulfilledForeverChallengesSubscription: Subscription;
  constructor(
    private challengesService: ChallengesService,
    private fulfilledChallengesService: FulfilledChallengesService,
    private appStatusService: AppStatusService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.foreverChallengesSubscription = this.challengesService.foreverChallenges$
      .filter(challenges => !!challenges)
      .subscribe(challenges => {
        this.challenges = challenges;
        this.challengesByCategory = Object.entries(
          groupBy(this.challenges, 'category'),
        );
        this.appStatusService.available();
      });
    this.fulfilledForeverChallengesSubscription = this.fulfilledChallengesService.fulfilledChallenges$
      .filter(challenges => !!challenges)
      .subscribe(ffcs => {
        this.fulfilledForeverChallenges = ffcs.filter(ffc => !ffc.day);
      });
  }

  ngOnDestroy() {
    this.foreverChallengesSubscription.unsubscribe();
    this.fulfilledForeverChallengesSubscription.unsubscribe();
  }
  goToChallenge(challenge: Challenge) {
    this.router.navigate(['..', 'challenge', challenge.id], {
      relativeTo: this.route,
    });
  }

  fulfilledChallengesPercentage() {
    return this.fulfilledForeverChallenges && this.challenges
      ? this.fulfilledForeverChallenges.length * 100 / this.challenges.length
      : 0;
  }
}
