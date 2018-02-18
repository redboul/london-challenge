import { ChallengeStorageService } from './challenge-storage.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatListModule, MatInputModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationService } from './authentication.service';
import { DayService } from './day.service';
import { UserService } from './user.service';
import { ChallengesService } from './challenges.service';
import { AppStatusService } from './app-status.service';
import { FulfilledChallengesService } from './fulfilled-challenges.service';
import { LoadingComponent } from './loading/loading.component';
import { DayComponent } from './day/day.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ForeverChallengesComponent } from './forever-challenges/forever-challenges.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { CalendarDayComponent } from './calendar-day/calendar-day.component';
import { ChallengeDetailComponent } from './challenge-detail/challenge-detail.component';
import { ChallengeDetailImageAnswerComponent } from './challenge-detail-image-answer/challenge-detail-image-answer.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    LoadingComponent,
    DayComponent,
    CalendarComponent,
    ForeverChallengesComponent,
    ChallengeComponent,
    CalendarDayComponent,
    ChallengeDetailComponent,
    ChallengeDetailImageAnswerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthenticationService,
    UserService,
    DayService,
    ChallengesService,
    FulfilledChallengesService,
    AppStatusService,
    ChallengeStorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
