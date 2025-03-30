import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [CdkMenu, CdkMenuItem, CdkMenuTrigger, MatIconModule],
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
