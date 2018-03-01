import { Subscription } from 'rxjs/Subscription';
import { UserService } from './../user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user';
@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.css'],
})
export class CurrentUserComponent implements OnInit, OnDestroy {
  currentUserSubscription: Subscription;
  currentUser: User;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.currentUserSubscription = this.userService.currentUser$
      .filter(u => !!u)
      .subscribe(u => (this.currentUser = u));
  }
  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }
}
