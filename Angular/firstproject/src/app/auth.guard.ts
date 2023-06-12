import { CanActivateFn } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route: any, state: RouterStateSnapshot) => {

  return true;
};
