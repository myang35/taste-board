import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  signupForm = this.formBuilder.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });

  fullNameErrorMessage = '';
  emailErrorMessage = '';
  passwordErrorMessage = '';
  confirmPasswordErrorMessage = '';
  formErrorMessage = '';

  navigateToHome() {
    this.router.navigateByUrl('/');
  }

  onSignupSubmit() {
    this.fullNameErrorMessage = '';
    this.emailErrorMessage = '';
    this.passwordErrorMessage = '';
    this.confirmPasswordErrorMessage = '';
    this.formErrorMessage = '';

    const { fullName, email, password, confirmPassword } =
      this.signupForm.controls;

    if (
      !this.signupForm.valid ||
      !fullName.value ||
      !email.value ||
      !password.value ||
      !confirmPassword.value
    ) {
      if (fullName.hasError('required')) {
        this.fullNameErrorMessage = 'Required';
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
        fullName: fullName.value,
        email: email.value,
        password: password.value,
      })
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/login');
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
