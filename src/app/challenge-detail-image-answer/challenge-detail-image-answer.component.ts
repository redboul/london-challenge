import { ChallengeStorageService } from './../challenge-storage.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Observable } from 'rxjs/Observable';

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
export class ChallengeDetailImageAnswerComponent implements OnInit {
  @Input() filePath;
  @Output() delete = new EventEmitter();
  isImageLoaded = false;
  url$: Observable<string>;
  constructor(private challengeStorageService: ChallengeStorageService) {}

  ngOnInit() {
    this.url$ = this.challengeStorageService
      .getDownloadUrl(this.filePath)
      .share();
  }

  getDownloadUrl() {
    return this.url$;
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
