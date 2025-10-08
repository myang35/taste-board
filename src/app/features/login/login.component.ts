import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { ApiErrorUtils } from '@core/utils/api-error-utils/api-error-utils';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatIcon],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  protected loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  protected showPassword = signal(false);
  protected formErrorMessage = signal('');
  protected inputErrorMessages = signal<{
    email?: string;
    password?: string;
  }>({});

  navigateToHome() {
    this.router.navigateByUrl('/');
  }

  onLoginSubmit() {
    this.formErrorMessage.set('');
    this.inputErrorMessages.set({});

    const { email, password } = this.loginForm.controls;

    if (email.hasError('required')) {
      this.inputErrorMessages().email = 'Required';
    }
    if (email.hasError('email')) {
      this.inputErrorMessages().email = 'Invalid format';
    }
    if (password.hasError('required')) {
      this.inputErrorMessages().password = 'Required';
    }

    if (Object.keys(this.inputErrorMessages()).length > 0) {
      this.inputErrorMessages.set(this.inputErrorMessages()); // Trigger signal
      return;
    }

    this.authService
      .login({
        email: email.value!,
        password: password.value!,
      })
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
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
        },
      });
  }

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }
}
