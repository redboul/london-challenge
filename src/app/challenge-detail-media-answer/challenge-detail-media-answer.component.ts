import { ChallengeStorageService } from './../challenge-storage.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-challenge-detail-media-answer',
  templateUrl: './challenge-detail-media-answer.component.html',
  styleUrls: ['./challenge-detail-media-answer.component.css'],
})
export class ChallengeDetailMediaAnswerComponent {
  @Input() filePath;
  @Output() delete = new EventEmitter();
  isMediaLoaded = false;
  constructor(private challengeStorageService: ChallengeStorageService) {}

  getDownloadUrl(answer) {
    return this.challengeStorageService.getDownloadUrl(answer);
  }
  mediaLoaded() {
    this.isMediaLoaded = true;
  }
  hasmediaLoaded() {
    return this.isMediaLoaded;
  }
  confirmDelete() {
    this.delete.next(this.filePath);
  }
}
