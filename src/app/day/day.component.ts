import { DayService } from './../day.service';
import { FulFilledChallenge } from './../fulfilled-challenge';
import { Challenge } from './../challenge';
import { Component, OnInit, Input } from '@angular/core';
import { Day } from '../day';
import { ChallengesService } from '../challenges.service';
import { FulfilledChallengesService } from '../fulfilled-challenges.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppStatusService } from '../app-status.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  challenges: Challenge[] = [];
  fulfilledChallenges: FulFilledChallenge[] = [];
  dayId: string;
  day: Day;
  constructor(
    private appStatusService: AppStatusService,
    private dayService: DayService,
    private challengesService: ChallengesService,
    private fulfilledChallengeService: FulfilledChallengesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => this.dayId = params.day);
  }

  ngOnInit() {
    this.dayService.days$
      .filter(days => !!days)
      .subscribe(days => this.day = days.find(day => day.id === this.dayId));
    this.challengesService.allChallenges$
      .filter(challenges => !! challenges)
      .subscribe(challenges => {
        this.challenges = challenges.filter(challenge => challenge.day === this.dayId);
        this.appStatusService.available();
      });
      this.fulfilledChallengeService.fulfilledChallenges$.filter(challenges => !!challenges).subscribe(ffChallenges => {
        this.fulfilledChallenges = ffChallenges.filter(ffc => ffc.id === this.dayId);
      });
  }
  fulfilledChallengesPercentage() {
    return (this.fulfilledChallenges && this.challenges) ? this.fulfilledChallenges.length * 100 / this.challenges.length : 0;
  }
  goToChallenge(challenge: Challenge) {
    this.router.navigate(['challenge', challenge.id]);
  }
}
