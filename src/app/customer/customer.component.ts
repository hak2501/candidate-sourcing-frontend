import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import {
  DataTableComponent,
  IDataTableColumns,
} from '../core/components/data-table/data-table.component';
import { TableWidgetsService } from '../core/components/data-table/table-widgets/table-widgets.service';
import { ExampleDataSource } from '../core/datasource/example.datasource';
import { UserTable } from '../core/models/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableComponent)
  dataTable: DataTableComponent<UserTable>;

  dataSource: ExampleDataSource;
  userColumns: IDataTableColumns[] = [];

  constructor(
    private authService: AuthService,
    private tableWidgetsService: TableWidgetsService,
    private httpClient: HttpClient
  ) {
    this.dataSource = new ExampleDataSource(httpClient);
  }

  ngOnInit() {
    console.log('widget', this.tableWidgetsService.get('buttonWidget'));
    this.userColumns = [
      {
        id: 'userId',
        title: 'User Id',
      },
      { id: 'id', title: 'Id' },
      {
        id: 'title',
        title: 'Title',
      },
      {
        id: 'completed',
        title: 'Completed',
      },
      {
        id: 'actions',
        title: '',
        widget: { template: this.tableWidgetsService.get('buttonWidget') },
      },
    ];
  }

  ngAfterViewInit() {}

  myFun(value: string) {
    console.log('here is test', this.authService.isLoggedIn(), value);
  }
}
