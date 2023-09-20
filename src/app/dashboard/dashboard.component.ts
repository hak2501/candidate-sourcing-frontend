import { Component, inject, ViewChildren, QueryList } from '@angular/core';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/core/services/auth.service';
import { StatsService } from 'src/app/services/dashboard/stats.service';
import { MessageService } from 'src/app/core/services/message.service';
import { MOBILE_GRID, TABLET_GRID, WEB_GRID } from './responsive.constants';
import { Observable } from 'rxjs';
import { IChartData, IStats } from '../core/models/stats';
import { DATE_LABELS } from 'src/constants';

interface IYearlyStats {
  revenue: IStats;
  expenses: IStats;
  profit: IStats;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);
  @ViewChildren('dashboardGrid') grid!: QueryList<any>;

  cards: any;
  chart: any;
  dateLabels = DATE_LABELS;
  domainLabels: string[];

  financeData$: Observable<IChartData[]>;
  domainData$: Observable<IChartData[]>;
  yearlyStats$: Observable<IYearlyStats>;

  /** Based on the screen size, switch from standard to one column per row */
  constructor(
    public authService: AuthService,
    public statsService: StatsService,
    public messageService: MessageService
  ) {
    this.cards = this.generateGrid();

    this.financeData$ = this.initFinanceData();
    this.domainData$ = this.initDomainData();
  }

  private generateGrid() {
    return this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        map(() => {
          if (
            this.breakpointObserver.isMatched(Breakpoints.Small) ||
            this.breakpointObserver.isMatched(Breakpoints.XSmall)
          ) {
            return MOBILE_GRID;
          } else if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
            return TABLET_GRID;
          }
          return WEB_GRID;
        })
      );
  }

  private initFinanceData(): Observable<IChartData[]> {
    return this.statsService.getFinancialStats().pipe(
      tap((res) => {
        if (!res.validation.success) {
          this.messageService.showMessages(
            ['Something Unexpected Happened'],
            'Close'
          );
        }
      }),
      filter((res) => !!res.payload),
      map((res) => {
        let chartData: IChartData[] = [];
        Object.keys(res.payload).map((key: string) => {
          let total = res.payload.revenue.reduce(
            (total: number, curr: number) => {
              return total + curr;
            },
            0
          );
          chartData.push({
            label: key,
            data: (res.payload as any)[key],
          });
        });
        return chartData;
      }),
      startWith([])
    );
  }

  private initDomainData(): Observable<IChartData[]> {
    return this.statsService.getEmployeeDomainStats().pipe(
      tap((res) => {
        if (!res.validation.success) {
          this.messageService.showMessages(
            ['Something Unexpected Happened'],
            'Close'
          );
        }
      }),
      filter((res) => !!res.payload),
      map((res) => {
        let chartData: IChartData[] = [];
        this.domainLabels = res.payload.domains;

        chartData.push({
          label: 'domains',
          data: res.payload.strengths,
        });

        return chartData;
      }),
      startWith([])
    );
  }
}
