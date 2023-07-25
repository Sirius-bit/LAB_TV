import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedInGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router)

  const token = localStorage.getItem('user');
  if (token) {
    return true;
  }
  router.navigateByUrl('/unauthorized');
  return false;
};
