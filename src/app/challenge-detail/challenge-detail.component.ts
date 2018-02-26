import { AppStatusService } from './../app-status.service';
import { Observable } from 'rxjs/Observable';
import { ChallengeStorageService } from './../challenge-storage.service';
import { ChallengesService } from './../challenges.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { FulfilledChallengesService } from './../fulfilled-challenges.service';
import { FulFilledChallenge } from './../fulfilled-challenge';
import { Input, Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Challenge, challengeType } from '../challenge';
import { AngularFireUploadTask } from 'angularfire2/storage';
import { UploadTaskSnapshot } from '@firebase/storage-types';
import { take, pull } from 'lodash';
import 'rxjs/add/observable/zip';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-challenge-detail',
  templateUrl: './challenge-detail.component.html',
  styleUrls: ['./challenge-detail.component.css'],
})
export class ChallengeDetailComponent implements OnInit, OnDestroy {
  challenge: Challenge;
  fulfilledChallenge: FulFilledChallenge;
  answerToSubmit: string;
  challengeId: string;
  appStatusSubscription: Subscription;
  routeSubscription: Subscription;
  allChallengeSubscription: Subscription;
  ffChallengeSubscription: Subscription;
  uploading = false;
  constructor(
    private fulfilledChallengesService: FulfilledChallengesService,
    private challengesService: ChallengesService,
    private route: ActivatedRoute,
    private el: ElementRef,
    private challengeStorageService: ChallengeStorageService,
    private appStatusService: AppStatusService,
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe(
      (map: ParamMap) => (this.challengeId = map.get('challengeId')),
    );
    this.allChallengeSubscription = this.challengesService.allChallenges$
      .filter(challenges => !!challenges)
      .subscribe(
        challenges =>
          (this.challenge = challenges.find(c => c.id === this.challengeId)),
      );
    this.ffChallengeSubscription = this.fulfilledChallengesService.fulfilledChallenges$
      .filter(ffcs => !!ffcs)
      .subscribe(
        ffcs =>
          (this.fulfilledChallenge = ffcs.find(
            ffc => ffc.id === this.challenge.id,
          )),
      );
    this.appStatusSubscription = Observable.zip(
      this.challengesService.allChallenges$.filter(challenges => !!challenges),
      this.route.paramMap,
      this.fulfilledChallengesService.fulfilledChallenges$.filter(
        ffcs => !!ffcs,
      ),
    ).subscribe(() => this.appStatusService.available());
  }
  ngOnDestroy() {
    this.appStatusSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
    this.allChallengeSubscription.unsubscribe();
    this.ffChallengeSubscription.unsubscribe();
  }
  isTextChallenge() {
    return this.challenge && this.challenge.type === challengeType.text;
  }
  isMediaChallenge() {
    return this.challenge && this.challenge.type === challengeType.media;
  }
  isImageChallenge() {
    return this.challenge && this.challenge.type === challengeType.image;
  }
  isChallengeFulfilled() {
    return (
      !!this.fulfilledChallenge &&
      !this.challenge.multiple &&
      !!this.fulfilledChallenge.answers &&
      !!this.fulfilledChallenge.answers.length
    );
  }
  isAnswerLimitReached() {
    return (
      !!this.fulfilledChallenge &&
      !!this.fulfilledChallenge.answers &&
      !!this.fulfilledChallenge.answers.length &&
      (this.challenge.maxAnswers || 1) >= this.fulfilledChallenge.answers.length
    );
  }

  deleteAnswer(answerToRemove) {
    if (this.fulfilledChallenge && this.fulfilledChallenge.answers) {
      this.saveOrUpdateFulfilledChallenge({
        id: this.challenge.id,
        type: this.challenge.type,
        day: this.challenge.day,
        answers: pull(this.fulfilledChallenge.answers, answerToRemove),
      });
    }
  }

  submitAnswer() {
    this.saveOrUpdateFulfilledChallenge({
      id: this.challenge.id,
      type: this.challenge.type,
      day: this.challenge.day,
      answers:
        !this.fulfilledChallenge || !this.fulfilledChallenge.answers
          ? [this.answerToSubmit]
          : take(
              [...this.fulfilledChallenge.answers, this.answerToSubmit],
              this.challenge.maxAnswers || 1,
            ),
    });
  }

  saveOrUpdateFulfilledChallenge(ffChallenge: FulFilledChallenge) {
    this.fulfilledChallengesService.submitFulfillChallenge(ffChallenge);
  }
  openFileInput() {
    this.el.nativeElement.querySelector('#fileForAnswer').click();
  }
  submitFileForAnswer(event) {
    this.uploading = true;
    const uploadTasks: AngularFireUploadTask[] = Array.from(
      event.target.files,
    ).map(file => this.challengeStorageService.addFile(file as File));
    Promise.all(uploadTasks)
      .then((taskResponses: UploadTaskSnapshot[]) => {
        this.fulfilledChallengesService.submitFulfillChallenge({
          id: this.challenge.id,
          day: this.challenge.day,
          type: this.challenge.type,
          answers: taskResponses.map(taskResponse => taskResponse.ref.fullPath),
        });
      })
      .catch(() => {})
      .then(() => (this.uploading = false));
  }
}