import { FulfilledChallengesService } from './../fulfilled-challenges.service';
import { FulFilledChallenge } from './../fulfilled-challenge';
import { Input, Component, OnInit } from '@angular/core';
import { Challenge } from '../challenge';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  @Input() challenge: Challenge;
  fulfilledChallenge: FulFilledChallenge;
  constructor(
    private fulfilledChallengesService: FulfilledChallengesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.fulfilledChallengesService.fulfilledChallenges$
      .subscribe(ffcs => this.fulfilledChallenge = ffcs.find(ffc => ffc.id === this.challenge.id));
  }

  gotToDay() {
    this.router.navigate(['challenge', this.challenge.id]);
  }

}
