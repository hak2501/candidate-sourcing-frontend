import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  switchMap,
  throwError,
} from 'rxjs';

@Injectable()
export class JwtRefreshInterceptor {
  private isRefreshing$ = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: true,
    });
    return next.handle(request).pipe(
      catchError((err) => {
        if (
          err instanceof HttpErrorResponse &&
          !request.url.includes('/login') &&
          err.status == 401
        ) {
          return this.handle401Error(request, next);
        }
        return throwError(() => err);
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing$.value) {
      this.isRefreshing$.next(true);
      if (this.authService.isLoggedIn()) {
        return this.authService.refresh().pipe(
          switchMap(() => {
            this.isRefreshing$.next(false);
            return next.handle(req);
          }),
          catchError((err) => {
            this.isRefreshing$.next(false);
            if (err.status == '403') {
              this.authService.logout();
            }
            return throwError(() => err);
          })
        );
      }
    }
    return next.handle(req);
  }
}
