import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.token) {
    return router.parseUrl('/login');
  }

  try {
    const isLoggedIn = await new Promise((resolve) =>
      authService.refresh().subscribe(() => resolve(!!authService.user)),
    );
    if (!isLoggedIn) {
      return router.parseUrl('/login');
    }
  } catch {
    return router.parseUrl('/login');
  }

  return true;
};
