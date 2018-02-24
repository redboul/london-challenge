import { DayService } from './../day.service';
import { FulFilledChallenge } from './../fulfilled-challenge';
import { Challenge } from './../challenge';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Day } from '../day';
import { ChallengesService } from '../challenges.service';
import { FulfilledChallengesService } from '../fulfilled-challenges.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppStatusService } from '../app-status.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
})
export class DayComponent implements OnInit, OnDestroy {
  challenges: Challenge[] = [];
  fulfilledChallenges: FulFilledChallenge[] = [];
  dayId: string;
  day: Day;
  dayList: Day[] = [];
  paramsSubscription: Subscription;
  daySubscription: Subscription;
  ffcsSubscription: Subscription;
  challengesSubscription: Subscription;
  constructor(
    private appStatusService: AppStatusService,
    private dayService: DayService,
    private challengesService: ChallengesService,
    private fulfilledChallengeService: FulfilledChallengesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.paramsSubscription = this.route.params.subscribe(
      params => (this.dayId = params.day),
    );
  }

  ngOnInit() {
    this.daySubscription = this.dayService.days$
      .filter(days => !!days)
      .subscribe(days => {
        this.day = days.find(day => day.id === this.dayId);
        this.dayList = days;
      });
    this.challengesSubscription = this.challengesService.allChallenges$
      .filter(challenges => !!challenges)
      .subscribe(challenges => {
        this.challenges = challenges.filter(
          challenge => challenge.day === this.dayId,
        );
        this.appStatusService.available();
      });
    this.ffcsSubscription = this.fulfilledChallengeService.fulfilledChallenges$
      .filter(challenges => !!challenges)
      .subscribe(ffChallenges => {
        this.fulfilledChallenges = ffChallenges
          .filter(ffc => ffc.day === this.dayId)
          .filter(ffc => ffc.answers && ffc.answers.length);
      });
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.ffcsSubscription.unsubscribe();
    this.daySubscription.unsubscribe();
    this.challengesSubscription.unsubscribe();
  }
  fulfilledChallengesPercentage() {
    return this.fulfilledChallenges && this.challenges
      ? this.fulfilledChallenges.length * 100 / this.challenges.length
      : 0;
  }
  goToChallenge(challenge: Challenge) {
    this.router.navigate(['challenge', challenge.id]);
  }
  updateSelectedDay(selectedDay) {
    this.router.navigate(['calendar', selectedDay.value]);
  }
}
