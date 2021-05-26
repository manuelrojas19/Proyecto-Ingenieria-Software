import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Credentials } from '../interfaces/credentials';
import { SigninResponse } from '../interfaces/signin-response';
import { CheckAuthResponse } from '../interfaces/check-auth-response';
import { AuthData } from '../interfaces/auth-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  signedin$ = new BehaviorSubject<AuthData>(null);

  constructor(private http: HttpClient) { }

  signin(credentials: Credentials) {
    return this.http.post<SigninResponse>(environment.API_URL + '/auth/signin', credentials)
    .pipe(
      tap(({employee}) => {
        this.signedin$.next({isAuthenticated: true, employee: employee});
      })
    );
  }

  signout() {
    return this.http.get(environment.API_URL + '/auth/logout')
    .pipe(
      tap(() => {
        this.signedin$.next({isAuthenticated: false, employee: null});
      })
    );
  }

  checkAuth() {
    return this.http.get<CheckAuthResponse>(environment.API_URL + '/auth/check').pipe(
      tap(({authenticated, employee}) => {
        this.signedin$.next({isAuthenticated: authenticated, employee: employee});
      })
    );
  }
}
