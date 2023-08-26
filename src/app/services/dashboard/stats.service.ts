import { HttpClient } from '@angular/common/http';

const STATS_API = API_URL + '/stats/';

import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { baseResponse } from 'src/app/core/models/baseResponse';
import { adminStats } from 'src/app/core/models/stats';
import { API_URL } from 'src/constants';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<baseResponse<adminStats>> {
    return this.http
      .get<baseResponse<adminStats>>(STATS_API)
      .pipe(shareReplay());
  }
}
