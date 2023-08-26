import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  tap,
  of,
  concatMap,
  finalize,
} from 'rxjs';

@Injectable()
export class SpinnerService {
  private spinnerSubject$ = new BehaviorSubject<boolean>(false);
  public spinnerObs$ = this.spinnerSubject$.asObservable();

  constructor() {}

  showSpinner() {
    this.spinnerSubject$.next(true);
  }

  hideSpinner() {
    this.spinnerSubject$.next(false);
  }

  showSpinnerUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.showSpinner()),
      concatMap(() => obs$),
      finalize(() => this.hideSpinner())
    );
  }
}
