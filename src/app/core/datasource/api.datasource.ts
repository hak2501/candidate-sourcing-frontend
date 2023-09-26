import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AbstractCustomDataSource } from './abstract.datasource';

export abstract class AbstractApiDataSource<
  T
> extends AbstractCustomDataSource<T> {
  constructor(private initData: T[] = []) {
    super(initData);
  }

  loadPage(): void {
    const pageIndex = this.paginator?.pageIndex || 0;
    const pageSize = this.paginator?.pageSize || 0;
    const page = this.paginator.pageIndex;
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    const [sortField, sortDirection] = this.getSortQuery();

    const params = new HttpParams()
      .set('start', startIndex.toString())
      .set('end', endIndex.toString())
      .set('_page', page)
      .set('_limit', pageSize)
      .set('sortField', sortField)
      .set('sortDirection', sortDirection);

    this.fetchDataFromApi(params)
      .pipe(
        // To-Do :: Add global message of failure
        catchError(() => [] as T[]) // Handle errors gracefully
      )
      .subscribe((data) => {
        this.paginator.length = (data as T[]).length;
        this.dataSubject.next(data as T[]);
      });
  }

  private getSortQuery(): string[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return ['', '']; // No sorting
    }

    const direction = this.sort.direction === 'asc' ? 'asc' : 'desc';
    return [this.sort.active, direction];
  }

  abstract fetchDataFromApi(params: HttpParams): Observable<T[]>;
}
