import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
@Injectable()
export class UserGuard implements CanActivateChild {
  constructor(private userService: UserService) {}
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    return this.userService.isCurrentUserAuthorized(route.params.uuid);
  }
}
