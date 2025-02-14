export interface SearchConsoleQueryParams {
  startDate: string;
  endDate: string;
  dimensions: Array<'query' | 'page' | 'country' | 'device' | 'date'>;
  filters?: Array<{
    dimension: string;
    operator: 'equals' | 'contains' | 'notContains' | 'includingRegex' | 'excludingRegex';
    expression: string;
  }>;
  rowLimit?: number;
}

export interface SearchConsoleQueryResult {
  rows: Array<{
    keys: string[];
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
  responseAggregationType: string;
}

export interface SearchAnalyticsData {
  position: number;
  previousPosition: number | null;
  clicks: number;
  impressions: number;
  ctr: number;
  page: string;
} 