import { HttpClient } from '@angular/common/http';

const STATS_API = API_URL + '/stats/';
const FINANCIAL_STATS_API = API_URL + '/stats/finance/';
const EMPLOYEE_DOMAIN_STATS_API = API_URL + '/stats/employee-domain/';

import { Injectable } from '@angular/core';
import { Observable, shareReplay, startWith, delay } from 'rxjs';
import { IBaseResponse } from 'src/app/core/models/baseResponse';
import {
  IAdminStats,
  IEmployeeDomainStats,
  IFinanceChartStats,
} from 'src/app/core/models/stats';
import { API_URL } from 'src/constants';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(private http: HttpClient) {}

  getOrganizationalStats(): Observable<IBaseResponse<IAdminStats>> {
    return this.http
      .get<IBaseResponse<IAdminStats>>(STATS_API)
      .pipe(shareReplay());
  }

  getFinancialStats(): Observable<IBaseResponse<IFinanceChartStats>> {
    let dummyData: IBaseResponse<IFinanceChartStats> = {
      validation: {
        success: true,
        errors: [],
      },
      payload: {
        revenue: [5, 10, 15, 20, 15, 10, 15, 20, 15, 10, 30, 35],
        profit: [2, 4, 10, 15, 10, 5, 10, 15, 10, 5, 20, 25],
        expenses: [2, 4, 10, 15, 10, 5, 10, 15, 10, 5, 10, 20],
      },
    };
    return this.http
      .get<IBaseResponse<IFinanceChartStats>>(FINANCIAL_STATS_API)
      .pipe(shareReplay(), delay(2000), startWith(dummyData));
  }

  getEmployeeDomainStats(): Observable<IBaseResponse<IEmployeeDomainStats>> {
    let dummyData: IBaseResponse<IEmployeeDomainStats> = {
      validation: {
        success: true,
        errors: [],
      },
      payload: {
        domains: ['Health', 'Engineering', 'Insurance', 'Other'],
        strengths: [20, 10, 30, 5],
      },
    };
    return this.http
      .get<IBaseResponse<IEmployeeDomainStats>>(EMPLOYEE_DOMAIN_STATS_API)
      .pipe(shareReplay(), delay(2000), startWith(dummyData));
  }
}
