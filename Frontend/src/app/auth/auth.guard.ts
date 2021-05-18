import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take, skipWhile, tap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

import { Profiles } from './profiles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.signedin$.pipe(
      skipWhile(value => value === null),
      take(1),
      map(({ isAuthenticated, employee }) => {
        if (isAuthenticated &&
          employee.profile === route.data.profile) {
          return true;
        }
        this.router.navigateByUrl('/');
        return false;
      }),
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.signedin$.pipe(
      skipWhile(value => value === null),
      take(1),
      map(({ isAuthenticated, employee }) => {
        if (!isAuthenticated) {
          return true;
        }
        console.log(employee.profile)
        if (employee.profile === Profiles.EMPLOYEE) {
          this.router.navigateByUrl('/employees');
        } else if (employee.profile === Profiles.MANAGER) {
          this.router.navigateByUrl('/manager');
        } else if (employee.profile === Profiles.FINANCES) {
          this.router.navigateByUrl('/finances');
        }
        return false;
      }),
    );
  }
}
