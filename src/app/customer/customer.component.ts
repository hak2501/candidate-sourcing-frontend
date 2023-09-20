import { DataSource } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Observable, filter, map, of } from 'rxjs';
import { User, UserTable } from '../core/models/user';
import {
  DataTableComponent,
  IDataTableColumns,
} from '../core/components/data-table/data-table.component';
import { TableWidgetsComponent } from '../core/components/data-table/table-widgets/table-widgets.component';
import { TableWidgetsService } from '../core/components/data-table/table-widgets/table-widgets.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent {
  dataSource: CustomerDataSource = new CustomerDataSource(this.authService);

  userColumns: IDataTableColumns[] = [];

  constructor(
    private authService: AuthService,
    private tableWidgetsService: TableWidgetsService
  ) {}

  ngOnInit() {
    this.userColumns = [
      {
        name: 'username',
        widget: {
          template: this.tableWidgetsService.get('textWidget'),
          context: {
            myFun: (val: string) => {
              this.myFun(val);
            },
          },
        },
      },
      { name: 'email' },
    ];
  }

  myFun(value: string) {
    console.log('here is test', this.authService.isLoggedIn(), value);
  }
}

export class CustomerDataSource extends DataSource<User> {
  constructor(private authService: AuthService) {
    super();
  }
  override connect(): Observable<User[]> {
    return this.authService.user$.pipe(
      filter((user) => !!user),
      map((user) => [user] as UserTable[])
    );
  }

  disconnect() {}
}
