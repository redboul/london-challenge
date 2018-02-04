import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { ForeverChallengesComponent } from './forever-challenges/forever-challenges.component';
import { DayComponent } from './day/day.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calendar', children: [
    { path: '', component: CalendarComponent },
    { path: ':day', component: DayComponent },
    { path: ':day/:challengeId', component: ChallengeComponent }
  ] },
  { path: 'permanentChallenges', children: [
    { path: '', component: ForeverChallengesComponent },
    { path: ':challengeId', component: ChallengeComponent }
  ] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      ROUTES,
      { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
