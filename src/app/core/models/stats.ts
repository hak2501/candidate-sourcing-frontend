export interface stats {
  statValue: string;
  statLabel: string;
}

export interface adminStats {
  customer: stats[];
  employee: stats[];
  finance: stats[];
  failure: stats;
}
