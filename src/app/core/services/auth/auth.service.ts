import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '@core/types/user';
import { environment } from '@env';
import { tap } from 'rxjs';

export interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  user = signal<User | undefined>(undefined);

  login(credentials: { username: string; password: string }) {
    return this.http
      .post<AuthResponse>(
        `${environment.apiUrl}/auth/login`,
        {
          username: credentials.username,
          password: credentials.password,
        },
        {
          withCredentials: true,
        },
      )
      .pipe(
        tap({
          next: (value) => this.storeData(value),
        }),
      );
  }

  signup(data: { name: string; username: string; password: string }) {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/signup`, data, {
        withCredentials: true,
      })
      .pipe(
        tap({
          next: (value) => this.storeData(value),
        }),
      );
  }

  refresh() {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/refresh`, null, {
        withCredentials: true,
      })
      .pipe(
        tap({
          next: (value) => this.storeData(value),
        }),
      );
  }

  logout() {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/logout`, null, {
        withCredentials: true,
      })
      .pipe(
        tap({
          next: () => {
            sessionStorage.removeItem('token');
            this.user.set(undefined);
          },
        }),
      );
  }

  get token() {
    return sessionStorage.getItem('token');
  }

  private storeData(value: AuthResponse) {
    this.user.set(value.user);
    sessionStorage.setItem('token', value.token);
  }
}
