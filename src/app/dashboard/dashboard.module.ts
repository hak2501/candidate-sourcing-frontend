import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule } from '../core/core.module';
import { StatsBarComponent } from './components/stats-bar/stats-bar.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [DashboardComponent, StatsBarComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CoreModule,
    TranslateModule.forChild(),
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
