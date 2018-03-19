import { ChallengesService } from './../challenges.service';
import { FulfilledChallengesService } from './../fulfilled-challenges.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppStatusService } from '../app-status.service';
import { DayService } from '../day.service';
import { Day } from '../day';
import { Router, ActivatedRoute } from '@angular/router';
import { Challenge } from '../challenge';
import { FulFilledChallenge } from '../fulfilled-challenge';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  days: Day[];
  uuid: string;
  foreverChallenges: Challenge[] = [];
  fulfilledForeverChallenges: FulFilledChallenge[] = [];
  foreverChallengesSubscription: Subscription;
  fulfilledForeverChallengesSubscription: Subscription;

  constructor(
    private appStatusService: AppStatusService,
    private dayService: DayService,
    private router: Router,
    private route: ActivatedRoute,
    private challengesService: ChallengesService,
    private fulfilledChallengesService: FulfilledChallengesService,
  ) {}

  ngOnInit() {
    this.appStatusService.workInProgress();
    this.dayService.days$.subscribe(days => {
      this.days = days;
      this.appStatusService.available();
    });
    this.route.paramMap.subscribe(map => (this.uuid = map.get('uuid')));
    this.foreverChallengesSubscription = this.challengesService.foreverChallenges$
      .filter(challenges => !!challenges)
      .subscribe(challenges => {
        this.foreverChallenges = challenges;
      });
    this.fulfilledForeverChallengesSubscription = this.fulfilledChallengesService.fulfilledChallenges$
      .filter(challenges => !!challenges)
      .subscribe(ffcs => {
        this.fulfilledForeverChallenges = ffcs.filter(ffc => !ffc.day);
      });
  }
  ngOnDestroy() {
    this.appStatusService.workInProgress();
  }
  goToPermanentChallenges() {
    this.router.navigate(['/', this.uuid, 'permanentChallenges'], {
      relativeTo: this.route,
    });
  }
}
