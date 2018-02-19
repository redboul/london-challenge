import { AppStatusService } from './../app-status.service';
import { FulFilledChallenge } from './../fulfilled-challenge';
import { Challenge } from './../challenge';
import { Component, OnInit, Input } from '@angular/core';
import { Day } from '../day';
import { ChallengesService } from '../challenges.service';
import { FulfilledChallengesService } from '../fulfilled-challenges.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.css'],
})
export class CalendarDayComponent implements OnInit {
  @Input() day: Day;
  challenges: Challenge[] = [];
  fulfilledChallenges: FulFilledChallenge[] = [];
  constructor(
    private appStatusService: AppStatusService,
    private challengesService: ChallengesService,
    private fulfilledChallengeService: FulfilledChallengesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.challengesService.allChallenges$
      .filter(challenges => !!challenges)
      .subscribe(challenges => {
        this.challenges = challenges.filter(
          challenge => challenge.day === this.day.id,
        );
        this.appStatusService.available();
      });
    this.fulfilledChallengeService.fulfilledChallenges$
      .filter(challenges => !!challenges)
      .subscribe(ffChallenges => {
        this.fulfilledChallenges = ffChallenges.filter(
          ffc => ffc.day === this.day.id,
        );
      });
  }

  isDayAccomplished() {
    return (
      this.fulfilledChallenges &&
      this.challenges &&
      this.fulfilledChallenges.length === this.challenges.length
    );
  }

  goToDay() {
    this.router.navigate([this.day.id], { relativeTo: this.route });
  }
}
