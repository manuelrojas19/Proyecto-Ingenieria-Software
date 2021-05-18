import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Profiles } from '../profiles.enum';

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
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.email,
      ]),
    password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
      ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }


  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    this.authService.signin(this.authForm.value).subscribe({
      next: res => {
        console.log(res.employee.profile);
        if (res.employee.profile === Profiles.EMPLOYEE) {
          this.router.navigateByUrl('/employees')
        } else if (res.employee.profile === Profiles.MANAGER) {
          this.router.navigateByUrl('/manager')
        } else if (res.employee.profile === Profiles.FINANCES) {
          this.router.navigateByUrl('/finances')
        }
      },
      error: err => {
        this.authForm.setErrors({ credentials: true })
        if (!err.status) {
          this.authForm.setErrors({ noConnection: true })
        }
      }
    }
    );
  }
}
