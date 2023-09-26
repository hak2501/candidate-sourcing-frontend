import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserTable } from '../models/user';
import { AbstractApiDataSource } from './api.datasource';
import { HttpClient, HttpParams } from '@angular/common/http';

const DATASOURCE_URL = 'https://jsonplaceholder.typicode.com/todos';

export class ExampleDataSource extends AbstractApiDataSource<UserTable> {
  constructor(private httpClient: HttpClient) {
    super();
  }

  fetchDataFromApi(params: HttpParams): Observable<UserTable[]> {
    const options = { params: params };
    return this.httpClient.get<UserTable[]>(DATASOURCE_URL, options);
  }
}
