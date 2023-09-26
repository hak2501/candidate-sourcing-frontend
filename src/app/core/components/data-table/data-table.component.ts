import { DataSource } from '@angular/cdk/collections';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AbstractApiDataSource } from '../../datasource/api.datasource';

export interface IDataTableColumns {
  id: string;
  title: string;
  widget?: ITableWidget;
  visible?: boolean;
}
export interface ITableWidget {
  template: TemplateRef<any>;
  context?: any;
}

export interface IDisplayedColumns {
  id: string;
  title: string;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent<T> {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() dataSource: AbstractApiDataSource<T>;
  @Input() columns: IDataTableColumns[];
  @Input() displayedColumns: string[];
  public widgets: (TemplateRef<any> | null)[];
  public contexts: any;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource?.setSort(this.sort);
    this.dataSource?.setPaginator(this.paginator);
    this.dataSource?.loadPage();
  }

  ngOnChanges() {
    this.displayedColumns = this.columns
      .filter((item) => item.visible != false)
      .map((item) => {
        return item.id;
      });

    this.widgets = this.columns.map((item) =>
      !!item.widget ? item.widget.template : null
    );
    this.contexts = this.columns.map((item) =>
      !!item.widget ? item.widget.context : null
    );
  }

  ngOnDestroy() {
    this.dataSource.destroySubscriptions();
  }
}
