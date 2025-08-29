import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-change-email-form',
  imports: [MatIcon],
  templateUrl: './change-email-form.component.html',
  styleUrl: './change-email-form.component.css',
})
export class ChangeEmailFormComponent {
  private authService = inject(AuthService);

  user = this.authService.user;
}
