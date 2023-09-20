import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  Observable,
  catchError,
  filter,
  map,
  startWith,
  tap,
  throwError,
} from 'rxjs';
import { IAdminStats, IStats } from 'src/app/core/models/stats';
import { MessageService } from 'src/app/core/services/message.service';
import { StatsService } from 'src/app/services/dashboard/stats.service';
import {
  CUSTOMER_COLOR,
  CUSTOMER_ICON,
  EMPLOYEE_COLOR,
  EMPLOYEE_ICON,
  ERROR_COLOR,
  ERROR_ICON,
  FINANCE_COLOR,
  FINANCE_ICON,
} from '../../../../constants';
import { ResponsiveViewService } from 'src/app/core/services/responsive-view.service';
import { MOBILE_GRID, TABLET_GRID, WEB_GRID } from './repsonsive.constants';

const labels = {
  customer: ['New Customers', 'Total Customers'],
  employee: ['New Employees', 'Total Employees'],
  finance: ['Remaining Payments', 'Monthly Revenue'],
  error: ['Payment Failures', 'Other Issues'],
};
interface statsGridData {
  rows: string;
  cols: string;
  data: Observable<IStats[]>;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-stats-bar',
  templateUrl: './stats-bar.component.html',
  styleUrls: ['./stats-bar.component.scss'],
})
export class StatsBarComponent implements OnInit {
  stats: any;
  rowHeight = '280px';
  cols = 4;
  hideGrid: boolean = false;
  gridData: Partial<statsGridData>[];

  constructor(
    private statsService: StatsService,
    private messageService: MessageService,
    private breakpointObserver: BreakpointObserver,
    public responsiveViewService: ResponsiveViewService
  ) {
    let stats$ = this.statsService.getOrganizationalStats().pipe(
      tap((stats) => {
        if (!stats.validation.success) {
          this.messageService.showMessages(['Error fetching Stats'], 'Close');
        }
      }),
      filter((stats) => !!stats.payload),
      map((stats) => stats.payload)
      //   catchError((err) => {
      //     this.hideGrid = true;
      //     return throwError(() => err);
      //   })
    );

    const customerStats$ = this.filterData(stats$, 'customer');
    const employeeStats$ = this.filterData(stats$, 'employee');
    const financeStats$ = this.filterData(stats$, 'finance');
    const errorStats$ = this.filterData(stats$, 'error');

    this.gridData = [
      {
        data: customerStats$,
        icon: CUSTOMER_ICON,
        color: CUSTOMER_COLOR,
      },
      {
        data: employeeStats$,
        icon: EMPLOYEE_ICON,
        color: EMPLOYEE_COLOR,
      },
      {
        data: financeStats$,
        icon: FINANCE_ICON,
        color: FINANCE_COLOR,
      },
      {
        data: errorStats$,
        icon: ERROR_ICON,
        color: ERROR_COLOR,
      },
    ];
  }

  ngOnInit() {
    this.stats = this.generateStatsGrid();
  }
  public generateStatsGrid() {
    return this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        map(() => {
          if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
            return this.gridData.map((data) =>
              Object.assign(data, MOBILE_GRID)
            );
          } else if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
            return this.gridData.map((data) =>
              Object.assign(data, TABLET_GRID)
            );
          }
          return this.gridData.map((data) => Object.assign(data, WEB_GRID));
        })
      );
  }

  filterData(
    obs$: Observable<IAdminStats>,
    field: string
  ): Observable<IStats[]> {
    return obs$.pipe(
      map((res: any) => res[field]),
      startWith([
        {
          statLabel: (labels as any)[field][0],
          statValue: '-',
        },
        {
          statLabel: (labels as any)[field][1],
          statValue: '-',
        },
      ])
    );
  }
}
