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
  selector: 'app-delete-answer',
  templateUrl: './delete-answer.component.html',
  styleUrls: ['./delete-answer.component.css'],
  animations: [
    trigger('showConfirmDeleteState', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(120%)' })),
      transition('out <=> in', animate('250ms cubic-bezier(.35,0,.25,1)')),
    ]),
  ],
})
export class DeleteAnswerComponent {
  @Output() delete = new EventEmitter();
  showConfirmDeleteState = 'out';

  confirmDelete() {
    this.delete.next();
  }

  showConfirmDelete() {
    this.showConfirmDeleteState = 'in';
  }

  cancelDelete() {
    this.showConfirmDeleteState = 'out';
  }
}
