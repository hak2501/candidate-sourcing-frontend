import { Component } from '@angular/core';
import { SidebarService } from './core/components/sidebar/sidebar.service';
import { mainContentAnimation } from './animations';
import { AuthService } from './core/services/auth.service';

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
    public authService: AuthService
  ) {}
}
