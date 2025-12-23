import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@core/services/auth/auth.service';
import { AccountButtonComponent } from './account-button/account-button.component';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, AccountButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);

  protected user = this.authService.user;
  protected showMenu = signal(false);
}
