import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@core/services/auth/auth.service';
import { UserImageComponent } from '@shared/ui/user-image/user-image.component';

@Component({
  selector: 'app-header',
  imports: [
    CdkMenu,
    CdkMenuItem,
    CdkMenuTrigger,
    MatIconModule,
    UserImageComponent,
  ],
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
