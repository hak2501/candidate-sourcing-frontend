export interface IStats {
  statValue: string;
  statLabel: string;
}

export interface IAdminStats {
  customer: IStats[];
  employee: IStats[];
  finance: IStats[];
  failure: IStats;
}

export interface IChartData {
  data: number[];
  label: string;
  backgroundColor?: string | string[];
  fill?: boolean;
  borderRadius?: number;
  borderWidth?: number;
}

export interface IFinanceChartStats {
  revenue: number[];
  expenses: number[];
  profit: number[];
}

export interface IEmployeeDomainStats {
  domains: string[];
  strengths: number[];
}
