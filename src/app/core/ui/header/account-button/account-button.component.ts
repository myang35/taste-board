import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
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
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly user = input.required<User>();

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/login');
      },
    });
  }
}
