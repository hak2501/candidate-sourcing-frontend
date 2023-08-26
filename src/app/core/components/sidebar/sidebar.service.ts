import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type SidebarState = 'open' | 'close';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private subject$ = new BehaviorSubject<SidebarState>('open');
  public sidebarState$ = this.subject$.asObservable();

  constructor() {}

  toggle() {
    let state: SidebarState = this.subject$.value == 'open' ? 'close' : 'open';
    this.subject$.next(state);
  }

  open() {
    this.subject$.next('open');
  }
}
