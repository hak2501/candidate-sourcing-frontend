import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { SassHelperComponent } from '../sass-helper/sass-helper.component';
import { IChartData } from '../../models/stats';
import { SpinnerService } from '../spinner/spinner.service';
import { COLOR_LIST } from 'src/constants';
import { ChartService } from './chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers: [SpinnerService],
})
export class ChartComponent implements AfterViewInit {
  @Input() chartType: string = 'bar';
  @Input() labels: string[];
  @Input() data!: Observable<IChartData[]>;
  @Input() datasetOptions: any = {};
  chart: any;
  dataSet: IChartData[];
  id: number;
  displayGridAndTicks: boolean = true;

  @ViewChild(SassHelperComponent)
  private sassHelper: SassHelperComponent;

  constructor(
    private spinnerService: SpinnerService,
    private chartService: ChartService
  ) {
    this.id = this.chartService.getId();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.displayGridAndTicks = this.chartType == 'doughnut' ? false : true;
      this.spinnerService
        .showSpinnerUntilCompleted(this.data)
        .pipe(
          map((res) => {
            this.dataSet = [];
            res.map((stat, index) => {
              let dataObj: IChartData = {
                fill: true,
                borderRadius: this.chartType == 'bar' ? 25 : 0,
                borderWidth: this.chartType == 'bar' ? 2 : 0,
                data: stat.data,
                label: stat.label,
              };
              if (!stat.backgroundColor) {
                if (this.chartType == 'doughnut') {
                  dataObj.backgroundColor = [...COLOR_LIST].map((res) => {
                    return this.sassHelper.readProperty(res);
                  });
                } else {
                  dataObj.backgroundColor = this.sassHelper.readProperty(
                    COLOR_LIST[index % 3]
                  );
                }
              }
              this.dataSet.push(dataObj);
            });
            setTimeout(() => {
              this.generateChart();
            });
          })
        )
        .subscribe();
    });
  }

  private generateChart() {
    const ctx = <HTMLCanvasElement>document.getElementById('chart-' + this.id);
    if (ctx) {
      this.chart?.destroy();
      this.chart = new window.Chart(ctx, {
        type: this.chartType,
        data: {
          labels: this.labels,
          datasets: this.dataSet,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: {
                display: this.displayGridAndTicks,
              },
              grid: {
                display: this.displayGridAndTicks,
                drawBorder: false,
              },
              border: {
                display: false,
              },
            },
            y: {
              ticks: {
                display: this.displayGridAndTicks,
              },
              grid: {
                display: this.displayGridAndTicks,
                drawBorder: false,
              },
              border: {
                display: false,
              },
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

  ngOnDestroy() {
    this.chart?.destroy();
  }
}
