import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  authService.setSession();
  if (authService.session) return true;
  inject(Router).navigateByUrl('/');
  return false;
};
