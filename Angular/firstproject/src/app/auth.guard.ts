import { CanActivateFn } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route: any, state: RouterStateSnapshot) => {
  // const router = route['router']; // Access the 'router' property correctly

  // // Check if user is already logged in
  // const isLoggedIn = true;
  // /* Add your logic to check if the user is logged in */

  // if (localStorage.getItem('token')) {
  //   // User is logged in, navigate to a different route
  //   console.log('in if condition.');
  //   router.navigate(['/user-details', localStorage.getItem('uid')]);
  //   // router.navigate(['/user-details', 1]); // Example of navigating to a specific user details

  //   // return false;
  // }

  return true;
};
