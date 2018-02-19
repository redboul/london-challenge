import { FulfilledChallengesService } from './../fulfilled-challenges.service';
import { FulFilledChallenge } from './../fulfilled-challenge';
import { Input, Component, OnInit } from '@angular/core';
import { Challenge, challengeType } from '../challenge';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css'],
})
export class ChallengeComponent implements OnInit {
  @Input() challenge: Challenge;
  fulfilledChallenge: FulFilledChallenge;
  answerToSubmit: string;
  constructor(private fulfilledChallengesService: FulfilledChallengesService) {}

  ngOnInit() {
    this.fulfilledChallengesService.fulfilledChallenges$
      .filter(ffcs => !!ffcs)
      .subscribe(
        ffcs =>
          (this.fulfilledChallenge = ffcs.find(
            ffc => ffc.id === this.challenge.id,
          )),
      );
  }
  isTextChallenge() {
    return this.challenge.type === challengeType.text;
  }
  isMediaChallenge() {
    return this.challenge.type === challengeType.media;
  }
  isChallengeFulfilled() {
    return !!this.fulfilledChallenge;
  }
}
