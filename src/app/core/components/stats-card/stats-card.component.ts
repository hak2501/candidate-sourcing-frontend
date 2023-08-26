import { Component, Input } from '@angular/core';
import { stats } from '../../models/stats';
import { Observable, finalize, of, startWith, tap } from 'rxjs';
import { SpinnerService } from '../spinner/spinner.service';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss'],
  providers: [SpinnerService],
})
export class StatsCardComponent {
  @Input() icon: string = 'help';
  @Input() stats$!: Observable<stats[]>;
  @Input() color: string = 'primary';
  statsList$: Observable<stats[]>;

  constructor(private spinnerService: SpinnerService) {}

  ngOnChanges() {
    this.statsList$ = this.spinnerService.showSpinnerUntilCompleted(
      this.stats$
    );
  }
}
