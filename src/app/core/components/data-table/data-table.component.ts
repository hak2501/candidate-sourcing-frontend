import { DataSource } from '@angular/cdk/collections';
import { Component, Input, TemplateRef } from '@angular/core';

export interface IDataTableColumns {
  name: string;
  widget?: ITableWidget;
}
export interface ITableWidget {
  template: TemplateRef<any>;
  context?: any;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent<T> {
  @Input() dataSource: DataSource<T>;
  @Input() displayedColumns: IDataTableColumns[];
  public columns: string[];
  public widgets: (TemplateRef<any> | null)[];
  public contexts: any;

  constructor() {}

  ngOnChanges() {
    this.columns = this.displayedColumns.map((item) => item.name);
    this.widgets = this.displayedColumns.map((item) =>
      !!item.widget ? item.widget.template : null
    );
    this.contexts = this.displayedColumns.map((item) =>
      !!item.widget ? item.widget.context : null
    );
  }
}
