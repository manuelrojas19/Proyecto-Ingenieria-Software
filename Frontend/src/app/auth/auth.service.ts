import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

// const ROOT_URL = 'http://localhost:3000/api/v1/auth';
const ROOT_URL = 'https://sistema-viaticos-backend.uc.r.appspot.com/api/v1/auth';

interface Credentials {
  username: string;
  password: string;
}

interface SigninResponse {
  message: string;
  employee: any;
}

interface CheckAuthResponse {
  authenticated: boolean;
  employee: any;
}

interface AuthData {
  isAuthenticated: boolean,
  employee: any,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  signedin$ = new BehaviorSubject<AuthData>(null);

  constructor(private http: HttpClient) { }

  signin(credentials: Credentials) {
    return this.http.post<SigninResponse>(ROOT_URL + '/signin', credentials)
    .pipe(
      tap(({employee}) => {
        this.signedin$.next({isAuthenticated: true, employee: employee});
      })
    );
  }

  signout() {
    return this.http.get(ROOT_URL + '/logout')
    .pipe(
      tap(() => {
        this.signedin$.next({isAuthenticated: false, employee: null});
      })
    );
  }

  checkAuth() {
    return this.http.get<CheckAuthResponse>(ROOT_URL + '/check').pipe(
      tap(({authenticated, employee}) => {
        this.signedin$.next({isAuthenticated: authenticated, employee: employee});
      })
    );
  }
}
