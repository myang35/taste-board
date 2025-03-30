import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '@core/types/user';
import { environment } from '@env';
import { catchError, tap, throwError } from 'rxjs';

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

  login(credentials: { email: string; password: string }) {
    return this.http
      .post<AuthResponse>(
        `${environment.apiUrl}/auth/login`,
        {
          email: credentials.email,
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
      )
      .pipe(catchError(this.handleError));
  }

  signup(data: { fullName: string; email: string; password: string }) {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/signup`, data, {
        withCredentials: true,
      })
      .pipe(
        tap({
          next: (value) => this.storeData(value),
        }),
      )
      .pipe(catchError(this.handleError));
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
      )
      .pipe(catchError(this.handleError));
  }

  logout() {
    sessionStorage.removeItem('token');
    this.user.set(undefined);
  }

  get token() {
    return localStorage.getItem('token');
  }

  private storeData(value: AuthResponse) {
    this.user.set(value.user);
    sessionStorage.setItem('token', value.token);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      () => new Error(error.error?.message || error.message || 'Unknown error'),
    );
  }
}
