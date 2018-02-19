import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AppStatusService } from './app-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private appStatusService: AppStatusService,
    private router: Router,
  ) {}

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
  isAppWorking() {
    return this.appStatusService.isWorking();
  }
}
