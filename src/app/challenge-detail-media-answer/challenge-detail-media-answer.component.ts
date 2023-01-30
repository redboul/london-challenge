import { Subscription } from 'rxjs';
import { ChallengeStorageService } from './../challenge-storage.service';
import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { first } from 'lodash';
@Component({
  selector: 'app-challenge-detail-media-answer',
  templateUrl: './challenge-detail-media-answer.component.html',
  styleUrls: ['./challenge-detail-media-answer.component.css'],
})
export class ChallengeDetailMediaAnswerComponent implements OnInit, OnDestroy {
  @Input() filePath;
  @Output() delete = new EventEmitter();
  storageSubscription: Subscription;
  data;
  constructor(private challengeStorageService: ChallengeStorageService) { }

  confirmDelete() {
    this.delete.next(this.filePath);
  }
  ngOnInit() {
    this.storageSubscription = this.challengeStorageService
      .getFileMetadata(this.filePath)
      .subscribe(data => {
        this.data = data;
      });
  }
  ngOnDestroy() {
    this.storageSubscription.unsubscribe();
  }
  getFileSizeInKo() {
    return this.data && Math.round(this.data.size / 1000);
  }
  getDownloadUrl() {
    return this.data && first(this.data.downloadURLs);
  }
}
