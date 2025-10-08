import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, MatIcon],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  signupForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });
  showPassword = false;
  showConfirmPassword = false;
  nameErrorMessage = '';
  emailErrorMessage = '';
  passwordErrorMessage = '';
  confirmPasswordErrorMessage = '';
  formErrorMessage = '';

  navigateToHome() {
    this.router.navigateByUrl('/');
  }

  onSignupSubmit() {
    this.nameErrorMessage = '';
    this.emailErrorMessage = '';
    this.passwordErrorMessage = '';
    this.confirmPasswordErrorMessage = '';
    this.formErrorMessage = '';

    const { name, email, password, confirmPassword } = this.signupForm.controls;

    if (
      !this.signupForm.valid ||
      !name.value ||
      !email.value ||
      !password.value ||
      !confirmPassword.value
    ) {
      if (name.hasError('required')) {
        this.nameErrorMessage = 'Required';
      }
      if (email.hasError('required')) {
        this.emailErrorMessage = 'Required';
      }
      if (email.hasError('email')) {
        this.emailErrorMessage = 'Invalid format';
      }
      if (password.hasError('required')) {
        this.passwordErrorMessage = 'Required';
      }
      if (password.hasError('minlength')) {
        this.passwordErrorMessage = 'Password must be at least 6 characters';
      }
      if (confirmPassword.hasError('required')) {
        this.confirmPasswordErrorMessage = 'Required';
      }

      if (password.value !== confirmPassword.value) {
        this.confirmPasswordErrorMessage = 'Passwords do not match';
      }

      return;
    }

    this.authService
      .signup({
        name: name.value,
        email: email.value,
        password: password.value,
      })
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/account');
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
