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
import { adminStats, stats } from 'src/app/core/models/stats';
import { MessageService } from 'src/app/core/services/message.service';
import { StatsService } from 'src/app/services/dashboard/stats.service';
import {
  customerColor,
  customerIcon,
  employeeColor,
  employeeIcon,
  errorColor,
  errorIcon,
  financeColor,
  financeIcon,
  regularStats,
  smallStats,
  xSmallStats,
} from './constants';
import { ResponsiveViewService } from 'src/app/core/services/responsive-view.service';

interface statsGridData {
  rows: string;
  cols: string;
  data: Observable<stats[]>;
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
  customerStats$: Observable<stats[]>;
  employeeStats$: Observable<stats[]>;
  financeStats$: Observable<stats[]>;
  errorStats$: Observable<stats[]>;
  gridData: Partial<statsGridData>[];

  constructor(
    private statsService: StatsService,
    private messageService: MessageService,
    private breakpointObserver: BreakpointObserver,
    public responsiveViewService: ResponsiveViewService
  ) {
    let stats$ = this.statsService.getDashboardStats().pipe(
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

    this.customerStats$ = this.filterData(stats$, 'customer');
    this.employeeStats$ = this.filterData(stats$, 'employee');
    this.financeStats$ = this.filterData(stats$, 'finance');
    this.errorStats$ = this.filterData(stats$, 'error');

    this.gridData = [
      {
        data: this.customerStats$,
        icon: customerIcon,
        color: customerColor,
      },
      {
        data: this.employeeStats$,
        icon: employeeIcon,
        color: employeeColor,
      },
      {
        data: this.financeStats$,
        icon: financeIcon,
        color: financeColor,
      },
      {
        data: this.errorStats$,
        icon: errorIcon,
        color: errorColor,
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
              Object.assign(data, xSmallStats)
            );
          } else if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
            return this.gridData.map((data) => Object.assign(data, smallStats));
          }
          return this.gridData.map((data) => Object.assign(data, regularStats));
        })
      );
  }

  filterData(obs$: Observable<adminStats>, field: string): Observable<stats[]> {
    return obs$.pipe(
      map((res: any) => res[field]),
      startWith([
        {
          statLabel: 'Current ' + field,
          statValue: '200',
        },
        {
          statLabel: 'Total ' + field,
          statValue: '375',
        },
      ])
    );
  }
}
