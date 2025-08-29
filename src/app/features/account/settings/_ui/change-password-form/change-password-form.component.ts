import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-change-password-form',
  imports: [MatIcon],
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.css',
})
export class ChangePasswordFormComponent {
  private authService = inject(AuthService);

  user = this.authService.user;
}
