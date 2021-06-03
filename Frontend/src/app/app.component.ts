import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthData } from './auth/interfaces/auth-data';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tems-frontend';
  public signedIn$: BehaviorSubject<AuthData>;
  
  constructor(private authService: AuthService) {
    this.signedIn$ = this.authService.signedin$;
  }

  ngOnInit() {
    this.authService.checkAuth().subscribe(()=>{});
  }
}
