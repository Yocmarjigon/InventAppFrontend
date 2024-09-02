import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  let authServices = inject(AuthService);
  let router = inject(Router);


  if (!authServices.isAuthenticated()) {

    router.navigate(['/login']);
    return false;
  }
  return true;
};
