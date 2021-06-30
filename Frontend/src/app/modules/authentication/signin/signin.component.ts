import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Profiles } from 'src/app/core/models/profiles.enum';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  authForm = new FormGroup({
    email: new FormControl('',
      [
        Validators.required,
        Validators.maxLength(45),
      ]),
    password: new FormControl('',
      [
        Validators.required,
        Validators.maxLength(45),
      ]),
  });

  constructor(private AuthenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      return
    }

    this.AuthenticationService.signin(this.authForm.value).subscribe({
      next: res => {
        console.log("Entra en enrutador")
        if (res.employee.profile.name === Profiles.EMPLOYEE) {
          this.router.navigateByUrl('/employees')
        } else if (res.employee.profile.name === Profiles.MANAGER) {
          this.router.navigateByUrl('/manager')
        } else if (res.employee.profile.name === Profiles.FINANCES) {
          this.router.navigateByUrl('/finances')
        }
      },
      error: (error) => {
        if (error.status === 401) {
          this.authForm.setErrors({ credentials: true })
        } else if (!error.status) {
          this.authForm.setErrors({ noConnection: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      }
    });

  }

}