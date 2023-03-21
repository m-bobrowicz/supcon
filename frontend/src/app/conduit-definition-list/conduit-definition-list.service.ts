import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConduitDefiniton } from 'src/app/conduit-definition/conduit-definition';

@Injectable({ providedIn: 'root' })
export class ConduitDefinitionListService {
  list(context: { page: number; limit: number }) {
    return this.http.post<{
      count: number;
      items: ConduitDefiniton[];
    }>('/api/conduit-definition/list', {
      page: context.page,
      limit: context.limit,
      orderBy: 'name',
      orderDirection: 'ASC',
    });
  }

  constructor(private http: HttpClient) {}
}
