import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { UserService } from '@core/services/user/user.service';

@Component({
  selector: 'app-delete-account-form',
  imports: [MatIcon, ReactiveFormsModule],
  templateUrl: './delete-account-form.component.html',
  styleUrl: './delete-account-form.component.css',
})
export class DeleteAccountFormComponent {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  protected showConfirmModal = signal(false);
  protected form = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        this.equalsValidator(this.authService.user()?.username),
      ],
    ],
  });
  protected formErrorMessage = signal('');

  deleteAccount() {
    const userId = this.authService.user()?.id;
    if (!userId) {
      this.formErrorMessage.set('Current user not found');
      return;
    }

    this.userService.delete(userId).subscribe({
      next: () =>
        this.authService.logout().subscribe({
          next: () => {
            this.router.navigateByUrl('/login');
          },
        }),
    });
  }

  private equalsValidator<T = unknown>(value: T): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return value !== control.value ? { value: control.value } : null;
    };
  }
}
