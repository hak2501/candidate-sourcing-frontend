import { Component } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { tap } from 'rxjs';
import { ResponsiveViewService } from '../../services/responsive-view.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    public responsiveViewService: ResponsiveViewService,
    private sidebarService: SidebarService
  ) {}

  toggleSidebar() {
    this.sidebarService.toggle();
  }
}
