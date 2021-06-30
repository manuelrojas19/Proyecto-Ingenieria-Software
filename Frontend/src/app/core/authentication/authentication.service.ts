import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';

interface AuthData {
  isAuthenticated: boolean,
  employee: Employee
}

interface Credentials {
  email: string,
  password: string
}

interface SigninResponse {
  message: string,
  employee: Employee,
}

interface CheckAuthResponse {
  authenticated: boolean,
  employee: Employee,
  message: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  signedin$ = new BehaviorSubject<AuthData>({ isAuthenticated: null, employee: null });
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  checkAuth() {
    return this.http.get<CheckAuthResponse>(`${this.apiUrl}/auth/check`).pipe(
      tap(({ authenticated, employee }) => {
        this.signedin$.next({ isAuthenticated: authenticated, employee: employee });
      })
    );
  }

  signin(credentials: Credentials) {
    return this.http.post<SigninResponse>(`${this.apiUrl}/auth/signin`, credentials)
      .pipe(
        tap(({ employee }) => {
          this.signedin$.next({ isAuthenticated: true, employee: employee });
        })
      );
  }

  signout() {
    return this.http.get(`${this.apiUrl}/auth/signout`)
      .pipe(
        tap(() => {
          this.signedin$.next({ isAuthenticated: false, employee: null });
        })
      );
  }
}

