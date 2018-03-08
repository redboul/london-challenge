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
import { groupBy } from 'lodash';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
})
export class DayComponent implements OnInit, OnDestroy {
  challenges: Challenge[] = [];
  challengesByCategory: any[][] = [];
  allChallenges: Challenge[] = [];
  fulfilledChallenges: FulFilledChallenge[] = [];
  allFulfilledChallenges: FulFilledChallenge[] = [];
  dayId: string;
  day: Day;
  dayList: Day[] = [];
  paramsSubscription: Subscription;
  daySubscription: Subscription;
  ffcsSubscription: Subscription;
  challengesSubscription: Subscription;
  userUuid: string;
  constructor(
    private appStatusService: AppStatusService,
    private dayService: DayService,
    private challengesService: ChallengesService,
    private fulfilledChallengeService: FulfilledChallengesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.dayId = params.day;
      this.userUuid = params.uuid;
    });
  }

  ngOnInit() {
    this.daySubscription = this.dayService.days$
      .filter(days => !!days)
      .subscribe(days => {
        this.dayList = days;
        this.updateCurrentDay();
      });
    this.challengesSubscription = this.challengesService.allChallenges$
      .filter(challenges => !!challenges)
      .subscribe(challenges => {
        this.allChallenges = challenges;
        this.updateCurrentChallenges();
        this.appStatusService.available();
      });
    this.ffcsSubscription = this.fulfilledChallengeService.fulfilledChallenges$
      .filter(challenges => !!challenges)
      .subscribe(ffChallenges => {
        this.allFulfilledChallenges = ffChallenges;
        this.updateFFChallenges();
      });
  }

  updateCurrentChallenges() {
    this.challenges = this.allChallenges.filter(
      challenge => challenge.day === this.dayId,
    );
    this.challengesByCategory = Object.entries(groupBy(this.challenges, 'category'));
    this.appStatusService.available();
  }

  updateCurrentDay() {
    this.day = this.dayList.find(day => day.id === this.dayId);
  }

  updateFFChallenges() {
    this.fulfilledChallenges = this.allFulfilledChallenges
      .filter(ffc => ffc.day === this.dayId)
      .filter(ffc => ffc.answers && ffc.answers.length);
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
    this.router.navigate([this.userUuid, 'challenge', challenge.id]);
  }
  updateSelectedDay(selectedDay) {
    this.router.navigate([this.userUuid, 'calendar', selectedDay.value]);
    this.updateCurrentDay();
    this.updateFFChallenges();
    this.updateCurrentChallenges();
  }
}
