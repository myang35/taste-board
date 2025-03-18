import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { take } from 'rxjs';
import { FooterComponent } from './core/ui/footer/footer.component';
import { HeaderComponent } from './core/ui/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private authService = inject(AuthService);
  title = 'taste-board';

  ngOnInit() {
    this.authService.refresh().pipe(take(1)).subscribe();
  }
}
