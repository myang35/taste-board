import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@core/types/user';
import { environment } from '@env';
import { tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  updateEmail(params: { newEmail: string; password: string }) {
    const user = this.authService.user();
    if (!user) {
      throw new Error('User must be logged in to update email');
    }
    return this.http
      .patch<User>(`${environment.apiUrl}/users/${user.id}/email`, {
        newEmail: params.newEmail,
        password: params.password,
      })
      .pipe(
        tap({
          next: (value) => this.authService.user.set(value),
        }),
      );
  }

  updatePassword(params: { newPassword: string; currentPassword: string }) {
    const user = this.authService.user();
    if (!user) {
      throw new Error('User must be logged in to update email');
    }
    return this.http.patch<User>(
      `${environment.apiUrl}/users/${user.id}/password`,
      {
        newPassword: params.newPassword,
        currentPassword: params.currentPassword,
      },
    );
  }
}
