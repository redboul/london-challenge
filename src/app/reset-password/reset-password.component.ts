import { AppStatusService } from './../app-status.service';
import { AuthenticationService } from './../authentication.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  user = { email: undefined };
  processingMessage: string;
  sendingEmail = false;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private appStatusService: AppStatusService,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.appStatusService.available();
  }

  resetPassword() {
    this.sendingEmail = true;
    this.authenticationService.resetPassword(this.user.email).then(message => {
      this.sendingEmail = false;
      this.processingMessage = message;
    });
  }
}
