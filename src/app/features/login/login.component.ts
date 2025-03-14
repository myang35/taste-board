import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  emailErrorMessage = '';
  passwordErrorMessage = '';
  formErrorMessage = '';

  navigateToHome() {
    this.router.navigateByUrl('/');
  }

  onLoginSubmit() {
    this.emailErrorMessage = '';
    this.passwordErrorMessage = '';
    this.formErrorMessage = '';

    const { email, password } = this.loginForm.controls;
    if (!this.loginForm.valid || !email.value || !password.value) {
      if (email.hasError('required')) {
        this.emailErrorMessage = 'Required';
      }
      if (email.hasError('email')) {
        this.emailErrorMessage = 'Invalid format';
      }
      if (password.hasError('required')) {
        this.passwordErrorMessage = 'Required';
      }
      return;
    }

    this.authService
      .login({
        email: email.value,
        password: password.value,
      })
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          if ('message' in error) {
            this.formErrorMessage = error.message;
          } else {
            this.formErrorMessage = 'Unknown error occurred';
          }
        },
      });
  }
}
