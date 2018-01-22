import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authenticationService: AuthenticationService) {}
  
  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }
  logout() {
    this.authenticationService.logout();
  }
}
