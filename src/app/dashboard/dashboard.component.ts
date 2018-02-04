import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ChallengesService } from '../challenges.service';
import { FulfilledChallengesService } from '../fulfilled-challenges.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user;
  fulfilledChallengesSize;
  challengesSize;
  constructor(private userService: UserService,
    private challengesService: ChallengesService,
    private fulfilledChallenges: FulfilledChallengesService
  ) { }

  ngOnInit() {
    this.userService.user$.filter(user => !!user).subscribe(user => {
      this.user = user;
    });
    this.fulfilledChallenges.size$.subscribe(size => this.fulfilledChallengesSize = size);
  }

}
