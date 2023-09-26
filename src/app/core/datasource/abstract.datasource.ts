import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export abstract class AbstractCustomDataSource<T> extends DataSource<T> {
  protected dataSubject = new BehaviorSubject<T[]>([]);
  protected paginator: MatPaginator;
  protected sort: MatSort;
  private sortSubscription: Subscription;
  private paginationSubscription: Subscription;

  constructor(protected initialData: T[]) {
    super();
    this.dataSubject.next(initialData);
  }

  connect(): Observable<T[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(): void {
    this.dataSubject.complete();
  }

  setPaginator(paginator: MatPaginator) {
    this.paginator = paginator;
    this.paginationSubscription = this.paginator.page.subscribe(() => {
      this.loadPage();
    });
  }

  setSort(sort: MatSort): void {
    this.sort = sort;
    this.sortSubscription = this.sort.sortChange.subscribe(() => {
      this.paginator?.firstPage();
      this.loadPage();
    });
  }

  destroySubscriptions() {
    this.paginationSubscription.unsubscribe();
    this.sortSubscription.unsubscribe();
  }

  abstract loadPage(): void;
}
