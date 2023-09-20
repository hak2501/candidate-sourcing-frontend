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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerService } from './components/spinner/spinner.service';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { AuthGuard } from './guards/auth.guard';
import { ResponsiveViewService } from './services/responsive-view.service';
import { NavbarMobileComponent } from './components/navbar-mobile/navbar-mobile.component';
import { ChartComponent } from './components/chart/chart.component';
import { SassHelperComponent } from './components/sass-helper/sass-helper.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { TableWidgetsComponent } from './components/data-table/table-widgets/table-widgets.component';
import { TableWidgetsService } from './components/data-table/table-widgets/table-widgets.service';

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
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
];

const MODULES = [
  SidebarComponent,
  NavbarComponent,
  LoginComponent,
  SpinnerComponent,
  StatsCardComponent,
  NavbarMobileComponent,
  ChartComponent,
  SassHelperComponent,
  DataTableComponent,
  TableWidgetsComponent,
];
@NgModule({
  declarations: [...MODULES],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_DEPS,
  ],
  exports: [...MATERIAL_DEPS, ...MODULES],
  providers: [
    SidebarService,
    SpinnerService,
    AuthGuard,
    ResponsiveViewService,
    TableWidgetsService,
  ],
})
export class CoreModule {}
