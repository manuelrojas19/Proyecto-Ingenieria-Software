import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './core/authentication/authentication.service';
import { Employee } from './core/models/employee';

interface AuthData {
  isAuthenticated: boolean,
  employee: Employee
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public signedIn$: BehaviorSubject<AuthData>;

  constructor(private authService: AuthenticationService) {
    this.signedIn$ = this.authService.signedin$;
  }

  ngOnInit() {
    this.authService.checkAuth().subscribe({
      next: () => { },
      error: (err) => {
        this.signedIn$.next({ isAuthenticated: false, employee: null })
      }
    });
  }
}
