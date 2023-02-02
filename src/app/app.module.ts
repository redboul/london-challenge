import { UserGuard } from './user-route-guard.service';
import { ChallengeDetailMediaAnswerComponent } from './challenge-detail-media-answer/challenge-detail-media-answer.component';
import { DeleteAnswerComponent } from './delete-answer/delete-answer.component';
import { ChallengeStorageService } from './challenge-storage.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
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
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TeamStatusComponent } from './team-status/team-status.component';
import { CurrentUserComponent } from './current-user/current-user.component';
import { ChallengeDescriptionComponent } from './challenge-description/challenge-description.component';

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
    ChallengeDetailMediaAnswerComponent,
    DeleteAnswerComponent,
    ResetPasswordComponent,
    TeamStatusComponent,
    CurrentUserComponent,
    ChallengeDescriptionComponent,
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
    MatSelectModule,
    MatExpansionModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    AuthenticationService,
    UserService,
    DayService,
    ChallengesService,
    FulfilledChallengesService,
    AppStatusService,
    ChallengeStorageService,
    UserGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
