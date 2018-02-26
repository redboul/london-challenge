import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChallengesService } from '../challenges.service';
import { AppStatusService } from '../app-status.service';
import { Challenge } from '../challenge';

@Component({
  selector: 'app-forever-challenges',
  templateUrl: './forever-challenges.component.html',
  styleUrls: ['./forever-challenges.component.css'],
})
export class ForeverChallengesComponent implements OnInit, OnDestroy {
  challenges: Challenge[] = [];
  foreverChallengesSubscription: Subscription;
  constructor(
    private challengesService: ChallengesService,
    private appStatusService: AppStatusService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.foreverChallengesSubscription = this.challengesService.foreverChallenges$
      .filter(challenges => !!challenges)
      .subscribe(challenges => {
        this.challenges = challenges;
        this.appStatusService.available();
      });
  }

  ngOnDestroy() {
    this.foreverChallengesSubscription.unsubscribe();
  }
  goToChallenge(challenge: Challenge) {
    this.router.navigate(['challenge', challenge.id]);
  }
}
