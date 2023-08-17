import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type SidebarState = 'open' | 'close';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebarState: SidebarState = 'open';
  private subject$ = new BehaviorSubject<SidebarState>('open');
  public sidebarStatus = this.subject$.asObservable();

  constructor() {}

  toggle() {
    this.sidebarState = this.sidebarState == 'open' ? 'close' : 'open';
    this.subject$.next(this.sidebarState);
  }

  open() {
    this.sidebarState = 'open';
    this.subject$.next(this.sidebarState);
  }
}
