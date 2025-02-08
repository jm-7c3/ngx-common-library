export interface SpListDataResponseResults {
  __metadata: SpListDataResponseResultsMetadata;
  Id?: number;
  Title?: string;
  [x:string]: number | SpListDataResponseResultsMetadata | string | undefined;
}

export interface SpListDataResponseResultsMetadata {
  etag: string;
  type: string;
  uri: string;
}

export interface SpListResponse {
  'odata.metadata': string;
  'odata.nextLink'?: string;
  value: SpListResponseValue[]
}

export interface SpListResponseValue {
  Id?: number;
  Title?: string;
  [x:string]: number | string | undefined;
}

export interface SPListSubmit {
  __metadata: SPListSubmitMetadata;
  Id?: number;
  [x:string]: boolean | number | SPListSubmitMetadata | string | undefined;
}

export interface SPListSubmitMetadata {
  type: string;
}

export interface SpQueryConfig {
  expand?: string[];
  filter?: SpQueryConfigFilter[];
  orderBy?: string;
  reverse?: boolean;
  select?: string[];
  top?: number;
}

export interface SpQueryConfigFilter {
  datetimeOperator?: 'ge' | 'le',
  // datetimeOperator?: 'day' | 'month' | 'year' | 'hour' | 'minute' | 'second';
  field: string;
  numericOperator?: 'lt' | 'le' | 'gt' | 'ge' | 'eq' | 'ne';
  stringOperator?: 'eq' | 'ne' | 'startswith' | 'substringof';
  value: number | string | Date;
}
