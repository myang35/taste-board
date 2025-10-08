import { Component, inject } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  private readonly authService = inject(AuthService);

  protected user = this.authService.user;
}
