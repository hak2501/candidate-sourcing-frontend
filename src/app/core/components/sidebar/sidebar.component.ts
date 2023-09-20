import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { SidebarService } from './sidebar.service';
import { iconAnimation, labelAnimation, sidebarAnimation } from './animations';
import { AuthService } from '../../services/auth.service';
import { CUSTOMER_ICON, HOME_ICON } from 'src/constants';

interface INavRoutes {
  icon: string;
  route: string;
  title: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [sidebarAnimation(), iconAnimation(), labelAnimation()],
})
export class SidebarComponent implements OnInit {
  navRoutes: INavRoutes[] = [
    { icon: HOME_ICON, route: '/dashboard', title: 'Home' },
    { icon: CUSTOMER_ICON, route: '/customer', title: 'Customer' },
  ];
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
