import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { AppStatusService } from '../app-status.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {email: null as string, password: null as string};
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  constructor(private appStatusService: AppStatusService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.appStatusService.available();
  }

  login() {
    this.authenticationService.login(this.user);
  }

}
