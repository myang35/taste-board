import { Component, inject } from '@angular/core';
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
  private authService = inject(AuthService);

  user = this.authService.user;

  logout() {
    this.authService.logout().subscribe();
  }
}
