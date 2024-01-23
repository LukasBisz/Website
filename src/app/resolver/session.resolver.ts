import { ResolveFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const sessionResolver: ResolveFn<any> = (route, state) => {
  const authservice = inject(AuthService);
  authservice.setSession();
  return authservice.session;
};
