import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  const token =
    sessionStorage.getItem('token');

  if (token) {
    return true;
  }

  router.navigate(
    ['/admin']
  );

  return false;

};