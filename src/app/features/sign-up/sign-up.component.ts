import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { ApiErrorUtils } from '@core/utils/api-error-utils/api-error-utils';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, MatIcon],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  protected signupForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.maxLength(256)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });
  protected showPassword = signal(false);
  protected showConfirmPassword = signal(false);
  protected formErrorMessage = signal('');
  protected inputErrorMessages = signal<{
    name?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  navigateToHome() {
    this.router.navigateByUrl('/');
  }

  onSignupSubmit() {
    this.formErrorMessage.set('');
    this.inputErrorMessages.set({});

    const { name, username, password, confirmPassword } =
      this.signupForm.controls;

    if (name.hasError('required')) {
      this.inputErrorMessages().name = 'Required';
    }
    if (username.hasError('required')) {
      this.inputErrorMessages().username = 'Required';
    }
    if (username.hasError('username')) {
      this.inputErrorMessages().username = 'Invalid format';
    }
    if (password.hasError('required')) {
      this.inputErrorMessages().password = 'Required';
    }
    if (password.hasError('minlength')) {
      this.inputErrorMessages().password =
        'Password must be at least 6 characters';
    }
    if (confirmPassword.hasError('required')) {
      this.inputErrorMessages().confirmPassword = 'Required';
    }
    if (password.value !== confirmPassword.value) {
      this.inputErrorMessages().confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(this.inputErrorMessages()).length > 0) {
      this.inputErrorMessages.set(this.inputErrorMessages()); // Trigger signal
      return;
    }

    this.authService
      .signup({
        name: name.value!,
        username: username.value!,
        password: password.value!,
      })
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/account');
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            if (ApiErrorUtils.isInvalidInputsError(error.error)) {
              this.formErrorMessage.set(error.error.message);
              this.inputErrorMessages.set(error.error.data.inputs);
              return;
            }
            if (ApiErrorUtils.isApiError(error.error)) {
              this.formErrorMessage.set(error.error.message);
              return;
            }
          }
          this.formErrorMessage.set('Unknown error occurred');
          return;
        },
      });
  }

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword);
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword.set(!this.showConfirmPassword);
  }
}
