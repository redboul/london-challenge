import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  /*{
    path: 'races',
    children: [
      { path: '', component: RacesComponent },
      { path: ':raceId', component: BetComponent },
      { path: ':raceId/live', component: LiveComponent }
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }*/
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
