import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthenticationService } from './core/authentication/authentication.service';
import { Employee } from './core/models/employee';
import { LoaderService } from './core/services/loader.service';

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
  isLoading: boolean = false;

  constructor(private authService: AuthenticationService,
    private loaderService: LoaderService) {
    this.signedIn$ = this.authService.signedin$;
  }

  ngOnInit() {

    this.listenToLoading();
    this.listenToCheckAuth();
  }


  listenToCheckAuth(): void {
    this.authService.checkAuth().subscribe({
      next: () => { },
      error: (err) => {
        this.signedIn$.next({ isAuthenticated: false, employee: null })
      }
    });
  }

  /**
   * Listen to the loadingSub property in the LoadingService class. This drives the
   * display of the loading spinner.
   */
  listenToLoading(): void {
    this.loaderService.isLoading$
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
      });
  }
}
