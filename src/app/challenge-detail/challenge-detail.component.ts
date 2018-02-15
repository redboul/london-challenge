import { ChallengesService } from './../challenges.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { FulfilledChallengesService } from './../fulfilled-challenges.service';
import { FulFilledChallenge } from './../fulfilled-challenge';
import { Input, Component, OnInit } from '@angular/core';
import { Challenge, challengeType } from '../challenge';

@Component({
  selector: 'app-challenge-detail',
  templateUrl: './challenge-detail.component.html',
  styleUrls: ['./challenge-detail.component.css']
})
export class ChallengeDetailComponent implements OnInit {
  challenge: Challenge;
  fulfilledChallenge: FulFilledChallenge;
  answerToSubmit: string;
  challengeId: string;
  constructor(
    private fulfilledChallengesService: FulfilledChallengesService,
    private challengesService: ChallengesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((map: ParamMap) => this.challengeId = map.get('challengeId'));
    this.challengesService.allChallenges$.filter(challenges => !! challenges)
      .subscribe(challenges => this.challenge = challenges.find(c => c.id === this.challengeId));
    this.fulfilledChallengesService.fulfilledChallenges$
      .subscribe(ffcs => this.fulfilledChallenge = ffcs.find(ffc => ffc.id === this.challenge.id));
  }
  isTextChallenge() {
    return this.challenge && this.challenge.type === challengeType.text;
  }
  isMediaChallenge() {
    return this.challenge && this.challenge.type === challengeType.media;
  }
  isChallengeFulfilled() {
    return !!this.fulfilledChallenge;
  }
}
