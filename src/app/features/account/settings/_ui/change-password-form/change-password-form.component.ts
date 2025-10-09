import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '@core/services/auth/auth.service';
import { UserService } from '@core/services/user/user.service';
import { ApiErrorUtils } from '@core/utils/api-error-utils/api-error-utils';

@Component({
  selector: 'app-change-password-form',
  imports: [MatIcon, ReactiveFormsModule],
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.css',
})
export class ChangePasswordFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);

  protected user = this.authService.user;
  protected form = this.formBuilder.group({
    currentPassword: ['', [Validators.required, Validators.maxLength(256)]],
    newPassword: ['', [Validators.required, Validators.maxLength(256)]],
    confirmPassword: ['', [Validators.required, Validators.maxLength(256)]],
  });
  protected formErrorMessage = signal('');
  protected inputErrorMessages = signal<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  protected showCurrentPassword = signal(false);
  protected showNewPassword = signal(false);
  protected showConfirmPassword = signal(false);

  updatePassword() {
    this.formErrorMessage.set('');
    this.inputErrorMessages.set({});

    const { currentPassword, newPassword, confirmPassword } =
      this.form.controls;

    if (currentPassword.hasError('required')) {
      this.inputErrorMessages().currentPassword = 'Required';
    } else if (currentPassword.hasError('maxlength')) {
      this.inputErrorMessages().currentPassword =
        'Password cannot be over 256 characters';
    }

    if (newPassword.hasError('required')) {
      this.inputErrorMessages().newPassword = 'Required';
    } else if (newPassword.hasError('maxlength')) {
      this.inputErrorMessages().newPassword =
        'Password cannot be over 256 characters';
    }

    if (confirmPassword.hasError('required')) {
      this.inputErrorMessages().confirmPassword = 'Required';
    } else if (confirmPassword.hasError('maxlength')) {
      this.inputErrorMessages().confirmPassword =
        'Password cannot be over 256 characters';
    } else if (newPassword.value !== confirmPassword.value) {
      this.inputErrorMessages().confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(this.inputErrorMessages()).length > 0) {
      this.inputErrorMessages.set(this.inputErrorMessages());
      return;
    }

    this.userService
      .updatePassword({
        currentPassword: currentPassword.value!,
        newPassword: newPassword.value!,
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
