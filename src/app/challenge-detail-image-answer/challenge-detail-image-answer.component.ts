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
  selector: 'app-challenge-detail-image-answer',
  templateUrl: './challenge-detail-image-answer.component.html',
  styleUrls: ['./challenge-detail-image-answer.component.css'],
  animations: [
    trigger('showConfirmDeleteState', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(120%)' })),
      transition('out <=> in', animate('250ms cubic-bezier(.35,0,.25,1)')),
    ]),
  ],
})
export class ChallengeDetailImageAnswerComponent {
  @Input() filePath;
  @Output() delete = new EventEmitter();
  isImageLoaded = false;
  constructor(private challengeStorageService: ChallengeStorageService) { }

  getDownloadUrl(answer) {
    return this.challengeStorageService.getDownloadUrl(answer).do(value => {
      if (value === 'failure') {
        console.log('echec...');
      }
    });
  }
  imageLoaded() {
    this.isImageLoaded = true;
  }
  hasImageLoaded() {
    return this.isImageLoaded;
  }
  confirmDelete() {
    this.delete.next(this.filePath);
  }
}
