import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { tap } from 'rxjs';

@Injectable()
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isLoggedIn$.pipe(
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: state.url },
          });
        }
      })
    );
  }
}
