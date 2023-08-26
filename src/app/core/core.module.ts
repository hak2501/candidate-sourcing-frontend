import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarService } from './components/sidebar/sidebar.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerService } from './components/spinner/spinner.service';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { AuthGuard } from './guards/auth.guard';
import { ResponsiveViewService } from './services/responsive-view.service';
import { NavbarMobileComponent } from './components/navbar-mobile/navbar-mobile.component';

const MATERIAL_DEPS = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
];
@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    LoginComponent,
    SpinnerComponent,
    StatsCardComponent,
    NavbarMobileComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_DEPS,
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    LoginComponent,
    SpinnerComponent,
    StatsCardComponent,
    NavbarMobileComponent,
  ],
  providers: [SidebarService, SpinnerService, AuthGuard, ResponsiveViewService],
})
export class CoreModule {}
