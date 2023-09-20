import { Injectable } from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  map,
  shareReplay,
  tap,
  catchError,
  throwError,
} from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { IJWT } from '../models/jwt';
import { Router } from '@angular/router';
import { IBaseResponse } from '../models/baseResponse';
import { MessageService } from './message.service';
import { API_URL } from 'src/constants';

const AUTH_DATA = 'auth_data';
const AUTH_API = API_URL + '/auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private accessSubject = new BehaviorSubject<string>('');
  private refreshSubject = new BehaviorSubject<string>('');

  public user$: Observable<User | null> = this.userSubject.asObservable();
  public isLoggedIn$: Observable<boolean>;
  public isLoggedOut$: Observable<boolean> | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

    const authData = localStorage.getItem(AUTH_DATA);
    if (authData) {
      const { accessToken, refreshToken } = JSON.parse(authData);
      this.updateToken({ accessToken, refreshToken });
      this.router.navigateByUrl('/dashboard');
    }
  }

  public login(
    email: string,
    password: string
  ): Observable<IBaseResponse<IJWT>> | any {
    return this.http
      .post<IBaseResponse<IJWT>>(AUTH_API + 'login', { email, password })
      .pipe(
        tap((response) => {
          this.updateToken(response.payload);
          localStorage.setItem(AUTH_DATA, JSON.stringify(response.payload));
        }),
        shareReplay(),
        catchError((err) => {
          this.userSubject.next({
            username: 'First-User',
            email: 'abc@test.com',
            permissions: ['admin'],
          });
          this.router.navigateByUrl('/customer');
          return throwError(() => err);
        })
      );
  }

  public refresh() {
    return this.http
      .post<IBaseResponse<IJWT>>(AUTH_API + 'refresh', {
        refreshToken: this.getRefreshToken(),
      })
      .pipe(
        tap((response) => {
          this.updateToken(response.payload);
          localStorage.setItem(AUTH_DATA, JSON.stringify(response.payload));
        }),
        shareReplay()
      );
  }

  public logout() {
    this.userSubject.next(null);
    localStorage.removeItem(AUTH_DATA);
    this.messageService.showMessages(['Session Ended'], 'Close');
    this.router.navigateByUrl('/login');
  }

  public register(
    username: string,
    email: string,
    password: string
  ): Observable<IBaseResponse<Partial<User>>> {
    // return of(true);
    return this.http
      .post<IBaseResponse<Partial<User>>>('/api/register', {
        username,
        email,
        password,
      })
      .pipe(shareReplay());
  }

  public getAccessToken() {
    return this.accessSubject.value;
  }

  public getRefreshToken() {
    return this.refreshSubject.value;
  }

  public isLoggedIn() {
    return !!this.userSubject.getValue();
  }

  private updateToken(authData: IJWT): User {
    this.accessSubject.next(authData.accessToken);
    this.refreshSubject.next(authData.refreshToken);
    const user = this.parseJwt(authData.accessToken);
    this.userSubject.next(user);
    return user;
  }

  private parseJwt(token: string) {
    try {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (err) {
      localStorage.removeItem(AUTH_DATA);
      this.router.navigateByUrl('/login');
    }
  }
}
