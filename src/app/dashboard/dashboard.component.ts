import {
  Component,
  inject,
  ViewChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { StatsService } from 'src/app/services/dashboard/stats.service';
import { adminStats, stats } from 'src/app/core/models/stats';
import { baseResponse } from 'src/app/core/models/baseResponse';
import { MessageService } from 'src/app/core/services/message.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  private breakpointObserver = inject(BreakpointObserver);
  @ViewChildren('dashboardGrid') grid!: QueryList<any>;

  cards: any;
  chart: any;

  /** Based on the screen size, switch from standard to one column per row */
  constructor(
    public authService: AuthService,
    private sanitizer: DomSanitizer,
    public statsService: StatsService,
    public messageService: MessageService
  ) {
    setTimeout(() => (this.cards = this.generateGrid()));
  }

  ngAfterViewInit() {
    this.grid.changes.subscribe((t) => {
      setTimeout(() => {
        this.generateChart();
      });
    });
  }

  private generateGrid() {
    return this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        map(({ matches }) => {
          if (matches) {
            return [
              {
                title: 'Financial Report',
                cols: 2,
                rows: 1,
                content: this.sanitizeHtml(
                  `<canvas id='myChart' class='myCanvas'></canvas>`
                ),
              },
              { title: 'Card 2', cols: 2, rows: 1 },
              { title: 'Card 3', cols: 2, rows: 1 },
              { title: 'Card 4', cols: 2, rows: 1 },
              { title: 'Card 5', cols: 2, rows: 1 },
            ];
          }

          return [
            {
              title: 'Financial Report',
              cols: 1,
              rows: 1,
              content: this.sanitizeHtml(`<canvas id='myChart'></canvas>`),
            },
            { title: 'Card 2', cols: 1, rows: 1 },
            { title: 'Card 3', cols: 1, rows: 1 },
            { title: 'Card 4', cols: 1, rows: 1 },
            { title: 'Card 5', cols: 1, rows: 1 },
          ];
        })
      );
  }

  private generateChart() {
    const ctx = <HTMLCanvasElement>document.getElementById('myChart');
    if (ctx) {
      this.chart?.destroy();
      this.chart = new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [
            {
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: '#221b08',
              //   borderColor: '#123456',
              fill: true,
              borderRadius: 25,
              borderWidth: 2,
              //   borderSkipped: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

  private sanitizeHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
