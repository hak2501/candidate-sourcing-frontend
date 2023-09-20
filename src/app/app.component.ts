import { Component, ViewChildren, QueryList, inject } from '@angular/core';
import { SidebarService } from './core/components/sidebar/sidebar.service';
import { mainContentAnimation } from './animations';
import { AuthService } from './core/services/auth.service';
import { Chart, registerables } from 'chart.js/auto';
import { ResponsiveViewService } from './core/services/responsive-view.service';
Chart.register(...registerables);
window.Chart = Chart;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [mainContentAnimation()],
})
export class AppComponent {
  title = 'candidate-sourcing-frontend';

  constructor(
    public sidebarService: SidebarService,
    public authService: AuthService,
    public mobileViewSerivce: ResponsiveViewService
  ) {}
}
