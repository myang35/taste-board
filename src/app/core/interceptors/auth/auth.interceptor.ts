import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  if (authService.token) {
    const newReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authService.token}`),
    });
    return next(newReq);
  }
  return next(req);
};
