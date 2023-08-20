import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SidebarService } from './sidebar.service';
import { iconAnimation, labelAnimation, sidebarAnimation } from './animations';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [sidebarAnimation(), iconAnimation(), labelAnimation()],
})
export class SidebarComponent implements OnInit {
  constructor(
    public sidebarService: SidebarService,
    private authService: AuthService
  ) {}
  ngOnInit() {}

  openSidebar() {
    this.sidebarService.open();
  }

  logout() {
    this.authService.logout();
  }
  //   isExpanded: boolean = false;
  //   private breakpointObserver = inject(BreakpointObserver);

  //   isHandset$: Observable<boolean> = this.breakpointObserver
  //     .observe(Breakpoints.Handset)
  //     .pipe(
  //       map((result) => result.matches),
  //       shareReplay()
  //     );
}
