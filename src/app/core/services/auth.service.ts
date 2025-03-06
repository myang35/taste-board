import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(credentials: { email: string; password: string }) {
    return this.http
      .post(`${environment.apiUrl}/auth/login`, {
        email: credentials.email,
        password: credentials.password,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message));
  }
}
