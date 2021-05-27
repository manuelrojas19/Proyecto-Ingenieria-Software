import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Profiles } from '../models/profiles.enum';

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
        Validators.maxLength(40),
      ]),
    password: new FormControl('',
      [
        Validators.required,
        Validators.maxLength(40),
      ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.authForm.invalid) {
      if (this.authForm.get('email').value === '')
        this.authForm.get('email').setErrors({ requiredField: true })
      if (this.authForm.get('password').value === '')
        this.authForm.get('password').setErrors({ requiredField: true })
      return;
    }
    this.authService.signin(this.authForm.value).subscribe({
      next: res => {
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
      }
    });
  }
}
