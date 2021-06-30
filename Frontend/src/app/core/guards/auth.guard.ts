import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, skipWhile, take } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { Profiles } from '../models/profiles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authenticationService.signedin$.pipe(
        skipWhile(value => value.isAuthenticated === null),
        take(1),
        map(({ isAuthenticated, employee }) => {
          if (!isAuthenticated) {
            return true;
          }
          if (employee.profile.name === Profiles.EMPLOYEE) {
            this.router.navigateByUrl('/employees');
          } else if (employee.profile.name === Profiles.MANAGER) {
            this.router.navigateByUrl('/manager');
          } else if (employee.profile.name === Profiles.FINANCES) {
            this.router.navigateByUrl('/finances');
          }
          return false;
        }),
      );
    }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticationService.signedin$.pipe(
      skipWhile(value => value.isAuthenticated === null),
      take(1),
      map(({ isAuthenticated, employee }) => {
        if (isAuthenticated &&
          employee.profile.name === route.data.profile) {
          return true;
        }
        this.router.navigateByUrl('/');
        return false;
      }),
    );
  }
}
