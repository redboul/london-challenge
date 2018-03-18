import { UserGuard } from './user-route-guard.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChallengeDetailComponent } from './challenge-detail/challenge-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { ForeverChallengesComponent } from './forever-challenges/forever-challenges.component';
import { DayComponent } from './day/day.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent, data: { state: 'home' } },
  { path: 'forgotten-password', component: ResetPasswordComponent },
  {
    path: ':uuid',
    canActivateChild: [UserGuard],
    children: [
      {
        path: 'calendar',
        children: [
          {
            path: '',
            component: CalendarComponent,
            data: { state: 'calendar' }
          },
          { path: ':day', component: DayComponent, data: { state: 'day' } }
        ]
      },
      {
        path: 'permanentChallenges',
        component: ForeverChallengesComponent,
        data: { state: 'permanentChallenges' }
      },
      {
        path: 'challenge/:challengeId',
        component: ChallengeDetailComponent,
        data: { state: 'challenge' }
      }
    ],
    data: { state: 'user' }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, {
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
