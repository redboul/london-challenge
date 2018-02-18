import { ChallengeStorageService } from './../challenge-storage.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-challenge-detail-image-answer',
  templateUrl: './challenge-detail-image-answer.component.html',
  styleUrls: ['./challenge-detail-image-answer.component.css']
})
export class ChallengeDetailImageAnswerComponent {
  @Input() filePath;
  constructor(
    private challengeStorageService: ChallengeStorageService,
  ) { }

  getDownloadUrl(answer) {
    return this.challengeStorageService.getDownloadUrl(answer);
  }
}
