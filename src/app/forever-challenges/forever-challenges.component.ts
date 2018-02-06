import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChallengesService } from '../challenges.service';
import { AppStatusService } from '../app-status.service';
import { Challenge } from '../challenge';

@Component({
  selector: 'app-forever-challenges',
  templateUrl: './forever-challenges.component.html',
  styleUrls: ['./forever-challenges.component.css']
})
export class ForeverChallengesComponent implements OnInit, OnDestroy {
  challenges: Challenge[] = [];
  constructor(
    private challengesService: ChallengesService,
    private appStatusService: AppStatusService,
  ) { }

  ngOnInit() {
    this.challengesService.foreverChallenges$.filter(challenges => !!challenges).subscribe(challenges => {
      this.challenges = challenges;
      this.appStatusService.available();
    });
  }

  ngOnDestroy() {
    this.appStatusService.workInProgress();
  }
}
