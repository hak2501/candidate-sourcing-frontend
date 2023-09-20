import { Component, ViewChild, TemplateRef } from '@angular/core';
import { TableWidgetsService } from './table-widgets.service';

@Component({
  selector: 'app-table-widgets',
  templateUrl: './table-widgets.component.html',
  styleUrls: ['./table-widgets.component.scss'],
})
export class TableWidgetsComponent {
  @ViewChild('textWidget', { static: true }) textWidget: TemplateRef<any>;

  constructor(public tableWidgetsService: TableWidgetsService) {}
}
