import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { Employee } from '../models/employee';

interface AuthData {
  isAuthenticated: boolean;
  employee: Employee;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public signedIn$: BehaviorSubject<AuthData>;
  public profileName: string;

  constructor(private authenticationService: AuthenticationService) {
    this.signedIn$ = this.authenticationService.signedin$;
  }

  ngOnInit(): void {
    this.listenToCheckAuth();
  }

  listenToCheckAuth(): void {
    this.authenticationService.checkAuth().subscribe({
      next: (res) => {
        this.profileName = res.employee.profile.name;
      },
      error: (err) => {
        this.signedIn$.next({ isAuthenticated: false, employee: null })
      }
    });
  }

}
