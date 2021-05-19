import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';

interface AuthData {
  isAuthenticated: boolean,
  employee: any,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tems-frontend';
  signedIn$: BehaviorSubject<AuthData>;
  
  constructor(private authService: AuthService) {
    this.signedIn$ = this.authService.signedin$;
  }

  ngOnInit() {
    this.authService.checkAuth().subscribe(()=>{});
  }
}
