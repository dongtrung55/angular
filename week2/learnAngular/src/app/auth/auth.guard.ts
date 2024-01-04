import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isLoggedIn().pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          // Check if the user has the 'administrator' role
          const userInLocalStorage = localStorage.getItem('currentUser');
          if (userInLocalStorage !== null) {
            const userObject = JSON.parse(userInLocalStorage);
            if (userObject['role'] === 'administrator') {
              return true;
            }

            if (state.url.includes('forgot-password') || state.url.includes('register')) {
              this.router.navigate(['/home']); // Redirect to home
              return false;
            }
          }
          // Redirect to home if the user is not an admin
          this.router.navigate(['/home']);
          return false;
        }
        // Redirect to login if the user is not logged in
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
