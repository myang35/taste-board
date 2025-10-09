import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '@core/services/auth/auth.service';
import { UserService } from '@core/services/user/user.service';
import { ApiErrorUtils } from '@core/utils/api-error-utils/api-error-utils';

@Component({
  selector: 'app-change-email-form',
  imports: [MatIcon, ReactiveFormsModule],
  templateUrl: './change-email-form.component.html',
  styleUrl: './change-email-form.component.css',
})
export class ChangeEmailFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);

  protected user = this.authService.user;
  protected form = this.formBuilder.group({
    newEmail: ['', [Validators.required, Validators.maxLength(256)]],
    password: ['', [Validators.required, Validators.maxLength(256)]],
  });
  protected formErrorMessage = signal('');
  protected inputErrorMessages = signal<{
    newEmail?: string;
    password?: string;
  }>({});
  protected showPassword = signal(false);

  updateEmail() {
    this.formErrorMessage.set('');
    this.inputErrorMessages.set({});

    const { newEmail, password } = this.form.controls;

    if (newEmail.hasError('required')) {
      this.inputErrorMessages().newEmail = 'Required';
    } else if (newEmail.hasError('maxlength')) {
      this.inputErrorMessages().newEmail =
        'Email cannot be over 256 characters';
    }

    if (password.hasError('required')) {
      this.inputErrorMessages().password = 'Required';
    } else if (password.hasError('maxlength')) {
      this.inputErrorMessages().password =
        'Password cannot be over 256 characters';
    }

    if (Object.keys(this.inputErrorMessages()).length > 0) {
      this.inputErrorMessages.set(this.inputErrorMessages());
      return;
    }

    this.userService
      .updateEmail({
        newEmail: newEmail.value!,
        password: password.value!,
      })
      .subscribe({
        next: () => {
          this.form.reset();
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
}
