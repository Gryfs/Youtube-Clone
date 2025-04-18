import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  const router = inject(Router)

  const currentUser = authService.getCurrentUser();

  if (currentUser) {
    return true;
  } else {
    router.navigate(['login'], {
      queryParams: {
        returnUrl: state.url,
        message: "Vous devez être connecté"
      }
    });
    return false;
  }
};
