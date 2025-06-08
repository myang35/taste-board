import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { TabComponent } from './_ui/tab/tab.component';

@Component({
  imports: [RouterModule, TabComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  private authService = inject(AuthService);

  user = this.authService.user;
}
