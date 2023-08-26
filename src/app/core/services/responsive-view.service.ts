import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveViewService {
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  public isMobile$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  public isTablet$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Tablet])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
