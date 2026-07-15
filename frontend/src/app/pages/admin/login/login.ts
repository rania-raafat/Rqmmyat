import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm: FormGroup;

  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required
        ]
      ]

    });

  }

  onSubmit() {

    this.errorMessage = '';

    if (this.loginForm.invalid) {

      this.errorMessage =
        'Please enter a valid email and password';

      return;

    }

    this.authService.login(
      this.loginForm.value
    ).subscribe({

      next: (res: any) => {

        sessionStorage.setItem(
          'token',
          res.token
        );

        sessionStorage.setItem(
          'role',
          res.admin.role
        );

        sessionStorage.setItem(
          'admin',
          JSON.stringify(res.admin)
        );

        this.router.navigate(
          ['/dashboard']
        );

      },

      error: (err) => {

        console.log(err);

        this.errorMessage =
          err.error?.message ||
          'Invalid email or password';

      }

    });

  }

}