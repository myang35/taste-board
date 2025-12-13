import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@core/services/auth/auth.service';
import { User } from '@core/types/user';
import { UserImageComponent } from '@shared/ui/user-image/user-image.component';

@Component({
  selector: 'app-account-button',
  imports: [
    CdkMenu,
    CdkMenuItem,
    CdkMenuTrigger,
    MatIconModule,
    UserImageComponent,
  ],
  templateUrl: './account-button.component.html',
  styleUrl: './account-button.component.css',
})
export class AccountButtonComponent {
  private authService = inject(AuthService);

  readonly user = input.required<User>();

  logout() {
    this.authService.logout().subscribe();
  }
}
