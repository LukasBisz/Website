import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { getAuth, user } from '@angular/fire/auth';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  const auth = getAuth();
  console.log(authService.user);
  if (auth.currentUser instanceof user) {
    return true;
  } else {
    router.navigateByUrl('/');
    return false;
  }
};
