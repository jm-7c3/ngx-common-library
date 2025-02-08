import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { SpListDataResponse, SpListDataResponseResults, SpListResponse,
  SPListSubmit, SpQueryConfig } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SpListsService {
  private readonly http = inject(HttpClient);

  private readonly baseApiListDataPath: string;
  private readonly baseApiPath: string;
  private readonly baseApiWebPath: string;;

  constructor(
    @Inject('env') private readonly env: any
  ) {
    this.baseApiListDataPath = `${this.env.spSitePath}/_vti_bin/ListData.svc`;
    this.baseApiPath = `${this.env.spSitePath}/_api`;
    this.baseApiWebPath = `${this.env.spSitePath}/_api/web`;
  }

  getQuery(listName: string | null, type: 'listData' | 'siteusers' | 'webApi',
    config: SpQueryConfig): string {
    const response: string[] = [];
    let url: string;

    switch (type) {
      case 'listData':
        url = `${this.baseApiListDataPath}/${listName}`;
        break;
      case 'siteusers':
        url = `${this.baseApiWebPath}/siteusers`;
        break;
      case 'webApi':
        url = `${this.baseApiWebPath}/lists/getByTitle('${listName}')/items`;
        break;
    }

    if (config) {
      const {expand, filter, orderBy, reverse, select, top} = config;

      url += '?';

      if (top) {
        response.push(`$top=${top}`);
      }

      if (select) {
        response.push('$select=' + select.join(','));
      }

      if (filter && filter.length > 0) {
        const subConfig: string[] = [];

        for (const f of filter) {
          // TODO = Add date functionality
          if (f.datetimeOperator) {
            subConfig.push(`${f.field} ${f.datetimeOperator} datetime'${f.value}'`);
          } else if (f.numericOperator) {
            subConfig.push(`${f.field} ${f.numericOperator} ${f.value}`);
          } else if (f.stringOperator) {
            if (f.stringOperator === 'startswith') {
              subConfig.push(`${f.stringOperator}(${f.field},'${f.value}')`);
            } else if (f.stringOperator === 'substringof') {
              subConfig.push(`${f.stringOperator}('${f.value}',${f.field})`);
            } else {
              subConfig.push(`${f.field} ${f.stringOperator} '${f.value}'`);
            }
          }
        }

        response.push('$filter=' + subConfig.join(' and '));
      }

      if (expand) {
        response.push('$expand=' + expand.join(','));
      }

      if (orderBy) {
        response.push(`$orderby=${orderBy}` + (reverse ? ' desc' : ''));
      }
    }

    return url + response.join('&');
  }

  getListItem(listName: string, id: number): Observable<any> {
    const url = this.getListUrl(listName, id);

    return this.http.get(url);
  }

  getListItemHistory(listName: string, id: number): Observable<any> {
    const url = this.getListUrl(listName, id) + '/versions';

    return this.http.get(url);
  }

  async getListItemHistoryAsync(listName: string, id: number): Promise<any> {
    const url = this.getListUrl(listName, id) + '/versions';

    const response = await fetch(url);
    const responseData = await response.json();

    return responseData.value;
  }

  query(listName: string, config: SpQueryConfig):
    Observable<SpListDataResponseResults[]> {
    const url = this.getQuery(listName, 'listData', config);

    return this.http.get<SpListDataResponse>(url).pipe(
      map(({d}) => d.results)
    );
  }

  async queryAsync(listName: string, config: SpQueryConfig):
    Promise<SpListDataResponseResults[]> {
    const url = this.getQuery(listName, 'listData', config);

    const response = await fetch(url);
    const responseData = await response.json();

    return responseData.d.results;
  }

  list(listName: string, config: SpQueryConfig): Observable<SpListResponse> {
    const url = this.getQuery(listName, 'webApi', config);

    return this.http.get<SpListResponse>(url);
  }

  async listAsync(listName: string, config: SpQueryConfig): Promise<SpListResponse> {
    const url = this.getQuery(listName, 'webApi', config);

    const response = await fetch(url);
    const responseData = await response.json() as SpListResponse;

    return responseData;
  }

  save(listName: string, data: SPListSubmit): Observable<any> {
    const url = this.getListUrl(listName, data.Id);

    return this.http.post(url, data);
  }

  private getListUrl(listName: string, id?: number): string {
    const url = `${this.baseApiWebPath}/lists/getByTitle('${listName}')/items`;

    if (id) {
      return `${url}(${id})`;
    }

    return url;
  }
}
